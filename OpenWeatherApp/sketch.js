var weather2;
var api = 'http://api.openweathermap.org/data/2.5/weather?zip=';
var id = '&appid=906e3bf04fcb5c6b89e5d9afe8200d43';
var units = '&units=imperial';

function preload() {
 backgroundimage  = loadImage("/backgroundpic.jpeg");
}

function setup() {

    var cnv = createCanvas(windowWidth-20, windowHeight-20);
    var x = (windowWidth - width) / 2;
    var y = ((windowHeight - height) / 2);
    cnv.position(x, y);
    cnv.style('z-index','-1');



    var button = select('#button');
    zip = select('#zipcode');
    button.mousePressed(weatherCall);

}


function draw() {
    heading();

    if(weather2){
      var temp = weather2.main.temp;
      textSize(125);
      fill(0);
      text((temp)+'°F',width*.5,height*.5);
      textSize(20);
      text(weather2.name,width*.5,height*.5+100);
    }

}

function weatherCall(){
  var url = api + zip.value() + units + id;
  loadJSON(url,gotData);
}

function heading(){
  background(255);
  image(backgroundimage, 0, 0);

  fill(0);
  textSize(100);
  textAlign(CENTER);
  text('Temperature',width*.5,100);
  textSize(30);
  text('Please enter the zipcode and country of your city.',width*.5,150);

}

function gotData(data){
weather2 = data;
}

function windowResized() {
  resizeCanvas(windowWidth-20,windowHeight-20);
  var x = (windowWidth - width) / 2;
  var y = ((windowHeight - height) / 2);
  cnv.position(x, y);
  canvas.position(x, y);
}
