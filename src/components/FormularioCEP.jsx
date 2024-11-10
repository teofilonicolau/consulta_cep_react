import React from 'react';
import { useForm } from 'react-hook-form';  // Importa useForm do react-hook-form

// Define o componente de formulário
const FormularioCEP = () => {
  const { register, handleSubmit, setValue, setFocus, reset, getValues } = useForm();  // Inicializa os hooks do formulario

  // Funçao para buscar o endereço pelo CEP
  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');  // Remove caracteres não numericos do CEP
    if (cep.length === 8) {  // Verifica se o CEP tem 8 digitos
      fetch(`/api/ws/${cep}/json/`)  // Faz a chamada a API usando o proxy
        .then(res => res.json())
        .then(dados => {
          if (dados.erro) {
            alert('CEP não encontrado.');  // Exibe alerta se o CEP não for encontrado
            return;
          }
          // Define os valores dos campos do formulario com os dados retornados
          setValue('address', dados.logradouro);
          setValue('neighborhood', dados.bairro);
          setValue('city', dados.localidade);
          setValue('uf', dados.uf);
          setFocus('enderecoNumero');  // Define o foco no campo de número do endereço
        })
        .catch(error => {
          console.error("Erro ao buscar o CEP:", error);  // Exibe erro no console
        });
    }
  };

  // Função para buscar o CEP e endereço pela cidade e estado
  const checkByCityAndState = () => {
    const { city, uf } = getValues();  // Obtem os valores dos campos de cidade e estado
    const formattedCity = city.trim().toLowerCase();  // Formata a cidade em minúsculas
    const formattedUF = uf.trim().toUpperCase();  // Formata o estado em maiúsculas
    
    fetch(`/api/ws/${formattedUF}/${formattedCity}/json/`)  // Faz a chamada a API usando o proxy
      .then(res => res.json())
      .then(dados => {
        if (dados.erro || dados.length === 0) {
          alert('Cidade e Estado não encontrados.');  // Exibe alerta se a cidade e estado nao forem encontrados
          return;
        }
        // Define os valores dos campos do formulário com os dados retornados
        setValue('cep', dados[0].cep);
        setValue('address', dados[0].logradouro);
        setValue('neighborhood', dados[0].bairro);
        setValue('city', dados[0].localidade);
        setValue('uf', dados[0].uf);
        setFocus('enderecoNumero');  // Define o foco no campo de número do endereço
      })
      .catch(error => {
        console.error("Erro ao buscar o CEP por cidade e estado:", error);  // Exibe erro no console
      });
  };

  // Função para lidar com o envio do formulario
  const onSubmit = (data) => {
    console.log('Dados do Formulário: ', data);  // Exibe os dados do formulário no console
  };

  // Função para limpar o formulario
  const clearForm = () => {
    reset();  // Limpa todos os campos do formulario
  };

  return (
    // Renderiza o formulário com os campos e botões
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="CEP" {...register('cep')} onBlur={checkCEP} />
      <input type="text" placeholder="Cidade" {...register('city')} />
      <input type="text" placeholder="Estado" {...register('uf')} />
      <button type="button" onClick={checkByCityAndState}>Buscar CEP</button>
      <input type="text" placeholder="Endereço" {...register('address')} />
      <input type="text" placeholder="Bairro" {...register('neighborhood')} />
      <input type="text" placeholder="Número" {...register('enderecoNumero')} />
      <button type="submit">Enviar</button>
      <button type="button" onClick={clearForm}>Limpar</button>
    </form>
  );
};

export default FormularioCEP;  // Exporta o componente FormularioCEP como padrão
