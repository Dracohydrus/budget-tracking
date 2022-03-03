import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Grid = () => {
  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    { field: "make", sortable: true, filter: true, resizable: true, enableRowGroup: true },
    { field: "model", sortable: true, filter: true, resizable: true, enableRowGroup: true },
    { field: "price", sortable: true, filter: true, resizable: true }
  ]);

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then(result => result.json())
      .then(rowData => setRowData(rowData))
  }, [])

  const sideBar = {
    toolPanels: [{
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
      minWidth: 225,
      maxWidth: 225,
      width: 225
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel',
      minWidth: 180,
      maxWidth: 400,
      width: 250
    }],
    position: 'right',
    defaultToolPanel: 'none'
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 700 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection="multiple"
        sideBar={sideBar}
        rowGroupPanelShow={'onlyWhenGrouping'}>
      </AgGridReact>
    </div>

  )
}

export default Grid