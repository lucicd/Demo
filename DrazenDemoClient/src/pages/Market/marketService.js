import * as Yup from "yup";
import * as http from "../../utils/serviceHelpers";

const apiEndpoint = "/api/markets";

function checkValidity(market) {
  const validationSchema = Yup.object().shape({
    code: Yup.string().trim().required(),
    name: Yup.string().trim().required(),
  });

  try {
    validationSchema.validateSync(market, { abortEarly: false });
    return true;
  } catch (error) {
    throw Error("Missing required fields. Please check the form.");
  }
}

const marketService = {
  getEmpty() {
    return {
      id: null,
      code: "",
      name: "",
    };
  },

  async getAll() {
    const response = await fetch(apiEndpoint);
    if (!response.ok) throw Error("Error fetching markets.");
    const data = await response.json();
    return data;
  },

  async save(marketToSave) {
    const market = { ...marketToSave };
    if (!checkValidity(market)) return;

    if (market.id) {
      const response = await fetch(
        `${apiEndpoint}/${market.id}`,
        http.putConfig(market)
      );
      if (!response.ok) {
        const text = await response.text();
        throw Error(text);
      }
      const data = await response.json();
      return data;
    }

    market.id = null;
    const response = await fetch(apiEndpoint, http.postConfig(market));
    if (!response.ok) {
      const text = await response.text();
      throw Error(text);
    }
    const data = await response.json();
    return data;
  },

  async delete(market) {
    const response = await fetch(
      `${apiEndpoint}/${market.id}`,
      http.deleteConfig()
    );
    if (!response.ok) {
      const text = await response.text();
      throw Error(text);
    }
  },
};

export default marketService;
