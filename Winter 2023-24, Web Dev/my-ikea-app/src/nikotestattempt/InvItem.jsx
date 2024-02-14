function InvItem(product) {
    return (
        <td>
            {console.log(product)}
            <p>this is a {product.product.productName} item</p>
            <br></br>
        </td>
    )
}

export default InvItem;