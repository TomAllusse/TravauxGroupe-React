import Header from "../components/Header";
import '../App.css'

const Index = () => {
  return (
    <>
      <Header/>
      <h1 className="titleIndex">BIENVENUE</h1>
      <h2>NIVEAU</h2>
      <ul>
        <li><a href="">Easy</a></li>
        <li><a href="">Medium</a></li>
        <li><a href="">Difficult</a></li>
      </ul>
    </>
  );
};

export default Index;