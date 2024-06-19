import * as Yup from "yup";

const apiEndpoint = "/api/city";

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

function checkValidity(city) {
  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required(),
    postalCode: Yup.string().trim().required(),
    countryId: Yup.number().required(),
  });

  try {
    validationSchema.validateSync(city, { abortEarly: false });
    return true;
  } catch (error) {
    throw Error("Missing required fields. Please check the form.");
  }
}

const cityService = {
  getEmpty() {
    return {
      id: null,
      name: "",
      postalCode: "",
      cityId: null,
    };
  },

  async getAll() {
    const response = await fetch(apiEndpoint);
    if (!response.ok) throw Error("Error fetching cities.");
    const data = await response.json();
    return data;
  },

  async save(cityToSave) {
    const city = { ...cityToSave };
    if (!checkValidity(city)) return;

    if (city.id) {
      const response = await fetch(
        `${apiEndpoint}/${city.id}`,
        putConfig(city)
      );
      if (!response.ok) {
        const text = await response.text();
        throw Error(text);
      }
      const data = await response.json();
      return data;
    }

    city.id = null;
    const response = await fetch(apiEndpoint, postConfig(city));
    if (!response.ok) {
      const text = await response.text();
      throw Error(text);
    }
    const data = await response.json();
    return data;
  },

  async delete(city) {
    const response = await fetch(`${apiEndpoint}/${city.id}`, deleteConfig());
    if (!response.ok) {
      const text = await response.text();
      throw Error(text);
    }
  },
};

export default cityService;
