@echo off
echo ========================================
echo REPOSITORY CLEANUP SCRIPT
echo ========================================
echo.
echo This will remove node_modules, .env, and build files from Git tracking
echo.
pause

echo.
echo [1/8] Removing backend/node_modules...
git rm -r --cached backend/node_modules

echo.
echo [2/8] Removing frontend/node_modules...
git rm -r --cached frontend/node_modules

echo.
echo [3/8] Removing admin-panel/node_modules...
git rm -r --cached admin-panel/node_modules

echo.
echo [4/8] Removing .env files...
git rm --cached backend/.env

echo.
echo [5/8] Removing build folders...
git rm -r --cached frontend/dist 2>nul
git rm -r --cached admin-panel/dist 2>nul

echo.
echo [6/8] Removing .vite cache...
git rm -r --cached frontend/.vite 2>nul

echo.
echo [7/8] Removing .vscode folders...
git rm -r --cached .vscode 2>nul
git rm -r --cached frontend/.vscode 2>nul

echo.
echo [8/8] Staging .gitignore files...
git add .gitignore backend/.gitignore frontend/.gitignore admin-panel/.gitignore backend/.env.example

echo.
echo ========================================
echo CLEANUP COMPLETE!
echo ========================================
echo.
echo Next steps:
echo 1. Review changes: git status
echo 2. Commit: git commit -m "Clean repository and add .gitignore"
echo 3. Push: git push origin main
echo.
pause
