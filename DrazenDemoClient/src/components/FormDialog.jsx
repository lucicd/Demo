import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";

export default function FormDialog({ crudHandler, children }) {
  return (
    <Dialog
      visible={crudHandler.formDialogVisible}
      modal
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      className="p-fluid"
      onHide={crudHandler.hideDialog}
      closeOnEscape={true}
      focusOnShow={false}
      content={
        <Panel header={crudHandler.formHeaderTemplate}>
          {children}
          <div className="flex gap-2 justify-content-center">
            <Button
              label="Save"
              icon="pi pi-check"
              onClick={crudHandler.saveRecord}
              style={{ maxWidth: "8rem" }}
            />
            <Button
              label="Cancel"
              icon="pi pi-times"
              outlined
              onClick={crudHandler.hideDialog}
              style={{ maxWidth: "8rem" }}
            />
          </div>
        </Panel>
      }
    ></Dialog>
  );
}
