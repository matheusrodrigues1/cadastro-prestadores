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
  const [prestadoresExibidos, setPrestadoresExibidos] = useState<Prestador[]>([]);
  const prestadoresPorPagina = 6;
  const [paginaAtual, setPaginaAtual] = useState<number>(1);

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

  useEffect(() => {
    const startIndex = (paginaAtual - 1) * prestadoresPorPagina;
    const endIndex = startIndex + prestadoresPorPagina;
    setPrestadoresExibidos(prestadores.slice(startIndex, endIndex));
  }, [prestadores, paginaAtual]);

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
      <div className='flex flex-1 flex-col justify-center pl-20 gap-10 text-white  h-screen w-screen bg-stone-900'>
        <h1 className='text-4xl'>Lista de Prestadores</h1>
        <table className='table-auto mr-10 bg-black'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Nome</th>
              <th className='px-4 py-2'>Email</th>
              <th className='px-4 py-2'>Telefone</th>
              <th className='px-4 py-2'>Serviço</th>
              <th className='px-4 py-2'>Descrição</th>
              <th className='px-4 py-2'>Valor</th>
            </tr>
          </thead>
          <tbody>
            {prestadoresExibidos.map((prestador) => (
              <tr key={prestador.id}>
                <td className='border px-4 py-2'>{prestador.nome}</td>
                <td className='border px-4 py-2'>{prestador.email}</td>
                <td className='border px-4 py-2'>{prestador.telefone}</td>
                <td className='border px-4 py-2'>{prestador.nome_servico}</td>
                <td className='border px-4 py-2'>{prestador.descricao}</td>
                <td className='border px-4 py-2'>{prestador.valor}</td>
                <td onClick={() => handleDelete(prestador.id)} className='border bg-red-600 border-black px-4 py-2'>
                  <button>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-4 flex justify-center'>
          <button
            className='mr-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded'
            onClick={() => setPaginaAtual(paginaAtual - 1)}
            disabled={paginaAtual === 1}
          >
            Anterior
          </button>
          <button
            className='px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded'
            onClick={() => setPaginaAtual(paginaAtual + 1)}
            disabled={paginaAtual * prestadoresPorPagina >= prestadores.length}
          >
            Próximo
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
