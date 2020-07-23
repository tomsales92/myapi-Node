const express = require('express');
const app = express();
app.use(express.json());
const connection = require('./database/connection');
const Task = require('./Models/task.modal');

connection
    .authenticate()
    .then(() => {
        console.log('Conexao feita com o banco de dados!')
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

app.get('/', (request, response)=>{
  return response.json({message: 'Chegamos Aqui'});
});

app.get("/tasks", (req, res) => {
  Task.findAll({
      raw: true,
      order: [
          ['id', 'DESC']]
  }).then(tasks => {
      res.json({"tasks": tasks})
  })
})

app.listen(3333, ()=>{console.log('Servidor Ok')})