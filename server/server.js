const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mysql = require('mysql2/promise'); 
const bodyParser = require('body-parser');
const cors = require('cors'); 

dotenv.config();
app.use(bodyParser.json());
app.use(cors()); 


async function createConnection() {
  const conn = await mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
  });
  return conn;
}

app.get("/all", async (req, res) => {
  try {
    const conn = await createConnection();
    const [rows] = await conn.query("SELECT * FROM filmes");
    res.send(rows);
    console.log(rows);
    conn.end(); // Fechando a conexão após a consulta
  } catch (error) {
    console.error('Erro ao obter os filmes:', error);
    res.status(500).json({ message: 'Ocorreu um erro ao obter os filmes.' });
  }
});

app.get("/filme/:id", async (req, res) => {
  const id = req.params.id; // Extract the 'id' from the request parameters

  try {
    const conn = await createConnection();
    const [rows] = await conn.query("SELECT * FROM filmes WHERE ID = ?", [id]);

    if (rows.length === 0) {
      // If no movie is found with the given ID, return a 404 response
      return res.status(404).json({ message: 'Filme não encontrado.' });
    }

    const movie = rows[0];
    res.json(movie);
    
    conn.end(); // Closing the connection after the query
  } catch (error) {
    console.error('Erro ao obter o filme:', error);
    res.status(500).json({ message: 'Ocorreu um erro ao obter o filme.' });
  }
});


app.post('/include', async (req, res) => {
  const { Nome, Diretor, AnoLancamento } = req.body;

  try {
    const conn = await createConnection();
    const sql_query = "INSERT INTO filmes (Nome, Diretor, AnoLancamento) VALUES (?, ?, ?)";
    await conn.query(sql_query, [Nome, Diretor, AnoLancamento]);
    conn.end(); 

    res.status(201).json({ message: 'Filme inserido com sucesso!' });
  } catch (error) {
    console.error('Erro ao inserir o filme:', error);
    res.status(500).json({ message: 'Ocorreu um erro ao inserir o filme.' });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id; // Extract the 'id' from the request parameters
  const conn = await createConnection();
  const sql_query = `DELETE FROM FILMES WHERE ID = ${id}`;
  await conn.query(sql_query); 
  conn.end(); 
  res.status(201).json({ message: 'Filme removido com sucesso' });
});


app.put("/modificar/:id", async (req, res) => {
  const id = req.params.id;
  const { Nome, Diretor, AnoLancamento } = req.body;
  const conn = await createConnection();
  
  const sql_query = `UPDATE FILMES SET nome = ?, diretor = ?, AnoLancamento = ? WHERE ID = ?`;
  await conn.query(sql_query, [Nome, Diretor, AnoLancamento, id]); 
  conn.end(); 
  res.status(200).json({ message: 'Filme atualizado com sucesso' });
});


app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
