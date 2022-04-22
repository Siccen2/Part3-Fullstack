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

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/:id', (request, response, next) => {
  Persons.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  console.log(request.params)
  Persons.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Persons.findByIdAndUpdate(request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


app.get('/info', (request, response) => {
  Persons.count().then(person_count => {
    const body = `
    <p>Phonebook has info for ${person_count} people</p>
    <p>${new Date}</p>
    `
    response.send(body)
  })

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
