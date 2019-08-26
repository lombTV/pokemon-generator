
var id;
var name;
var pokemonNames;
var isShiny;

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
  })
  .catch(function () {
      this.dataError = true;
  })
}



// Generates the image when ran
function generateImage(jsonFile) {
  isShiny = (Math.floor(Math.random() * 100) + 1);
  id = (Math.floor(Math.random() * 386) + 1);
  pokemonNames = jsonFile;
  name = jsonFile[id-1];

  var canvas = document.getElementById('tutorial');
  var ctx = canvas.getContext('2d');
  // Clears the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Get BG image
  var img = new Image();
  
  if (isShiny >= 95) {
    img.src = 'images/sprites/shiny/' + id + '.png';
    name = 'Shiny ' + name;
  } else {
    img.src = 'images/sprites/' + id + '.png';
  }
  
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
      ctx.fillText(name, canvas.width/2, 20);
      ctx.font = '15px Noto Sans HK';
      ctx.fillText('Level ' + (Math.floor(Math.random() * 100) + 1), canvas.width/2, 40);
      ctx.drawImage(img, canvas.width / 2 - img.width / 2, 55);
  }
}

// When the page loads, run the readJson function, then run generateImage when it's done
readJson(function (result) {
  generateImage(result);
});

function buttonPress() {
  var canvas = document.getElementById('tutorial');
  var ctx = canvas.getContext('2d');
  // Clears the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  generateImage(pokemonNames);
}