import { NavLink } from "react-router-dom"
import logo from "/logo.svg"
import { useContext } from "react"
import { Link } from "react-router-dom"
import MyContext from "../context/ContextAPI"
const Header = () => {
  const{currentUser,walletAddress} = useContext(MyContext)
  return (
    <div>
        <header className="bg-[#D8C3A5] rounded-xl ">
  <div className="mx-auto max-w-screen-xl   px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center   justify-between  ">
      <Link to="/">
      
      <div className="md:flex md:items-center  md:gap-12">
        <a className="flex justify-start" href="#" >
            <img src={logo} alt="logo" className="h-10 w-50 flex " />
          <span className=" p-4">DSRW</span>
        </a>
      </div>

      </Link>

      <div className="hidden md:block">
        <nav aria-label="Global">
          <ul className="flex items-center gap-6 text-sm">
            <NavLink to={currentUser=="chef"?"chef/dashboard":"user/dashboard"}>
            <li className="text-black hover:underline hover:underline-offset-8  font-sem  ibold text-lg  transition hover:decoration-[red]" >
               DashBoard 
            </li>
            </NavLink>
            {currentUser=='chef'&&

            <NavLink to="chef/add-recipe">
            <li className="text-black hover:underline hover:underline-offset-8  font-semibold text-lg  transition hover:decoration-[red]" >
               Add-Recipe 
            </li>
            </NavLink>
            }

            {/* <li>
              <a className="text-black font-semibold text-lg    hover:underline hover:underline-offset-8  transition hover:decoration-[red] " href="#"> Add Recepie </a>
            </li> */}
        

          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">

          <a
            className="rounded-md bg-[#E85A4F] transition hover:bg-[#ee614e] hover:bg-white hover:text-[#ee614e] border-2 border-dashed  border-[#E85A4F]  px-5 py-2.5 text-sm font-medium text-white shadow"
            href="#"
          >
            {walletAddress.slice(0,4)+"..."+walletAddress.slice(39,42)} 
          </a>
        </div>

        <div className="block md:hidden">
          <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</header>
    </div>
  )
}

export default Header