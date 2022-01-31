
const { 
  createUser,
  createSet,
  createCard,
  createCollectionTemplate,
  createCollection,
  createCollectionTemplateCard,
  createCollectionCard
} = require('./index');

async function populateInitialData() {
  try {

    console.log('Starting to seed database');


    // Users
    console.log('Creating users');
    const usersToCreate = [
      { username: 'albert', password: 'bertie99', email:'albert@gmail.com' },
      { username: 'sandra', password: 'sandra123', email:'sandra@gmail.com' },
      { username: 'glamgal', password: 'glamgal123', email:'glamgal@gmail.com' },
      { username: 'pruplebarny', password: 'barney123', email:'barney@gmail.com' },
      { username: 'luc', password: '12345678', email:'luc@gmail.com', isAdmin:true }
    ];

    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('Finished creating users!');
    console.log(users);

    // Sets
    console.log('Creating sets');
    const setsToCreate = [
      { 
        name: 'Sun & Moon (Base)', 
        series: 'Sun & Moon',
        logo: 'https://www.serebii.net/card/logo/sunmoon-th.png',
        numberOfCards: 161,
        normalCards: 149,
        secretCards: 12
      },
      { 
        name: 'Sword & Shield (Base)', 
        series: 'Sword & Shield',
        logo: 'https://www.serebii.net/card/logo/cosmiceclipse-th.png',
        numberOfCards: 216,
        normalCards: 202,
        secretCards: 14
      },
      { 
        name: 'HeartGold SoulSilver (Base)', 
        series: 'HeartGold SoulSilver',
        logo: 'https://www.serebii.net/card/logo/heartgoldsoulsilver-th.png',
        numberOfCards: 124,
        normalCards: 123,
        secretCards: 1
      },
    ];

    const sets = await Promise.all(setsToCreate.map(createSet));
    console.log('Finished creating sets!');
    console.log(sets);

    // Cards
    const cardsToCreate = [
      { 
        name: 'Drizzile',
        image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1645076.jpg',
        set: 1,
        setNum: 56,
        rarity: 'Uncommon',
        version: 'Normal',
        cardType: 'Pokémon - Stage 1',
        type: 'Water',
        hitPoints: 90,
        artist: 'Naoki Saito'
      },
      { 
        name: 'Arceus & Dialga & Palkia GX',
        image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1605919.jpg',
        set: 2,
        setNum: 156,
        rarity: 'Rare Holo GX',
        version: 'Hollo',
        cardType: 'Pokémon - TAG TEAM',
        type: 'Dragon',
        hitPoints: 90,
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Ordinary Rod',
        image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1645191.jpg',
        set: 2,
        setNum: 171,
        rarity: 'Uncommon',
        version: 'Normal',
        cardType: 'Trainer - Item',
        type: null,
        hitPoints: null,
        artist: '5ban Graphics',
      },
      { 
        name: 'Ditto',
        image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/302988.jpg',
        set: 3,
        setNum: 17,
        rarity: 'Rare',
        version: 'Normal',
        cardType: 'Pokémon',
        type: 'Normal',
        hitPoints: 40,
        artist: null,
      }
    ];

    const cards = await Promise.all(cardsToCreate.map(createCard));
    console.log('Finished creating Cards!');
    console.log(cards);

    // Collection Templates
    console.log('Creating collection templates');
    const collectionTemplatesToCreate = [
      { 
        name: 'Charmanders!', 
        image: 'https://archives.bulbagarden.net/media/upload/7/73/004Charmander.png',
        numberOfCards: 10,
        normalCards: 8,
        secretCards: 2,
        description: 'A charmander collection!',
        creatorId: 1
      },
      
      { 
        name: 'Gen 1 pokemon', 
        image: 'https://m.media-amazon.com/images/I/61XjZ8DvaFL._SX466_.jpg',
        numberOfCards: 150,
        normalCards: 150,
        secretCards: 0,
        description: 'All Gen 1 pokemon, no hollos or secret rares',
        creatorId: 2
      },
    ];

    const collectionTemplates = await Promise.all(collectionTemplatesToCreate.map(createCollectionTemplate));
    console.log('Finished creating collection templates!');
    console.log(collectionTemplates);

    // Collection Templates Cards
    console.log('Creating collection templates cards');
    const collectionTemplatesCardsToCreate = [
      { 
        "collectionTemplateId": 1,
        "cardId": 1
      },
      { 
        "collectionTemplateId": 1,
        "cardId": 2
      },
      { 
        "collectionTemplateId": 2,
        "cardId": 3
      },
    ];

    const collectionTemplatesCards = await Promise.all(collectionTemplatesCardsToCreate.map(createCollectionTemplateCard));
    console.log('Finished creating collection templates Cards!');
    console.log(collectionTemplatesCards);

    // Collections
    console.log('Creating collections');
    const collectionsToCreate = [
      { 
        name: 'User 1\s grass colection', 
        image: 'https://archives.bulbagarden.net/media/upload/7/73/004Charmander.png',
        numberOfCards: 10,
        normalCards: 8,
        secretCards: 2,
        description: 'My own personal grass type collection',
        userId: 1
      },
      { 
        name: 'Legendarys', 
        image: 'https://m.media-amazon.com/images/I/61XjZ8DvaFL._SX466_.jpg',
        numberOfCards: 150,
        normalCards: 150,
        secretCards: 0,
        description: 'All legendarys',
        userId: 2
      },
    ];

    const collections = await Promise.all(collectionsToCreate.map(createCollection));
    console.log('Finished creating collections!');
    console.log(collections);

    // Collections Cards
    console.log('Creating collections cards');
    const collectionsCardsToCreate = [
      { 
        "collectionId": 1,
        "cardId": 2,
        "collected": false
      },
      { 
        "collectionId": 1,
        "cardId": 3,
        "collected": true
      },
      { 
        "collectionId": 2,
        "cardId": 1,
        "collected": false
      },
    ];

    const collectionsCards = await Promise.all(collectionsCardsToCreate.map(createCollectionCard));
    console.log('Finished creating collections Cards!');
    console.log(collectionsCards);

    console.log('Finished to seeding database');

  } catch (error) {
    console.error("Error building tables!", error);
    throw error;
  }
}

module.exports = {
  populateInitialData
}
