const express = require('express');

const app = express();
app.use(express.static('./dist/scait-foodcart-fe'));

app.get('*', (req, res) => {
  res.sendFile('index.html', {root: './dist/scait-foodcart-fe/'});
});

app.listen(process.env.PORT || 4200);

