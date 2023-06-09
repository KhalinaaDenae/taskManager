const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Load tasks from JSON file
let tasks = [];
if (fs.existsSync('tasks.json')) {
 tasks = JSON.parse(fs.readFileSync('tasks.json'));
}

// Render the to-do list
app.get('/', (req, res) => {
 res.render('index', { tasks });
});

// Add a new task
app.post('/', (req, res) => {
 const task = k = req.body.task.trim();
 if (task) {
 tasks.push(task);
 fs.writeFileSync('tasks.json', JSON.stringify(tasks));
 }
 res.redirect('/');
});

// Delete a task
app.get('/delete/:id', (req, res) => {
 const id = parseInt(req.params.id);
 tasks.splice(id, 1);
 fs.writeFileSync('tasks.json', JSON.stringify(tasks));
 res.redirect('/');
});

// Render the edit task page
app.get('/edit/:id', (req, res) => {
 const id = parseInt(req.params.id);
 const task = tasks[id];
 res.render('edit', { id, task });
});

// Update a task
app.post('/edit/:id', (req, res) => {
 const id = parseInt(req.params.id);
 const task = req.body.task.trim();
 if (task) {
 tasks[id] = task;
 fs.writeFileSync('tasks.json', JSON.stringify(tasks));
 }
 res.redirect('/');
});

app.listen(7000, () => {
 console.log('Server is running on port 7000');
});