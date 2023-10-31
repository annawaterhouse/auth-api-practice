/* TODO - add your code to create a functional React component 
that displays all of the available books in the library's catalog. 
Fetch the book data from the provided API. 
Users should be able to click on an individual book to navigate to 
the SingleBook component and view its details. */
import { useGetBooksQuery } from "./booksSlice"
import { Link } from "react-router-dom"
import { useState } from 'react'
import "./allBooks.scss"

function BookCard({ b }) {
    return (
        <li className="card">
            <img className="book-image" src={b.coverimage} alt={b.title} />
            <h2>{b.title}</h2>
            <h3 className="author">{b.author}</h3>
            <Link to={`/books/${b.id}`} className="learn">Learn More</Link>
            {b.available ? <p className="available">Available</p> : <p className="unavailable">Unavailable</p>}
        </li>
    )
}
export default function AllBooks() {
    const { data: books } = useGetBooksQuery();
    const [filterBooks, setFilterBooks] = useState(books);
    const [searchField, setSearchField] = useState('');
    console.log(filterBooks)

    const handleSearch = (e) => {
        setSearchField(e.target.value);
        const filteredBooks = books.filter((item) => item.title.includes(searchField))
        setFilterBooks(filteredBooks)
    }
    const unfiltered = (
        <ul className="wrapper">
                {books?.map((b) => (
                    <BookCard key={b.id} b={b} />
                ))}
        </ul>
    );
    const filtered = (
        <ul className="wrapper">
                {filterBooks?.map((b) => (
                    <BookCard key={b.id} b={b} />
                ))}
        </ul>
    )

    return (
        <>
            <form>
                <input
                    className="search"
                    type="text"
                    value={searchField}
                    onChange={handleSearch}
                />
            </form>
            {!filterBooks ? unfiltered : filtered}
        </>
    )
}