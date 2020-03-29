import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg'
import './styles.css';

export default function Profile() {
  const history = useHistory();

  const [casos, setCasos] = useState([]);
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setCasos(response.data);
    })
  }, [ongId]);

  async function handleDeleteCaso(id) {
    try {
      await api.delete(`casos/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setCasos(casos.filter(x => x.id !== id));
    } catch (err) {
      alert('Erro ao deletar, tente novamente.')
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the hero" />
        <span>Bem vinda, {ongName} </span>

        <Link className="button" to="/casos/new">Cadastrar novo caso </Link>
        <button type="button">
          <FiPower onClick={handleLogout} size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {casos.map(caso => (
          <li key={caso.id}>
            <strong>Caso:</strong>
            <p>{caso.titulo}</p>

            <strong>Descrição:</strong>
            <p>{caso.descricao}</p>

            <strong>Valor:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.valor)}</p>

            <button onClick={() => handleDeleteCaso(caso.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}