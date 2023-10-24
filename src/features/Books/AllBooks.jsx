/* TODO - add your code to create a functional React component 
that displays all of the available books in the library's catalog. 
Fetch the book data from the provided API. 
Users should be able to click on an individual book to navigate to 
the SingleBook component and view its details. */
import { useGetBooksQuery } from "./booksSlice"

function BookCard({ book }) {
    return (
      <li>
        <h3>{book.title}</h3>
        <img src={book.image} />
        <Link to={`/books/${book.id}`}>Read More</Link>
      </li>
    )
  }

export default function AllBooks() {
    const { data, error, isLoading } = useGetBooksQuery();
    const loadMessage = <p>Loading...</p>;
    const errMessage = <p>Sorry, we ran into an error...Please try again later.</p>;
    

   const BookList = (
        <ul className="book-list">
            {data.data.map((book) => (
                <BookCard key={b.id} book={book}/>
            ))}
        </ul>
   ) 
    return isLoading ? loadMessage : error ? errMessage : BookList;
}