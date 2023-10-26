import { useGetResQuery, useReturnMutation } from "./resSlice";
import { useNavigate } from "react-router-dom"

export default function BookHistoryCard({ token }) {
    const { data = { } } = useGetResQuery(token);
    const [ useReturn ] = useReturnMutation();
    const navigate = useNavigate();

    const handleReturn = async (id) => {
         try {
            await useReturn(id).unwrap();
            navigate('/account');
          } catch (err) {
            console.error(err);
          } 
      }

    return (
        <ul>
            {data.reservation?.map((b) => (
                <li key={b.id}>
                    <img src={b.coverimage} alt={b.title} />
                    <h4>{b.title}</h4>
                    <h5>{b.author}</h5>
                    <button onClick={()=>handleReturn(b.id)}>Return</button>
                </li>
            ))}
        </ul>
    )
}