import InvRow from "./InvRow";

function InvTable() {
    // either create a dictionary for each attribute of an element
    // or
    // create a dictionary containing all the attribute dictionaries

    // 1st solution makes InvRow have for example name={...} id={...} and so on
    // 2nd solution makes InvRow have attributes={dictionary of all attribute dictionaries}
    // unsure if either is the best way to store attributes of many items

    // integration of product model object to contain attributes i haven't thought of yet

    // productID: unique product id
    // name: product name
    // productTypeID: product type id
    // productCategoryID: product category id
    // sold: boolean of sale, 0 is not sold 1 is sold

    // let attributes = {
    //     productIDs,
    //     names,
    //     productTypeIDs,
    //     productCategoryIDs,
    //     solds,
    // }

    // let productIDs = {
    //     productID1: "1",
    //     productID2: "2",
    //     productID3: "33",
    // }

    let names = {
        name1: "blinken",
        name2: "blahaj",
        name3: "asdf;lkj"
    }

    // let productTypeIDs = {
    //     productTypeID1: "45",
    //     productTypeID2: "2",
    //     productTypeID3: "2"
    // }

    // let productCategoryIDs = {
    //     productCategoryID1: "2",
    //     productCategoryID2: "1",
    //     productCategoryID3: "1"
    // }

    // let solds = {
    //     sold1: false,
    //     sold2: false,
    //     sold3: false
    // }

    return (
        <div className = "InvTable">
            <table>
                <InvRow name = {names.name1} />
                <InvRow name = {names.name2} />
                <InvRow name = {names.name3} />
            </table>
        </div>
    )
}

export default InvTable;