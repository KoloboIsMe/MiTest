import React from "react";

const GlobalFilterComponent = ({
                                   preGlobalFilteredRows,
                                   globalFilter,
                                   setGlobalFilter
                               }) => {
    const count = preGlobalFilteredRows.length;
    return (
        <span>
      <input
          placeholder={`Searchs in ${count} Recordsss`}
          onChange={e => setGlobalFilter(e.target.value || undefined)}
          value={globalFilter || ""}
      />
    </span>
    );
};

// Define a default UI for filtering
function DefaultColumnFilterComponent({
                                          column: { filterValue, preFilteredRows, setFilter }
                                      }) {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ""}
            onChange={e => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder={`Default Filter Component`}
        />
    );
}
// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilterComponent({
                                         column: { filterValue, setFilter, preFilteredRows, id }
                                     }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach(row => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined);
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilterComponent({
                                         column: { filterValue, setFilter, preFilteredRows, id }
                                     }) {
    // Calculate the min and max
    // using the preFilteredRows

    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        preFilteredRows.forEach(row => {
            min = Math.min(row.values[id], min);
            max = Math.max(row.values[id], max);
        });
        return [min, max];
    }, [id, preFilteredRows]);

    return (
        <>
            <input
                type="range"
                min={min}
                max={max}
                value={filterValue || min}
                onChange={e => {
                    setFilter(parseInt(e.target.value, 10));
                }}
            />
            <button onClick={() => setFilter(undefined)}>Off</button>
        </>
    );
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilterComponent({
                                              column: { filterValue = [], preFilteredRows, setFilter, id }
                                          }) {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        preFilteredRows.forEach(row => {
            min = Math.min(row.values[id], min);
            max = Math.max(row.values[id], max);
        });
        return [min, max];
    }, [id, preFilteredRows]);

    return (
        <div
            style={{
                display: "flex"
            }}
        >
            <input
                value={filterValue[0] || ""}
                type="number"
                onChange={e => {
                    const val = e.target.value;
                    setFilter((old = []) => [
                        val ? parseInt(val, 10) : undefined,
                        old[1]
                    ]);
                }}
                placeholder={`Min (${min})`}
                style={{
                    width: "70px",
                    marginRight: "0.5rem"
                }}
            />
            to
            <input
                value={filterValue[1] || ""}
                type="number"
                onChange={e => {
                    const val = e.target.value;
                    setFilter((old = []) => [
                        old[0],
                        val ? parseInt(val, 10) : undefined
                    ]);
                }}
                placeholder={`Max (${max})`}
                style={{
                    width: "70px",
                    marginLeft: "0.5rem"
                }}
            />
        </div>
    );
}

const IndeterminateCheckboxComponent = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <div style={{margin:"auto",display:"flex",justifyContent:"center"}}>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </div>
        );
    }
);
export {
    GlobalFilterComponent,
    DefaultColumnFilterComponent,
    SelectColumnFilterComponent,
    SliderColumnFilterComponent,
    NumberRangeColumnFilterComponent,
    IndeterminateCheckboxComponent
};
