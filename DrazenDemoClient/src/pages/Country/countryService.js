import * as Yup from "yup";
import createService from "../../helpers/serviceHelpers";

const apiEndpoint = "/api/country";

const validationSchema = Yup.object().shape({
  code: Yup.string().trim().required(),
  name: Yup.string().trim().required(),
});

const emptyItem = {
  id: null,
  code: "",
  name: "",
};

const getAllErrorMessage = "Error fetching countries.";
const putErrorMessage = "Error saving edited country.";
const postErrorMessage = "Error saving new country.";
const deleteErrorMessage = "Error deleting country.";

export const countryService = createService(
  apiEndpoint,
  emptyItem,
  validationSchema,
  getAllErrorMessage,
  putErrorMessage,
  postErrorMessage,
  deleteErrorMessage
);
