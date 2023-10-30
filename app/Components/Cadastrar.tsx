'use client'

import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { number, z, ZodError } from 'zod';

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
      <div className="flex border-none w-screen h-screen justify-center pt-10 lg:pt-7 items-start bg-gray-200">
        <div className="flex flex-col py-2 lg:py-5 px-5 lg:px-16 rounded-2xl justify-center items-center gap-4 bg-gray-50">
          <h1 className="font-bold text-lg lg:text-3xl whitespace-nowrap">Cadastrar Prestador</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-1" encType="multipart/form-data">
            
            <input type="file" {...register('foto')} placeholder="Escolher uma imagem" className="p-1 lg:p-2 w-52 lg:w-80 rounded-e bg-zinc-900 text-gray-50" />
            <input type="text" {...register('nome')} placeholder="NOME" className="p-1 lg:p-2 w-52 lg:w-80 rounded-e bg-zinc-900 text-gray-50" />
            {errors.nome?.message && <span className="text-red-500 text-sm">{errors.nome.message}</span>}

            <input type="email" {...register('email')} placeholder="EMAIL" className="p-1 lg:p-2 w-52 lg:w-80 rounded-e bg-zinc-900 text-gray-50" />
            {errors.email?.message && <span className="text-red-500 text-sm">{errors.email.message}</span>}

            <input type="tel" {...register('telefone')} placeholder="TELEFONE" className="p-1 lg:p-2 w-52 lg:w-80 rounded-e bg-zinc-900 text-gray-50" />
            {errors.telefone?.message && <span className="text-red-500 text-sm">{errors.telefone.message}</span>}

            <input type="text" {...register('nome_servico')} placeholder="NOME DO SERVIÇO" className="p-1 lg:p-2 w-52 lg:w-80 rounded-e bg-zinc-900 text-gray-50" />
            {errors.nome_servico?.message && <span className="text-red-500 text-sm">{errors.nome_servico.message}</span>}

            <input type="text" {...register('descricao')} placeholder="DESCRIÇÃO" className="p-2 w-52 lg:w-80 rounded-e bg-zinc-900 text-gray-50" />
            {errors.descricao?.message && <span className="text-red-500 text-sm">{errors.descricao.message}</span>}

            <input type="number" {...register('valor')} placeholder="VALOR" className="p-1 lg:p-2 w-52 lg:w-80 rounded-e bg-zinc-900 text-gray-50" />
            {errors.valor?.message && <span className="text-red-500 text-sm">{errors.valor.message}</span>}


            <button type="submit" className="p-1 lg:p-2 w-52 lg:w-80 mt-3 rounded-e bg-blue-700 text-gray-50">CADASTRAR</button>
          </form>
        </div>
      </div>
    </>
  );
}

