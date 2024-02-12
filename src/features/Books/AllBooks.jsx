import { useGetBooksQuery } from "./booksSlice"
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom"
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import "./allBooks.scss"

function BookCard({ b }) {
    return (
        <li className="card-list">
          <section className="card-container container">
          <div className="card-image" alt={b.title} style={{backgroundImage: `url(${b.coverimage})`}}>
          </div>
          <article className="card-content">
          {b.available ? <p className="available">Available</p> : <p className="unavailable">Unavailable</p>}
          <section className="card-info">
            <h2 className="card-title">{b.title}</h2>
            <h3 className="card-author">{b.author}</h3>

            </section>
            <Link to={`/books/${b.id}`} className="card-button">Learn More</Link>

          </article>
          </section>
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
        const filteredBooks = books.filter((item) => item.title.includes(searchField));
        setFilterBooks(filteredBooks);
        if (searchField === '') {
            return setFilterBooks(books);
        }
        

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
        <section className="home">
            {/* <form>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input
                    className="search"
                    type="text"
                    value={searchField}
                    onChange={handleSearch}
                />
            </form> */}
            {!filterBooks ? unfiltered : filtered}
        </section>
    )
}