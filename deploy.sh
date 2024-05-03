#!/usr/bin/env sh

# abort on errors
set -e

npm install

# build
npm run build

# navigate into the build output directory
cd src/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

cd -