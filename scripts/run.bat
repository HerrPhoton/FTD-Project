@echo off
setlocal

cd /d %~dp0

cd ../frontend
start npm start

cd ../backend
start uvicorn src.main:app --reload --port 8080
