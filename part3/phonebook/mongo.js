const mongoose = require('mongoose');

function main() {
  if (process.argv.length < 4) {
    console.log('Give username and password as arguments');
    process.exit(1);
  }

  const username = process.argv[2];
  const password = process.argv[3];

  const url = `mongodb+srv://${username}:${password}@cluster0.cdwdkpe.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose.set('strictQuery', false);
  mongoose.connect(url, { family: 4 });

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model('Person', personSchema);

  if (process.argv.length < 6) {
    Person.find({})
      .then((result) => {
        console.log('phonebook:');
        result.forEach((p) => {
          console.log(`${p.name} ${p.number}`);
        });
      })
      .finally(() => {
        mongoose.connection.close();
      });
    return;
  }

  const nameInput = process.argv[4];
  const numberInput = process.argv[5];

  const person = new Person({
    name: nameInput,
    number: numberInput,
  });

  person
    .save()
    .then((response) => {
      console.log(
        `added ${response.name} number ${response.number} to phonebook`,
      );
    })
    .finally(() => {
      mongoose.connection.close();
    });
  return;
}

main();
