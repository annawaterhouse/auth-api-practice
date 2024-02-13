import { useGetBookByIdQuery } from "./booksSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useReserveMutation } from "../Account/resSlice";
import { FaArrowLeft } from "react-icons/fa";
export default function FeaturedBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetBookByIdQuery(id);
  const [reserve] = useReserveMutation();

  const handleClick = async (id) => {
    try {
      await reserve(id).unwrap();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return data ? (
    <article className="featured">
      <figure className="col-left">
        {/* <button className="back">
          <FaArrowLeft className="icon" onClick={() => navigate("/books")} />
        </button> */}
        <div>
        <img src={data.book.coverimage} alt={data.book.title} />
        </div>
        
      </figure>
      <section className="col-right">
        <section className="info-group">
          <h2 className="t-xxl">{data.book.title}</h2>
          <h3 className="t-base">{data.book.author}</h3>
        </section>
        <p className="base">{data.book.description}</p>
        {!data.book.available && (
          <button className="unavailable-button">Unavailable</button>
        )}
        {data.book.available && (
          <button
            className="available-button"
            onClick={() => handleClick(data.book.id)}
          >
            Reserve
          </button>
        )}
      </section>
    </article>
  ) : (
    <p>Loading...</p>
  );
}
