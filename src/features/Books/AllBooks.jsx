import { useGetBooksQuery } from "./booksSlice"
import { Link } from "react-router-dom"
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import "./allBooks.scss"

function BookCard({ b }) {
    return (
        <li className="cards__item">
          <section className="card">

          <img className="card__image" src={b.coverimage} alt={b.title} />

            
          <article className="card__content">
            <h2 className="card__title">{b.title}</h2>
            <h3 className="card__text">{b.author}</h3>
            <Link to={`/books/${b.id}`} className="learn">Learn More</Link>
            {b.available ? <p className="available">Available</p> : <p className="unavailable">Unavailable</p>}
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
            <form>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input
                    className="search"
                    type="text"
                    value={searchField}
                    onChange={handleSearch}
                />
            </form>
            {!filterBooks ? unfiltered : filtered}
        </section>
    )
}