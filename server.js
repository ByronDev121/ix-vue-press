const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use('/ix-vue-press', express.static(path.join(__dirname, 'src/.vuepress/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/.vuepress/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/ix-vue-press`);
});