import { AgGridReact } from 'ag-grid-react';

// import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Grid = ({ rowData, columnDefs, sideBar, style, ...props }) => {
  const defaultSideBar = {
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
    <div className="ag-theme-alpine" style={{ height: '100%', width: '100%', ...style }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection="multiple"
        sideBar={sideBar || defaultSideBar}
        rowGroupPanelShow={'onlyWhenGrouping'}
        {...props}>
      </AgGridReact>
    </div>

  )
}

export default Grid