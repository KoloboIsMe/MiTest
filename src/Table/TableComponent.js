import React, { Fragment, useState } from "react";
import { ReactComponent as DragIcon } from "./icons/drag.svg";
import {
    useTable,
    useSortBy,
    useFilters,
    useGlobalFilter,
    usePagination,
    useBlockLayout,
    useRowSelect,
    useColumnOrder,
    useResizeColumns
} from "react-table";
import { Styles, BlockStyles } from "./TableStyle";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import {
    GlobalFilterComponent,
    DefaultColumnFilterComponent,
    SelectColumnFilterComponent,
    SliderColumnFilterComponent,
    NumberRangeColumnFilterComponent,
    IndeterminateCheckboxComponent
} from "./Components";

import {
    fuzzyTextFilterFn,
    globalFilterFunction,
    numberFilterFunction,
    textFilterFunction,
    numberSort,
    stringSort
} from "./Functions";

function TableComponent({ columns, data, parentprops, columnOrderArray }) {
    const [filterToggle, setfilterToggle] = useState(false);
    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilterComponent
        }),
        []
    );

    const sortTypes = React.useMemo(
        () => ({
            numberSort: numberSort,
            stringSort: stringSort
        }),
        []
    );

    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            text: textFilterFunction,
            number: numberFilterFunction,
            global: parentprops.globalFilterFunction
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        preGlobalFilteredRows,
        setGlobalFilter,
        prepareRow,
        setColumnOrder,
        state,
        state: { pageIndex, pageSize, selectedRowIds, sortby },
        page,
        canNextPage,
        canPerviousPage,
        nextPage,
        previousPage,
        setPageSize,
        gotoPage,
        flatHeaders,
        selectedFlatRows
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: { pageIndex: 0 },
            filterTypes,
            sortTypes,
            getRowId: React.useCallback(row => row.id, []),
            globalFilter: "global",
            manualSorting: true
        },
        useGlobalFilter,
        useFilters,
        useSortBy,
        usePagination,
        useBlockLayout,
        useResizeColumns,
        useRowSelect,
        useColumnOrder,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: "selection",
                    width: 50,
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <Fragment>
                            <IndeterminateCheckboxComponent
                                {...getToggleAllRowsSelectedProps()}
                            />
                        </Fragment>
                    ),
                    Cell: ({ row }) => (
                        <Fragment>
                            <IndeterminateCheckboxComponent
                                {...row.getToggleRowSelectedProps()}
                            />
                        </Fragment>
                    )
                },
                ...columns
            ]);
        }
    );

    const currentColOrder = React.useRef();

    const ColumnDragStart = () => {
        currentColOrder.current = flatHeaders.map(i => i.id);
    };

    const columnDragUpdate = (DragUpdateObj, b) => {
        const colOrder = [...currentColOrder.current];
        const sIndex = DragUpdateObj.source.index;
        const dIndex = DragUpdateObj.destination && DragUpdateObj.destination.index;

        if (typeof sIndex === "number" && typeof dIndex === "number") {
            colOrder.splice(sIndex, 1);
            colOrder.splice(dIndex, 0, DragUpdateObj.draggableId);
            setColumnOrder(colOrder);
        }
    };

    const getItemStyle = ({ isDragging, isDropAnimating }, draggableStyle) => ({
        ...draggableStyle,
        // some basic styles to make the items look a bit nicer
        userSelect: "none",

        // change background colour if dragging
        background: isDragging ? "#fff8ee" : "#dee2e6",

        ...(!isDragging && { transform: "translate(0,0)" }),
        ...(isDropAnimating && { transitionDuration: "0.001s" })

        // styles we need to apply on draggables
    });

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid black"
                }}
            >
                <GlobalFilterComponent
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    setGlobalFilter={setGlobalFilter}
                    globalFilter={state.globalFilter}
                />
                <button onClick={() => setfilterToggle(state => !state)}>
                    Search individual
                </button>
            </div>
            <BlockStyles>
                <div {...getTableProps()} className="table">
                    <div>
                        {headerGroups.map((headerGroup, i) => (
                            <DragDropContext
                                onDragStart={ColumnDragStart}
                                onDragUpdate={columnDragUpdate}
                            >
                                <Droppable droppableId="columnDropable" direction="horizontal">
                                    {dropppableProvided => (
                                        <div
                                            {...headerGroup.getHeaderGroupProps()}
                                            ref={dropppableProvided.innerRef}
                                        >
                                            {headerGroup.headers.map((column, index) => (
                                                <Draggable
                                                    key={column.id}
                                                    draggableId={column.id}
                                                    index={index}
                                                    isDragDisabled={!column.accessor}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div {...column.getHeaderProps()} className="th">
                                                            <div
                                                                {...provided.draggableProps}
                                                                ref={provided.innerRef}
                                                                style={{
                                                                    ...getItemStyle(
                                                                        snapshot,
                                                                        provided.draggableProps.style
                                                                    )
                                                                }}
                                                            >
                                                                <div className="th">
                                                                    <div style={{ display: "flex" }}>
                                                                        <div
                                                                            style={{ paddingRight: "3px" }}
                                                                            {...provided.dragHandleProps}
                                                                        >
                                                                            <DragIcon />
                                                                        </div>
                                                                        <div style={{ display: "flex" }}>
                                                                            <div {...column.getSortByToggleProps()}>
                                                                                {column.render("Header")}
                                                                            </div>
                                                                            <div>
                                                                                {column.isSorted ? (
                                                                                    column.isSortedDesc ? (
                                                                                        <>&darr;</>
                                                                                    ) : (
                                                                                        <>&uarr;</>
                                                                                    )
                                                                                ) : (
                                                                                    ""
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            {...column.getResizerProps()}
                                                                            className={`resizer ${
                                                                                column.isResizing ? "isResizing" : ""
                                                                            }`}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {filterToggle ? (
                                                                <div>
                                                                    {column.canFilter
                                                                        ? column.render("Filter")
                                                                        : null}
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        ))}
                    </div>
                    <div {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <div {...row.getRowProps()} className="tr">
                                    {row.cells.map((cell, i) => {
                                        return (
                                            <div {...cell.getCellProps()} className="td">
                                                {cell.render("Cell")}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </BlockStyles>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={() => previousPage()} disabled={!canPerviousPage}>
                    Previous
                </button>
                <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                        gotoPage(page);
                    }}
                />
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
            </div>
            <pre>
        <code>
          {JSON.stringify(
              {
                  state,
                  "selectedRows Ids": selectedFlatRows.map(d => d.original.id)
              },
              null,
              2
          )}
        </code>
      </pre>
        </>
    );
}

export { TableComponent };
