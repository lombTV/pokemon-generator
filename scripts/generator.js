
var pokemonNames;
var isShiny;
var shinyChance = 95;

function readJson (callback) {
  // Grabs the JSON file containing the data of all the Pokemon.
  fetch('/data/pokemon.json')
  .then(response => {
      if (!response.ok) {
          throw new Error("HTTP error " + response.status);
      }
      return response.json();
  })
  .then(json => {
    callback(json);
    pokemonNames = jsonFile;
  })
  .catch(function () {
      this.dataError = true;
  })
}



// Generates the image when ran
function generateImage(jsonFile, canvas) {
  isShiny = (Math.floor(Math.random() * 100) + 1);
  var id = (Math.floor(Math.random() * 386) + 1);
  var level = (Math.floor(Math.random() * 100) + 1);
  var name = isShiny >= shinyChance ? 'Shiny ' + jsonFile[id-1] : jsonFile[id-1];

  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var img = new Image();
  img.src = isShiny >= shinyChance ? 'images/sprites/shiny/' + id + '.png' : 'images/sprites/' + id + '.png';

  
  
  img.onload = function() {
    // Generate Background
    var lingrad = ctx.createLinearGradient(0, 0, 0, 150);
    lingrad.addColorStop(0, '#00ABEB');
    lingrad.addColorStop(0.5, '#fff');
    lingrad.addColorStop(0.5, '#26C000');
    lingrad.addColorStop(1, '#fff');
    ctx.fillStyle = lingrad;

    // Generate Text
      ctx.textAlign = "center";
      ctx.font = '20px Noto Sans HK';
      ctx.fillStyle = 'Black';
      
      
      console.log(id);
      ctx.fillText(name, canvas.width/2, 20);
      ctx.font = '15px Noto Sans HK';
      ctx.fillText('Level ' + level, canvas.width/2, 40);
      ctx.drawImage(img, canvas.width / 2 - img.width / 2, 55);
  }
}

// When the page loads, run the readJson function, then run generateImage when it's done
readJson(function (result) {
  pokemonNames = result;
  generateImage(result, document.getElementById('tutorial'));

  

  for (let i = 0; i < 100; i++) {
    var canv = document.createElement('canvas');
    canv.id = 'someId';
    document.body.appendChild(canv);
    generateImage(result, canv);
  }
  

});

function buttonPress() {
  var canvas = document.getElementById('tutorial');
  var ctx = canvas.getContext('2d');
  // Clears the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  generateImage(pokemonNames, document.getElementById('tutorial'));
}

