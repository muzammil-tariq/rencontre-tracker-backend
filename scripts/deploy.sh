#!/bin/bash

# script to deploy the nestjs app to the server using pm2
git reset --hard && \
echo "Git reset successful!" || \
{ echo "Git reset failed!"; exit 1; }

git pull && \
echo "Git pull successful!" || \
{ echo "Git pull failed!"; exit 1; }

npm install && \
echo "npm install successful!" || \
{ echo "npm install failed!"; exit 1; }

npm run build && \
echo "npm run build successful!" || \
{ echo "npm run build failed!"; exit 1; }

npm run typeorm:migrate && \
echo "typeorm:migrate successful!" || \
{ echo "typeorm:migrate failed!"; exit 1; }

./node_modules/.bin/pm2 restart legacysuite && \
echo "pm2 restart successful!" || \
{ echo "pm2 restart failed!"; exit 1; }

echo "Successfully deployed!"