FROM 60.205.171.6:5000/centos-nvm:latest

MAINTAINER docker_user lichunwei@hefantv.com

# Install global cnpm
#RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

RUN mkdir -p /data/node/
WORKDIR /data/node

# install app dependencies
COPY package.json /data/node/
# bundle app files 
COPY . /data/node/

# set envpw
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV  production

# show current folder structure in logs
RUN ls -al -R

RUN ["chmod", "+x", "/data/node/build.sh"]

# port
EXPOSE 9018

ENTRYPOINT [ "/bin/bash", "/data/node/build.sh" ]
#CMD /bin/bash /data/node/build.sh $NODE_ENV

#CMD [ "pm2-runtime", "start", "pm2.json", "--env", "$NODE_ENV" ]
#CMD pm2 start pm2.json --env ${NODE_ENV} --no-daemon