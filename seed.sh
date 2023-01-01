#!/bin/sh
## Usage: Setup meilisearch backend instance and populate data for local testing

# color variables
PRIMARY='\033[0;35m'
LOG='\033[0;36m'
SUCCESS='\033[0;32m'
INFO='\033[0;33m'
NC='\033[0m'

# Functions for printing and logging information on console
function log {
  	echo -e "${PRIMARY}${BRAND} ${LOG}$1${NC}"
}

function success {
  	echo -e "${PRIMARY}${BRAND} ${SUCCESS}$1${NC}"
}

function info {
  	echo -e "${PRIMARY}${BRAND} ${INFO}$1${NC}"
}


# Checking for .env file 
if [ -f .env ]; then
    log "::found .env in root directory::"

    if grep -qv '^#' .env; then
        log "::loading variables from .env::"
        export $(grep -v '^#' .env | xargs)
    fi 
fi

if [[ ! -v MEILI_MASTER_KEY ]]; then
    info "MEILI_MASTER_KEY is not set"
    exit

elif [[ -z "$MEILI_MASTER_KEY" ]]; then
    info "MEILI_MASTER_KEY is set to the empty string"
    exit

else
    success "> Using this master key: "
    info $MEILI_MASTER_KEY
fi


if [ ! -f meilisearch ]
then
    log "::meilisearch executable not found. Dowloading from source::"
    curl -L https://install.meilisearch.com | sh
fi

# TODO
# prompt user to add data and start backend instance

success "Instance ready to launch with the master key"
success "Launching ./meilisearch"

./meilisearch 
