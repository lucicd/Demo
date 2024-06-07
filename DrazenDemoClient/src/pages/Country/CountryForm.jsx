import TextField from "../../components/TextField";
import FormDialog from "../../components/FormDialog";

export default function CountryForm({
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
      header="Country Details"
    >
      <TextField
        name="code"
        label="Code"
        value={record.code}
        onChange={onInputChange}
        submitted={submitted}
        maxLength={2}
        width="4rem"
        required
        autoFocus
      />

      <TextField
        name="name"
        label="Name"
        value={record.name}
        onChange={onInputChange}
        submitted={submitted}
        maxLength={50}
        required
      />
    </FormDialog>
  );
}
