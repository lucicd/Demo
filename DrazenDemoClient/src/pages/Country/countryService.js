import * as Yup from "yup";
import * as http from "../../utils/serviceHelpers";

const apiEndpoint = "/api/countries";

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
    const response = await fetch(apiEndpoint, http.getConfig());
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
        http.putConfig(country)
      );
      if (!response.ok) {
        const text = await response.text();
        throw Error(text);
      }
      const data = await response.json();
      return data;
    }

    country.id = null;
    const response = await fetch(apiEndpoint, http.postConfig(country));
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
      http.deleteConfig()
    );
    if (!response.ok) {
      const text = await response.text();
      throw Error(text);
    }
  },
};

export default countryService;
