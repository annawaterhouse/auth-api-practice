/* TODO - add your code to create a functional React component that 
renders a navigation bar for the different views in your single page application. 
You may consider conditionally rendering some options - for example 
'Login' should be available if someone has not logged in yet. */
import { NavLink } from "react-router-dom"
import { logout, selectToken } from "../features/Auth/authSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


function Menu() {
    return (
        <nav>
            <h1>Books.com</h1>
            <menu>
                <li>
                    <NavLink to="/login">Sign In</NavLink>
                </li>
            </menu>
        </nav>
    )
}


function UserMenu() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        dispatch((logout()));
        navigate('/');
    }

    const openMenu =
        (<nav>
        <h1>Books.com</h1>
        <menu>
            <li><a onClick={()=>{setIsOpen(false)}}>X</a></li>
            <li><h4>Welcome, Name</h4></li>
            <li><NavLink to="/books">All Books</NavLink></li>
            <li><NavLink to="/account">Account</NavLink></li>
            <li><a onClick={handleLogout}>Sign Out</a></li>
        </menu>
        </nav>)
    
    const closedMenu = 
        (<nav>
            <h1>Books.com</h1>
            <menu>
            <i 
            className="fa fa-bars" 
            onClick = {() => {setIsOpen(true)}}>X</i>
            </menu>
        </nav>)

    return !isOpen ? closedMenu : openMenu;
}



export default function Navbar() {
    const token = useSelector(selectToken);
    console.log(token);
    return token ? <UserMenu /> : <Menu />
}