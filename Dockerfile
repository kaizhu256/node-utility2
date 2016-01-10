FROM kaizhu256/node-utility2:docker.base
MAINTAINER kai zhu <kaizhu256@gmail.com>
# copy app to docker container
COPY ./ /app
# chdir
WORKDIR /app
# run build
RUN ./index.sh shBuildInsideDocker
# expose ports
EXPOSE 22 80 443 1337 8080
# docker run --name utility2 -dt -p 8080:8080 kaizhu256/node-utility2:alpha
CMD /bin/bash -c "npm start --mode-docker"
