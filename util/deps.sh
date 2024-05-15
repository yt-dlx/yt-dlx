#!/bin/bash

NC='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
log_error() {
    local message="$1"
    echo -e "$(date +'%Y-%m-%d %H:%M:%S') - ${RED}ERROR:${NC} $message"
}
log_info() {
    local message="$1"
    echo -e "$(date +'%Y-%m-%d %H:%M:%S') - ${GREEN}INFO:${NC} $message"
}
RUN() {
    local command="$1"
    local error_message="$2"
    if [ "$use_sudo" = true ]; then
        echo "Enter your password for sudo:"
        sudo -v || { log_error "Failed to obtain sudo privileges."; exit 1; }
        command="sudo $command"
    fi
    if ! eval "$command"; then
        log_error "$error_message"
    fi
}
if [ -x "$(command -v sudo)" ]; then
    use_sudo=true
else
    use_sudo=false
fi
if [ -x "$(command -v apt-get)" ]; then
    log_info "Detected Debian-based system"
    RUN "apt-get update" "Failed to update APT repositories"
    RUN "apt-get install -y tor nyx curl ffmpeg opus-tools libx264-dev libx265-dev libvpx-dev libfdk-aac-dev libmp3lame-dev libopus-dev libogg-dev libvorbis-dev libssl-dev librtmp-dev libass-dev libxml2-dev libv4l-dev libwebp-dev" "Failed to install required packages on Debian-based system"
    RUN "rm -rf /var/lib/apt/lists/*" "Failed to clean cache"
    elif [ -x "$(command -v pacman)" ]; then
    log_info "Detected Arch-based system"
    RUN "pacman -Syu --noconfirm" "Failed to update system with pacman"
    RUN "pacman -S --noconfirm tor nyx curl ffmpeg opus-tools x264 x265 libvpx fdkaac lame opus libogg libvorbis openssl rtmpdump libass libxml2 libv4l libwebp" "Failed to install required packages on Arch-based system"
    RUN "rm -rf /var/cache/pkgfile/*" "Failed to clean cache"
fi