@echo off
REM Script de Deploy Automático para GitHub Pages
REM Execute: deploy.bat "sua mensagem de commit"

echo.
echo ========================================
echo    APEX NEURO ELITE - Deploy Script
echo ========================================
echo.

set COMMIT_MSG=%~1
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Deploy automático - %date% %time%

echo [1/4] Adicionando arquivos alterados...
git add .

echo [2/4] Criando commit...
git commit -m "%COMMIT_MSG%"

echo [3/4] Enviando para o GitHub...
git push origin main

echo.
echo [4/4] Deploy iniciado!
echo O GitHub Actions vai publicar automaticamente.
echo.
echo ========================================
echo    URLs do projeto:
echo ========================================
echo Repositorio: https://github.com/marceloxdxp/guardian-neuroelite-smsmaia
echo GitHub Pages: https://marceloxdxp.github.io/guardian-neuroelite-smsmaia/
echo Actions: https://github.com/marceloxdxp/guardian-neuroelite-smsmaia/actions
echo.

