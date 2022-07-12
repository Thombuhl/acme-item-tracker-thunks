const {conn, User, Thing} = require('./index')

const syncAndSeed = async()=> {
  try {
    await conn.sync({ force: true });
    const [moe, larry, lucy, ethyl] = await Promise.all(
      ['moe', 'larry', 'lucy', 'ethyl'].map( name => User.create({ name }))
    );
    const [foo, bar, bazz, quq, fizz] = await Promise.all(
      ['foo', 'bar', 'bazz', 'quq', 'fizz'].map( name => Thing.create({ name }))
    );

    foo.userId = moe.id;
    bar.userId = lucy.id
    bazz.userId = lucy.id

    await Promise.all([
      foo.save(),
      bar.save(),
      bazz.save()
    ]);
  }
  catch(ex){
    console.log(ex);
  }
};

module.exports = {
  syncAndSeed
}