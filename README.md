# Galeria de Cards com React e Firebase

Este é um projeto front-end que permite aos usuários navegar por uma galeria de cards, favoritá-los e criar álbuns personalizados. A aplicação utiliza React para a interface, Firebase para autenticação e banco de dados em tempo real, e dnd-kit para funcionalidades de arrastar e soltar.

## ✨ Funcionalidades

- **Autenticação de Usuário:**
  - Login e Cadastro com E-mail e Senha.
  - Login com um clique usando a conta do Google.
  - Rotas protegidas que só podem ser acessadas por usuários autenticados.
- **Galeria Principal:**
  - Exibição de uma lista de 12 cards pré-definidos.
  - Botão para favoritar cards, que são salvos em um álbum especial de "Favoritos".
- **Galeria do Usuário ("Minha Galeria"):**
  - Visualização de todos os álbuns criados, incluindo o de Favoritos.
  - Renderização de título e descrição dos álbuns com suporte a **Markdown**.
- **Gerenciamento de Álbuns:**
  - Criação de novos álbuns personalizados.
  - Edição de título e descrição de álbuns existentes.
  - Remoção de álbuns.
- **Gerenciamento de Cards dentro dos Álbuns:**
  - Modal unificado com sistema de "passos" para gerenciar e adicionar cards.
  - Adição de novos cards aos álbuns.
  - Remoção de cards existentes.
  - Reordenação de cards com funcionalidade de **Arrastar e Soltar (Drag and Drop)**.

## 🚀 Tecnologias Utilizadas

- **Frontend:** React (com Vite)
- **Roteamento:** React Router DOM
- **Estilização:** Tailwind CSS & Material Tailwind
- **Backend como Serviço (BaaS):**
  - **Firebase Authentication:** Para gerenciamento de usuários.
  - **Cloud Firestore:** Como banco de dados NoSQL para salvar informações dos álbuns e favoritos.
- **Drag and Drop:** dnd-kit
- **Renderização de Markdown:** react-markdown

## 📂 Estrutura do Projeto

```
galeria-de-cards-reactjs-firebase/
      ├── src/
      │    ├── assets/
      │    │   └── Icones.jsx
      │    ├── components/
      │    │   ├── AddCardsModal.jsx
      │    │   ├── BookingCard.jsx
      │    │   ├── CardModal.jsx
      │    │   ├── EditAlbumModal.jsx
      │    │   ├── ManageCardsModal.jsx
      │    │   ├── MiniCard.jsx
      │    │   ├── RotaPrivada.jsx
      │    │   ├── SelectableCard.jsx
      │    │   └── SortableCard.jsx
      │    ├── routes/
      │    │   ├── Cadastro.jsx
      │    │   ├── Cards.jsx
      │    │   ├── Galeria.jsx
      │    │   └── Login.jsx
      │    ├── mocks/
      │    │   └── cardData.js
      │    ├── App.jsx
      │    ├── index.css
      │    ├── main.jsx
      │    └── firebase.js
      ├── tailwind.config.js
      ├── postcss.config.js
      ├── package.json
      ├── vite.config.js
      ├── eslint.config.js
      ├── .env
      └── README.md
```

## 🔧 Instalação e Configuração

Siga os passos abaixo para executar o projeto em seu ambiente local.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- `npm` ou `yarn`

### 1\. Clonar o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd react-firebase-app
```

### 2\. Instalar as Dependências

```bash
npm install
# ou
yarn install
```

### 3\. Configurar o Firebase

Este projeto requer um projeto Firebase para funcionar.

1. Acesse o [Console do Firebase](https://console.firebase.google.com/).

2. Clique em **"Adicionar projeto"** e siga as instruções.

3. No painel do seu novo projeto, vá para a seção **Authentication**.

      - Clique na aba **"Sign-in method"**.
      - Ative os provedores **"E-mail/senha"** e **"Google"**.

4. Ainda no painel, vá para a seção **Firestore Database**.

      - Clique em **"Criar banco de dados"**.
      - Inicie em **modo de produção** (production mode).
      - Na aba **"Regras" (Rules)**, cole as seguintes regras para garantir que os usuários só possam acessar seus próprios dados. **Este passo é crucial para a segurança\!**

        ```
        rules_version = '2';
        service cloud.firestore {
          match /databases/{database}/documents {
            // Permite que usuários autenticados leiam e escrevam apenas em seus próprios documentos
            match /users/{userId}/{document=**} {
              allow read, write: if request.auth != null && request.auth.uid == userId;
            }
          }
        }
        ```

5. Volte para a página principal do seu projeto no Firebase, clique no ícone de engrenagem e vá para **"Configurações do projeto"**.

6. Na seção **"Seus apps"**, clique no ícone da web (`</>`) para registrar um novo app da web.

7. Dê um nome ao seu app e clique em **"Registrar app"**.

8. O Firebase fornecerá um objeto de configuração. Copie este objeto.

9. No seu projeto, abra o arquivo reponsável pelas variáveis de ambiente(`.env`) e substitua o conteúdo das variáveis pelas suas credenciais:

```conf
  # API Firebase Config

  VITE_FIREBASE_API_KEY= # Cole sua "API Key" aqui
  VITE_FIREBASE_AUTH_DOMAIN= # Cole seu "Auth Domain" aqui
  VITE_FIREBASE_PROJECT_ID= # Cole seu "Project ID" aqui
  VITE_FIREBASE_STORAGE_BUCKET= # Cole seu "Storage Bucket" aqui
  VITE_FIREBASE_MESSAGING_SENDER_ID= # Cole seu "Messaging Sender ID" aqui
  VITE_FIREBASE_APP_ID= # Cole seu "App ID" aqui
  VITE_MEASUREMENT_ID= # Cole seu "Measurement ID" aqui
```

### 4\. Executar o Projeto

Com tudo configurado, inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) (ou a porta indicada no seu terminal) para ver a aplicação funcionando.

## 📸 Screenshots

**Tela de Login**


**Galeria de Cards**


**Gerenciamento de Álbuns**


-----
