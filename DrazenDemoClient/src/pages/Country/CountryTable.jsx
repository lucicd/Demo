import { useEffect, useState, useRef, useCallback } from "react";
import { useErrorBoundary } from "react-error-boundary";

import countryService from "./countryService";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Panel } from "primereact/panel";

import DeleteDialog from "../../components/DeleteDialog";
import TextField from "../../components/TextField";

const countryColumns = [
  {
    field: "code",
    header: "Code",
    sortable: true,
    style: { minWidth: "4rem" },
  },
  {
    field: "name",
    header: "Name",
    sortable: true,
    style: { minWidth: "12rem" },
  },
];

function CountryForm({ countryHandler }) {
  const formContent = (
    <Panel header={countryHandler.formHeaderTemplate}>
      <TextField
        name="code"
        label="Code"
        value={countryHandler.country?.code}
        onChange={countryHandler.onInputChange}
        submitted={countryHandler.submitted}
        maxLength={2}
        width="4rem"
        required
        autoFocus
      />

      <TextField
        name="name"
        label="Name"
        value={countryHandler.country?.name}
        onChange={countryHandler.onInputChange}
        submitted={countryHandler.submitted}
        maxLength={50}
        required
      />

      <div className="flex gap-2 justify-content-center">
        <Button
          label="Save"
          icon="pi pi-check"
          onClick={countryHandler.saveCountry}
          style={{ maxWidth: "8rem" }}
        />
        <Button
          label="Cancel"
          icon="pi pi-times"
          outlined
          onClick={countryHandler.hideCountryDialog}
          style={{ maxWidth: "8rem" }}
        />
      </div>
    </Panel>
  );

  return (
    <Dialog
      visible={countryHandler.formDialogVisible}
      modal
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      className="p-fluid"
      onHide={countryHandler.hideCountryDialog}
      closeOnEscape={true}
      focusOnShow={false}
      content={formContent}
    />
  );
}

function useCountryTable() {
  const [country, setCountry] = useState(countryService.getEmpty());
  const [countries, setCountries] = useState(null);
  const [deleteCountryDialog, setDeleteCountryDialog] = useState(false);
  const [formDialogVisible, setFormDialogVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const { showBoundary } = useErrorBoundary();

  const getAllCountries = useCallback(() => {
    countryService
      .getAll()
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        showBoundary(error);
      });
  }, [showBoundary]);

  useEffect(() => {
    getAllCountries();
  }, [getAllCountries]);

  const hideCountryDialog = () => {
    setSubmitted(false);
    setFormDialogVisible(false);
  };

  const hideDeleteCountryDialog = () => {
    setDeleteCountryDialog(false);
  };

  const confirmDeleteCountry = (country) => {
    setCountry(country);
    setDeleteCountryDialog(true);
  };

  const openNew = () => {
    setCountry(countryService.getEmpty());
    setSubmitted(false);
    setFormDialogVisible(true);
  };

  const editCountry = (country) => {
    setCountry({ ...country });
    setFormDialogVisible(true);
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
          onClick={() => editCountry(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteCountry(rowData)}
        />
      </>
    );
  };

  const tableHeaderTemplate = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h3 className="m-0">Manage Countries</h3>
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
        {country?.id === null ? "New Country" : "Edit Country"}
      </h3>
    </div>
  );

  const saveCountry = () => {
    setSubmitted(true);
    countryService
      .save(country)
      .then((data) => {
        getAllCountries();
        setFormDialogVisible(false);
        if (data.id) {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Country updated.",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Country created.",
            life: 3000,
          });
        }
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

  const deleteCountry = () => {
    countryService
      .delete(country)
      .then(() => {
        setCountry(countryService.getEmpty());
        getAllCountries();
        setDeleteCountryDialog(false);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Country deleted.",
          life: 3000,
        });
      })
      .catch((error) => {
        setCountry(countryService.getEmpty());
        setDeleteCountryDialog(false);
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

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let myCountry = { ...country };
    myCountry[`${name}`] = val;
    setCountry(myCountry);
  };

  return {
    country,
    setCountry,
    countries,
    deleteCountryDialog,
    formDialogVisible,
    submitted,
    toast,
    dt,
    globalFilter,
    hideCountryDialog,
    hideDeleteCountryDialog,
    saveCountry,
    deleteCountry,
    onInputChange,
    leftToolbarTemplate,
    rightToolbarTemplate,
    actionBodyTemplate,
    tableHeaderTemplate,
    formHeaderTemplate,
  };
}

export default function CountryTable() {
  const countryHandler = useCountryTable();

  return (
    <div>
      <Toast ref={countryHandler.toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          start={countryHandler.leftToolbarTemplate}
          end={countryHandler.rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={countryHandler.dt}
          value={countryHandler.countries}
          selection={countryHandler.selectedCountries}
          onSelectionChange={(e) =>
            countryHandler.setSelectedCountries(e.value)
          }
          dataKey="id"
          emptyMessage="No records found"
          paginator
          rows={10}
          exportFilename="countries"
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
          globalFilter={countryHandler.globalFilter}
          header={countryHandler.tableHeaderTemplate}
        >
          {countryColumns.map((col) => (
            <Column key={col.field} {...col} />
          ))}

          <Column
            body={countryHandler.actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <CountryForm countryHandler={countryHandler} />

      <DeleteDialog
        visible={countryHandler.deleteCountryDialog}
        hideHandler={countryHandler.hideDeleteCountryDialog}
        deleteHandler={countryHandler.deleteCountry}
        message={`Are you sure you want to delete country ${countryHandler.country?.name}?`}
      />
    </div>
  );
}
