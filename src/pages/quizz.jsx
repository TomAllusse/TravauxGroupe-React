import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { QuizzContext } from "../contexts/QuizzContext";
import '../css/quizz.css';

const Quizz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [userChoice, setUserChoice] = useState(null);
    const [isFinished, setIsFinished] = useState(false); // Nouveau state pour gérer la fin

    /* Niveau et Navigation */
    const [searchParams] = useSearchParams();
    const niveau = searchParams.get('niv');
    const themes = searchParams.get('themes');
    const navigate = useNavigate();

    /* Context pour pouvoir stocker le score tant que l'utilisateur ne fais pas de F5 */
    const { addNewScore } = useContext(QuizzContext);

    const color_styles = document.querySelectorAll(".titleIndex, .titleSecond");
    color_styles.forEach((element) => { element.style.color = "#000" });

    const titleIndex_styles = document.querySelectorAll(".titleIndex");
    titleIndex_styles.forEach((element) => { element.style.borderColor = "#000" });



    useEffect(() => {
        document.body.style.backgroundColor = '#00c4cc';

        return () => {
            document.body.style.backgroundColor = null;
        };
    }, []);

    const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${themes}&difficulty=${niveau}&type=multiple`);
                const data = await response.json();
                if (data.results) {
                    const formatted = data.results.map(q => ({
                        ...q,
                        all_answers: shuffleArray([...q.incorrect_answers, q.correct_answer])
                    }));
                    setQuestions(formatted);
                }
            } catch (error) {
                console.error("Erreur :", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, []);

    useEffect(() => {
        if (questions.length === 0 || currentIndex >= questions.length) return;

        const interval = setInterval(() => {
            if (userChoice !== null) {
                if (userChoice === questions[currentIndex].correct_answer) {
                    setScore((prev) => prev + 1);
                }
                setCurrentIndex((prev) => prev + 1);
                setTimeLeft(10);
                setUserChoice(null);
                document.querySelectorAll("#timer-message").forEach((element) => { element.style.color = null });
            } else {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setCurrentIndex((oldIndex) => oldIndex + 1);
                        document.querySelectorAll("#timer-message").forEach((element) => { element.style.color = null });
                        return 10;
                    }
                    if(prev < 5){
                        document.querySelectorAll("#timer-message").forEach((element) => { element.style.color = "rgb(125, 0, 0)" });
                    }
                    return prev - 1;
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [questions, currentIndex, userChoice]);

    const finishQuizz = () => {
        if (isFinished) return;
        setIsFinished(true);

        let pseudo = "";
        while(pseudo.trim().length > 15 || pseudo.trim() === ""){
            pseudo = prompt("Entrez votre pseudo pour le Hall of Fame (max 15 car.) :") || "Anonyme";
        }
        console.log("Pseudo enregistré : " + pseudo);
        addNewScore(pseudo, score, niveau);

        setTimeout(() => {
            navigate('/menu');
        }, 2500);
    };

    if (loading) return <p id="loading-quizz">Préparation du quizz ...</p>;

    if (currentIndex >= questions.length && !loading) {
        document.body.style.backgroundColor = null;
        color_styles.forEach(el => { el.style.color = null });
        titleIndex_styles.forEach((element) => { element.style.borderColor = null });

        if(score > 7){
            document.querySelectorAll(".message-status").forEach((element) => { element.style.color = "rgb(0,125,0)" });
        }else if(score > 4){
            document.querySelectorAll(".message-status").forEach((element) => { element.style.color = "rgb(175,125,0)" });
        }else {
            document.querySelectorAll(".message-status").forEach((element) => { element.style.color = "rgb(125, 0, 0)" });
        }

        return (
            <>
                <h1 className="titleIndex">Quizz terminé ! Bravo.</h1>
                <div className="status-container">
                    <p className="score-status">{score} / {questions.length}</p>
                    <p className="message-status">{score > 7 ? "Bravo !" : score > 4 ? "Ça commence à venir" : "Pas génial là !"} </p>
                </div>
                {finishQuizz()}
            </>
        );
    }

    const currentQuestion = questions[currentIndex];

    return (
        <>
           <h1 className="titleIndex">Question {currentIndex + 1} / {questions.length} | Score: {score}</h1>
           <h2 className="titleSecond" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

           <div className="options">
               {currentQuestion.all_answers.map((answer, i) => (
                   <div key={i} className="container-radio">
                       <input className="pointer" type="radio" id={"response-" + i} name="quizz-choice" value={answer} checked={userChoice === answer} onChange={() => setUserChoice(answer)}/>
                       <label className="pointer" htmlFor={"response-" + i} dangerouslySetInnerHTML={{ __html: answer }}/>
                   </div>
               ))}
           </div>

           <p id="timer-message">Prochaine question dans {timeLeft} secondes...</p>
        </>
    );
};

export default Quizz;