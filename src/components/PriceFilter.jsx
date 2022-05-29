import React from 'react'

export default function PriceFilter() {
    const [order, setOrder] = useState("");
    return (
        <>
        <label htmlFor="priceFilter">Sort by:</label>
        <select defaultValue="default" name="price" id="priceFilter" onChange={(event) => {
            const selectedOption = event.target.value;
            setOrder(selectedOption)
        }}>
            <option value="1">Sort by</option>
            <option value="2">Price(low to high)</option>
            <option value="3">Price(high to low)</option>
        </select>
        </>
    )
}
