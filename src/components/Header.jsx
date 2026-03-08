import { Link, useLocation } from "react-router";
import "../css/header.css";

const Header = () => {
  const location = useLocation();

  console.log(location);

  const elements = [
    {
      pathname: "/",
      text: "Accueil",
    },
    {
      pathname: "/hallOfFame",
      text: "Classement",
    }
  ];

  return (
    <>
      <nav>
        <ul className="list-nav">
          {elements.map((element) => {
            return (
              <li key={element.pathname}>
                <Link className={`item-nav link-nav ${location.pathname === element.pathname ? "active" : ""}`} to={element.pathname}>
                  {element.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Header;