function InvItem(props) {
    return (
        <td>
            {console.log(props)}
            <p>this is a {props.product.productName} item</p>
            <br></br>
        </td>
    )
}

export default InvItem;