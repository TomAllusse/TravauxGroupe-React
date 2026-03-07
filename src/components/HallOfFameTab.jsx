import {   useState } from "react";
import { QuizzContext } from "../contexts/QuizzContextProvider";










const HallOfFameTab = () => {
    const [scores, setscores] = useState([]);



    useState(() => {
        const data = localStorage.getItem("hallOfFame");
        if (data){
            const scoresNettoyes =JSON.parse(data);
            setscores(scoresNettoyes);
        }
    }, []);

    return (
        <div className="result">
            <h1 className="titleIndex"> Meilleurs Scores  </h1>

                <div className="team">
                    {scores.length > 0 ? (
                        scores.map((joueur, index) => (

                            <div key={joueur.id} className="members-container">
                                <p>
                                    <strong>#{index + 1}</strong> - {joueur.nom} :
                                    <span> {joueur.score} / 10</span>
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>Aucun score enregistré pour le moment.</p>
                    )}
                </div>

            <button onClick={() => window.location.href = "/"}>Retour à l'accueil</button>
        </div>
    );
};








export default HallOfFameTab; sauvegardeScore;
