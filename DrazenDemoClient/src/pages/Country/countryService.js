import * as Yup from "yup";

const apiEndpoint = "/api/country";

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

function checkValidity(country) {
  const validationSchema = Yup.object().shape({
    code: Yup.string().trim().required(),
    name: Yup.string().trim().required(),
  });

  try {
    validationSchema.validateSync(country, { abortEarly: false });
    return true;
  } catch (error) {
    throw Error("Missing required fields. Please check the form.");
  }
}

const countryService = {
  getEmpty() {
    return {
      id: null,
      code: "",
      name: "",
    };
  },

  async getAll() {
    const response = await fetch(apiEndpoint);
    if (!response.ok) throw Error("Error fetching countries.");
    const data = await response.json();
    return data;
  },

  async save(countryToSave) {
    const country = { ...countryToSave };
    if (!checkValidity(country)) return;

    if (country.id) {
      const response = await fetch(
        `${apiEndpoint}/${country.id}`,
        putConfig(country)
      );
      if (!response.ok) {
        const text = await response.text();
        throw Error(text);
      }
      const data = await response.json();
      return data;
    }

    country.id = null;
    const response = await fetch(apiEndpoint, postConfig(country));
    if (!response.ok) {
      const text = await response.text();
      throw Error(text);
    }
    const data = await response.json();
    return data;
  },

  async delete(country) {
    const response = await fetch(
      `${apiEndpoint}/${country.id}`,
      deleteConfig()
    );
    if (!response.ok) {
      const text = await response.text();
      throw Error(text);
    }
  },
};

export default countryService;
