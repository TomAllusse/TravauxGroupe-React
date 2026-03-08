import '../App.css'
import '../css/index.css'

const Menu = () => {
    return (
        <>
            <h1 className="titleIndex">MENU</h1>
            <ul className="niv-ul menu">
                <li className="niv-li"><a className="link"href="/">REJOUEZ</a></li>
                <li className="niv-li"><a className="link"href="/hallOfFame">HALL OF FAME</a></li>
            </ul>
        </>
    );
};

export default Menu;