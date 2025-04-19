@echo off
ping localhost -n 5 > nul
code --command workbench.action.terminal.new
ping localhost -n 2 > nul
code --command workbench.action.terminal.split
ping localhost -n 2 > nul
code --command workbench.action.terminal.split