import matchSorter from 'match-sorter'
import React from "react"

const globalFilterFunction = (rows, ids, filterValue) => {
    console.log("global", rows, ids, filterValue)
    return rows.filter(row => {
        return (
            row.values['string'].toLowerCase().includes(filterValue.toLowerCase()) ||
            row.values['object'].name.toLowerCase().includes(filterValue.toLowerCase())
        );
    });
}

const numberFilterFunction = (rows, id, filterValue) => {
    console.log("numberFilter", id, rows, filterValue)
    return rows.filter(row => {
        const rowValue = row.values[id]
        console.log("number", rowValue)
        return rowValue !== undefined && rowValue.toString().indexOf(filterValue)
            ? false
            : true
    })
}

const textFilterFunction = (rows, id, filterValue) => {
    return rows.filter(row => {
        const rowValue = row.values[id]
        return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
    })
}
function fuzzyTextFilterFn(rows, id, filterValue) {
    console.log("fzzy")
    return rows.filter(row => {
        console.log("each", row)
        const rowValue = row.values[id].ajay
        return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
    })
}
fuzzyTextFilterFn.autoRemove = val => !val

const numberSort = ((rowA, rowB, columnId, desc) => {
    console.debug("numbersort")
    const value = desc
        ? rowA.values[columnId] <= rowB.values[columnId]
        : rowA.values[columnId] > rowB.values[columnId];
    //negative number represent false, so compare is easy
    return rowA.values[columnId] - rowB.values[columnId];
});

const stringSort = ((rowA, rowB, columnId, desc) => {
    return rowA.values[columnId].localeCompare(rowB.values[columnId])
})





export { globalFilterFunction, fuzzyTextFilterFn, numberSort, numberFilterFunction, textFilterFunction, stringSort }