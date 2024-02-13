import { NavLink } from "react-router-dom"
import { logout, selectToken, useGetUserInfoQuery } from "../features/Auth/authSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import books from "../assets/books.png"
import { IoMdMenu } from "react-icons/io";


function Menu() {
    return (
        <nav>
        <menu>
        <NavLink to="/">
            <img className="logo" src={books} alt="logo" />
          </NavLink>
          <NavLink to="/login">
            <button className="signin-button">
              Sign In
              <div className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </NavLink>
        </menu>
        </nav>
      );
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
        <menu className="open">
            <a onClick={()=>{setIsOpen(false)}}>X</a>
            { data && <h4>Welcome, {data.firstname}</h4> }
            <NavLink to="/books">Discover Books</NavLink>
            <NavLink to="/account">My Account</NavLink>
            <a onClick={handleLogout}>Sign Out</a>
        </menu>
        </nav>)
    
    const closedMenu = 
        (<nav>
        <menu>
            <NavLink to="/"><img className="logo" src={books} alt="logo" /></NavLink>
            <button className="closed"><IoMdMenu onClick = {() => {setIsOpen(true)}} /></button>
            </menu>
        </nav>)

    return !isOpen ? closedMenu : openMenu;
}

export default function Navbar() {
    const token = useSelector(selectToken);
    return token ? <UserMenu token={token} /> : <Menu />
}