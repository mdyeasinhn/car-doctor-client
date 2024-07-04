import { Link } from "react-router-dom";
import logo from '../../../assets/logo.svg';
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import cart from '../../../assets/icons/Frame.png'
const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const navItems = <>
        <li><Link to='/'><a>Home</a></Link></li>
        <li><Link to='/about'><a>About</a></Link></li>

    </>
    return (
        <div className="navbar bg-base-100 h-28 mb-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end space-x-3">
                {
                    user?.email ? <>
                        <a className=""><Link to='/bookings'><button><img className="text-orange-500" src={cart} alt="" /></button></Link></a>
                        <li className="btn btn-outline btn-error"> <button onClick={handleLogOut}>Log out</button></li>
                    </> :
                        <li className="btn btn-outline btn-error"><Link to='/login'><a>Login</a></Link></li>
                }
                <button className="btn btn-outline btn-error">Appointment</button>

            </div>
        </div>
    );
};

export default Navbar;