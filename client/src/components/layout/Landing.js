import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Liber Challenge</h1>
          <p className='lead'>
            Criado com o Stack MERN - MongoDb, Express, ReactJs e NodeJs
          </p>
          <div className='buttons'>
            <Link to='/cadastro' className='btn btn-primary'>
              Cadastrar
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
