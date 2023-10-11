import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { z, ZodError } from 'zod';

interface FormValues {
  servico_nome: string;
  servico_descricao: string;
  servico_valor: string;
}

const schemaForm = z.object({
  servico_nome: z.string(),
  servico_descricao: z.string(),
  servico_valor: z.string(),
});

function Servicos() {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: {
      servico_nome: "",
      servico_descricao: "",
      servico_valor: "",
    }
  });

  const handleFormSubmit = async (data: FormValues) => {
    try {
      await schemaForm.validateAsync(data);


      await axios.post('http://127.0.0.1:8000/api/prestadores', data);
      
      console.log("Formulário enviado com sucesso!");
      reset();

    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de validação:", error.errors);
      } else {
        console.error("Erro ao enviar formulário:", error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-1 justify-center items-center h-screen w-screen bg-stone-900">
        <div className="flex flex-col rounded-3xl justify-center items-center gap-14 p-64 bg-gray-50 h-96 w-96">
          <h1 className="text-3xl font-bold whitespace-nowrap">Cadastrar Serviço</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col w-96 gap-2" encType="multipart/form-data">
            <input type="text" {...register('servico_nome')} placeholder="NOME DO SERVIÇO" className="p-3 rounded-xl bg-zinc-900 text-gray-50" />
            {errors.servico_nome?.message && <span className="text-red-500 text-sm">{errors.servico_nome.message}</span>}

            <input type="text" {...register('servico_descricao')} placeholder="DESCRIÇÃO DO SERVIÇO" className="p-3 rounded-xl bg-zinc-900 text-gray-50" />
            {errors.servico_descricao?.message && <span className="text-red-500 text-sm">{errors.servico_descricao.message}</span>}

            <input type="tel" {...register('servico_valor')} placeholder="VALOR DO SERVIÇO" className="p-3 rounded-xl bg-zinc-900 text-gray-50" />
            {errors.servico_valor?.message && <span className="text-red-500 text-sm">{errors.servico_valor.message}</span>}

            <button type="submit" className="p-5 mt-5 rounded-xl bg-blue-700 text-gray-50">CONTINUAR</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Servicos;
