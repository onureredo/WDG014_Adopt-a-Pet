import express from 'express';
import pets from './petList.js';

const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send(`
        <h1>Adopt a Pet!</h1>
        <p>Browse through the links below to find your new furry friend</p>
        
        <ul>
            <li><a href='/animals/dogs'>Dogs</a></li>
            <li><a href='/animals/cats'>Cats</a></li>
            <li><a href='/animals/rabbits'>Rabbits</a></li>
        </ul>
    `);
});

app.get('/animals/:pet_type', (req, res) => {
  const petType = req.params.pet_type;
  const petList = pets[petType];

  if (!petList)
    return res.status(404).send(`<h1>No aminals of this type found!</h1>`);

  const petItems = petList
    .map(
      (pet, index) =>
        `<li><a href='/animals/${petType}/${index}'>${pet.name}</a></li>`
    )
    .join('');

  res.send(`
    <h1>List of ${petType}</h1>
    <ul>${petItems}</ul>
  `);
});

app.get('/animals/:pet_type/:pet_id', (req, res) => {
  const petType = req.params.pet_type;
  const petId = req.params.pet_id;
  const petList = pets[petType];

  if (!petList || petId >= petList.length)
    return res.status(404).send(`<h1>Pet not found </h1>`);

  const findPet = petList[petId];
  res.send(`
    <h1>${findPet.name}</h1>
    <img src=${findPet.url} />
    <p>${findPet.description} </p>

    <ul>
        <li>Age: ${findPet.age}</li>
        <li>Breed: ${findPet.breed}</li>  
  `);
});

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
