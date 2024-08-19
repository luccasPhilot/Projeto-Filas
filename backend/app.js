//npm run dev
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const todoRoute = require('./routes/fila');

app.use(cors());
app.use(express.json());

app.use('/fila', todoRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
