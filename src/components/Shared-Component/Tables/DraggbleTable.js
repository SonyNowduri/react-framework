import React from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Pagination } from '@material-ui/lab';
import { Grid, Select, Typography } from '@material-ui/core';



export const DraggbleTable = ({
    rowData, columnDefs,
    autoGroupColumnDef,
    suppressRowClickSelection,
    groupSelectsChildren,
    debug,
    rowSelection,
    rowGroupPanelShow,
    pivotPanelShow,
    enableRangeSelection,
    pagination,
    paginationPageSize,
    paginationNumberFormatter,
    onGridReady,
    onFirstDataRendered,
    rowDragManaged,
    rowDragEntireRow,
    rowDragMultiRow,
    onPaginationChanged,
    paginationGoToNextPage,
    animateRows,
    onRowDragEnd,
    onRowDragMove,
    onRowDragLeave,


    totalRecords,
    handleSize,
    rowsPerPage,
    noOfPages,
    handlePagination




}) => {


    //pageNumber
    const onChangingThePageIndex = (event, value) => {
        // setPage(value)
        console.log(value, 'value')
        handlePagination(value)
    }
    // update Size of the table
    const handleChangeRowsPerPage = (event) => {
        handleSize(event.target.value)
    }



    return (
        <>
            <div className="ag-theme-alpine" style={{ height: 500, marginTop: '20px' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}

                    autoGroupColumnDef={autoGroupColumnDef}
                    suppressRowClickSelection={suppressRowClickSelection}
                    groupSelectsChildren={groupSelectsChildren}
                    debug={debug}
                    rowSelection={rowSelection}
                    rowGroupPanelShow={rowGroupPanelShow}
                    pivotPanelShow={pivotPanelShow}
                    enableRangeSelection={enableRangeSelection}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationNumberFormatter={paginationNumberFormatter}
                    onGridReady={onGridReady}
                    onFirstDataRendered={onFirstDataRendered}
                    rowDragManaged={rowDragManaged}
                    rowDragEntireRow={rowDragEntireRow}
                    rowDragMultiRow={rowDragMultiRow}
                    onPaginationChanged={onPaginationChanged}
                    paginationGoToNextPage={paginationGoToNextPage}

                    animateRows={animateRows}
                    onRowDragEnd={onRowDragEnd}
                    onRowDragLeave={onRowDragLeave}
                    onRowDragMove={onRowDragMove}

                >
                </AgGridReact>
                <Grid container alignItems='center' style={{ height: '80px' }}>
                    <Grid item xs={6} sm={6} xl={6} md={6} lg={6} >
                        <Typography style={{ paddingLeft: '10px' }}>Total Records : {totalRecords}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} xl={6} md={6} lg={6} >
                        <Grid container justifyContent='flex-end' >
                            <Grid>
                                <Select
                                    onChange={handleChangeRowsPerPage}
                                    defaultValue={rowsPerPage}
                                >
                                    <option value="" disabled>
                                        Select
                                    </option>
                                    {[10, 25, 100].map((pageSize) => (
                                        <option key={pageSize} value={pageSize}>
                                            {pageSize}
                                        </option>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid>
                                <Pagination
                                    count={noOfPages}
                                    color="primary"
                                    onChange={onChangingThePageIndex}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    )
} 