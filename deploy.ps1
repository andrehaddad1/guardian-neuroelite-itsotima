# Script de Deploy Automático para GitHub Pages
# Execute: .\deploy.ps1 "sua mensagem de commit"

param(
    [string]$CommitMessage = "Deploy automático - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   APEX NEURO ELITE - Deploy Script" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Verificar se há alterações
$status = git status --porcelain
if ($status) {
    Write-Host "[1/4] Adicionando arquivos alterados..." -ForegroundColor Yellow
    git add .
    
    Write-Host "[2/4] Criando commit..." -ForegroundColor Yellow
    git commit -m "$CommitMessage"
    
    Write-Host "[3/4] Enviando para o GitHub..." -ForegroundColor Yellow
    git push origin main
    
    Write-Host "`n[4/4] Deploy iniciado!" -ForegroundColor Green
    Write-Host "O GitHub Actions vai publicar automaticamente." -ForegroundColor Green
} else {
    Write-Host "Nenhuma alteração detectada." -ForegroundColor Yellow
    Write-Host "Forçando push para trigger do deploy..." -ForegroundColor Yellow
    git push origin main
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   URLs do projeto:" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Repositório: https://github.com/andrehaddad1/guardian-neuroelite-itsotima" -ForegroundColor White
Write-Host "GitHub Pages: https://andrehaddad1.github.io/guardian-neuroelite-itsotima/" -ForegroundColor Green
Write-Host "Actions: https://github.com/andrehaddad1/guardian-neuroelite-itsotima/actions" -ForegroundColor White
Write-Host "`n"

