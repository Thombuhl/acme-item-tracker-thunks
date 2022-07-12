const express = require('express');
const {syncAndSeed} = require('./db/seeder')
const app = express();


app.use(express.json());
app.use('/', require('./api/routes'));
app.use('/api', require('./api/routes'));
app.use('/dist', express.static('dist'));


app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send(err);
});


const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));


syncAndSeed();
