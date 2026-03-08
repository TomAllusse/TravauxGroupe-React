import { useState } from "react";
import { QuizzContext } from "../contexts/QuizzContext";

const QuizzContextProvider = ({ children }) => {
    const [scores, setScores] = useState(() => {
        const sauvegarde = localStorage.getItem("hallOfFame");
        return sauvegarde ? JSON.parse(sauvegarde) : [];
    });

    const addNewScore = (pseudo, scoreFinal, niveau) => {
        const nouvelleEntree = {
            id: Date.now(),
            nom: pseudo,
            score: scoreFinal,
            niveau: niveau
        };

        setScores((prevScores) => {
            const listeComplete = [...prevScores, nouvelleEntree];

            const niveauxUniques = [...new Set(listeComplete.map(s => s.niveau))];

            let listeFinaleTriee = [];

            niveauxUniques.forEach(niv => {
                const top10DuNiveau = listeComplete
                    .filter(s => s.niveau === niv)
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 10);

                listeFinaleTriee = [...listeFinaleTriee, ...top10DuNiveau];
            });

            localStorage.setItem("hallOfFame", JSON.stringify(listeFinaleTriee));
            return listeFinaleTriee;
        });
    };

    return (
        <QuizzContext value={{ scores, addNewScore }}>
            {children}
        </QuizzContext>
    );
};

export default QuizzContextProvider;