import * as Yup from "yup";
import createService from "../../helpers/serviceHelpers";

const apiEndpoint = "/api/city";

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required(),
  postalCode: Yup.string().trim().required(),
  countryId: Yup.number().required(),
});

const emptyItem = {
  id: null,
  name: "",
  postalCode: "",
  countryId: null,
};

const getAllErrorMessage = "Error fetching cities.";
const putErrorMessage = "Error saving edited city.";
const postErrorMessage = "Error saving new city.";
const deleteErrorMessage = "Error deleting city.";

export const cityService = createService(
  apiEndpoint,
  emptyItem,
  validationSchema,
  getAllErrorMessage,
  putErrorMessage,
  postErrorMessage,
  deleteErrorMessage
);
