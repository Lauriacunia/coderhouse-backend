const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser('coder19dic'));

app.use(express.json());

app.post('/cookies', (req, res) => {
  const { nombre, valor, tiempo } = req.body;
  console.log( nombre, valor, tiempo );
  if(!nombre || !valor) {
    res.status(400).json({ error: 'Faltan datos' });
  }
  if(tiempo){
    res.cookie(nombre, valor, { signed: true, maxAge: tiempo });
  } else {
    res.cookie(nombre, valor, { signed: true });
  }
  res.json({ proceso: 'ok' });
});

app.get('/cookies', (req, res) => {
  res.json({ normales: req.cookies, firmadas: req.signedCookies })
});

app.delete('/cookies/:nombre', (req, res) => {
  const { nombre } = req.params;

  if(nombre) {
    res.clearCookie(nombre);
    res.json({ proceso: 'ok' });
  } else {
    res.status(400).json({ error: 'Falta el nombre de la cookie' });
  }
});


const port = 8080;
const server = app.listen(port, () => {
  console.log(`servidor escuchando en http://localhost:${port}`);
});

server.on('error', error => console.log(`Error en servidor ${error}`));