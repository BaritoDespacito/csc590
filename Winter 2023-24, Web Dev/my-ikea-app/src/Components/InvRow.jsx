import InvItem from "./InvItem";

function InvRow (props) {
    return (
        <div>
            <tr>
                <InvItem name = {props.name}/>
            </tr>
        </div>
    )
}

export default InvRow;