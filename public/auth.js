// =========================================================
// Funções compartilhadas pelas telas do EcoFood
// =========================================================

// ---------- Abas (Entrar / Criar conta) ----------
function ativarAba(idPainel) {
    document.querySelectorAll('.aba').forEach((a) => {
        a.classList.toggle('ativa', a.dataset.alvo === idPainel);
    });
    document.querySelectorAll('.painel').forEach((p) => {
        p.classList.toggle('escondido', p.id !== idPainel);
    });
}

function configurarAbas() {
    document.querySelectorAll('.aba').forEach((aba) => {
        aba.addEventListener('click', () => ativarAba(aba.dataset.alvo));
    });
}

// ---------- Mensagens ----------
function mostrarMensagem(elemento, texto, tipo) {
    elemento.className = 'mensagem ' + tipo;
    elemento.innerText = texto;
}

// ---------- Envio de formulário para o servidor ----------
<<<<<<< HEAD
// Pega todos os campos (pelo atributo name) e manda como JSON
=======
>>>>>>> 3a0f25a (feat: implementa backend de cadastro e login de cliente (#7))
async function enviarFormulario(form, url, elementoMensagem) {
    const dados = Object.fromEntries(new FormData(form));
    const botao = form.querySelector('button[type="submit"]');
    botao.disabled = true;

    try {
        const resposta = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        const resultado = await resposta.json();

        if (resposta.ok) {
            mostrarMensagem(elementoMensagem, resultado.mensagem, 'sucesso');
            return resultado;
        }
        mostrarMensagem(elementoMensagem, resultado.erro, 'erro');
    } catch (erro) {
        mostrarMensagem(elementoMensagem,
<<<<<<< HEAD
            'Não foi possível conectar. Tente novamente.', 'erro');
=======
            'Não consegui falar com o servidor. Ele está rodando (node server.js)?', 'erro');
>>>>>>> 3a0f25a (feat: implementa backend de cadastro e login de cliente (#7))
    } finally {
        botao.disabled = false;
    }
    return null;
}

function senhasIguais(form, elementoMensagem) {
    if (form.senha.value !== form.confirmar_senha.value) {
        mostrarMensagem(elementoMensagem, 'As senhas não são iguais.', 'erro');
        return false;
    }
    return true;
}

// ---------- Quem está logado ----------
<<<<<<< HEAD
// Por enquanto guardamos no navegador (localStorage).
// Mais pra frente dá para trocar por sessão/token no servidor.
=======
>>>>>>> 3a0f25a (feat: implementa backend de cadastro e login de cliente (#7))
function pegarCliente() {
    try { return JSON.parse(localStorage.getItem('clienteLogado')); }
    catch { return null; }
}

function sairCliente() {
    localStorage.removeItem('clienteLogado');
    window.location.href = 'index.html';
}

function iniciais(nome) {
    return nome.trim().split(/\s+/).slice(0, 2).map((p) => p[0].toUpperCase()).join('');
<<<<<<< HEAD
}
=======
}
>>>>>>> 3a0f25a (feat: implementa backend de cadastro e login de cliente (#7))
