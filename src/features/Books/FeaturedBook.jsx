/* TODO - add your code to create a functional React component that 
renders details for a single book. Fetch the book data from the provided API. 
You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useGetBookByIdQuery } from "./booksSlice"
import { useParams } from "react-router-dom"

export default function FeaturedBook() {
    return (
        <h5>Featured Book</h5>
    )
}