/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/

const express = require('express');
require('dotenv').config();

const projectModel = require('./data/helpers/projectModel.js');
const actionModel = require('./data/helpers/actionModel.js');

const server = express();


const router = express.Router();
const port = process.env.PORT ? process.env.PORT : 4000;

server.use(express.json());

server.get('/projectmodel', (req, res) => {
    const {id} = req.params

    projectModel.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

server.post('/projectmodel', (req, res) => {

    const projectInfo = req.body;

    projectModel.insert(projectInfo)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

server.put('/projectmodel/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body;

    projectModel.update(id, changes)
        .then(project => {
           if (project) {
            res.status(200).json(project);
           } else {
            res.status(404).json({message: "not found"});
           }
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

server.delete('/projectmodel/:id', (req, res) => {
    const { id } = req.params;

    projectModel.remove(id)
        .then(removed => {
            if(removed) {
                res.status(204).end();    
            } else {
                res.status(404).json({message: "not found"});
            }     
        })
        .catch(error => {
            res.status(500).json(error);
        })
})


server.use('/', (req, res) => {
    res.status(200).send('Hello World! Server is working')
})

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`)
})


