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
        // <div style = {{position: "absolute", left: "50%"}}>
        <div>
            <center>
                <InvTable />
                <iframe 
                    src="https://www.dhs.gov/ntas/" name="National Terrorism Advisory System" title="National Terrorism Advisory System" width="20%" height="200px" frameborder="0" seamless border="0"
                ></iframe>
            </center>
        </div>
    )
}

export default Testpage;