

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.msvxz.mongodb.net/cluster0?retryWrites=true&w=majority`


mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Persons = mongoose.model('Persons', noteSchema)



if (process.argv.length == 5) {
  const note = new Persons({
    name: process.argv[3],
    number: process.argv[4]
    
  })

  note.save().then(
    console.log(`Added: ${process.argv[3]} Number: ${process.argv[4]} to phonebook`),
    mongoose.connection.close()
  )
}
else {
  Persons.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}