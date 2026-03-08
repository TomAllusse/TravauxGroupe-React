import '../App.css'
import '../css/index.css'
import Header from "../components/Header.jsx";

const Index = () => {
    return (
        <>
            <Header/>
            <h1 className="titleIndex">BIENVENUE</h1>
            <h2 className="titleSecond">NIVEAU</h2>
            <ul className="niv-ul">
                <li className="niv-li"><a className="link" href="/themes?niv=easy">Easy</a></li>
                <li className="niv-li"><a className="link" href="/themes?niv=medium">Medium</a></li>
                <li className="niv-li"><a className="link" href="/themes?niv=hard">Hard</a></li>
            </ul>
        </>
    );
};

export default Index;