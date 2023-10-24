/* TODO - add your code to create a functional React component that 
renders details for a single book. Fetch the book data from the provided API. 
You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useGetBookByIdQuery } from "./booksSlice"
import { useParams } from "react-router-dom"

export default function FeaturedBook() {
    const { id } = useParams();
    const { data = {} } = useGetBookByIdQuery(id);
    console.log(data.book)
    const loadMessage = <p>Loading...</p>;
    const featured = (
        <article className="featured">
            <figure className="col-left">
                <img src={data.book.coverimage} alt={data.book.title} />
            </figure>
            <section className="col-right">
                <h2>{data.book.title}</h2>
                <h3>{data.book.author}</h3>
                <p>{data.book.description}</p>
            </section>
        </article>
    )
    return !data ? loadMessage : featured
}