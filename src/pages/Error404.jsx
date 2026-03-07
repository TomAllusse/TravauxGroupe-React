import React from 'react';
import { Link } from 'react-router';
import '../css/error.css'

const Error404 = () => {
  return (
    <div className='result'>
      <div>
        <h1>
          Erreur 404
        </h1>

        <div>
          <h2>
            Page non trouvée
          </h2>
          <p>
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div>
          <Link to="/">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;