import { useEffect, useState, useRef, useCallback } from "react";
import { useErrorBoundary } from "react-error-boundary";

import cityService from "./cityService";
import countryService from "../Country/countryService";

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
// import { Dropdown } from "primereact/dropdown";

import DeleteDialog from "../../components/DeleteDialog";
import TextField from "../../components/TextField";
import DropdownField from "../../components/DropdownField";

const cityColumns = [
  {
    field: "name",
    header: "Name",
    sortable: true,
    style: { minWidth: "12rem" },
  },
  {
    field: "postalCode",
    header: "Postal Code",
    sortable: true,
    style: { minWidth: "6rem" },
  },
  {
    field: "country.name",
    header: "Country",
    sortable: true,
    style: { minWidth: "12rem" },
  },
];

function CityForm({ cityHandler }) {
  const formContent = (
    <Panel header={cityHandler.formHeaderTemplate}>
      <TextField
        name="name"
        label="Name"
        value={cityHandler.city?.name}
        onChange={cityHandler.onInputChange}
        submitted={cityHandler.submitted}
        maxLength={50}
        required
        autoFocus
      />

      <TextField
        name="postalCode"
        label="Postal Code"
        value={cityHandler.city?.postalCode}
        onChange={cityHandler.onInputChange}
        submitted={cityHandler.submitted}
        maxLength={15}
        width="6rem"
        required
      />

      <DropdownField
        name="countryId"
        label="Country"
        value={cityHandler.city?.countryId}
        onChange={cityHandler.onInputChange}
        submitted={cityHandler.submitted}
        maxLength={50}
        required
        optionLabel="name"
        optionValue="id"
        placeholder="Select a Country"
        options={cityHandler.countries}
        filterBy="name"
      />

      <div className="flex gap-2 justify-content-center">
        <Button
          label="Save"
          icon="pi pi-check"
          onClick={cityHandler.saveCity}
          style={{ maxWidth: "8rem" }}
        />
        <Button
          label="Cancel"
          icon="pi pi-times"
          outlined
          onClick={cityHandler.hideCityDialog}
          style={{ maxWidth: "8rem" }}
        />
      </div>
    </Panel>
  );

  return (
    <Dialog
      visible={cityHandler.formDialogVisible}
      modal
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      className="p-fluid"
      onHide={cityHandler.hideCityDialog}
      closeOnEscape={true}
      focusOnShow={false}
      content={formContent}
    />
  );
}

function useCityTable() {
  const [city, setCity] = useState(cityService.getEmpty());
  const [cities, setCities] = useState(null);
  const [countries, setCountries] = useState(null);
  const [deleteCityDialog, setDeleteCityDialog] = useState(false);
  const [formDialogVisible, setFormDialogVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const { showBoundary } = useErrorBoundary();

  const getAllCities = useCallback(() => {
    cityService
      .getAll()
      .then((data) => {
        setCities(data);
      })
      .catch((error) => {
        showBoundary(error);
      });
  }, [showBoundary]);

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
    getAllCities();
    getAllCountries();
  }, [getAllCities, getAllCountries]);

  const hideCityDialog = () => {
    setSubmitted(false);
    setFormDialogVisible(false);
  };

  const hideDeleteCityDialog = () => {
    setDeleteCityDialog(false);
  };

  const confirmDeleteCity = (city) => {
    setCity(city);
    setDeleteCityDialog(true);
  };

  const openNew = () => {
    setCity(cityService.getEmpty());
    setSubmitted(false);
    setFormDialogVisible(true);
  };

  const editCity = (city) => {
    setCity({ ...city });
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
          onClick={() => editCity(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteCity(rowData)}
        />
      </>
    );
  };

  const tableHeaderTemplate = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h3 className="m-0">Manage Cities</h3>
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
      <h3 className="m-0">{city?.id === null ? "New City" : "Edit City"}</h3>
    </div>
  );

  const saveCity = () => {
    setSubmitted(true);
    const myCity = { ...city, country: null };
    cityService
      .save(myCity)
      .then((data) => {
        getAllCities();
        setFormDialogVisible(false);
        if (data.id) {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "City updated.",
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

  const deleteCity = () => {
    cityService
      .delete(city)
      .then(() => {
        setCity(cityService.getEmpty());
        getAllCities();
        setDeleteCityDialog(false);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "City deleted.",
          life: 3000,
        });
      })
      .catch((error) => {
        setCity(cityService.getEmpty());
        setDeleteCityDialog(false);
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
    let myCity = { ...city };
    myCity[`${name}`] = val;
    setCity(myCity);
  };

  return {
    city,
    setCity,
    cities,
    countries,
    deleteCityDialog,
    formDialogVisible,
    submitted,
    toast,
    dt,
    globalFilter,
    hideCityDialog,
    hideDeleteCityDialog,
    saveCity,
    deleteCity,
    onInputChange,
    leftToolbarTemplate,
    rightToolbarTemplate,
    actionBodyTemplate,
    tableHeaderTemplate,
    formHeaderTemplate,
  };
}

export default function CityTable() {
  const cityHandler = useCityTable();

  return (
    <div>
      <Toast ref={cityHandler.toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          start={cityHandler.leftToolbarTemplate}
          end={cityHandler.rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={cityHandler.dt}
          value={cityHandler.cities}
          selection={cityHandler.selectedCities}
          onSelectionChange={(e) => cityHandler.setSelectedCities(e.value)}
          dataKey="id"
          emptyMessage="No records found"
          paginator
          rows={10}
          exportFilename="cities"
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
          globalFilter={cityHandler.globalFilter}
          header={cityHandler.tableHeaderTemplate}
        >
          {cityColumns.map((col) => (
            <Column key={col.field} {...col} />
          ))}

          <Column
            body={cityHandler.actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <CityForm cityHandler={cityHandler} />

      <DeleteDialog
        visible={cityHandler.deleteCityDialog}
        hideHandler={cityHandler.hideDeleteCityDialog}
        deleteHandler={cityHandler.deleteCity}
        message={`Are you sure you want to delete city ${cityHandler.city?.postalCode} ${cityHandler.city?.name}?`}
      />
    </div>
  );
}
