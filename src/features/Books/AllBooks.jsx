/* TODO - add your code to create a functional React component 
that displays all of the available books in the library's catalog. 
Fetch the book data from the provided API. 
Users should be able to click on an individual book to navigate to 
the SingleBook component and view its details. */
import { useGetBooksQuery } from "./booksSlice"
import { Link } from "react-router-dom"
import "./allBooks.scss"

function BookCard({ b }) {
    return (
        <li>
            <img className="book-image" src={b.coverimage} alt={b.title} />
            <h2>{b.title}</h2>
            <h3 className="author">{b.author}</h3>
            <Link to={`/books/${b.id}`} className="shop-now">{b.available ? "Shop Now" : "Out of Stock"}</Link>
        </li>
    )
}
export default function AllBooks() {
    const { data = {} } = useGetBooksQuery();
    console.log(data.books);

    return (
        <ul className="book-list">
            {data.books?.map((b) => (
                <BookCard key={b.id} b={b} />
            ))}
        </ul>
    )
}