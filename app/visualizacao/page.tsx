'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Prestador {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  nome_servico: string;
  descricao: string;
  valor: string;
}

const Page = () => {
  const [prestadores, setPrestadores] = useState<Prestador[]>([]);

  const fetchPrestadores = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/prestadores');
      setPrestadores(response.data);
    } catch (error) {
      console.error('Erro ao buscar prestadores:', error);
    }
  };

  useEffect(() => {
    fetchPrestadores();
  
    const intervalId = setInterval(fetchPrestadores, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/prestadores/${id}`);
      fetchPrestadores();
      console.log('Prestador excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir prestador:', error);
    }
  };

  return (
    <>
      <div>
        <h1>Lista de Prestadores</h1>
        <ul>
          {prestadores.map((prestador) => (
            <li key={prestador.id}>
              {prestador.nome} - {prestador.email} - {prestador.telefone} - {prestador.nome_servico} - {prestador.descricao} - {prestador.valor}
              <button onClick={() => handleDelete(prestador.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Page;
