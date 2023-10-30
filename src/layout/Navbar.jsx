/* TODO - add your code to create a functional React component that 
renders a navigation bar for the different views in your single page application. 
You may consider conditionally rendering some options - for example 
'Login' should be available if someone has not logged in yet. */
import { NavLink } from "react-router-dom"
import { logout, selectToken, useGetUserInfoQuery } from "../features/Auth/authSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import books from "../assets/books.png"


function Menu() {
    return (
        <nav>
            <NavLink to="/"><img className="logo" src={books} alt="logo" /></NavLink>
            <menu>
                <li>
                    <NavLink to="/login">Sign In</NavLink>
                </li>
            </menu>
        </nav>
    )
}


function UserMenu({ token }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const { data } = useGetUserInfoQuery(token);
    

    const handleLogout = () => {
        dispatch((logout()));
        navigate('/');
    }

    const openMenu =
        (<nav>
        <NavLink to="/"><img className="logo" src={books} alt="logo" /></NavLink>
        <menu>
            <li><a onClick={()=>{setIsOpen(false)}}>X</a></li>
            { data && <li><h4>Welcome, {data.firstname}</h4></li> }
            <li><NavLink to="/books">Discover Books</NavLink></li>
            <li><NavLink to="/account">My Account</NavLink></li>
            <li><a onClick={handleLogout}>Sign Out</a></li>
        </menu>
        </nav>)
    
    const closedMenu = 
        (<nav>
            <NavLink to="/"><img className="logo" src={books} alt="logo" /></NavLink>
            <menu>
            <i 
            className="fa fa-bars" 
            onClick = {() => {setIsOpen(true)}}></i>
            </menu>
        </nav>)

    return !isOpen ? closedMenu : openMenu;
}

export default function Navbar() {
    const token = useSelector(selectToken);
    return token ? <UserMenu token={token} /> : <Menu />
}