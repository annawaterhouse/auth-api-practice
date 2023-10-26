/* TODO - add your code to create a functional React component that 
renders details for a single book. Fetch the book data from the provided API. 
You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useGetBookByIdQuery } from "./booksSlice"
import { useParams, useNavigate } from "react-router-dom"
import { useReserveMutation } from "../Account/resSlice"
import "./featured.scss"

export default function FeaturedBook() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data } = useGetBookByIdQuery(id);
    const [reserve] = useReserveMutation();

    const handleClick = async () => {
        
        try {
          await reserve(id).unwrap();
          navigate('/');
        } catch (err) {
          console.error(err);
        } 
    }

    return data ? (
        <article className="featured">
            <figure className="col-left">
                <img src={data.book.coverimage} alt={data.book.title} />
            </figure>
            <section className="col-right">
                <h2>{data.book.title}</h2>
                <h3>By {data.book.author}</h3>
                <p>{data.book.description}</p>
                {!data.book.available && <button>Unavailable</button>}
                {data.book.available && <button onClick={handleClick} >Reserve</button>}
            </section>
        </article>
    ) : (
        <h2>Loading...</h2>
    )
}