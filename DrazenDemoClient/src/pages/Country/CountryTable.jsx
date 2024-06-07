import CrudTable from "../../components/CrudTable";
import { countryColumns } from "./countryColumns";
import CountryForm from "./CountryForm";

export default function CountryTable({ service }) {
  return (
    <CrudTable
      service={service}
      tableColumns={countryColumns}
      FormDialog={CountryForm}
      exportFilename="counties"
      tableHeader="Manage Countries"
    />
  );
}
