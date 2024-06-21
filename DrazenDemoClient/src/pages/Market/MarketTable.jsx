import { useEffect, useState, useRef, useCallback } from "react";
import { useErrorBoundary } from "react-error-boundary";

import marketService from "../Market/marketService";

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

const marketColumns = [
  {
    field: "code",
    header: "Code",
    sortable: true,
    style: { minWidth: "6rem" },
  },
  {
    field: "name",
    header: "Name",
    sortable: true,
    style: { minWidth: "12rem" },
  },
];

function MarketForm({ marketHandler }) {
  const formContent = (
    <Panel header={marketHandler.formHeaderTemplate}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <TextField
          name="code"
          label="Code"
          value={marketHandler.market?.code}
          onChange={marketHandler.onInputChange}
          submitted={marketHandler.submitted}
          maxLength={5}
          width="6rem"
          required
          autoFocus
        />

        <TextField
          name="name"
          label="Name"
          value={marketHandler.market?.name}
          onChange={marketHandler.onInputChange}
          submitted={marketHandler.submitted}
          maxLength={50}
          required
        />

        <div className="flex gap-2 justify-content-center">
          <Button
            type="submit"
            label="Save"
            icon="pi pi-check"
            onClick={marketHandler.saveMarket}
            style={{ maxWidth: "8rem" }}
          />
          <Button
            label="Cancel"
            icon="pi pi-times"
            outlined
            onClick={marketHandler.hideMarketDialog}
            style={{ maxWidth: "8rem" }}
          />
        </div>
      </form>
    </Panel>
  );

  return (
    <Dialog
      visible={marketHandler.formDialogVisible}
      modal
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      className="p-fluid"
      onHide={marketHandler.hideMarketDialog}
      closeOnEscape={true}
      focusOnShow={false}
      content={formContent}
    />
  );
}

function useMarketTable() {
  const [market, setMarket] = useState(marketService.getEmpty());
  const [markets, setMarkets] = useState([]);
  const [deleteMarketDialog, setDeleteMarketDialog] = useState(false);
  const [formDialogVisible, setFormDialogVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const { showBoundary } = useErrorBoundary();

  const getAllMarkets = useCallback(() => {
    marketService
      .getAll()
      .then((data) => setMarkets(data))
      .catch((error) => {
        showBoundary(error);
      });
  }, [showBoundary]);

  useEffect(() => {
    getAllMarkets();
  }, [getAllMarkets]);

  const hideMarketDialog = () => {
    setSubmitted(false);
    setFormDialogVisible(false);
  };

  const hideDeleteMarketDialog = () => {
    setDeleteMarketDialog(false);
  };

  const confirmDeleteMarket = (market) => {
    setMarket(market);
    setDeleteMarketDialog(true);
  };

  const openNew = () => {
    setMarket(marketService.getEmpty());
    setSubmitted(false);
    setFormDialogVisible(true);
  };

  const editMarket = (market) => {
    setMarket({ ...market });
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
          onClick={() => editMarket(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteMarket(rowData)}
        />
      </>
    );
  };

  const tableHeaderTemplate = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h3 className="m-0">Manage Markets</h3>
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
        {market?.id === null ? "Edit Market" : "New Market"}
      </h3>
    </div>
  );

  const saveMarket = () => {
    setSubmitted(true);
    marketService
      .save(market)
      .then((data) => {
        getAllMarkets();
        setFormDialogVisible(false);
        if (data.id) {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Market updated.",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Market created.",
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

  const deleteMarket = () => {
    marketService
      .delete(market)
      .then(() => {
        setMarket(marketService.getEmpty());
        getAllMarkets();
        setDeleteMarketDialog(false);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Market deleted.",
          life: 3000,
        });
      })
      .catch((error) => {
        setMarket(marketService.getEmpty());
        setDeleteMarketDialog(false);
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
    let myMarket = { ...market };
    myMarket[`${name}`] = val;
    setMarket(myMarket);
  };

  return {
    market,
    markets,
    deleteMarketDialog,
    formDialogVisible,
    submitted,
    toast,
    dt,
    globalFilter,
    hideMarketDialog,
    hideDeleteMarketDialog,
    saveMarket,
    deleteMarket,
    onInputChange,
    leftToolbarTemplate,
    rightToolbarTemplate,
    actionBodyTemplate,
    tableHeaderTemplate,
    formHeaderTemplate,
  };
}

export default function MarketTable() {
  const marketHandler = useMarketTable();

  return (
    <div>
      <Toast ref={marketHandler.toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          start={marketHandler.leftToolbarTemplate}
          end={marketHandler.rightToolbarTemplate}
        />

        <DataTable
          ref={marketHandler.dt}
          value={marketHandler.markets}
          dataKey="id"
          emptyMessage="No records found"
          paginator
          rows={10}
          exportFilename="markets"
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
          globalFilter={marketHandler.globalFilter}
          header={marketHandler.tableHeaderTemplate}
        >
          {marketColumns.map((col) => (
            <Column key={col.field} {...col} />
          ))}

          <Column
            body={marketHandler.actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          />
        </DataTable>
      </div>

      <MarketForm marketHandler={marketHandler} />

      <DeleteDialog
        visible={marketHandler.deleteMarketDialog}
        hideHandler={marketHandler.hideDeleteMarketDialog}
        deleteHandler={marketHandler.deleteMarket}
        message={`Are you sure you want to delete market ${marketHandler.market?.name}?`}
      />
    </div>
  );
}
