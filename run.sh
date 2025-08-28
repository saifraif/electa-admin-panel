#!/bin/bash
# Script to start Electa Admin Panel (dev or prod) easily

# Default mode: development
MODE=${1:-dev}

if [ "$MODE" == "dev" ]; then
    echo "Starting in DEVELOPMENT mode..."
    export BUILD_TARGET=development
    export ADMIN_COMMAND="npm start"
    export REACT_APP_BACKEND_URL=http://localhost:8000
    docker compose up
elif [ "$MODE" == "prod" ]; then
    echo "Starting in PRODUCTION mode..."
    export BUILD_TARGET=production
    export ADMIN_COMMAND="npm run build && serve -s build -l 3000"
    docker compose up --build -d
else
    echo "Unknown mode: $MODE"
    echo "Usage: ./run.sh [dev|prod]"
    exit 1
fi
