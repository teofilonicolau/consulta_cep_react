import React from 'react';
import { useForm } from 'react-hook-form';

const FormularioCEP = () => {
  const { register, handleSubmit, setValue, setFocus, reset, getValues } = useForm();

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      fetch(`/api/ws/${cep}/json/`)
        .then(res => res.json())
        .then(dados => {
          if (dados.erro) {
            alert('CEP não encontrado.');
            return;
          }
          setValue('address', dados.logradouro);
          setValue('neighborhood', dados.bairro);
          setValue('city', dados.localidade);
          setValue('uf', dados.uf);
          setFocus('enderecoNumero');
        })
        .catch(error => {
          console.error("Erro ao buscar o CEP:", error);
        });
    }
  };

  const checkByCityAndState = () => {
    const { city, uf } = getValues();
    const formattedCity = city.trim().toLowerCase();
    const formattedUF = uf.trim().toUpperCase();
    
    fetch(`/api/ws/${formattedUF}/${formattedCity}/json/`)
      .then(res => res.json())
      .then(dados => {
        if (dados.erro || dados.length === 0) {
          alert('Cidade e Estado não encontrados.');
          return;
        }
        setValue('cep', dados[0].cep);
        setValue('address', dados[0].logradouro);
        setValue('neighborhood', dados[0].bairro);
        setValue('city', dados[0].localidade);
        setValue('uf', dados[0].uf);
        setFocus('enderecoNumero');
      })
      .catch(error => {
        console.error("Erro ao buscar o CEP por cidade e estado:", error);
      });
  };

  const onSubmit = (data) => {
    console.log('Dados do Formulário: ', data);
  };

  const clearForm = () => {
    reset();
  };

  return (
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

export default FormularioCEP;
