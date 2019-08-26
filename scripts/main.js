var myImage = document.querySelector('img');
var txtCounter = document.getElementById("image-counter");
var counter = 1;
var max = 3;
myImage.onclick = function() {
    if (counter >= max) {
        counter = 1;
    } else {
        counter++;
    }
    
    txtCounter.textContent="Showing image " + counter + " of " + max + ".";
    myImage.setAttribute ('src','images/delibird' + counter + '.png');
}