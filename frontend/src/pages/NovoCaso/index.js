import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg'
import './styles.css';

export default function NovoCaso() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  async function handleNovoCaso(e) {
    e.preventDefault();

    const data = {
      titulo,
      descricao,
      valor
    };

    try {
      await api.post('casos', data, {
        headers: {
          Authorization: ongId,
        }
      })
      //alert(`Seu ID de acesso: ${response.data.id}`);

      history.push('/profile');
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="novo-caso-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the hero" />

          <h1>Cadastrar novo caso</h1>
          <p>Cadastre o caso</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form>
          <input 
            placeholder="Título do caso"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          />
          <textarea 
            placeholder="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />
          <input 
            placeholder="Valor em reais"
            value={valor}
            onChange={e => setValor(e.target.value)}
          />

          <button className="button" type="submit" onClick={handleNovoCaso}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
}