import Header from "../components/Header";
import '../App.css'
import '../css/themes.css'
import {useEffect, useState} from "react";
import { useNavigate, useSearchParams } from 'react-router';

const Themes = () => {

    const [selectedTheme, setSelectedTheme] = useState("");
    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(true);

    /* Niveau et Navigation */
    const [searchParams] = useSearchParams();
    const niveau = searchParams.get('niv');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = '#edf0f2';

        return () => {
            document.body.style.backgroundColor = null;
        };
    }, []);

    useEffect(() => {

        const fetchThemes = async () => {
            try {
                const response = await fetch("https://opentdb.com/api_category.php");
                const data = await response.json();
                if (data.trivia_categories) {
                    setThemes(data.trivia_categories);
                    console.log("Thèmes trouvés");
                }
            }catch (error){
                console.error("Erreur lors du fetch :" ,error);

            }finally {
                setLoading(false);
            }
        };
        fetchThemes();
    }, []);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedTheme(value);
        console.log("ID sélectionné :", value);
    };

    if (loading) return <p>Préparation des thèmes ...</p>;

    return (
        <>
            <Header/>
            <h1 className="titleIndex">Choississez un Thème !</h1>
            <select name="theme" id="theme-select" value={selectedTheme} onChange={handleChange} >
                <option value="" disabled>=====THEME=====</option>
                {
                    themes.map((theme) =>
                        <option key={theme.id} value={theme.id} dangerouslySetInnerHTML={{ __html: theme.name }}/>
                    )
                }
            </select>
            <button onClick={() => navigate(`/quizz?niv=${niveau}&themes=${selectedTheme}`)} className="btn-start" disabled={!selectedTheme}>Démarrer</button>
        </>
    );
};

export default Themes;