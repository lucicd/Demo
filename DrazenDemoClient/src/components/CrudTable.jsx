import { useState, useEffect, useRef } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

import DeleteDialog from "./DeleteDialog";

export default function CrudTable({
  service,
  tableColumns,
  FormDialog,
  exportFilename,
  tableHeader,
}) {
  const [records, setRecords] = useState(null);
  const [record, setRecord] = useState(service.getEmpty());
  const [formDialogVisible, setFormDialogVisible] = useState(false);
  const [deleteRecordDialog, setDeleteRecordDialog] = useState(false);
  const [deleteRecordsDialog, setDeleteRecordsDialog] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
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

  const openNew = () => {
    setRecord(service.getEmpty());
    setSubmitted(false);
    setFormDialogVisible(true);
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
        console.log(data);
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
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: error.message,
          life: 3000,
        });
      });
  };

  const editRecord = (record) => {
    setRecord({ ...record });
    setFormDialogVisible(true);
  };

  const confirmDeleteRecord = (record) => {
    setRecord(record);
    setDeleteRecordDialog(true);
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

  const confirmDeleteSelected = () => {
    setDeleteRecordsDialog(true);
  };

  const onInputChange = (e, name) => {
    console.log("onInputChange", parseInt(e.target.value), name);
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

  const header = (
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

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          start={leftToolbarTemplate}
          end={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={records}
          selection={selectedRecords}
          onSelectionChange={(e) => setSelectedRecords(e.value)}
          dataKey="id"
          emptyMessage="No records found"
          paginator
          rows={10}
          exportFilename={exportFilename || "records"}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
          globalFilter={globalFilter}
          header={header}
        >
          <Column selectionMode="multiple" exportable={false}></Column>

          {tableColumns.map((col) => (
            <Column key={col.field} {...col} />
          ))}

          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <FormDialog
        visible={formDialogVisible}
        hideDialog={hideDialog}
        record={record}
        onInputChange={onInputChange}
        submitted={submitted}
        saveRecord={saveRecord}
      />

      <DeleteDialog
        visible={deleteRecordDialog}
        hideHandler={hideDeleteRecordDialog}
        deleteHandler={deleteRecord}
        message={`Are you sure you want to delete record for ${record.name}?`}
      />

      <DeleteDialog
        visible={deleteRecordsDialog}
        hideHandler={hideDeleteRecordsDialog}
        deleteHandler={deleteSelectedRecords}
        message={`Are you sure you want to delete selected records?`}
      />
    </div>
  );
}
