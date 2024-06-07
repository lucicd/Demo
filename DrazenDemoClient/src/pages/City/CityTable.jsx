import CrudTable from "../../components/CrudTable";
import { cityColumns } from "./cityColumns";
import CityForm from "./CityForm";

export default function CityTable({ service }) {
  return (
    <CrudTable
      service={service}
      tableColumns={cityColumns}
      FormDialog={CityForm}
      exportFilename="cities"
      tableHeader="Manage Cities"
    />
  );
}
