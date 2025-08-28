#!/bin/bash
# Electa Admin Panel Manager
# Usage: ./manage.sh [dev|prod] [up|down|rebuild]

MODE=${1:-dev}          # dev or prod (default: dev)
ACTION=${2:-up}         # up, down, rebuild (default: up)

if [ "$MODE" != "dev" ] && [ "$MODE" != "prod" ]; then
    echo "Unknown mode: $MODE"
    echo "Usage: ./manage.sh [dev|prod] [up|down|rebuild]"
    exit 1
fi

PROFILE=$MODE

case $ACTION in
    up)
        echo "Starting Electa in $MODE mode..."
        docker compose --profile $PROFILE up ${@:3}
        ;;
    down)
        echo "Stopping Electa in $MODE mode..."
        docker compose --profile $PROFILE down
        ;;
    rebuild)
        echo "Rebuilding and starting Electa in $MODE mode..."
        docker compose --profile $PROFILE up --build -d
        ;;
    *)
        echo "Unknown action: $ACTION"
        echo "Valid actions: up | down | rebuild"
        exit 1
        ;;
esac
