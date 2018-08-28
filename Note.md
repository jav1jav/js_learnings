install dependencies
npm install
require everything , express, bodyparser
define our app
const app = express()

all our middleware, which is stuff that intercepts every single request.
ususally you start with logging, bodyparsing 

then everything else

ending with error handling middleware.

routing middleware
is ususally in another file, and a callback function to abstract all our routes out.

this is how we make a router/subrouter

```js
const router = express.Router()

router.get(blahblah)

```

how can we write routes?
what kind of routes are there?
1. get
2. post
3. put
4. delete

How to write a get route
```js
router.get('path',(req,res,next)=>{
  res.send(whatever you getting)
})

router.get('/path/:id',(req,res,next)=>{
  //to access the wild card, you have to use req.params.id
  //there are also queries
  //accessed by req.query
})
```

How to write a post route
```js
//usually used for database insertion
router.post('path',(req,res,next)=>{
  //usually user sends information from a form on the front end, and you can use req.body
  req.body
  //http code 201 stands for created, ususally in the post route
  res.status(201).send(whateverYouCreated)
})
```


Put is usually a database update on a specific row
```js
router.put('/:id', async (req,res,next)=>{
  const id = req.params.id
  const thingtoupdate = await Model.findById(id)
  await thingToUpdate.update(req.body)
  res.status(204).send(thingToUpdate)
})
```

DELETE
```js
router.delete('/:id',async(req,res,next)=>{
  //same as above
  res.status()
})
```

# Sequelize
defining a model
```js
const Model = db.define('Model',{
  attribute1: Sequelize.type,
  attribute2:{
    type:Sequelize.STRING,
    allowNull:false, //this makes it required
    validate:{
      yourValidator:true/false/somethingelse
      //if you need more validations, nest it again 84
    }
  }  
})
```
class Methods
```js
Model.YourMethod = function(){
  this.findAll()
  Model.findAll()
}
//querying the database with your own methods, you have to call the built in methods
```
instance Methods
```js
Model.prototype.YourInstanceMethod = function(){
  //you're gonna use the this keyword
  this.doSomething //references the individual
}
```

associations
```js
Pet.belongsTo(Owner)
//this gives us association methods
Pet.setOwner(instanceOfOwner)
Pet.getOwner()
// do both associations, this gives you all the methods
Owner.hasMany(Pet)
//gives us these
Owner.getPet()
Owner.setPet()
```
[One-Many Associations - Sequelize Guides](https://sequelize-guides.netlify.com/one-many-associations/)

querying
common querying methods
```js
Model.findAll()
//if no arguments, you just get everything SELECT * FROM, returns an array!!!.
Model.findAll({where:{
  name:'jack'
}})

Model.findOne()

Model.findById(int)

```

queries that change the database
```js
//insert
Model.create()

Model.findOrCreate()

Model.bulkCreate()//promise an array

//update
Model.update({where:})
//this.bulk, you should put a where clause
model.update(req.body)

//delete
Model.destroy({where:})

//bulk destroy
model.destroy()

```

google operaters
[Search Operators - Sequelize Guides](https://sequelizedocs.fullstackacademy.com/search-operators/)
```js
const Op = Sequelize.Op
//then when you query you do this
Pug.findAll({
  where: {
    age: {
      [Op.lte]: 7 // square brackets are needed for property names that aren't plain strings
    }
  }
})

```
[Tutorial | Sequelize | The node.js ORM for PostgreSQL, MySQL, SQLite and MSSQL](http://docs.sequelizejs.com/manual/tutorial/querying.html#operators)

React how to do?








