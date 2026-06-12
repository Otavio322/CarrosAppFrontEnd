# 🚗 CarrosApp — Frontend

App mobile desenvolvido com **React Native + Expo** para gerenciamento de carros (CRUD).

---

## 📋 Pré-requisitos

- Node.js instalado
- Expo Go instalado no celular

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

No arquivo `service/api.js`, troque o IP pelo do seu computador:

```js
const BASE_URL = "http://SEU_IP_AQUI:3000/api";
```

> 💡 Para descobrir seu IP: rode `ipconfig` no terminal e copie o **Endereço IPv4**

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

## 🔗 Backend

Repositório do backend: _link aqui após criar_
