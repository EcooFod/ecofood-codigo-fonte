 const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuração para ler dados do formulário e servir ficheiros estáticos
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuração da conexão com o MySQL
// Ajusta o 'user' e 'password' de acordo com as tuas credenciais do MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Utilizador padrão do MySQL (ou o teu utilizador)
    password: '',      // Tua palavra-passe do MySQL (no XAMPP normalmente fica vazio '')
    database: 'ecofood_db' // Nome do banco de dados
});

// Conectar ao MySQL
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.message);
        return;
    }
    console.log('Conectado com sucesso ao banco de dados MySQL!');

    // Criar a tabela de usuários se não existir
    const sqlTabela = `
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL
        )
    `;
    db.query(sqlTabela, (err) => {
        if (err) console.error('Erro ao criar tabela:', err.message);
        else console.log('Tabela "usuarios" pronta para uso.');
    });
});

// Rota para cadastrar novo utilizador
app.post('/cadastrar', (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: 'Preencha todos os campos!' });
    }

    const sql = `INSERT INTO usuarios (nome, email) VALUES (?, ?)`;
    db.query(sql, [nome, email], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ erro: 'Este e-mail já está cadastrado!' });
            }
            return res.status(500).json({ erro: 'Erro ao guardar no MySQL.' });
        }
        res.json({ mensagem: 'Utilizador cadastrado com sucesso!', id: result.insertId });
    });
});

// Rota para listar utilizadores cadastrados
app.get('/usuarios', (req, res) => {
    db.query(`SELECT * FROM usuarios`, (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao procurar utilizadores.' });
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor a rodar em http://localhost:${PORT}`);
});