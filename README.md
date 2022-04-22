# Part3-Fullstack
Part 3 of Fullstack course.

heroku link https://serene-cliffs-06224.herokuapp.com/


# shitcode
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