import { useEffect, useState } from "react";
import {useNavigate} from "react-router";

const Quizz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [userChoice, setUserChoice] = useState(null);

    const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch("https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple");
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
        const navigate = useNavigate();

        setTimeout(() => {
            navigate('/finish');
        }, 10000);
    };

    if (loading) return <p>Préparation du quizz ...</p>;

    if (currentIndex >= questions.length) {
        return (
            <div className="quizz-container">
                <h1>Quizz terminé ! Bravo.</h1>
                <p>Score : {score} / {questions.length}</p>
                <p className="status-message">{score > 7 ? "Bravo !" : score > 4 ? "Ça commence à venir" : "Pas génial là !"} </p>
                {finishQuiz()}
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    return (
        <div className="quizz-container">
            <div className="question">
                <h1>Question {currentIndex + 1} / {questions.length} | Score: {score}</h1>
                <h2> {currentQuestion.question}</h2>

                <div className="options">
                    {currentQuestion.all_answers.map((answer, i) => (
                        <div key={i}>
                            <input type="radio" id={"response-" + i} name="quizz-choice" value={answer} checked={userChoice === answer} onChange={() => setUserChoice(answer)}/>
                            <label htmlFor={"response-" + i}>{answer}</label>
                        </div>
                    ))}
                </div>

                <p>Prochaine question dans {timeLeft} secondes...</p>
            </div>
        </div>
    );
};

export default Quizz;