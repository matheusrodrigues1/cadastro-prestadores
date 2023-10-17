'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface FormData {
  file: FileList;
}

function Page() {
  const { register, handleSubmit } = useForm<FormData>();

  const handleCSVSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append('file', data.file[0]);

      await axios.post('http://127.0.0.1:8000/api/import', formData);

      console.log('CSV importado com sucesso!');
    } catch (error) {
      console.error('Erro ao importar CSV:', error);
    }
  };

  return (
    <>
      <div  className='flex flex-1 justify-center items-center h-screen w-screen bg-stone-900'>
        <form onSubmit={handleSubmit(handleCSVSubmit)} className='flex bg-gray-50 p-10 rounded-3xl gap-5 flex-col justify-center items-center' encType="multipart/form-data">
          <input type="file" {...register('file')} />
          <button type="submit" className='pt-4 pb-4 pl-40 pr-40 mt-3 rounded-xl bg-blue-700 text-gray-50'>Importar</button>
        </form>
      </div>
    </>
  );
}

export default Page;
