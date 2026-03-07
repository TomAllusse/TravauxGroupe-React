API utilisée : https://opentdb.com/api.php
📌 Si vous n’arrivez pas à faire passer les options depuis l’accueil / si vous n'êtes pas encore a l'aise avec
React : Je vous conseille de commencer par le composant Quizz où vous mettez les données en hardcodé
(en dur) avant même d'essayer d'implementer la requête. Avant de coder, tenter de reflechir a la logique
d'implémentation pour vous faciliter la vie !
Cahier des charges

1) Page d’accueil (/)
Sur la page d’accueil, vous devez afficher une interface permettant de choisir :
a) Une catégorie (thème)
Vous devez partir d’un tableau JSON dans votre code, du style :
const categories = [
{ name: "Animals", id: 27 },
{ name: "General Knowledge", id: 9 },
// ...
];
Vous affichez ces catégories dans un <select> ou une liste de boutons.
L’utilisateur doit pouvoir sélectionner 1 catégorie.


b) Une difficulté
Vous devez proposer :
easy
medium
hard
L’utilisateur doit pouvoir sélectionner 1 difficulté.

c) Bouton “Démarrer”
Ce bouton change de page vers /quiz
Il est grisé / désactivé tant que :
aucune catégorie n’est sélectionnée ou
aucune difficulté n’est sélectionnée
But : empêcher le lancement du quiz avec des options invalides.







2) Page Quiz (/quiz)
a) Requête API basée sur les options
Sur cette page, vous faites un fetch avec les paramètres choisis :
10 questions
une catégorie
une difficulté
Exemple d’URL (à adapter) : https://opentdb.com/api.php?
amount=10&category=27&difficulty=easy&type=multiple
vous avez le droit de faire une version “secours” où /quiz impose une catégorie/difficulté en dur (mais c’est
moins bien noté).

b) Une question à la fois
À l’écran, une seule question affichée.
Les réponses sont affichées en boutons (QCM).
L’utilisateur répond, puis passe à la question suivante.
Vous devez gérer l’avancement : Question 1/10, Question 2/10, etc.

c) Fin de partie
Quand les 10 questions sont terminées :
vous naviguez automatiquement vers /score



3) Page Score (/score)
Vous affichez :
Le score final : X / 10
Un message selon le score :
Score Message
0 → 4 “Pas génial là !”
5 → 7 “Ça commence à venir”
8 → 10 “Bravo !”
un bouton “Rejouer” qui ramène à l’accueil (ou relance une partie).
Contraintes importantes
Le quiz doit fonctionner avec 10 questions.
Le quiz doit afficher une question à la fois.
Vous devez avoir 3 pages minimum : Accueil / Quiz / Score.
Le bouton de démarrage doit être désactivé tant que la sélection n’est pas complète.
Le score doit être juste (pas “à la louche”).
Bonus (optionnel mais valorisé)
Bonus A — Timer par question
Chaque question a un temps limite (ex : 8–12 secondes).
Si le temps est écoulé :
la question est considérée comme ratée
on passe à la suivante automatiquement
Afficher un petit compteur.
Bonus B — Top 10 des meilleurs scores (LocalStorage)
Vous sauvegardez les scores dans localStorage
Vous conservez les 10 meilleurs
Vous affichez ce “Hall of Fame” sur la page score (ou accueil)
Une ligne = score ( + pseudo si vous voulez)
Livrables attendus
Un projet React fonctionnel
Le code organisé (pages / composants / logique)
Une courte note README.md :
comment lancer le projet
consignes.md 2026-02-20
4 / 5
ce que vous avez fait
ce que vous n’avez pas eu le temps de faire (si besoin)
Critères d’évaluation (ce qui compte vraiment)
Respect du cahier des charges (pages, 10 questions, score, navigation)
Robustesse (pas d’écran blanc si l’API répond mal)
UX minimale (boutons clairs, progression visible)
Propreté du code (noms, séparation logique/UI)
Annexes :
Les difficultés
export const difficulties = [
{ name: "Easy", value: "easy" },
{ name: "Medium", value: "medium" },
{ name: "Hard", value: "hard" },
];
## Les catégories
export const categories = [
{ name: "General Knowledge", id: 9 },
{ name: "Entertainment: Books", id: 10 },
{ name: "Entertainment: Film", id: 11 },
{ name: "Entertainment: Music", id: 12 },
{ name: "Entertainment: Musicals & Theatres", id: 13 },
{ name: "Entertainment: Television", id: 14 },
{ name: "Entertainment: Video Games", id: 15 },
{ name: "Entertainment: Board Games", id: 16 },
{ name: "Science & Nature", id: 17 },
{ name: "Science: Computers", id: 18 },
{ name: "Science: Mathematics", id: 19 },
{ name: "Mythology", id: 20 },
{ name: "Sports", id: 21 },
{ name: "Geography", id: 22 },
{ name: "History", id: 23 },
{ name: "Politics", id: 24 },
{ name: "Art", id: 25 },
{ name: "Celebrities", id: 26 },
{ name: "Animals", id: 27 },
{ name: "Vehicles", id: 28 },
{ name: "Entertainment: Comics", id: 29 },
{ name: "Science: Gadgets", id: 30 },
{ name: "Entertainment: Japanese Anime & Manga", id: 31 },
consignes.md 2026-02-20
5 / 5
{ name: "Entertainment: Cartoon & Animations", id: 32 },
];
Une fonction pour enlever les HTML entities.
Vous pouvez aussi utiliser : https://github.com/mdevils/html-entities
Voici comment :
const text = "Science &amp; Nature";
console.log(decode(text));
// => "Science & Nature"
Sinon, voici une proposition de fonction a utiliser directement dans votre code.
export function decodeHtmlEntities(str) {
if (!str) return "";
const entities = {
"&amp;": "&",
"&quot;": '"',
"&#039;": "'",
"&apos;": "'",
"&lt;": "<",
"&gt;": ">",
"&eacute;": "é",
"&Eacute;": "É",
};
return str.replace(
/&amp;|&quot;|&#039;|&apos;|&lt;|&gt;|&eacute;|&Eacute;/g,
(match) => entities[match] || match,
);
}