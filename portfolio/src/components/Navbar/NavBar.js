import { Link } from "react-router-dom";
import values from '../../values.json';

const NavBar = () => {
    return (
        <nav>
            <div id="logo">
                {values.title}
            </div>
            <ul>
                    {values.pages.map((item, i) => (
                        <li key={i}>
                            <Link to={{
                                pathname: item.url
                            }}>{item.text}</Link>
                        </li>
                    ))}
                </ul>
        </nav>
    )
}

export default NavBar;