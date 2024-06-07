import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export default function DeleteDialog({
  visible,
  hideHandler,
  deleteHandler,
  message,
}) {
  const deleteDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" outlined onClick={hideHandler} />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteHandler}
      />
    </>
  );

  return (
    <Dialog
      visible={visible}
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header="Confirm"
      modal
      footer={deleteDialogFooter}
      onHide={hideHandler}
    >
      <div className="confirmation-content">
        <i
          className="pi pi-exclamation-triangle mr-3"
          style={{ fontSize: "2rem" }}
        />
        {message}
      </div>
    </Dialog>
  );
}
