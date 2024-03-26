import InvRow from "./InvRow";

function InvTable() {
    // either create a dictionary for each attribute of an element
    // or
    // create a dictionary containing all the attribute dictionaries

    // 1st solution makes InvRow have for example name={...} id={...} and so on
    // 2nd solution makes InvRow have attributes={dictionary of all attribute dictionaries}
    // unsure if either is the best way to store attributes of many items

    // integration of product model object to contain attributes i haven't thought of yet

    let names = {
        name1: "blinken",
        name2: "blahaj",
        name3: "asdf;lkj"
    }
    return (
        <div>
            <table>
                <InvRow name = {names.name1} />
                <InvRow name = {names.name2} />
                <InvRow name = {names.name3} />
            </table>
        </div>
    )
}

export default InvTable;