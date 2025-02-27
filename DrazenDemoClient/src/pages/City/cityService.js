import * as Yup from "yup";
import * as http from "../../utils/serviceHelpers";

const apiEndpoint = "/api/cities";

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
    const response = await fetch(apiEndpoint, http.getConfig());
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
        http.putConfig(city)
      );
      if (!response.ok) {
        const text = await response.text();
        throw Error(text);
      }
      const data = await response.json();
      return data;
    }

    city.id = null;
    const response = await fetch(apiEndpoint, http.postConfig(city));
    if (!response.ok) {
      const text = await response.text();
      throw Error(text);
    }
    const data = await response.json();
    return data;
  },

  async delete(city) {
    const response = await fetch(
      `${apiEndpoint}/${city.id}`,
      http.deleteConfig()
    );
    if (!response.ok) {
      const text = await response.text();
      throw Error(text);
    }
  },
};

export default cityService;
