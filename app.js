const express = require('express');
const { data } = require('./data.json');

const { projects } = data;

const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.locals = { projects };
  return res.render('index', res.locals);
});

app.get('/about', (req, res) => {
  return res.render('about');
});

app.get('/project/:id', (req, res) => {
  const { id } = req.params;
  const title = projects[id].project_name;
  const description = projects[id].description;
  const technologies = projects[id].technologies;
  const live = projects[id].live_link;
  const github = projects[id].github_link;
  const images = projects[id].image_urls;
  const templateData = { title, description, technologies, live, github, images};
  return res.render('project', templateData);
});


app.use((req, res, next) => { //after all the other routes because if none were activated it means he didn't found the requested route
  const err = new Error('Not Found');
  err.status = 404;
  console.error("Ups. We can't seem to find the requested url")
  next(err);
});

app.use((err, req, res, next)=>{
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3000, () => {
    console.log('the application is running on localhost:3000')
  });
