'use client'

import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { number, z, ZodError } from 'zod';
import { useRouter } from "next/navigation";

interface FormValues {
  nome: string;
  email: string;
  telefone: string;
  foto?: FileList | null;
  nome_servico: string;
  descricao: string;
  valor: string;
}

const schemaForm = z.object({
  nome: z.string().min(3, 'Nome é obrigatório e deve ter pelo menos 3 caracteres.').max(255),
  email: z.string().email('Email é obrigatório e deve ser válido.'),
  telefone: z.string().min(6, 'Telefone é obrigatório e deve ter pelo menos 6 caracteres.').max(20),
  nome_servico: z.string().min(5, "Nome obrigatório!"),
  descricao: z.string().min(5, "Descrição obrigatório!").max(200),
  valor: z.string(),
});


export default function Cadastrar({}) {
  
    // const router = useRouter()
    const { handleSubmit, register, formState: { errors }, reset } = useForm<FormValues>({
      defaultValues: {
        nome: "",
        email: "",
        telefone: "",
        foto: null,
        nome_servico: "",
        descricao: "",
        valor: "",
      }
    });
  
    const handleFormSubmit = async (data: FormValues) => {
      try {
        schemaForm.parse(data);
        const formData = new FormData();
        if (data.foto && data.foto.length > 0) {
          const foto: File = data.foto[0];
          formData.append('foto', foto);
        }

        formData.append('nome', data.nome);
        formData.append('email', data.email);
        formData.append('telefone', data.telefone);
        formData.append('valor', data.valor.toString());
        formData.append('nome_servico', data.nome_servico);
        formData.append('descricao', data.descricao);

        await axios.post('http://127.0.0.1:8000/api/prestadores', formData);
        console.log("Formulário enviado com sucesso!");
        reset();
        const inputs = document.querySelectorAll<HTMLInputElement>('input[type="text"], input[type="email"], input[type="tel"]');
        inputs.forEach(input => {
          input.value = '';
        });

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
      <div className="flex w-full justify-center border-transparent items-center bg-stone-900">
        <div className="flex flex-col rounded-2xl pl-10 pr-10 pb-3 pt-2 justify-center items-center gap-7 bg-slate-100">
          <h1 className="text-3xl font-bold whitespace-nowrap">Cadastrar Prestador</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-1" encType="multipart/form-data">
            
            <input type="file" {...register('foto')} className="p-2 rounded-e bg-zinc-900 text-gray-50" />
            <input type="text" {...register('nome')} placeholder="NOME" className="p-2 rounded-e bg-zinc-900 text-gray-50" />
            {errors.nome?.message && <span className="text-red-500 text-sm">{errors.nome.message}</span>}

            <input type="email" {...register('email')} placeholder="EMAIL" className="p-2 rounded-e bg-zinc-900 text-gray-50" />
            {errors.email?.message && <span className="text-red-500 text-sm">{errors.email.message}</span>}

            <input type="tel" {...register('telefone')} placeholder="TELEFONE" className="p-2 rounded-e bg-zinc-900 text-gray-50" />
            {errors.telefone?.message && <span className="text-red-500 text-sm">{errors.telefone.message}</span>}

            <input type="text" {...register('nome_servico')} placeholder="NOME DO SERVIÇO" className="p-2 rounded-e bg-zinc-900 text-gray-50" />
            {errors.nome_servico?.message && <span className="text-red-500 text-sm">{errors.nome_servico.message}</span>}

            <input type="text" {...register('descricao')} placeholder="DESCRIÇÃO" className="p-4 rounded-e bg-zinc-900 text-gray-50" />
            {errors.descricao?.message && <span className="text-red-500 text-sm">{errors.descricao.message}</span>}

            <input type="number" {...register('valor')} placeholder="VALOR" className="p-2 rounded-e bg-zinc-900 text-gray-50" />
            {errors.valor?.message && <span className="text-red-500 text-sm">{errors.valor.message}</span>}


            <button type="submit" className="p-2 mt-3 rounded-e bg-blue-700 text-gray-50">CADASTRAR</button>
          </form>
        </div>
      </div>
    </>
  );
}

