import { useGetBookByIdQuery } from "./booksSlice"
import { useParams, useNavigate } from "react-router-dom"
import { useReserveMutation } from "../Account/resSlice"
import { FaArrowLeft } from "react-icons/fa";
export default function FeaturedBook() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data } = useGetBookByIdQuery(id);
    const [reserve] = useReserveMutation();

    const handleClick = async (id) => {
        
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
            <button className="back">
          <FaArrowLeft className="icon" onClick={()=>navigate('/books')} /> 
        </button>
                <img src={data.book.coverimage} alt={data.book.title} />
            </figure>
            <section className="col-right">
                <h2>{data.book.title}</h2>
                <h3>By {data.book.author}</h3>
                <p>{data.book.description}</p>
                {!data.book.available && <button className="unavailable-button">Unavailable</button>}
                {data.book.available && <button className="available-button" onClick={()=>handleClick(data.book.id)} >Reserve</button>}
            </section>
        </article>
    ) : (
        <h2>Loading...</h2>
    )
}