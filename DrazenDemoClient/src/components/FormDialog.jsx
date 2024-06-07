import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";

export default function FormDialog({
  visible,
  hideDialog,
  saveRecord,
  header,
  children,
}) {
  return (
    <Dialog
      visible={visible}
      modal
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      className="p-fluid"
      onHide={hideDialog}
      closeOnEscape={true}
      focusOnShow={false}
      content={
        <Panel header={header}>
          {children}
          <div className="flex gap-2 justify-content-center">
            <Button
              label="Save"
              icon="pi pi-check"
              onClick={saveRecord}
              style={{ maxWidth: "8rem" }}
            />
            <Button
              label="Cancel"
              icon="pi pi-times"
              outlined
              onClick={hideDialog}
              style={{ maxWidth: "8rem" }}
            />
          </div>
        </Panel>
      }
    ></Dialog>
  );
}
