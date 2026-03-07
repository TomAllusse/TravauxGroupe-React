import HallOfFameTab from "../components/HallOfFameTab.jsx";
import Header from "../components/Header.jsx";
import {useEffect} from "react";


const HallOfFame = () => {

    useEffect(() => {
        document.body.style.backgroundColor = '#edf0f2';

        return () => {
            document.body.style.backgroundColor = null;
        };
    }, []);

    return (
        <>
            <Header/>
            <h1 className="titleIndex">HALL OF FAME</h1>
            <HallOfFameTab/>
        </>
    );
};

export default HallOfFame;