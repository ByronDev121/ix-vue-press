#!/usr/bin/env sh

# abort on errors
set -e

npm install

git config --global --add safe.directory '*'

# build
npm run build

# navigate into the build output directory
cd src/.vuepress/dist

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:aitormendez/democracia.git master:gh-pages
cd -