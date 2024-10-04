import React from "react";
import {
    SelectColumnFilterComponent,
    SliderColumnFilterComponent,
    NumberRangeColumnFilterComponent,
    IndeterminateCheckboxComponent
} from "./Table/Components";

import makeData from "./Table/makeData";
import Table from './Table/index'

function App() {

    const columns = React.useMemo(
        () => [
            {
                id: "ids",
                Header: "ID",
                accessor: "id",
                minWidth: 50,
                filter: 'number',
                sortType: "numberSort",
            },
            {
                id: "number",
                Header: "Number",
                accessor: "number",
                minWidth: 50,
                filter: 'number',
                sortType: "numberSort",
            },
            {
                id: "string",
                Header: "String",
                accessor: "string",
                minWidth: 50,
                filter: 'text',
                sortType: "stringSort",
            },
            {
                id: "boolean",
                Header: "Boolean",
                accessor: "boolean",
                minWidth: 150,
                filter: 'fuzzyText',
                sortType: "numberSort",
            },
            {
                id:"custom",
                Header: "Object",
                accessor: "object",
                minWidth: 150,
                sortType: (rowA,rowB,columnId,desc)=>{
                    //name is the object key which you need to sort based on
                    let StringA=rowA.values[columnId].name
                    let StringB=rowB.values[columnId].name
                    console.debug("sort",StringA,StringB)
                    return StringA.localeCompare(StringB)
                },
                // you can have custom filter logic as per requirement, you can have array , object and combination of many,
                // Currently facing issue with component passed as an object
                filter: (rowvalues,id,filtervalue)=>{
                    console.log("customeFilter",rowvalues,id,filtervalue)
                    return rowvalues.filter(item=>{
                        console.log("customeFilteritem",item.values[id].name)
                        return item.values[id].name.includes(filtervalue)?true:false
                    })
                },
                Cell:(props)=>(<div>{props.cell.value.name}</div>)
            },
            {
                id: "component",
                Header: "Component",
                accessor: "component",
                minWidth: 150,
                filter: (rowvalues,id,filterValue)=>{

                },
                sortType:()=>{

                },
                Cell:(value)=> {
                    return <a href="#">{value.cell.render(value.cell.value)}</a>
                },
            },


            {
                id:"no1",
                Header: "Normal",
                accessor: "lastName",
                sortType: "numberSort",
                minWidth: 150,
                // Use our custom `fuzzyText` filter on this column
                filter: "fuzzyText"
            },
            {
                id:"no2",
                Header: "Slider",
                accessor: "age",
                minWidth: 150,
                Filter: SliderColumnFilterComponent,
                filter: "equals"
            },
            {
                id:"no3",
                Header: "Number",
                accessor: "visits",
                minWidth: 150,
                Filter: NumberRangeColumnFilterComponent,
                filter: "between"
            },
            {
                id:"no4",
                Header:"Select",
                accessor: "status",
                minWidth: 150,
                Filter: SelectColumnFilterComponent,
                filter: "includes"
            },
            {
                id:"n05",
                Header: "Profile Progress",
                accessor: "progress",
                minWidth: 150,
                Filter: SliderColumnFilterComponent,
                filter: (rows, id, filterValue)=> {
                    return rows.filter(row => {
                        const rowValue = row.values[id];
                        return rowValue >= filterValue;
                    });
                }
            }],
        []
    );

    const data = React.useMemo(() => makeData(100), []);

    const globalFilterFunction=(rows)=>{
        console.log("Write the custom global filter")
        return rows
    }

    return (
        <>
            <div style={{display:"flex",justifyContent:"center"}}>
            </div>
            <Table columns={columns} data={data} heading={'heading'} globalFilterFunction={globalFilterFunction} />
        </>
    );
}

export default App;
