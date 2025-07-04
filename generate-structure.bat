@echo off
setlocal enabledelayedexpansion

REM Set title and encoding
title Project Structure Generator
chcp 65001 > nul

REM Display start message
echo [92mGenerating project structure...[0m
echo Current directory: "%CD%"
echo.

REM Create timestamp
set "timestamp=%date:~-4%-%date:~3,2%-%date:~0,2%_%time:~0,2%-%time:~3,2%-%time:~6,2%"
set "timestamp=!timestamp: =0!"

REM Set output file name with timestamp
set "outputFile=project_structure_%timestamp%.txt"

REM Generate header
echo Project Structure Generated on %date% at %time% > "%outputFile%"
echo =========================================== >> "%outputFile%"
echo. >> "%outputFile%"

REM Generate tree structure
tree /F /A >> "%outputFile%"

REM Verify file creation and show results
if exist "%outputFile%" (
    echo [92mSuccess![0m Project structure has been saved to:
    echo "%CD%\%outputFile%"
    echo.
    echo Opening file...
    timeout /t 2 > nul
    start notepad "%outputFile%"
) else (
    echo [91mError:[0m Failed to create project structure file!
    echo Please check permissions and try again.
)

REM Pause to show results
echo.
echo Press any key to exit...
pause > nul