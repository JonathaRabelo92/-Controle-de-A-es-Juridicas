function fazerLogin() {
    const usuarioInput = document.getElementById('usuario').value;
    const senhaInput = document.getElementById('senha').value;

    // Validação simples (Hardcoded)
    if (usuarioInput === 'admin' && senhaInput === '1234') {
        // Salva o usuario autenticado no localStorage
        const user = { username: usuarioInput, loginAt: new Date().toISOString() };
        localStorage.setItem('authUser', JSON.stringify(user));
        alert('Login realizado com sucesso!');
        // Redireciona para o sistema
        window.location.href = './sistema.html';
    } else {
        alert('Usuário ou senha incorretos!');
    }
}

// Caso o usuário esteja logado e clique em "Ir direto para" -> delega para app.js
function abrirSistemaSemLogin(aba) {
    localStorage.setItem('selectedTab', aba);
    window.location.href = './sistema.html';
}