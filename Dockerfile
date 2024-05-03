FROM node:16.19.1-slim as base

LABEL "com.github.actions.name"="Vuepress deploy"
LABEL "com.github.actions.description"="A GitHub Action to build and deploy Vuepress sites to GitHub Pages"
LABEL "com.github.actions.icon"="upload-cloud"
LABEL "com.github.actions.color"="gray-dark"

LABEL "repository"="https://github.com/ByronDev121/ix-vue-press"
LABEL "homepage"="https://github.com/ByronDev121/ix-vue-press"
LABEL "maintainer"="ByronDev121 <byron.div@gmail.com>"

RUN apt-get update && apt-get install -y git jq

COPY deploy.sh /deploy.sh
ENTRYPOINT ["/entrypoint.sh"]