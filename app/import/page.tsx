'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface FormData {
  file: FileList;
}

function Page() {
  const { register, handleSubmit } = useForm<FormData>();
  const [isSuccessVisible, setSuccessVisible] = useState(false);


  const handleCSVSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append('file', data.file[0]);

      await axios.post('http://127.0.0.1:8000/api/import', formData);

      setSuccessVisible(true);

      setTimeout(() => {
        setSuccessVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Erro ao importar CSV:', error);
    }
  };

  return (
    <>
      <div  className='flex flex-1 justify-center items-start pt-24 h-screen w-screen bg-gray-200'>
        <form onSubmit={handleSubmit(handleCSVSubmit)} className='flex bg-gray-50 w-[100%] pt-1 rounded-3xl gap-2 flex-col justify-center items-center' encType="multipart/form-data">
          <input type="file" {...register('file')} className='mt-2 text-sm' />
          <button type="submit" className='py-2 px-9 rounded-xl bg-blue-700 text-gray-50 mb-2'>{isSuccessVisible ? "IMPORTADO COM SUCESSO!" : "IMPORTAR"}</button>
        </form>
      </div>
    </>
  );
}

export default Page;
