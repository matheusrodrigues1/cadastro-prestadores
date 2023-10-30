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
      <div className='flex flex-col p-5 h-screen bg-gray-100'>
        <h1 className='text-xl mb-2'>Lista de Prestadores</h1>

        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className='w-full'>
            <thead className='bg-gray-50 border-b-2 border-gray-20'>
              <tr>
                <th className='p-3 text-sm font-semibold tracking-wid text-left'>Nome</th>
                <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Telefone</th>
                <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Serviço</th>
                <th className='w-32 p-3 text-sm font-semibold tracking-wide text-left'>Valor</th>
                <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'> </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {prestadoresExibidos.map((prestador) => (
                <tr key={prestador.id} >
                  <td className='p-3 whitespace-nowrap text-sm text-gray-700'>{prestador.nome}</td>
                  <td className='p-3 whitespace-nowrap text-sm text-gray-700'>{prestador.telefone}</td>
                  <td className='p-3 whitespace-nowrap text-sm text-gray-700'>{prestador.nome_servico}</td>
                  <td className='p-3 whitespace-nowrap text-sm text-gray-700'>R$ {prestador.valor}</td>
                  <td onClick={() => handleDelete(prestador.id)} className='whitespace-nowrap p-3 text-sm text-gray-700'>
                    <button className='bg-red-600 p-1 border rounded text-gray-200'>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          <div className="bg-white space-y-3 p-4 rounded-lg shadow">
            {prestadoresExibidos.map((prestador) => (
              <div key={prestador.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold">{prestador.nome}</p>
                  <p className="text-xs text-gray-500">{prestador.nome_servico}</p>
                </div>
                <p className="text-sm font-semibold">{prestador.telefone}</p>
                <p className="text-sm font-semibold">R$ {prestador.valor}</p>
                <button className='bg-red-600 p-1 border rounded text-gray-200' onClick={() => handleDelete(prestador.id)}>Excluir</button>
              </div>
            ))}
          </div>
        </div>


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
