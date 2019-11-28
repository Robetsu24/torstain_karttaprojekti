var latitude;
var longitude
var olet_tassa;
var kartta;


async function getData(){
  const response = await fetch('api/paikat');
  const data = await response.json();
  console.log(data[0].paikka);
  tayta_paikkataulukko(data);
  merkitsePaikat(data);
}

function merkitsePaikat(data){
  var kayty_paikka;
  for (var i = 0; i < data.length; i++) {
    kayty_paikka = L.marker([data[i].latitude, data[i].longitude]).addTo(kartta);
    kayty_paikka.bindPopup("<b>" + data[i].paikka + "</b><br>" + data[i].arvostelu).openPopup();
  }
}


function tayta_paikkataulukko(data){
  var table = document.getElementById("paikkataulukko");
  var table_body = document.getElementById("paikkataulukkobody")
  tablebody.innerHTML "";
  for (var i = 0; i < data.length; i++) {
    var row = table.insertRow(i + 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = data[i].paikka;
    cell2.innerHTML = data[i].arvostelu;
  }
}



if("geolocation" in navigator) {
  console.log("Sijaintieto saatavilla");
  navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);

      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      console.log(latitude);
      console.log(longitude);
      document.getElementById("leveysasteet").innerHTML = latitude;
      document.getElementById("pituusasteet").innerHTML = longitude;

      kartta = L.map('kartta').setView([latitude, longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(kartta);

      var marker = L.marker([latitude, longitude]).addTo(kartta);

      getData();
  });
}
else{
  console.log("Sijaintietoa ei ole saatavilla");
}

function avaa_paikkatietolomake() {
  document.getElementById("paikkatietolomake").style.display = "block";
  document.getElementById("lomake").reset();
}

function peruutus() {
  document.getElementById("paikkatietolomake").style.display = "none";
}

function laheta_arvostelu() {
  var paikka = document.getElementById("paikka").value;
  var arvostelu = document.getElementById("arvostelu").value;

  console.log(paikka);
  console.log(arvostelu);

  const data = {latitude, longitude, paikka, arvostelu};
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
fetch('/api/paikkatieto', options).then(function(response) {
  console.log(response)
  if (response.status == 200){
    getData();
/*
    document.getElementById("paikkatietolomake").style.display = "none";
    olet_tassa.bindPopup("<b>" + paikka + "</b><br>" + arvostelu).openPopup();

    var table = document.getElementById("paikkataulukko");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = paikka;
    cell2.innerHTML = arvostelu;
  }
}, function(error){
  console.log(error.message);
});

}
