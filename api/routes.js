const express = require('express');
const { User, Thing } = require('../db');
const router = express.Router();
const path = require('path');

const spa = './public/index.html'
router.get('/', (req, res)=> res.sendFile(path.join(__dirname, './public/index.html')));

router.post('/users', async(req, res, next)=> {
  try {
    res.status(201).send(await User.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});


router.post('/things', async(req, res, next)=> {
  try {
    res.status(201).send(await Thing.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

router.put('/things/:id', async(req, res, next)=> {
  try {
    const thing = await Thing.findByPk(req.params.id);
    await thing.update(req.body);
    res.send(thing);
  }
  catch(ex){
    next(ex);
  }
});

router.put('/user/:id', async(req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    res.send(user);
    } catch(er) {
      next(er);
    }
  });

router.delete('/users/:id', async(req, res, next)=> {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

router.delete('/things/:id', async(req, res, next)=> {
  try {
    const thing = await Thing.findByPk(req.params.id);
    await thing.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

router.get('/things', async(req, res, next)=> {
  try {
    res.send(await Thing.findAll({
      order: [['name']]
    }));
  }
  catch(ex){
    next(ex);
  }
});

router.get('/users', async(req, res, next)=> {
  try {
    res.send(await User.findAll());
  }
  catch(ex){
    next(ex);
  }
});



module.exports = router;