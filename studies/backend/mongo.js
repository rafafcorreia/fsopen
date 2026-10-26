const mongoose = require('mongoose');

if (process.argv.length < 4) {
  console.log('give username and password as argument');
  process.exit(1);
}

const username = process.argv[2];
const password = process.argv[3];

const url = `mongodb+srv://${username}:${password}@cluster0.cdwdkpe.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url, { family: 4 });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// });

// note.save().then((result) => {
//   console.log('note saved!');
//   mongoose.connection.close();
// });

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
