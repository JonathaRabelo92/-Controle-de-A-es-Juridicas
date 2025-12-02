# -Controle-de-A-es-Juridicas

Projeto simples para controle jurídico com páginas interligadas, persistência local (localStorage) e CRUD (Advogados, Clientes, Juízes).

## Funcionalidades aplicadas
- Todas as páginas usam `style.css` e `js/app.js` (JavaScript centralizado).
- Autenticação simples (admin / 1234) usando `localStorage` para manter a sessão entre páginas.
- Comunicação entre páginas: é possível abrir o sistema já em uma aba específica (Advogados/Clientes/Juízes) usando botões rápidos na página de login.
- CRUD armazenando dados em `localStorage` (Advogados, Clientes, Juízes).

## Rodando localmente
1. Abra a pasta do projeto no VS Code.
2. Para servir os arquivos localmente (testar sem GitHub Pages):

```powershell
# Se tiver Python instalado
python -m http.server 8000

# Ou use o Live Server (VS Code extension) para abrir a pasta e visualizar as páginas
```

3. Abra `http://localhost:8000/index.html` (ou pela porta que escolher) e teste: faça login com `admin / 1234`.

## Enviar para o GitHub (passo a passo)
1. Se ainda não tiver um repositório remoto no GitHub, crie um novo repo em https://github.com/new
2. No PowerShell, execute os comandos abaixo (substitua `<user>` e `<repo>`):

```powershell
cd "C:\Users\User\OneDrive\Área de Trabalho\Sistema Juridico\-Controle-de-A-es-Juridicas";
# Inicializar git local (se ainda não estiver inicializado)
git init;
git add .;
git commit -m "Inicializando projeto";
# Adicionar remote (substitua com seus dados)
git remote add origin https://github.com/<user>/<repo>.git;
git branch -M main;
git push -u origin main;
```

3. Para publicar com GitHub Pages (opcional): vá até as configurações do repositório no GitHub > Pages e habilite publicar a branch `main` (root). Depois de alguns minutos, seu site estará disponível em `https://<user>.github.io/<repo>/`.

Você também pode usar o script de ajuda PowerShell em `scripts/publish.ps1` para simplificar a publicação. Exemplo de execução:

```powershell
cd "C:\Users\User\OneDrive\Área de Trabalho\Sistema Juridico\-Controle-de-A-es-Juridicas";
scripts\publish.ps1 -RemoteUrl "https://github.com/<user>/<repo>.git"
```

## Notas importantes
- Use caminhos relativos (`./style.css`, `./js/app.js`) — já atualizados nos arquivos para facilitar o deploy e o teste local.
- As funcionalidades de comunicação entre páginas (login + seleção de aba) utilizam `localStorage` — você pode ver e limpar os dados no console do navegador (Application / Storage).