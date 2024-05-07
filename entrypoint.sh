#!/bin/bash
export GAMES_ROOT_DIR="/root/.minetest/games"
export GAME_ENGINE_URL="https://content.minetest.net/packages/Wuzzy/mineclone2/releases/22662/download"
mkdir -p ${GAMES_ROOT_DIR}

if [ ! -d "${GAMES_ROOT_DIR}/mineclone2" ]; then
    echo "Downloading Minetest game engine"
    wget  ${GAME_ENGINE_URL} -O ${GAMES_ROOT_DIR}/minetest.zip && \
    unzip ${GAMES_ROOT_DIR}/minetest.zip -d ${GAMES_ROOT_DIR}/ && \
    rm -rf ${GAMES_ROOT_DIR}/minetest.zip
fi

minetestserver --gameid "mineclone2"
