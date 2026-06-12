# 🚗 CarrosApp — Frontend

App mobile desenvolvido com **React Native + Expo** para gerenciamento de carros (CRUD).

---

## 📋 Pré-requisitos

- Node.js instalado
- Expo Go instalado no celular (SDK 56)

---

## ▶️ Como rodar

1. Clone o repositório:
   git clone https://github.com/Otavio322/CarrosAppFrontEnd.git

2. Entre na pasta:
   cd CarrosApp

3. Instale as dependências:
   npm install

4. Inicie o projeto:
   npx expo start

5. Escaneie o QR Code com o **Expo Go** no celular

---

## ⚙️ Configuração da API

O app já está configurado para consumir o backend em produção.

No arquivo `service/api.js`:

const BASE_URL = "https://carrosappbackend.onrender.com/api";

> Para rodar localmente, troque pela URL:
> http://SEU_IP_LOCAL:3000/api
> 💡 Descubra seu IP com `ipconfig` no terminal

---

## 📁 Estrutura

CarrosApp/
├── src/
│ ├── app/ # Telas
│ └── components/ # CarroCard e CarroForm
├── service/
│ └── api.js # Conexão com o backend
└── README.md

---

## 🔗 Links

- **Backend (API):** https://github.com/Otavio322/CarrosAppBackend
- **Deploy backend:** https://carrosappbackend.onrender.com
