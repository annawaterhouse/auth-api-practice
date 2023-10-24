import './root.scss'
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

function Root() {

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Root
