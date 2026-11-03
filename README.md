# 🍃 EcoFood - Plataforma Digital de Conexão Sustentável

> Tecnologia que aproxima estabelecimentos, consumidores e comunidade.
> 

---

## 📋 Sobre o Projeto

O **EcoFood** é uma plataforma digital mobile desenvolvida como **Produto Mínimo Viável (MVP)** para a disciplina *Projeto Integrador I*, do 2º Período do Curso de Análise e Desenvolvimento de Sistemas (Goiânia - GO / 2026).

### 🚨 O Problema
Diariamente, restaurantes, padarias e mercados enfrentam o descarte de refeições frescas e de alta qualidade produzidas no dia, mas não vendidas até o fim do expediente. Esse descarte gera prejuízo financeiro aos comerciantes e impacto ambiental. Ao mesmo tempo, grande parte da população enfrenta dificuldades no acesso a refeições de qualidade a preços acessíveis.

### 💡 A Solução
O EcoFood conecta esses dois públicos por meio de um aplicativo mobile focado na venda de **excedente diário de alimentos** ("Comida Inteligente") com descontos significativos. 

#### Principais Características:
* **Modelo Takeaway (Retirada no Local):** Sem serviço de entregadores; o cliente faz a reserva e retira a refeição diretamente no estabelecimento.
* **Geolocalização (Raio de 5 km):** Algoritmo que filtra ofertas próximas para facilitar o deslocamento rápido.
* **Estoque em Tempo Real:** Atualização instantânea com bloqueio temporário (5 a 15 minutos) durante a reserva para evitar *overbooking*.
* **Validação por QR Code:** Sistema prático e seguro de confirmação da entrega no balcão.
* **Impacto Social e Gamificação:** Concessão do *Selo EcoFood Parceiro Sustentável* aos lojistas e sistema de conquistas por níveis (Bronze, Prata, Ouro e Diamante) aos consumidores.

---

## 🛠️ Tecnologias Utilizadas

* **Front-end / Mobile:** [React Native](https://reactnative.dev/) (Multiplataforma: iOS e Android)
* **Back-end / Serviços em Nuvem:** [Firebase](https://firebase.google.com/) (Autenticação, Banco de Dados NoSQL em tempo real e Storage)
* **APIs de Terceiros:** Serviços de Geolocalização e Exibição de Mapas Interativos

---

## 🚀 Passo a Passo para Rodar o Projeto Localmente

Siga as instruções abaixo para configurar e executar o ambiente de desenvolvimento em sua máquina local.

### 1. Pré-requisitos
Certifique-se de ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (versão LTS recomendada)
* Gerenciador de pacotes `npm` ou `yarn`
* [Git](https://git-scm.com/)
* Configuração do ambiente mobile ([Android Studio](https://developer.android.com/studio) para Android ou [Xcode](https://developer.apple.com/xcode/) para iOS)

### 2. Clonar o Repositório
```bash
git clone https://github.com/EcoFood/ecofood-codigo-fonte.git
cd ecofood-codigo-fonte
```

### 3. Instalar Dependências
```bash
npm install
# ou
yarn install
```

### 4. Configurar Variáveis de Ambiente e Firebase
1. Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`.
2. Adicione as chaves de configuração do seu projeto Firebase (API Key, Auth Domain, Project ID, etc.).

### 5. Executar a Aplicação

#### Para Android:
```bash
npx react-native run-android
```

#### Para iOS (somente no macOS):
```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

---

## 👥 Equipe de Desenvolvimento

Projeto desenvolvido pelos discentes do 2º Período de Análise e Desenvolvimento de Sistemas:

* **Cesar Filho Cintra Pedroso Dos Santos**
* **Davy Leônidas Gonçalves Menezes**
* **Gabriel Henrique Gomes Alcântara**
* **Jhean Carlos Fernandes Dias**
* **Pedro Henrique Santos Rodrigues**
* **Thiago Henrique Lemes Arruda Filho**
* **Paulo Henrique de Souza Lima**

**Orientador:** Prof. Arthur Mariano L. Neto  
**Local e Período:** Goiânia – GO | 2° Semestre - 2026

---

## 📝 Licença e Status do Projeto
Este projeto é de caráter acadêmico e encontra-se em fase de desenvolvimento e validação de MVP (Produto Mínimo Viável).
