<<<<<<< HEAD
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
=======
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecofood_db'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.message);
        return;
    }
    console.log('Conectado com sucesso ao banco de dados MySQL!');
});

// --- ROTA DE CADASTRO COM LOG NO TERMINAL ---
app.post('/api/clientes/cadastro', async (req, res) => {
  
  
    console.log('RECEBI UM PEDIDO DE CADASTRO:', req.body);//terminal aparecer 

    const { nome, email, telefone, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Preencha os campos obrigatórios!' });
    }

    try {
        const senhaHash = await bcrypt.hash(senha, 10);
        const sql = `INSERT INTO clientes (nome, email, telefone, senha) VALUES (?, ?, ?, ?)`;
        
        db.query(sql, [nome, email, telefone || null, senhaHash], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ erro: 'Este e-mail já está cadastrado!' });
                }
                console.error('Erro no MySQL:', err.message);
                return res.status(500).json({ erro: 'Erro ao cadastrar cliente.' });
            }
            res.json({ mensagem: 'Cliente cadastrado com sucesso!', id: result.insertId });
        });
    } catch (error) {
        console.error('Erro interno:', error);
        res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
});

app.post('/api/clientes/login', (req, res) => {
    console.log('RECEBI UM PEDIDO DE LOGIN:', req.body);
    // ... restante codigo de login ...
    res.json({ mensagem: 'Ok' });
});

app.listen(PORT, () => {
    console.log(`Servidor a rodar em http://localhost:${PORT}`);
>>>>>>> 3a0f25a (feat: implementa backend de cadastro e login de cliente (#7))
});