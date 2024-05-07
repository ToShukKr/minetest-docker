FROM alpine:3.19

RUN apk add --no-cache \
        minetest-server \
        bash

COPY entrypoint.sh /usr/local/bin/entrypoint.sh

CMD entrypoint.sh
