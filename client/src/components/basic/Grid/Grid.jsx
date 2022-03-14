import { forwardRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

// import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './Grid.css'

const Grid = forwardRef((props, ref) => {
  const { rowData, columnDefs, style, ...restProps } = props;
  const defaultSideBar = useMemo(() => ({
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
  }), [])

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
  }), [])

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%', ...style }} >
        <AgGridReact
          ref={ref}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="multiple"
          cellSelection="none"
          sideBar={defaultSideBar}
          rowGroupPanelShow={'onlyWhenGrouping'}
          defaultColDef={defaultColDef}
          rowClass={params => 'my-grid'}
          {...restProps}>
        </AgGridReact>
      </div >
    </>
  )
})

export default Grid