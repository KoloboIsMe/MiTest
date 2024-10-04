import React, { Fragment, useState } from 'react'
import { TableComponent } from "./TableComponent"
const Table = ({ columns, data, heading,globalFilterFunction }) => {

    const parentprops={
        globalFilterFunction:!globalFilterFunction?(rows)=>{
            console.log("from index")
            return rows
        }:globalFilterFunction,
    }


    return (
        <Fragment>
            <h6>{heading}</h6>
            <TableComponent columns={columns} data={data} parentprops={parentprops}/>
        </Fragment>
    )
}
export default Table