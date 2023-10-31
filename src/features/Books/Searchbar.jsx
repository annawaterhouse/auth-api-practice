
import { useState } from 'react'
import { useGetBooksQuery } from "./booksSlice"

export default function Searchbar({setFilterBooks, books}) {
    const [searchField, setSearchField] = useState('');
  


    const handleSearch = (e) => {
        setSearchField(e.target.value);
        const filtered = books.filter((item)=>item.title.includes(searchField))
        setFilterBooks(filtered)

    }

    return(
        <form>
            <input
                    className="search"
                    type="text"
                    value={searchField}
                    onChange={handleSearch}
                />
        </form>
    )
}