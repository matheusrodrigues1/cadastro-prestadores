'use client'

import { useForm } from "react-hook-form";

export default function Cadastrar({}) {

  const { handleSubmit, register, formState: {errors} } = useForm()

  const handleFormSubmit = (data) => {
    console.log(data);

  }

  return (
    <>
      <div className="flex flex-1 justify-center items-center h-screen w-screen bg-stone-900">
        <div className="flex flex-col rounded-3xl justify-center items-center gap-20 p-72 bg-gray-50 h-96 w-96">
          <h1 className="text-3xl font-bold">Cadastrar</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-2">
            <input type="text" {...register('zipCode')} placeholder="NOME" className="p-3 rounded-xl bg-zinc-900 text-gray-50"/>
            <input type="email" {...register('zipCode')} placeholder="EMAIL"className="p-3 rounded-xl bg-zinc-900 text-gray-50"/>
            <input type="tel" {...register('zipCode')} placeholder="TELEFONE"className="p-3 rounded-xl bg-zinc-900 text-gray-50"/>
            <input type="file" {...register('zipCode')} maxLength={9} className="p-3 rounded-xl bg-zinc-900 text-gray-50"/>

            <button type="submit" className="p-3 rounded-xl bg-blue-700 text-gray-50">Cadastrar serviço</button>
          </form>
        </div>
      </div>
    </>
  );
}

