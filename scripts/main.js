
var id;
var name;
var pokemonNames;

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
  id = (Math.floor(Math.random() * 250) + 1);
  pokemonNames = jsonFile;
  name = jsonFile[id-1];

  var canvas = document.getElementById('tutorial');
  var ctx = canvas.getContext('2d');
  // Clears the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Get BG image
  var img = new Image();
  img.src = 'images/sprites/' + id + '.png';
  img.onload = function() {
    // Generate Text

      ctx.font = '20px Noto Sans HK';
      ctx.fillStyle = 'Black';
      ctx.fillText(name, 0, 15);
      ctx.font = '15px Noto Sans HK';
      ctx.fillText('Level ' + (Math.floor(Math.random() * 100) + 1), 0, 35);
      ctx.drawImage(img, 0, 50);
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