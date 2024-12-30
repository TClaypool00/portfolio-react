import { Link } from "react-router-dom";
import values from '../../values.json';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to={{
                    pathname: values.pages[0].url
                }} >{values.title}</Link>
            </div>
            <div className="navbar-center">
                <ul className="nav-links">
                    {values.pages.map((item, i) => (
                        <li key={i}>
                            <Link to={{
                                pathname: item.url
                            }}>{item.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;