/* TODO - add your code to create a functional React component 
that renders account details for a logged in user. 
Fetch the account data from the provided API. 
You may consider conditionally rendering a message for other users 
that prompts them to log in or create an account.  */
import { useGetUserInfoQuery, selectToken } from "../Auth/authSlice"
import { useSelector } from "react-redux";
// import { setUser } from "./accountSlice"

export default function Account() {
    const token = useSelector(selectToken)
    const { data } = useGetUserInfoQuery(token);
    console.log(data);

    return (
        <section className="account">
            <h1>account</h1>
            <h1>Profile</h1>
            <h2>{data.firstname} {data.lastname}</h2>
            <h3>Book History:</h3>
//add book history//
        </section>
    )
}


