var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
var helpers = require('./helpers')
var app = express();
app.use(cors());
app.use(bodyParser.json());

var POSITIONS_ID = {
  forward: 9,
  midfielder: 6,
  back: 4,
  goalkeeper: 1
}

var POSITIONS_STRING = {
  [POSITIONS_ID.forward]: 'DEL',
  [POSITIONS_ID.midfielder]: 'MED',
  [POSITIONS_ID.back]: 'DEF',
  [POSITIONS_ID.goalkeeper]: 'POR',
}

var madrid = {
  id: '1',
  name: 'Real Madrid',
  shortName: 'Mad',
  shield: '//as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1.png',
  money: 1000,
  players: [{
      id: '11',
      name: 'Karim Benzema',
      position: POSITIONS_ID.forward,
      img: 'https://www.futboltotal.com.mx/wp-content/uploads/2018/01/karim-benzema-2018.jpg',
      price: 600,
    },
    {
      id: '12',
      name: 'Sergio Ramos',
      position: POSITIONS_ID.back,
      url: 'https://www.lainformacion.com/files/article_default_content/uploads/2018/11/23/5bf84292d23b5.jpeg',
      price: 10000000000,
    },
    {
      id: '13',
      name: 'Thibaut Courtois',
      position: POSITIONS_ID.goalkeeper,
      url: 'https://as01.epimg.net/futbol/imagenes/2019/02/12/primera/1549968203_746773_1549968422_noticia_normal.jpg',
      price: 300,
    },
    {
      id: '14',
      name: 'Modric',
      position: POSITIONS_ID.midfielder,
      url: 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/05/22/15585438479360.jpg',
      price: 400,
    },
  ]
}

var barcelona = {
  id: '2',
  name: 'Barcelona',
  shortName: 'Barça',
  shield: '//as01.epimg.net/img/comunes/fotos/fichas/equipos/large/3.png',
  money: 900,
  players: [{
      id: '21',
      name: 'Messi',
      position: POSITIONS_ID.forward,
      img: 'https://www.diariogol.com/uploads/s1/64/71/53/0/leo-messi_15_970x597.jpeg',
      price: 1000000000,
    },
    {
      id: '22',
      name: 'Pique',
      position: POSITIONS_ID.back,
      img: 'https://www.mundodeportivo.com/r/GODO/MD/p6/Barca/Imagenes/2019/06/20/Recortada/img_ppunti_20190313-231329_imagenes_md_propias_ppunti_190313fcbol1045_4_6_1019829284-0048-keaF-U463011134387hWC-980x554@MundoDeportivo-Web.jpg',
      price: 500,
    },
    {
      id: '23',
      name: 'Marc-André ter Stegen',
      position: POSITIONS_ID.goalkeeper,
      url: 'https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/fc-barcelona-v-fc-internazionale-uefa-champions-league-group-b-5bd2c9a723006a5f6d000006.jpg',
      price: 400,
    },
    {
      id: '24',
      name: 'Busquets',
      position: POSITIONS_ID.midfielder,
      img: 'https://fcbarcelona-static-files.s3.amazonaws.com/fcbarcelona/photo/2018/09/21/3c326e62-2c35-4d8d-9e41-972ab88ce11a/05-SERGIO-JOC.jpg',
      price: 500,
    },
  ]
}

var atletico = {
  id: '3',
  name: 'Atérico de Madrid',
  shortName: 'Atético',
  shield: '//as01.epimg.net/img/comunes/fotos/fichas/equipos/large/42.png',
  money: 700,
  players: [{
      id: '31',
      name: 'Griezman',
      position: POSITIONS_ID.forward,
      price: 700,
    },
    {
      id: '32',
      name: 'Godin',
      position: POSITIONS_ID.back,
      price: 450,
    },
    {
      id: '33',
      name: 'Oblak',
      position: POSITIONS_ID.goalkeeper,
      price: 500,
    },
    {
      id: '34',
      name: 'Koke',
      position: POSITIONS_ID.midfielder,
      price: 10000000000000,
    },
  ]
}

var atleticoImages = {
  31: 'https://fotografias.lasexta.com/clipping/cmsimages01/2019/02/07/81CE3BC8-905E-4904-92F7-B4D6A27B8963/58.jpg',
  32: 'https://as01.epimg.net/futbol/imagenes/2017/10/18/primera/1508362211_900651_1508362332_noticia_normal.jpg',
  33: 'https://cadenaser00.epimg.net/ser/imagenes/2018/11/12/deportes/1542055161_970998_1542057866_noticia_normal_recorte1.jpg',
  34: 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2017/04/07/14915594564824.jpg',
}

var pichichis = [{
    playerId: '11',
    goals: '19',
  },
  {
    playerId: '12',
    goals: 5,
  },
  {
    playerId: '13',
    goals: 0,
  },
  {
    playerId: '14',
    goals: '9 goles',
  },
  {
    playerId: '21',
    goals: 35,
  },
  {
    playerId: '22',
    goals: ' 5',
  },
  {
    playerId: '23',
    goals: 0,
  },
  {
    playerId: '24',
  },
  {
    playerId: '31',
    goals: 22,
  },
  {
    playerId: '32',
    goals: 5,
  },
  {
    playerId: '33',
    goals: null,
  },
  {
    playerId: '34',
    goals: 3,
  }
]

var teamsMap = {
  1: madrid,
  2: barcelona,
  3: atletico
}

app.get('/teams', function (req, res) {
  var madridTemp = {
    ...madrid
  }
  delete madridTemp.players
  var barsaTemp = {
    ...barcelona
  }
  delete barsaTemp.players
  var atleticoTemp = {
    ...atletico
  }
  delete atleticoTemp.players
  res.json([
    madridTemp,
    barsaTemp,
    atleticoTemp
  ])
});

app.get('/players', function (req, res) {
  // TODO ejercicio 1
  // devuelve un array con los jugadores, con la sigueinte pinta
  // [
  //   {
  //     name: 'Ronaldo',
  //     position: 'DEL',
  //     img: 'url/to/image.png',
  //     teamId: 10,
  //   }, ...
  // ]
  let players = [];
  let mPlayersTemp = madrid.players.map((obj) => {
    var mapped = {};
    mapped.teamId = madrid.id; 
    mapped.position = POSITIONS_STRING[obj.position];
    mapped.name = obj.name;
    mapped.img = obj.img;
    mapped.id = obj.id;
    return mapped;
  });
  let bPlayersTemp = barcelona.players.map((obj) => {
    var mapped = {};
    mapped.teamId = barcelona.id; 
    mapped.position = POSITIONS_STRING[obj.position];
    mapped.name = obj.name;
    mapped.img = obj.img;
    mapped.id = obj.id;
    return mapped;
  });
  let aPlayersTemp = atletico.players.map((obj) => {    
    var mapped = {};
    mapped.teamId = atletico.id; 
    mapped.position = POSITIONS_STRING[obj.position];
    mapped.name = obj.name;
    mapped.img = atleticoImages[obj.id];
    mapped.id = obj.id;
    return mapped;
  });

  players.push(...mPlayersTemp,...bPlayersTemp,...aPlayersTemp);
  // TIP: familiarizate primero con los objetos de los equipos: var madrid, barcelona y atletico.
  // TIP2: asegurate que position no es el código de la posición, si no el string
  res.json(players)
});

app.get('/pichichis', function (req, res) {
  res.json(pichichis)
});

app.post('/transfer', function (req, res) {
  var playerId = String(req.body.playerId)
  var teamId = String(req.body.teamId)

  var team = teamsMap[req.body.teamId]

  if (!team) {
    res.json({
      error: true,
      code: 1,
      message: 'team not found'
    })
    return
  }

  var playerFound = helpers.getPlayer(playerId, [madrid, barcelona, atletico])

  var player = playerFound.player

  if (!player) {
    res.json({
      error: true,
      code: 2,
      message: 'player not found'
    })
    return
  }

  var teamIdPlayer = playerFound.teamId

  if (teamIdPlayer === teamId) {
    res.json({
      error: true,
      code: 3,
      message: 'the player is into this team'
    })
    return
  }

  if (player.price > team.money) {
    res.json({
      error: true,
      code: 4,
      message: 'insufficients funds'
    })
    return
  }

  // TODO ejercicio 8
  // añade el código para cambiar de equipo al jugador
  // restar el precio de la transacción al equipo

  res.json({})
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});