import express from 'express';
const app = express();
app.use(express.json());
const connection = require('./database/connection');
const Task = require('./Models/task.modal');

connection
    .authenticate()
    .then(() => {
        console.log('Conexao feita com o banco de dados!')
    })
    .catch((msgErro:any) => {
        console.log(msgErro);
    })

app.get('/', (request, response)=>{
  return response.json({message: 'Chegamos Aqui'});
});

app.post('/tasks', (request, response)=>{
    const {name, status} = request.body;
    Task.create({
        name: name,
        status: status
    }).then(()=>{
        return response.json({message: 'Task successfully created'});
    })
  });

app.get("/tasks", (request, response) => {
  Task.findAll({
      raw: true,
      order: [
          ['id', 'DESC']]
  }).then((tasks: any) => {
      response.json({"tasks": tasks})
  })
});

app.put('/tasks/edit/:id', (request, response)=>{
  const{id, name, status} = request.params;
  
  Task.update(request.body, {
    where: { id: id }
  })
    .then(()=>{
        return response.json({message: 'task updated successfully'});
    })
})

app.delete('/task/delete/:id', (request, response)=>{
    const {id} = request.params;
            Task.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                return response.json({message: 'Task successfully deleted'});
            })
            .catch((msgErro: any) => {
                console.log(msgErro);
            })
   
})




app.listen(3333, ()=>{console.log('Servidor Ok')})