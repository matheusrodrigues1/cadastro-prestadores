import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface FormValues {
  servico_nome: string;
  servico_descricao: string;
  servico_valor: string;
}

function Servicos() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Enviar dados do serviço para o servidor
      const response = await axios.post('http://127.0.0.1:8000/api/servicos', data);

      // Associar o serviço ao prestador usando o ID do serviço retornado pelo servidor
      const servicoId = response.data.id;
      // Substitua o ID do prestador pelo valor correto
      const prestadorId = response.data.id;
      await axios.post(`http://127.0.0.1:8000/api/prestador-servico`, {
        prestador_id: prestadorId,
        servico_id: servicoId,
      });

      console.log('Serviço cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar serviço:', error);
    }
  };

  return (
    <>
      <h1>Cadastrar Serviço</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nome do Serviço:
          <input type="text" {...register('servico_nome', { required: 'Campo obrigatório' })} />
          {errors.servico_nome && <span>{errors.servico_nome.message}</span>}
        </label>
        <label>
          Descrição do Serviço:
          <textarea {...register('servico_descricao', { required: 'Campo obrigatório' })} />
          {errors.servico_descricao && <span>{errors.servico_descricao.message}</span>}
        </label>
        <label>
          Valor do Serviço:
          <input type="number" {...register('servico_valor', { required: 'Campo obrigatório' })} />
          {errors.servico_valor && <span>{errors.servico_valor.message}</span>}
        </label>
        <button type="submit">Cadastrar Serviço</button>
      </form>
    </>
  );
}

export default Servicos;
