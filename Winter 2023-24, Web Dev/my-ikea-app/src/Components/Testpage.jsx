import InvTable from "./InvTable";

function Testpage() {
    // organizing components
    // plan: 
    // the inventory will be represented in an html table
    // each individual product will be 1 row
    // table component
    // table component contains list entry component
    // product entry component is a row and uses product component (the smallest product component)
    // 

    return (
        <div>
            <InvTable />
        </div>
    )
}

export default Testpage;