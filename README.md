# React + Vite

# Consulta de CEP React

Esta aplicação é um formulário em React para buscar e conferir CEPs (Códigos de Endereçamento Postal) usando a API ViaCEP. O formulário permite buscar o endereço por CEP ou por cidade e estado, e também possui um botão para limpar os dados do formulário.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **React Hook Form**: Biblioteca para gerenciamento de formulários em React.
- **Vite**: Ferramenta de build rápida para projetos web modernas, usada para inicializar o projeto React.
- **CSS**: Para estilização da aplicação, garantindo uma interface limpa e centralizada.
- ![image](https://github.com/user-attachments/assets/dd6e9393-3842-496e-bb4c-cdab4f386285)


## Funcionalidades

- **Busca por CEP**: Permite a busca de endereço ao digitar um CEP válido.
- **Busca por Cidade e Estado**: Permite a busca de CEPs ao digitar o nome da cidade e o estado.
- **Limpar Formulário**: Um botão para limpar todos os campos do formulário.
- **Validação e Tratamento de Erros**: Valida a entrada do usuário e trata erros, como CEP não encontrado.
- ![image](https://github.com/user-attachments/assets/fbbf4cb4-bca4-4a43-8aec-ea5d79e6b69d)


## Como Executar

1. Clone o repositório:
    ```bash
    git clone https://github.com/teofilonicolau/consulta_cep_react.git
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd consulta_cep_react
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

5. Abra o navegador e acesse:
    ```
    http://localhost:5173/
    ```

## Estrutura do Projeto

```plaintext
consulta_cep_react
├── public
│   └── index.html
├── src
│   ├── components
│   │   └── FormularioCEP.js
│   ├── styles
│   │   └── App.css
│   ├── App.js
│   └── index.js
├── package.json
└── vite.config.js
