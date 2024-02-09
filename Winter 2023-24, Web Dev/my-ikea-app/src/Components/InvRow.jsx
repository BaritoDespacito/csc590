import InvItem from "./InvItem";

function InvRow (props) {
    return (
        // <div>
            <tr className = "InvRow">
                <InvItem name = {props.name}/>
            </tr>
        // </div>
    )
}

export default InvRow;