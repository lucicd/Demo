import TextField from "../../components/TextField";
import FormDialog from "../../components/FormDialog";
import DropdownField from "../../components/DropdownField";

const countries = [
  { countryId: 1, name: "Croatia" },
  { countryId: 2, name: "United Arab Emirates" },
  { countryId: 3, name: "United States" },
  { countryId: 4, name: "Canada" },
  { countryId: 5, name: "Mexico" },
  { countryId: 6, name: "Germany" },
  { countryId: 7, name: "France" },
  { countryId: 8, name: "United Kingdom" },
  { countryId: 9, name: "Japan" },
  { countryId: 10, name: "Australia" },
  { countryId: 11, name: "Brazil" },
  { countryId: 12, name: "Italy" },
  { countryId: 13, name: "India" },
];

export default function CityForm({
  visible,
  hideDialog,
  record,
  onInputChange,
  submitted,
  saveRecord,
}) {
  return (
    <FormDialog
      visible={visible}
      hideDialog={hideDialog}
      saveRecord={saveRecord}
      header="City Details"
    >
      <TextField
        name="name"
        label="Name"
        value={record.name}
        onChange={onInputChange}
        submitted={submitted}
        maxLength={50}
        required
        autoFocus
      />

      <TextField
        name="postalCode"
        label="Postal Code"
        value={record.postalCode}
        onChange={onInputChange}
        submitted={submitted}
        maxLength={15}
        required
      />

      <DropdownField
        name="countryId"
        label="Country"
        value={record.countryId}
        onChange={onInputChange}
        submitted={submitted}
        maxLength={50}
        required
        optionLabel="name"
        optionValue="countryId"
        options={countries}
      />
    </FormDialog>
  );
}
