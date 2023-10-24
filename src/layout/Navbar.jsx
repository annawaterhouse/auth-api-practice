/* TODO - add your code to create a functional React component that 
renders a navigation bar for the different views in your single page application. 
You may consider conditionally rendering some options - for example 
'Login' should be available if someone has not logged in yet. */
import { NavLink } from "react-router-dom"

export default function Navbar() {
    return (
        <nav>
            <h1>The Library</h1>
            <menu>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Log In</NavLink>
                </li>
                <li>
                    <NavLink to="/">Log Out</NavLink>
                </li>
            </menu>
        </nav>
    )
}