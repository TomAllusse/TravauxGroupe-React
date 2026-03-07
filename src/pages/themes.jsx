import Header from "../components/Header";
import '../App.css'
import { useState} from "react";

const Themes = () => {

    const [selectId, setSelectedId] = useState("");
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const categories = [
        { name: "Animals", id: 27 },
        { name: "General Knowledge", id: 9 },
        { name: "History", id: 23},
        { name: "Science:Computers", id: 18}
    ];



    const fetchQuiz = async (id) => {
        if (!id) return;

        setLoading(true);
        try {
            const response = await fetch("https://opentdb.com/api_category.php");
            const data = await response.json();

        setQuestions(data.results);
            console.log("Questions chargées :", data.results);
        }catch (error){
            console.error("Erreur lors du fetch :" ,error);

        }finally {
            setLoading(false);
        }


    };



    const handleChange = (event) => {
        const id = event.target.value;
        setSelectedId(id);
        console.log("ID sélectionné :", id);

        fetchQuiz(id);
    };

    return (
        <>
            <Header/>
            <h1 className="titleIndex">Choississez un Thème !</h1>
            <select
                id="category-select"
                value={selectId}
                onChange={handleChange}
            >
                <option value="" disabled>=====THEME=====</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

        </>
    );
};

export default Themes;