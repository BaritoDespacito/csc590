import InvItem from "./InvItem";

function InvRow (product) {
    return (
        // <div>
            <tr className = "InvRow">
                {/* {console.log(product)} */}
                <InvItem product = {product}/>
            </tr>
        // </div>
    )
}

export default InvRow;