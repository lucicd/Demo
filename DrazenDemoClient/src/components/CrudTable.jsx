import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";

import DeleteDialog from "./DeleteDialog";
import useHandleCrud from "./useHandleCrud";

export default function CrudTable({
  service,
  tableColumns,
  FormDialog,
  exportFilename,
  tableHeader,
  formHeader,
}) {
  const crudHandler = useHandleCrud({ service, tableHeader, formHeader });

  return (
    <div>
      <Toast ref={crudHandler.toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          start={crudHandler.leftToolbarTemplate}
          end={crudHandler.rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={crudHandler.dt}
          value={crudHandler.records}
          selection={crudHandler.selectedRecords}
          onSelectionChange={(e) => crudHandler.setSelectedRecords(e.value)}
          dataKey="id"
          emptyMessage="No records found"
          paginator
          rows={10}
          exportFilename={exportFilename || "records"}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
          globalFilter={crudHandler.globalFilter}
          header={crudHandler.tableHeaderTemplate}
        >
          <Column selectionMode="multiple" exportable={false}></Column>

          {tableColumns.map((col) => (
            <Column key={col.field} {...col} />
          ))}

          <Column
            body={crudHandler.actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <FormDialog crudHandler={crudHandler} />

      <DeleteDialog
        visible={crudHandler.deleteRecordDialog}
        hideHandler={crudHandler.hideDeleteRecordDialog}
        deleteHandler={crudHandler.deleteRecord}
        message={`Are you sure you want to delete record for ${crudHandler.record.name}?`}
      />

      <DeleteDialog
        visible={crudHandler.deleteRecordsDialog}
        hideHandler={crudHandler.hideDeleteRecordsDialog}
        deleteHandler={crudHandler.deleteSelectedRecords}
        message={`Are you sure you want to delete selected records?`}
      />
    </div>
  );
}
