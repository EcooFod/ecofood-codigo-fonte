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
    console.log('RECEBI UM PEDIDO DE CADASTRO:', req.body);

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

// --- ROTA DE LOGIN ---
app.post('/api/clientes/login', (req, res) => {
    console.log('RECEBI UM PEDIDO DE LOGIN:', req.body);
    
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: 'Preencha o e-mail e a senha!' });
    }

    const sql = `SELECT * FROM clientes WHERE email = ?`;
    db.query(sql, [email], async (err, resultados) => {
        if (err) {
            console.error('Erro no MySQL:', err.message);
            return res.status(500).json({ erro: 'Erro interno no servidor.' });
        }

        if (resultados.length === 0) {
            return res.status(400).json({ erro: 'E-mail ou senha incorretos!' });
        }

        const cliente = resultados[0];
        const senhaCorreta = await bcrypt.compare(senha, cliente.senha);

        if (!senhaCorreta) {
            return res.status(400).json({ erro: 'E-mail ou senha incorretos!' });
        }

        // Remove a senha antes de enviar os dados do cliente de volta
        delete cliente.senha;
        res.json({ mensagem: 'Login realizado com sucesso!', cliente });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor a rodar em http://localhost:${PORT}`);
});