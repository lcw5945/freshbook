#!/usr/bin/env bash


if [ -z $NODE_ENV ]
then echo "please input NODE_ENV"
exit 1
fi

echo $NODE_ENV

. "$NVM_DIR/nvm.sh"

cnpm install

#环境判断
if [ $NODE_ENV == "development" ]
then
    npm run dev
elif [ $NODE_ENV == "testing" ]
then
    npm run build
elif [ $NODE_ENV == "production" ]
then
    npm run pro
else
    npm run pro
fi

#pm2 start pm2.json --env $NODE_ENV --no-daemon
pm2-runtime ./pm/ecosystem.json --env $NODE_ENV