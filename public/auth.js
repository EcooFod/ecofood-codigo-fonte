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
// Pega todos os campos (pelo atributo name) e manda como JSON
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
            'Não foi possível conectar. Tente novamente.', 'erro');
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
// Por enquanto guardamos no navegador (localStorage).
// Mais pra frente dá para trocar por sessão/token no servidor.
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
}
