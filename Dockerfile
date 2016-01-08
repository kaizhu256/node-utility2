FROM node:latest
MAINTAINER kai zhu <kaizhu256@gmail.com>
# apt-get install packages
RUN apt-get update && \
    apt-get install -y \
        busybox \
        chromium \
        gconf2 \
        less \
        nginx-extras \
        vim \
        xvfb
# npm test utility2
RUN export DISPLAY=:99.0 && (Xvfb "$DISPLAY" &) && \
    cd /tmp && \
    npm install "kaizhu256/node-utility2#alpha" && \
    cd node_modules/utility2 && \
    npm install --unsafe-perm && \
    npm test --mode-coverage
# cleanup
RUN apt-get clean && \
    (rm -fr \
        /tmp/* \
        /tmp/.* \
        /var/lib/apt/lists/* \
        /var/lib/apt/lists/.* \
        /var/tmp/* \
        /var/tmp/.* \
        2>/dev/null || true)
