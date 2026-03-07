import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import '../css/quizz.css';

const Quizz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [userChoice, setUserChoice] = useState(null);

    /* Niveau et Navigation */
    const [searchParams] = useSearchParams();
    const niveau = searchParams.get('niv');
    const themes = searchParams.get('themes');
    const navigate = useNavigate();

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
            } else {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setCurrentIndex((oldIndex) => oldIndex + 1);
                        return 10;
                    }
                    return prev - 1;
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [questions, currentIndex, userChoice]);

    const finishQuiz = () => {

        setTimeout(() => {
            document.body.style.backgroundColor = null;
            navigate('/menu');
        }, 5000);
    };

    if (loading) return <p>Préparation du quizz ...</p>;

    if (currentIndex >= questions.length) {
        document.body.style.backgroundColor = '#00c4cc';

        return (
            <div className="quizz-container">
                <h1 className="titleIndex">Quizz terminé ! Bravo.</h1>
                <p className="score-status">Score : {score} / {questions.length}</p>
                <p className="message-status">{score > 7 ? "Bravo !" : score > 4 ? "Ça commence à venir" : "Pas génial là !"} </p>
                {finishQuiz()}
            </div>
        );
    }

    export  const sauvegardeScore = (pseudo, scorefinal) => {

        const sauvegarde = localStorage.getItem("hallOfFame");

        let listeScores;
        if (sauvegarde){
            listeScores = JSON.parse(sauvegarde);
        } else {
            listeScores = []
        }
        const nouvelEntree ={
            id: Date.now(),
            nom: pseudo,
            score: scorefinal
        };

        listeScores.push(nouvelEntree);

        listeScores.sort((a,b) => b.score - a.score)

        const top10 = listeScores.slice(0, 10);

        localStorage.setItem("hallOfFame", JSON.stringify(top10));
    }

    const currentQuestion = questions[currentIndex];

    return (
        <>
           <h1 className="titleIndex">Question {currentIndex + 1} / {questions.length} | Score: {score}</h1>
           <h2 className="titleSecond" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

           <div className="options">
               {currentQuestion.all_answers.map((answer, i) => (
                   <div key={i}>
                       <input type="radio" id={"response-" + i} name="quizz-choice" value={answer} checked={userChoice === answer} onChange={() => setUserChoice(answer)}/>
                       <label htmlFor={"response-" + i} dangerouslySetInnerHTML={{ __html: answer }}/>
                   </div>
               ))}
           </div>

           <p id="timer-message">Prochaine question dans {timeLeft} secondes...</p>
        </>
    );
};

export default Quizz;