const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { data } = require('./data.json');
const { projects } = data;

const app = express();

app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
  res.locals = projects;
  console.log(res.locals)
});

app.get('/project/:id', (req, res) => {
  const { id } = req.params;
  const title = projects[id].project_name;
  const description = projects[id].description;
  const technologies = projects[id].technologies;
  const templateData = { title, description, technologies};
  console.log(templateData)
  res.render('project', templateData);
  //res.render('project');
  //const { id } = req.params;

  //res.redirect(`/projects/${id}`);
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next)=>{
  res.locals.error = err;
  res.status(err.status);
  //res.render('error');
});

app.listen(3000, () => {
    console.log('the application is running on localhost:3000')
  });
