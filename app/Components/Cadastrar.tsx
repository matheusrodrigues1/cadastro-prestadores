'use client'

import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { z, ZodError } from 'zod';
import { useRouter } from "next/navigation";

interface FormValues {
  nome: string;
  email: string;
  telefone: string;
  foto?: FileList | null;
}

const schemaForm = z.object({
  nome: z.string().min(3, 'Nome é obrigatório e deve ter pelo menos 3 caracteres.').max(255),
  email: z.string().email('Email é obrigatório e deve ser válido.'),
  telefone: z.string().min(6, 'Telefone é obrigatório e deve ter pelo menos 6 caracteres.').max(20),
});


export default function Cadastrar({}) {
  
    const router = useRouter()
    const { handleSubmit, register, formState: { errors }, reset } = useForm<FormValues>({
      defaultValues: {
        nome: "",
        email: "",
        telefone: "",
        foto: null,
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

        await axios.post('http://127.0.0.1:8000/api/prestadores', formData);
        console.log("Formulário enviado com sucesso!");

        router.push('/servicos')
        reset();
        const inputs = document.querySelectorAll<HTMLInputElement>('input[type="text"], input[type="email"], input[type="tel"]');
        inputs.forEach(input => {
          input.value = '';
        });

      } catch (error) {
        if (error instanceof ZodError) {
          console.error("Erro de validação:", error.errors);
          console.log(errors.nome);
          console.log(errors.email);
          console.log(errors.telefone);
        } else {
          console.error("Erro ao enviar formulário:", error);
        }
      }
    };

  return (
    <>
      <div className="flex flex-1 justify-center items-center h-screen w-screen bg-stone-900">
        <div className="flex flex-col rounded-3xl justify-center items-center gap-14 p-64 bg-gray-50 h-96 w-96">
          <h1 className="text-3xl font-bold whitespace-nowrap">Cadastrar Prestador</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-2" encType="multipart/form-data">
            
            <input type="file" {...register('foto')} className="p-3 rounded-xl bg-zinc-900 text-gray-50" />
            <input type="text" {...register('nome')} placeholder="NOME" className="p-3 rounded-xl bg-zinc-900 text-gray-50" />
            {errors.nome?.message && <span className="text-red-500 text-sm">{errors.nome.message}</span>}

            <input type="email" {...register('email')} placeholder="EMAIL" className="p-3 rounded-xl bg-zinc-900 text-gray-50" />
            {errors.email?.message && <span className="text-red-500 text-sm">{errors.email.message}</span>}

            <input type="tel" {...register('telefone')} placeholder="TELEFONE" className="p-3 rounded-xl bg-zinc-900 text-gray-50" />
            {errors.telefone?.message && <span className="text-red-500 text-sm">{errors.telefone.message}</span>}

            <button type="submit" className="p-5 mt-5 rounded-xl bg-blue-700 text-gray-50">CONTINUAR</button>
          </form>
        </div>
      </div>
    </>
  );
}

