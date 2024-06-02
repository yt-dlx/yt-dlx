#!/bin/bash
NC='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
ERR() {
    echo -e "${RED}ERROR: $1${NC}"
}
LOG() {
    echo -e "${GREEN}INFO: $1${NC}"
}
RUN() {
    local command="$1"
    if [ "$use_sudo" = true ]; then
        command="sudo $command"
    fi
    if ! eval "$command"; then
        ERR "Failed to execute command: $command"
    fi
}
if [ -x "$(command -v sudo)" ]; then
    LOG "Using sudo command"
    use_sudo=true
else
    use_sudo=false
fi
if [ -x "$(command -v apt-get)" ]; then
    LOG "Detected Debian-based system"
    RUN "systemctl stop tor"
    RUN "systemctl daemon-reload"
    RUN "apt-get purge -y tor"
    RUN "apt-get update && apt-get install -y tor"
    RUN "systemctl enable --now tor"
    RUN "systemctl restart tor"
    elif [ -x "$(command -v pacman)" ]; then
    LOG "Detected Arch-based system"
    RUN "systemctl stop tor"
    RUN "systemctl daemon-reload"
    RUN "pacman -Rns --noconfirm paru"
    RUN "pacman -Rns --noconfirm tor"
    RUN "pacman -Syyu --noconfirm paru"
    RUN "pacman -Syyu --noconfirm tor"
    RUN "systemctl enable --now tor"
    RUN "systemctl restart tor"
else
    ERR "Neither apt-get nor pacman found. Unsupported system."
fi
# =====================================================================================================
# NC='\033[0m'
# RED='\033[0;31m'
# GREEN='\033[0;32m'
# YELLOW='\033[1;33m'
# ERR() {
#     echo -e "${RED}ERROR: $1${NC}"
# }
# LOG() {
#     echo -e "${GREEN}INFO: $1${NC}"
# }
# RUN() {
#     local command="$1"
#     if [ "$use_sudo" = true ]; then
#         command="sudo $command"
#     fi
#     if ! eval "$command"; then
#         ERR "Failed to execute command: $command"
#     fi
# }
# if [ -x "$(command -v sudo)" ]; then
#     LOG "Using sudo command"
#     use_sudo=true
# else
#     use_sudo=false
# fi
# if [ -x "$(command -v apt-get)" ]; then
#     LOG "Detected Debian-based system"
#     RUN "systemctl stop tor"
#     RUN "systemctl daemon-reload"
#     RUN "apt-get purge -y tor nyx"
#     RUN "apt-get update && apt-get install -y tor nyx"
#     RUN 'sed -i "s/#ControlPort 9051/ControlPort 9051/" /etc/tor/torrc'
#     RUN 'echo -e "\nCookieAuthentication 1\nCookieAuthFileGroupReadable 1" >> /etc/tor/torrc'
#     RUN "systemctl enable --now tor"
#     RUN 'echo "MaxCircuitDirtiness 60" >> /etc/tor/torrc'
#     RUN "systemctl restart tor"
#     RUN 'echo -e "redraw_rate 60\nwrite_logs_to /var/log/nyx/notices.log" > ~/.nyx/config'
#     elif [ -x "$(command -v pacman)" ]; then
#     LOG "Detected Arch-based system"
#     RUN "systemctl stop tor"
#     RUN "systemctl daemon-reload"
#     RUN "pacman -Rns --noconfirm tor nyx"
#     RUN "pacman -Syyu --noconfirm tor nyx"
#     RUN 'sed -i "s/#ControlPort 9051/ControlPort 9051/" /etc/tor/torrc'
#     RUN 'echo -e "\nCookieAuthentication 1\nCookieAuthFileGroupReadable 1" >> /etc/tor/torrc'
#     RUN "systemctl enable --now tor"
#     RUN 'echo "MaxCircuitDirtiness 60" >> /etc/tor/torrc'
#     RUN "systemctl restart tor"
#     RUN 'echo -e "redraw_rate 60\nwrite_logs_to /var/log/nyx/notices.log" > ~/.nyx/config'
# else
#     ERR "Neither apt-get nor pacman found. Unsupported system."
# fi