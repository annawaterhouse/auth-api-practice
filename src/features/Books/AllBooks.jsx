/* TODO - add your code to create a functional React component 
that displays all of the available books in the library's catalog. 
Fetch the book data from the provided API. 
Users should be able to click on an individual book to navigate to 
the SingleBook component and view its details. */
import { useGetBooksQuery } from "./booksSlice"
import { Link } from "react-router-dom"

function BookCard({ b }) {
    return (
        <li>
            <img className="book-image" src={b.coverimage} alt={b.title} />
            <h5>{b.title}</h5>
            <p className="author">{b.author}</p>
            <p className="status">{b.available ? "Available" : "Out of Stock"}</p>
            <Link to={`/books/${b.id}`}>Learn More</Link>
        </li>
    )
}
export default function AllBooks() {
    const { data = {} } = useGetBooksQuery();
    console.log(data.books);

    return (
        <div>
            {data.books?.map((b) => (
                <BookCard key={b.id} b={b} />
            ))}
        </div>
    )
}

//     return isLoading ? loadMessage : error ? errMessage : BookList;
// }