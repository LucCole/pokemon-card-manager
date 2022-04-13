
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
      { username: 'pruplebarny', password: 'barney123', email:'barney@gmail.com', admin:true },
      { username: 'luc', password: '12345678', email:'luc@gmail.com', admin:true, superAdmin: true }
    ];

    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('Finished creating users!');
    console.log(users);

    // Sets
    console.log('Creating sets');
    const setsToCreate = [
      // { 
      //   name: 'Sun & Moon (Base)', 
      //   series: 'Sun & Moon',
      //   logo: 'https://www.serebii.net/card/logo/sunmoon-th.png',
      //   numberOfCards: 161,
      //   normalCards: 149,
      //   secretCards: 12
      // },
      // { 
      //   name: 'Sword & Shield (Base)', 
      //   series: 'Sword & Shield',
      //   logo: 'https://www.serebii.net/card/logo/cosmiceclipse-th.png',
      //   numberOfCards: 216,
      //   normalCards: 202,
      //   secretCards: 14
      // },
      // { 
      //   name: 'HeartGold SoulSilver (Base)', 
      //   series: 'HeartGold SoulSilver',
      //   logo: 'https://www.serebii.net/card/logo/heartgoldsoulsilver-th.png',
      //   numberOfCards: 124,
      //   normalCards: 123,
      //   secretCards: 1
      // },
      { 
        name: 'Jungle', 
        logo: 'https://serebii.net/card/logo/jungle.png',
        icon: 'https://serebii.net/card/logo/jungle-th.png',
        releaseDate: "June 16th 1999",
        cards: 64,
        normalCards: 64,
        secretCards: 0
      },
      { 
        name: 'Fossil', 
        logo: 'https://serebii.net/card/logo/fossil.png',
        icon: 'https://serebii.net/card/logo/fossil-th.png',
        releaseDate: "October 10th 1999",
        cards: 62,
        normalCards: 62,
        secretCards: 0
      }
    ];

    const sets = await Promise.all(setsToCreate.map(createSet));
    console.log('Finished creating sets!');
    console.log(sets);

    // Cards
    const cardsToCreate = [
      // { 
      //   name: 'Drizzile',
      //   image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1645076.jpg',
      //   set: 1,
      //   numberInSet: 56,
      //   rarity: 'Uncommon',
      //   // typeNormal: true, 
      //   // typeHollo: false, 
      //   // typeReverseHollo: false, 
      //   // typeFoil: false,
      //   artist: 'Naoki Saito'
      // },
      // { 
      //   name: 'Arceus & Dialga & Palkia GX',
      //   image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1605919.jpg',
      //   set: 2,
      //   numberInSet: 156,
      //   rarity: 'Rare Holo GX',
      //   // typeNormal: true, 
      //   // typeHollo: false, 
      //   // typeReverseHollo: false, 
      //   // typeFoil: false,
      //   artist: 'Mitsuhiro Arita'
      // },
      // { 
      //   name: 'Ordinary Rod',
      //   image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1645191.jpg',
      //   set: 2,
      //   numberInSet: 171,
      //   rarity: 'Uncommon',
      //   // typeNormal: true, 
      //   // typeHollo: false, 
      //   // typeReverseHollo: false, 
      //   // typeFoil: false,
      //   artist: '5ban Graphics'
      // },
      // { 
      //   name: 'Ditto',
      //   image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/302988.jpg',
      //   set: 3,
      //   numberInSet: 17,
      //   rarity: 'Rare',
      //   // typeNormal: true, 
      //   // typeHollo: false, 
      //   // typeReverseHollo: false, 
      //   // typeFoil: false,
      //   artist: null
      // }




      // Jungle
      { 
        name: 'Clefable',
        image: 'https://serebii.net/card/jungle/1.jpg',
        set: 1,
        number: 1,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Electrode',
        image: 'https://serebii.net/card/jungle/2.jpg',
        set: 1,
        number: 2,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Flareon',
        image: 'https://serebii.net/card/jungle/3.jpg',
        set: 1,
        number: 3,
        rarity: 'Rare',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Jolteon',
        image: 'https://serebii.net/card/jungle/4.jpg',
        set: 1,
        number: 4,
        rarity: 'Rare',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Kangaskhan',
        image: 'https://serebii.net/card/jungle/5.jpg',
        set: 1,
        number: 5,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Mr. Mime',
        image: 'https://serebii.net/card/jungle/6.jpg',
        set: 1,
        number: 6,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Nidoqueen',
        image: 'https://serebii.net/card/jungle/7.jpg',
        set: 1,
        number: 7,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Pidgeot',
        image: 'https://serebii.net/card/jungle/8.jpg',
        set: 1,
        number: 8,
        rarity: 'Rare',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Pinsir',
        image: 'https://serebii.net/card/jungle/9.jpg',
        set: 1,
        number: 9,
        rarity: 'Rare',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Scyther',
        image: 'https://serebii.net/card/jungle/10.jpg',
        set: 1,
        number: 10,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Snorlax',
        image: 'https://serebii.net/card/jungle/11.jpg',
        set: 1,
        number: 11,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Vaporeon',
        image: 'https://serebii.net/card/jungle/12.jpg',
        set: 1,
        number: 12,
        rarity: 'Rare',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Venomoth',
        image: 'https://serebii.net/card/jungle/13.jpg',
        set: 1,
        number: 13,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Victreebel',
        image: 'https://serebii.net/card/jungle/14.jpg',
        set: 1,
        number: 14,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Vileplume',
        image: 'https://serebii.net/card/jungle/15.jpg',
        set: 1,
        number: 15,
        rarity: 'Rare',
        artist: 'Keiji Kinebuchi'
      },
      { 
        name: 'Wigglytuff',
        image: 'https://serebii.net/card/jungle/16.jpg',
        set: 1,
        number: 16,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Clefable',
        image: 'https://serebii.net/card/jungle/17.jpg',
        set: 1,
        number: 17,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Electrode',
        image: 'https://serebii.net/card/jungle/18.jpg',
        set: 1,
        number: 18,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Flareon',
        image: 'https://serebii.net/card/jungle/19.jpg',
        set: 1,
        number: 19,
        rarity: 'Rare',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Jolteon',
        image: 'https://serebii.net/card/jungle/20.jpg',
        set: 1,
        number: 20,
        rarity: 'Rare',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Kangaskhan',
        image: 'https://serebii.net/card/jungle/21.jpg',
        set: 1,
        number: 21,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Mr. Mime',
        image: 'https://serebii.net/card/jungle/22.jpg',
        set: 1,
        number: 22,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Nidoqueen',
        image: 'https://serebii.net/card/jungle/23.jpg',
        set: 1,
        number: 23,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Pidgeot',
        image: 'https://serebii.net/card/jungle/24.jpg',
        set: 1,
        number: 24,
        rarity: 'Rare',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Pinsir',
        image: 'https://serebii.net/card/jungle/25.jpg',
        set: 1,
        number: 25,
        rarity: 'Rare',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Scyther',
        image: 'https://serebii.net/card/jungle/26.jpg',
        set: 1,
        number: 26,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Snorlax',
        image: 'https://serebii.net/card/jungle/27.jpg',
        set: 1,
        number: 27,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Vaporeon',
        image: 'https://serebii.net/card/jungle/28.jpg',
        set: 1,
        number: 28,
        rarity: 'Rare',
        artist: 'agemaru Himeno'
      },
      { 
        name: 'Venomoth',
        image: 'https://serebii.net/card/jungle/29.jpg',
        set: 1,
        number: 29,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Victreebel',
        image: 'https://serebii.net/card/jungle/30.jpg',
        set: 1,
        number: 30,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Vileplume',
        image: 'https://serebii.net/card/jungle/31.jpg',
        set: 1,
        number: 31,
        rarity: 'Rare',
        artist: 'Keiji Kinebuchi'
      },
      { 
        name: 'Wigglytuff',
        image: 'https://serebii.net/card/jungle/32.jpg',
        set: 1,
        number: 32,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Butterfree',
        image: 'https://serebii.net/card/jungle/33.jpg',
        set: 1,
        number: 33,
        rarity: 'Uncommon',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Dodrio',
        image: 'https://serebii.net/card/jungle/34.jpg',
        set: 1,
        number: 34,
        rarity: 'Uncommon',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Exeggutor',
        image: 'https://serebii.net/card/jungle/35.jpg',
        set: 1,
        number: 35,
        rarity: 'Uncommon',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Fearow',
        image: 'https://serebii.net/card/jungle/36.jpg',
        set: 1,
        number: 36,
        rarity: 'Uncommon',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Gloom',
        image: 'https://serebii.net/card/jungle/37.jpg',
        set: 1,
        number: 37,
        rarity: 'Uncommon',
        artist: 'Keiji Kinebuchi'
      },
      { 
        name: 'Lickitung',
        image: 'https://serebii.net/card/jungle/38.jpg',
        set: 1,
        number: 38,
        rarity: 'Uncommon',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Marowak',
        image: 'https://serebii.net/card/jungle/39.jpg',
        set: 1,
        number: 39,
        rarity: 'Uncommon',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Nidorina',
        image: 'https://serebii.net/card/jungle/40.jpg',
        set: 1,
        number: 40,
        rarity: 'Uncommon',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Parasect',
        image: 'https://serebii.net/card/jungle/41.jpg',
        set: 1,
        number: 41,
        rarity: 'Uncommon',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Persian',
        image: 'https://serebii.net/card/jungle/42.jpg',
        set: 1,
        number: 42,
        rarity: 'Uncommon',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Primeape',
        image: 'https://serebii.net/card/jungle/43.jpg',
        set: 1,
        number: 43,
        rarity: 'Uncommon',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Rapidash',
        image: 'https://serebii.net/card/jungle/44.jpg',
        set: 1,
        number: 44,
        rarity: 'Uncommon',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Rhydon',
        image: 'https://serebii.net/card/jungle/45.jpg',
        set: 1,
        number: 45,
        rarity: 'Uncommon',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Seaking',
        image: 'https://serebii.net/card/jungle/46.jpg',
        set: 1,
        number: 46,
        rarity: 'Uncommon',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Tauros',
        image: 'https://serebii.net/card/jungle/47.jpg',
        set: 1,
        number: 47,
        rarity: 'Uncommon',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Weepinbell',
        image: 'https://serebii.net/card/jungle/48.jpg',
        set: 1,
        number: 48,
        rarity: 'Uncommon',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Bellsprout',
        image: 'https://serebii.net/card/jungle/49.jpg',
        set: 1,
        number: 49,
        rarity: 'Common',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Cubone',
        image: 'https://serebii.net/card/jungle/50.jpg',
        set: 1,
        number: 50,
        rarity: 'Common',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Eevee',
        image: 'https://serebii.net/card/jungle/51.jpg',
        set: 1,
        number: 51,
        rarity: 'Common',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Exeggcute',
        image: 'https://serebii.net/card/jungle/52.jpg',
        set: 1,
        number: 52,
        rarity: 'Common',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Goldeen',
        image: 'https://serebii.net/card/jungle/53.jpg',
        set: 1,
        number: 53,
        rarity: 'Common',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Jigglypuff',
        image: 'https://serebii.net/card/jungle/54.jpg',
        set: 1,
        number: 54,
        rarity: 'Common',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Mankey',
        image: 'https://serebii.net/card/jungle/55.jpg',
        set: 1,
        number: 55,
        rarity: 'Common',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Meowth',
        image: 'https://serebii.net/card/jungle/56.jpg',
        set: 1,
        number: 56,
        rarity: 'Common',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Nidoran♀',
        image: 'https://serebii.net/card/jungle/57.jpg',
        set: 1,
        number: 57,
        rarity: 'Common',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Oddish',
        image: 'https://serebii.net/card/jungle/58.jpg',
        set: 1,
        number: 58,
        rarity: 'Common',
        artist: 'Keiji Kinebuchi'
      },
      { 
        name: 'Paras',
        image: 'https://serebii.net/card/jungle/59.jpg',
        set: 1,
        number: 59,
        rarity: 'Common',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Pikachu',
        image: 'https://serebii.net/card/jungle/60.jpg',
        set: 1,
        number: 60,
        rarity: 'Common',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Rhyhorn',
        image: 'https://serebii.net/card/jungle/61.jpg',
        set: 1,
        number: 61,
        rarity: 'Common',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Spearow',
        image: 'https://serebii.net/card/jungle/62.jpg',
        set: 1,
        number: 62,
        rarity: 'Common',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Venonat',
        image: 'https://serebii.net/card/jungle/63.jpg',
        set: 1,
        number: 63,
        rarity: 'Common',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Poké Ball',
        image: 'https://serebii.net/card/jungle/64.jpg',
        set: 1,
        number: 64,
        rarity: 'Common',
        artist: 'Keiji Kinebuchi'
      },

      // Fossil
      { 
        name: 'Aerodactyl',
        image: 'https://serebii.net/card/fossil/1.jpg',
        set: 2,
        number: 1,
        rarity: 'Rare',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Articuno',
        image: 'https://serebii.net/card/fossil/2.jpg',
        set: 2,
        number: 2,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Ditto',
        image: 'https://serebii.net/card/fossil/3.jpg',
        set: 2,
        number: 3,
        rarity: 'Rare',
        artist: 'Keiji Kinebuchi'
      },
      { 
        name: 'Dragonite',
        image: 'https://serebii.net/card/fossil/4.jpg',
        set: 2,
        number: 4,
        rarity: 'Rare',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Gengar',
        image: 'https://serebii.net/card/fossil/5.jpg',
        set: 2,
        number: 5,
        rarity: 'Rare',
        artist: 'Keiji Kinebuchi'
      },
      { 
        name: 'Haunter',
        image: 'https://serebii.net/card/fossil/6.jpg',
        set: 2,
        number: 6,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Hitmonlee',
        image: 'https://serebii.net/card/fossil/7.jpg',
        set: 2,
        number: 7,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Hypno',
        image: 'https://serebii.net/card/fossil/8.jpg',
        set: 2,
        number: 8,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Kabutops',
        image: 'https://serebii.net/card/fossil/9.jpg',
        set: 2,
        number: 9,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Lapras',
        image: 'https://serebii.net/card/fossil/10.jpg',
        set: 2,
        number: 10,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Magneton',
        image: 'https://serebii.net/card/fossil/11.jpg',
        set: 2,
        number: 11,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Moltres',
        image: 'https://serebii.net/card/fossil/12.jpg',
        set: 2,
        number: 12,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Muk',
        image: 'https://serebii.net/card/fossil/13.jpg',
        set: 2,
        number: 13,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Raichu',
        image: 'https://serebii.net/card/fossil/14.jpg',
        set: 2,
        number: 14,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Zapdos',
        image: 'https://serebii.net/card/fossil/15.jpg',
        set: 2,
        number: 15,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Aerodactyl',
        image: 'https://serebii.net/card/fossil/16.jpg',
        set: 2,
        number: 16,
        rarity: 'Rare',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Articuno',
        image: 'https://serebii.net/card/fossil/17.jpg',
        set: 2,
        number: 17,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Ditto',
        image: 'https://serebii.net/card/fossil/18.jpg',
        set: 2,
        number: 18,
        rarity: 'Rare',
        artist: 'Keiji Kinebuchi'
      },
      { 
        name: 'Dragonite',
        image: 'https://serebii.net/card/fossil/19.jpg',
        set: 2,
        number: 19,
        rarity: 'Rare',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Gengar',
        image: 'https://serebii.net/card/fossil/20.jpg',
        set: 2,
        number: 20,
        rarity: 'Rare',
        artist: 'Keiji Kinebuchi'
      },
      { 
        name: 'Haunter',
        image: 'https://serebii.net/card/fossil/21.jpg',
        set: 2,
        number: 21,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Hitmonlee',
        image: 'https://serebii.net/card/fossil/22.jpg',
        set: 2,
        number: 22,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Hypno',
        image: 'https://serebii.net/card/fossil/23.jpg',
        set: 2,
        number: 23,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Kabutops',
        image: 'https://serebii.net/card/fossil/24.jpg',
        set: 2,
        number: 24,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Lapras',
        image: 'https://serebii.net/card/fossil/25.jpg',
        set: 2,
        number: 25,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Magneton',
        image: 'https://serebii.net/card/fossil/26.jpg',
        set: 2,
        number: 26,
        rarity: 'Rare',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Moltres',
        image: 'https://serebii.net/card/fossil/27.jpg',
        set: 2,
        number: 27,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Muk',
        image: 'https://serebii.net/card/fossil/28.jpg',
        set: 2,
        number: 28,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Raichu',
        image: 'https://serebii.net/card/fossil/29.jpg',
        set: 2,
        number: 29,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Zapdos',
        image: 'https://serebii.net/card/fossil/30.jpg',
        set: 2,
        number: 30,
        rarity: 'Rare',
        artist: 'Mitsuhiro Arita'
      },

      { 
        name: 'Arbok',
        image: 'https://serebii.net/card/fossil/31.jpg',
        set: 2,
        number: 31,
        rarity: 'Uncommon',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Cloyster',
        image: 'https://serebii.net/card/fossil/32.jpg',
        set: 2,
        number: 32,
        rarity: 'Uncommon',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Gastly',
        image: 'https://serebii.net/card/fossil/33.jpg',
        set: 2,
        number: 33,
        rarity: 'Uncommon',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Golbat',
        image: 'https://serebii.net/card/fossil/34.jpg',
        set: 2,
        number: 34,
        rarity: 'Uncommon',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Golduck',
        image: 'https://serebii.net/card/fossil/35.jpg',
        set: 2,
        number: 35,
        rarity: 'Uncommon',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Golem',
        image: 'https://serebii.net/card/fossil/36.jpg',
        set: 2,
        number: 36,
        rarity: 'Uncommon',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Graveler',
        image: 'https://serebii.net/card/fossil/37.jpg',
        set: 2,
        number: 37,
        rarity: 'Uncommon',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Kingler',
        image: 'https://serebii.net/card/fossil/38.jpg',
        set: 2,
        number: 38,
        rarity: 'Uncommon',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Magmar',
        image: 'https://serebii.net/card/fossil/39.jpg',
        set: 2,
        number: 39,
        rarity: 'Uncommon',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Omastar',
        image: 'https://serebii.net/card/fossil/40.jpg',
        set: 2,
        number: 40,
        rarity: 'Uncommon',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Sandslash',
        image: 'https://serebii.net/card/fossil/41.jpg',
        set: 2,
        number: 41,
        rarity: 'Uncommon',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Seadra',
        image: 'https://serebii.net/card/fossil/42.jpg',
        set: 2,
        number: 42,
        rarity: 'Uncommon',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Slowbro',
        image: 'https://serebii.net/card/fossil/43.jpg',
        set: 2,
        number: 43,
        rarity: 'Uncommon',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Tentacruel',
        image: 'https://serebii.net/card/fossil/44.jpg',
        set: 2,
        number: 44,
        rarity: 'Uncommon',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Weezing',
        image: 'https://serebii.net/card/fossil/45.jpg',
        set: 2,
        number: 45,
        rarity: 'Uncommon',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Ekans',
        image: 'https://serebii.net/card/fossil/46.jpg',
        set: 2,
        number: 46,
        rarity: 'Common',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Geodude',
        image: 'https://serebii.net/card/fossil/47.jpg',
        set: 2,
        number: 47,
        rarity: 'Common',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Grimer',
        image: 'https://serebii.net/card/fossil/48.jpg',
        set: 2,
        number: 48,
        rarity: 'Common',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Horsea',
        image: 'https://serebii.net/card/fossil/49.jpg',
        set: 2,
        number: 49,
        rarity: 'Common',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Kabuto',
        image: 'https://serebii.net/card/fossil/50.jpg',
        set: 2,
        number: 50,
        rarity: 'Common',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Krabby',
        image: 'https://serebii.net/card/fossil/51.jpg',
        set: 2,
        number: 51,
        rarity: 'Common',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Omanyte',
        image: 'https://serebii.net/card/fossil/52.jpg',
        set: 2,
        number: 52,
        rarity: 'Common',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Psyduck',
        image: 'https://serebii.net/card/fossil/53.jpg',
        set: 2,
        number: 53,
        rarity: 'Common',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Shellder',
        image: 'https://serebii.net/card/fossil/54.jpg',
        set: 2,
        number: 54,
        rarity: 'Common',
        artist: 'Mitsuhiro Arita'
      },
      { 
        name: 'Slowpoke',
        image: 'https://serebii.net/card/fossil/55.jpg',
        set: 2,
        number: 55,
        rarity: 'Common',
        artist: 'Miki Tanaka'
      },
      { 
        name: 'Tentacool',
        image: 'https://serebii.net/card/fossil/56.jpg',
        set: 2,
        number: 56,
        rarity: 'Common',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Zubat',
        image: 'https://serebii.net/card/fossil/57.jpg',
        set: 2,
        number: 57,
        rarity: 'Common',
        artist: 'Kagemaru Himeno'
      },
      { 
        name: 'Mr. Fuji',
        image: 'https://serebii.net/card/fossil/58.jpg',
        set: 2,
        number: 58,
        rarity: 'Common',
        artist: 'Ken Sugimori'
      },
      { 
        name: 'Energy Search',
        image: 'https://serebii.net/card/fossil/59.jpg',
        set: 2,
        number: 59,
        rarity: 'Common',
        artist: 'Keiji Kinebuchi'
      },
      { 
        name: 'Gambler',
        image: 'https://serebii.net/card/fossil/60.jpg',
        set: 2,
        number: 60,
        rarity: 'Common',
        artist: 'Keiji Kinebuchi'
      },
      { 
        name: 'Recycle',
        image: 'https://serebii.net/card/fossil/61.jpg',
        set: 2,
        number: 61,
        rarity: 'Common',
        artist: 'Keiji Kinebuchi'
      },
      { 
        name: 'Mysterious Fossil',
        image: 'https://serebii.net/card/fossil/62.jpg',
        set: 2,
        number: 62,
        rarity: 'Common',
        artist: 'Keiji Kinebuchi'
      },


    ];

    const cards = await Promise.all(cardsToCreate.map(createCard));
    console.log('Finished creating Cards!');
    console.log(cards);

    // Collection Templates
    // console.log('Creating collection templates');
    // const collectionTemplatesToCreate = [
    //   { 
    //     name: 'Charmanders!', 
    //     image: 'https://archives.bulbagarden.net/media/upload/7/73/004Charmander.png',
    //     numberOfCards: 10,
    //     normalCards: 8,
    //     secretCards: 2,
    //     description: 'A charmander collection!',
    //     creatorId: 1
    //   },
      
    //   { 
    //     name: 'Gen 1 pokemon', 
    //     image: 'https://m.media-amazon.com/images/I/61XjZ8DvaFL._SX466_.jpg',
    //     numberOfCards: 150,
    //     normalCards: 150,
    //     secretCards: 0,
    //     description: 'All Gen 1 pokemon, no hollos or secret rares',
    //     creatorId: 2
    //   },
    // ];

    // const collectionTemplates = await Promise.all(collectionTemplatesToCreate.map(createCollectionTemplate));
    // console.log('Finished creating collection templates!');
    // console.log(collectionTemplates);

    // Collection Templates Cards
    // console.log('Creating collection templates cards');
    // const collectionTemplatesCardsToCreate = [
    //   { 
    //     "collectionTemplateId": 1,
    //     "cardId": 1
    //   },
    //   { 
    //     "collectionTemplateId": 1,
    //     "cardId": 2
    //   },
    //   { 
    //     "collectionTemplateId": 2,
    //     "cardId": 3
    //   },
    // ];

    // const collectionTemplatesCards = await Promise.all(collectionTemplatesCardsToCreate.map(createCollectionTemplateCard));
    // console.log('Finished creating collection templates Cards!');
    // console.log(collectionTemplatesCards);

    // Collections
    console.log('Creating collections');
    const collectionsToCreate = [
      { 
       set: 2,
        userId: 1
      },
      { 
        set: 1,
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
        "cardId": 78
      },
      { 
        "collectionId": 1,
        "cardId": 67
      },
      { 
        "collectionId": 2,
        "cardId": 89
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
