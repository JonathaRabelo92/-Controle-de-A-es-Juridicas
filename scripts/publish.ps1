param(
    [string]$RemoteUrl = ""
)

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git não está instalado ou não está no PATH. Instale o Git e execute novamente." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path .git)) {
    Write-Host "Inicializando repositório git local..."
    git init
} else {
    Write-Host ".git já existe. Pulando inicialização." -ForegroundColor Yellow
}

Write-Host "Adicionando arquivos..."
git add .

Write-Host "Criando commit..."
git commit -m "Atualização: interligação de páginas, login e scripts" | Out-Null

if ($RemoteUrl -ne "") {
    Write-Host "Adicionando remote origin: $RemoteUrl"
    try {
        git remote add origin $RemoteUrl -f
    } catch {
        Write-Host "Remote já existe ou não foi possível adicionar: $_" -ForegroundColor Yellow
    }
}

Write-Host "Puxando e atualizando branch main (se existir)..."
try {
    git pull origin main --allow-unrelated-histories -X theirs
} catch {
    # Silenciar
}

Write-Host "Empurrando para o GitHub (origin/main)..."
git branch -M main
try {
    git push -u origin main
} catch {
    Write-Host "Erro ao dar push. Configure remote e tente novamente." -ForegroundColor Red
}

Write-Host "Fim." -ForegroundColor Green
