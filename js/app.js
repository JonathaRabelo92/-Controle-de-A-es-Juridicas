// --- FUNÇÕES DE NAVEGAÇÃO ---
function mostrarAba(idAba) {
    // Esconde todas as seções
    document.querySelectorAll('.secao').forEach(div => div.classList.remove('ativa'));
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));

    // Mostra a aba clicada
    document.getElementById(idAba).classList.add('ativa');
    // Adiciona estilo ao botão correspondente
    document.querySelectorAll('nav button').forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(idAba)) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

function sair() {
    // Remove o usuário autenticado e volta ao login
    localStorage.removeItem('authUser');
    window.location.href = './index.html';
}

// --- AUTENTICAÇÃO / COMUNICAÇÃO ENTRE PÁGINAS ---
function isAuth() {
    return !!localStorage.getItem('authUser');
}

function getAuthUser() {
    const u = localStorage.getItem('authUser');
    return u ? JSON.parse(u) : null;
}

function abrirSistema(aba) {
    // Define a aba a ser aberta pelo sistema e redireciona
    localStorage.setItem('selectedTab', aba);
    window.location.href = './sistema.html';
}

// --- FUNÇÕES DE CRUD (Create, Read, Update, Delete) ---

// Função Genérica para Ler Dados do LocalStorage
function getDados(chave) {
    return JSON.parse(localStorage.getItem(chave)) || [];
}

// Função Genérica para Salvar Dados no LocalStorage
function setDados(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}

// === LÓGICA ADVOGADOS ===
function renderizarAdvogados() {
    const lista = getDados('advogados');
    const tbody = document.getElementById('tabelaAdvogados');
    tbody.innerHTML = '';

    lista.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td>${item.oab}</td>
                <td>
                    <button class="btn-editar" onclick="editarAdvogado(${index})">Editar</button>
                    <button class="btn-excluir" onclick="excluirAdvogado(${index})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

function salvarAdvogado() {
    const nome = document.getElementById('nomeAdvogado').value;
    const oab = document.getElementById('oabAdvogado').value;
    const index = document.getElementById('advogadoIndex').value;

    if (nome === '' || oab === '') { alert('Preencha todos os campos'); return; }

    const lista = getDados('advogados');

    if (index === '') {
        // Criar Novo
        lista.push({ nome, oab });
    } else {
        // Editar Existente
        lista[index] = { nome, oab };
        document.getElementById('advogadoIndex').value = ''; // Limpa o modo de edição
    }

    setDados('advogados', lista);
    renderizarAdvogados();
    
    // Limpar campos
    document.getElementById('nomeAdvogado').value = '';
    document.getElementById('oabAdvogado').value = '';
}

function editarAdvogado(index) {
    const lista = getDados('advogados');
    document.getElementById('nomeAdvogado').value = lista[index].nome;
    document.getElementById('oabAdvogado').value = lista[index].oab;
    document.getElementById('advogadoIndex').value = index; // Define o ID que estamos editando
}

function excluirAdvogado(index) {
    if(confirm('Tem certeza que deseja excluir?')) {
        const lista = getDados('advogados');
        lista.splice(index, 1); // Remove 1 item na posição index
        setDados('advogados', lista);
        renderizarAdvogados();
    }
}

// === LÓGICA CLIENTES (Similar a Advogados) ===
function renderizarClientes() {
    const lista = getDados('clientes');
    const tbody = document.getElementById('tabelaClientes');
    tbody.innerHTML = '';
    lista.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td>${item.cpf}</td>
                <td>
                    <button class="btn-editar" onclick="editarCliente(${index})">Editar</button>
                    <button class="btn-excluir" onclick="excluirCliente(${index})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

function salvarCliente() {
    const nome = document.getElementById('nomeCliente').value;
    const cpf = document.getElementById('cpfCliente').value;
    const index = document.getElementById('clienteIndex').value;

    if (!nome || !cpf) return alert('Preencha tudo!');

    const lista = getDados('clientes');
    if (index === '') lista.push({ nome, cpf });
    else { lista[index] = { nome, cpf }; document.getElementById('clienteIndex').value = ''; }

    setDados('clientes', lista);
    renderizarClientes();
    document.getElementById('nomeCliente').value = '';
    document.getElementById('cpfCliente').value = '';
}

function editarCliente(index) {
    const lista = getDados('clientes');
    document.getElementById('nomeCliente').value = lista[index].nome;
    document.getElementById('cpfCliente').value = lista[index].cpf;
    document.getElementById('clienteIndex').value = index;
}

function excluirCliente(index) {
    if(confirm('Excluir cliente?')) {
        const lista = getDados('clientes');
        lista.splice(index, 1);
        setDados('clientes', lista);
        renderizarClientes();
    }
}

// === LÓGICA JUÍZES ===
function renderizarJuizes() {
    const lista = getDados('juizes');
    const tbody = document.getElementById('tabelaJuizes');
    tbody.innerHTML = '';
    lista.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td>${item.matricula}</td>
                <td>${item.vara}</td>
                <td>
                    <button class="btn-editar" onclick="editarJuiz(${index})">Editar</button>
                    <button class="btn-excluir" onclick="excluirJuiz(${index})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

function salvarJuiz() {
    const nome = document.getElementById('nomeJuiz').value;
    const matricula = document.getElementById('matriculaJuiz').value;
    const vara = document.getElementById('varaJuiz').value;
    const index = document.getElementById('juizIndex').value;

    if (!nome || !matricula || !vara) return alert('Preencha tudo!');

    const lista = getDados('juizes');
    if (index === '') lista.push({ nome, matricula, vara });
    else { lista[index] = { nome, matricula, vara }; document.getElementById('juizIndex').value = ''; }

    setDados('juizes', lista);
    renderizarJuizes();
    document.getElementById('nomeJuiz').value = '';
    document.getElementById('matriculaJuiz').value = '';
    document.getElementById('varaJuiz').value = '';
}

function editarJuiz(index) {
    const lista = getDados('juizes');
    document.getElementById('nomeJuiz').value = lista[index].nome;
    document.getElementById('matriculaJuiz').value = lista[index].matricula;
    document.getElementById('varaJuiz').value = lista[index].vara;
    document.getElementById('juizIndex').value = index;
}

function excluirJuiz(index) {
    if(confirm('Excluir juiz?')) {
        const lista = getDados('juizes');
        lista.splice(index, 1);
        setDados('juizes', lista);
        renderizarJuizes();
    }
}

// Inicialização: Carregar os dados ao abrir a página
window.onload = function() {
    // Verificar se usuário está autenticado
    if (!isAuth()) {
        // Caso seja o index.html (login), não redirecionar
        if (!location.href.includes('index.html') && location.pathname !== '/' && !location.pathname.endsWith('/index.html')) {
            window.location.href = './index.html';
            return;
        }
    }

    // Exibir nome do usuário no topo
    const user = getAuthUser();
    if (user && document.getElementById('username')) document.getElementById('username').textContent = 'Bem-vindo, ' + user.username;

    // Carregar dados das seções (se existir)
    if (document.getElementById('tabelaAdvogados')) renderizarAdvogados();
    if (document.getElementById('tabelaClientes')) renderizarClientes();
    if (document.getElementById('tabelaJuizes')) renderizarJuizes();

    // Verifica se existe alguma aba solicitada por outra página
    const selected = localStorage.getItem('selectedTab') || 'advogados';
    if (selected && document.getElementById(selected)) mostrarAba(selected);
    // Limpar sinalização após uso
    localStorage.removeItem('selectedTab');
};

// Reage a mudanças no localStorage (ex.: logout em outra guia, ou seleção de aba em outra guia)
window.addEventListener('storage', function(e) {
    if (e.key === 'authUser' && !e.newValue) {
        // Se em outra guia houve logout -> redirecionar
        if (!location.href.includes('index.html')) window.location.href = './index.html';
    }
    if (e.key === 'selectedTab' && e.newValue) {
        // Trocar aba dinamicamente
        mostrarAba(e.newValue);
    }
});