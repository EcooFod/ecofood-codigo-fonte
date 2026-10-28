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

// ==========================================
// ROTAS DE CLIENTES
// ==========================================

// Cadastro de Cliente
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

// Login de Cliente
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

        delete cliente.senha;
        res.json({ mensagem: 'Login realizado com sucesso!', cliente });
    });
});

// ==========================================
// ROTAS DE RESTAURANTES (PARCEIROS)
// ==========================================

// Cadastro de Restaurante
app.post('/api/restaurantes/cadastro', async (req, res) => {
    console.log('RECEBI UM PEDIDO DE CADASTRO DE RESTAURANTE:', req.body);
    const { nome_restaurante, cnpj, responsavel, email, telefone, endereco, senha } = req.body;

    if (!nome_restaurante || !cnpj || !responsavel || !email || !senha) {
        return res.status(400).json({ erro: 'Preencha os campos obrigatórios!' });
    }

    try {
        const senhaHash = await bcrypt.hash(senha, 10);
        const sql = `INSERT INTO restaurantes (nome_restaurante, cnpj, responsavel, email, telefone, endereco, senha) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        
        db.query(sql, [nome_restaurante, cnpj, responsavel, email, telefone || null, endereco, senhaHash], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ erro: 'Este CNPJ ou e-mail já está cadastrado!' });
                }
                console.error('Erro no MySQL:', err.message);
                return res.status(500).json({ erro: 'Erro ao cadastrar restaurante.' });
            }
            res.json({ mensagem: 'Restaurante cadastrado com sucesso!', id: result.insertId });
        });
    } catch (error) {
        console.error('Erro interno:', error);
        res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
});

// Login de Restaurante
app.post('/api/restaurantes/login', (req, res) => {
    console.log('RECEBI UM PEDIDO DE LOGIN DE RESTAURANTE:', req.body);
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: 'Preencha o e-mail e a senha!' });
    }

    const sql = `SELECT * FROM restaurantes WHERE email = ?`;
    db.query(sql, [email], async (err, resultados) => {
        if (err) {
            console.error('Erro no MySQL:', err.message);
            return res.status(500).json({ erro: 'Erro interno no servidor.' });
        }

        if (resultados.length === 0) {
            return res.status(400).json({ erro: 'E-mail ou senha incorretos!' });
        }

        const restaurante = resultados[0];
        const senhaCorreta = await bcrypt.compare(senha, restaurante.senha);

        if (!senhaCorreta) {
            return res.status(400).json({ erro: 'E-mail ou senha incorretos!' });
        }

        delete restaurante.senha;
        res.json({ mensagem: 'Login realizado com sucesso!', restaurante });
    });
});

// ==========================================
// ROTAS DE OFERTAS
// ==========================================

// Buscar ofertas gerais para a home (se necessário)
app.get('/ofertas', (req, res) => {
    const sql = `SELECT ofertas.*, restaurantes.nome_restaurante FROM ofertas JOIN restaurantes ON ofertas.restaurante_id = restaurantes.id`;
    db.query(sql, (err, resultados) => {
        if (err) {
            console.error('Erro ao buscar ofertas:', err.message);
            return res.status(500).json({ erro: 'Erro ao buscar ofertas.' });
        }
        res.json(resultados);
    });
});

// Buscar ofertas de um restaurante específico
app.get('/restaurantes/:id/ofertas', (req, res) => {
    const restauranteId = req.params.id;
    const sql = `SELECT * FROM ofertas WHERE restaurante_id = ?`;
    db.query(sql, [restauranteId], (err, resultados) => {
        if (err) {
            console.error('Erro ao buscar ofertas:', err.message);
            return res.status(500).json({ erro: 'Erro ao buscar ofertas.' });
        }
        res.json(resultados);
    });
});

// Criar oferta
app.post('/ofertas', (req, res) => {
    const { restaurante_id, nome, preco_de, preco_por, quantidade, retirar_ate } = req.body;
    const sql = `INSERT INTO ofertas (restaurante_id, nome, preco_de, preco_por, quantidade, retirar_ate) VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [restaurante_id, nome, preco_de, preco_por, quantidade, retirar_ate], (err, result) => {
        if (err) {
            console.error('Erro ao criar oferta:', err.message);
            return res.status(500).json({ erro: 'Erro ao publicar oferta.' });
        }
        res.json({ mensagem: 'Oferta publicada com sucesso!', id: result.insertId });
    });
});

// Remover oferta
app.delete('/ofertas/:id', (req, res) => {
    const ofertaId = req.params.id;
    const sql = `DELETE FROM ofertas WHERE id = ?`;
    
    db.query(sql, [ofertaId], (err, result) => {
        if (err) {
            console.error('Erro ao remover oferta:', err.message);
            return res.status(500).json({ erro: 'Erro ao remover oferta.' });
        }
        res.json({ mensagem: 'Oferta removida com sucesso!' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor a rodar em http://localhost:${PORT}`);
});

// Rota para buscar as ofertas cadastradas no banco de dados
app.get('/ofertas', (req, res) => {
    const query = `
        SELECT ofertas.*, restaurantes.nome_restaurante 
        FROM ofertas 
        JOIN restaurantes ON ofertas.restaurante_id = restaurantes.id
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao buscar ofertas:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

