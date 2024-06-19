function putConfig(body) {
  return {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

function postConfig(body) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

function deleteConfig() {
  return {
    method: "DELETE",
  };
}

function findIndexById(items, id) {
  let index = -1;

  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      index = i;
      break;
    }
  }

  return index;
}

function checkValidity(validationSchema, item) {
  try {
    validationSchema.validateSync(item, { abortEarly: false });
    return true;
  } catch (error) {
    throw Error("Missing required fields. Please check the form.");
  }
}

export { putConfig, postConfig, deleteConfig, checkValidity };

export default function createService(
  endpoint,
  emptyItem,
  validationSchema,
  getAllErrorMessage,
  putErrorMessage,
  postErrorMessage,
  deleteErrorMessage
) {
  return {
    getEmpty() {
      return emptyItem;
    },

    async getAll() {
      const response = await fetch(endpoint);
      if (!response.ok) throw Error(getAllErrorMessage);
      const data = await response.json();
      return data;
    },

    async save(previousItems, itemToSave) {
      const items = [...previousItems];
      const item = { ...itemToSave };

      if (checkValidity(validationSchema, item)) {
        if (item.id) {
          console.log("PUT ITEM:", item);
          // CHECK THIS
          item.country = null;
          const response = await fetch(
            `${endpoint}/${item.id}`,
            putConfig(item)
          );
          if (!response.ok) {
            const text = await response.text();
            throw Error(text || putErrorMessage);
          }
          const data = await response.json();
          console.log("PUT DATA:", data);
          const index = findIndexById(items, item.id);
          // items[index] = item;
          items[index] = data;
        } else {
          item.id = null;
          const response = await fetch(endpoint, postConfig(item));
          if (!response.ok) {
            const text = await response.text();
            throw Error(text || postErrorMessage);
          }
          const data = await response.json();
          console.log("POST DATA:", data);
          // item.id = data.id;
          // item = {...data};
          items.push(data);
        }
        return items;
      }
    },

    async delete(previousItems, itemToDelete) {
      const response = await fetch(
        `${endpoint}/${itemToDelete.id}`,
        deleteConfig()
      );
      if (!response.ok) throw Error(deleteErrorMessage);
      const items = previousItems.filter((item) => item.id !== itemToDelete.id);
      return items;
    },

    async deleteSelected(previousItems, selectedItems) {
      for (const item of selectedItems) {
        const response = await fetch(`${endpoint}/${item.id}`, deleteConfig());
        if (!response.ok) throw Error(deleteErrorMessage);
      }
      const items = previousItems.filter(
        (item) => !selectedItems.includes(item)
      );
      return items;
    },
  };
}
