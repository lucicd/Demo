import { useState, useRef, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

export default function useHandleCrud({ service, tableHeader, formHeader }) {
  const [record, setRecord] = useState(service.getEmpty());
  const [records, setRecords] = useState(null);
  const [deleteRecordDialog, setDeleteRecordDialog] = useState(false);
  const [formDialogVisible, setFormDialogVisible] = useState(false);
  const [deleteRecordsDialog, setDeleteRecordsDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const dt = useRef(null);
  const toast = useRef(null);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    service.getAll().then(
      (data) => {
        setRecords(data);
      },
      (error) => {
        showBoundary(error);
      }
    );
  }, [service, showBoundary]);

  const confirmDeleteRecord = (record) => {
    setRecord(record);
    setDeleteRecordDialog(true);
  };

  const openNew = () => {
    setRecord(service.getEmpty());
    setSubmitted(false);
    setFormDialogVisible(true);
  };

  const editRecord = (record) => {
    setRecord({ ...record });
    setFormDialogVisible(true);
  };

  const deleteSelectedRecords = () => {
    service
      .deleteSelected(records, selectedRecords)
      .then((data) => {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Records Deleted",
          life: 3000,
        });
        setRecords(data);
        setDeleteRecordsDialog(false);
        setSelectedRecords(null);
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: error.message,
          life: 3000,
        });
      });
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const hideDialog = () => {
    setSubmitted(false);
    setFormDialogVisible(false);
  };

  const hideDeleteRecordDialog = () => {
    setDeleteRecordDialog(false);
  };

  const hideDeleteRecordsDialog = () => {
    setDeleteRecordsDialog(false);
  };

  const saveRecord = () => {
    setSubmitted(true);
    service
      .save(records, record)
      .then((data) => {
        if (record.id) {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Record Updated",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Record Created",
            life: 3000,
          });
        }
        setRecords(data);
        setFormDialogVisible(false);
      })
      .catch((error) => {
        console.log("useHandleCrud - Error:", error);
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: error.message,
          life: 3000,
        });
      });
  };

  const deleteRecord = () => {
    service
      .delete(records, record)
      .then((data) => {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Record Deleted",
          life: 3000,
        });
        setRecords(data);
        setDeleteRecordDialog(false);
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: error.message,
          life: 3000,
        });
      });
  };

  const confirmDeleteSelected = () => {
    setDeleteRecordsDialog(true);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _record = { ...record };

    _record[`${name}`] = val;

    setRecord(_record);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedRecords || !selectedRecords.length}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editRecord(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteRecord(rowData)}
        />
      </>
    );
  };

  const tableHeaderTemplate = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h3 className="m-0">{tableHeader}</h3>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </IconField>
    </div>
  );

  const formHeaderTemplate = (
    <div className="flex justify-content-between align-items-center">
      <h3 className="m-0">
        {record.id === null ? `New ${formHeader}` : `Edit ${formHeader}`}
      </h3>
    </div>
  );

  return {
    record,
    setRecord,
    records,
    deleteRecordDialog,
    formDialogVisible,
    deleteRecordsDialog,
    setDeleteRecordsDialog,
    submitted,
    selectedRecords,
    setSelectedRecords,
    deleteSelectedRecords,
    toast,
    dt,
    globalFilter,
    hideDialog,
    hideDeleteRecordDialog,
    hideDeleteRecordsDialog,
    saveRecord,
    deleteRecord,
    onInputChange,
    leftToolbarTemplate,
    rightToolbarTemplate,
    actionBodyTemplate,
    tableHeaderTemplate,
    formHeaderTemplate,
  };
}
