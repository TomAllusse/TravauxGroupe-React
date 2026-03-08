import { useContext } from "react";
import { QuizzContext } from "../contexts/QuizzContext";
import '../css/hallOfFame.css';

const HallOfFameTab = () => {
    const { scores } = useContext(QuizzContext);
    const niveaux = ["easy", "medium", "hard"];

    return (
        <div className="result-score">
            <div className="classement-container">
                {niveaux.map((niv) => {
                    const scoresFiltres = scores.filter(s => s.niveau === niv);

                    return (
                        <div className="niv-container" key={niv}>
                            <h2 className="titleSecond">{niv}</h2>

                            {scoresFiltres.length > 0 ? (
                                scoresFiltres.map((joueur, index) => (
                                    <div key={`${joueur.id}-${index}`}>
                                        <div className={`members-container ${index === 0 ? "gold" : index === 1 ? "argent" : index === 2 ? "bronze" : "outsiders"}`}>
                                            <p className="nameClassement">
                                                <strong>{index + 1}</strong> &#x2003;&#x2794;&#x2003;{joueur.nom}
                                            </p>
                                            <p className="affichage-score">{joueur.score} / 10</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="message">Aucun score enregistré.</p>
                            )}
                        </div>
                    );
                })}
            </div>
            <button onClick={() => window.location.href = "/"} className="btn-index">ACCUEIL</button>
        </div>
    );
};

export default HallOfFameTab;