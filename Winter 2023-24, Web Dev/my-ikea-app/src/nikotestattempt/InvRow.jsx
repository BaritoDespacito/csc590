import InvItem from "./InvItem";

function InvRow (props) {
    return (
        // <div>
            <tr className = "InvRow">
                {/* {console.log(product)} */}
                <InvItem product = {props.product}/>
            </tr>
        // </div>
    )
}

export default InvRow;