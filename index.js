const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()
const Persons = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('post', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))


app.get('/api/persons', (request, response) => {
  Persons.find({}).then(persons => {
    response.json(persons)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const persons = new Persons({
    
    name: body.name,
    number: body.number,

  })

  persons.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

 /* //Check if names are the same
  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name already exist'
    })
  }
  //name misssing
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  //number missing
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,

  }

  persons = persons.concat(person)

  response.json(person)

})*/



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = persons.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

app.get('/infos', (request, response) => {
  const length = persons.length
  const date = new Date()
  response.send(`<p>Phonebook has info for ${length} people</p><p>${date}</p>`)
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
