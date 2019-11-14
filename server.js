const express = require('express')
const app = express();

//app.listen(3000, () => console.log("kuuntelen"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("kuuntelen porttia " + port));

app.use(express.static("public"));
app.use(express.json({limit: '1mb'}));

const paikat = [
  {
    "paikka": "Helsinki",
    "arvostelu": "Kivaa oli",
    "longtitude": "24.9384",
    "latitude": "60.1699"

  },
  {
    "paikka": "Levi",
    "arvostelu": "Hyvät laskusäät",
    "longtitude": "24.8082",
    "latitude": "67.8040"
  }
]

app.get('/api/paikat', function (request, response) {
  response.send(paikat);
})

app.post('/api/paikkatieto', function (request, response) {
  console.log("Kayttajan arvostelu")
  console.log(request.body);
  response.send(200);
})
