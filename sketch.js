//Create variables here
var dog,dogImg, happyDog, database, foodS, milkImg, lastFed, fedTimeref, feedDog, addFood, foodObj,
gameState, gameStateref;
function preload()
{
  //load images here
  happyDog = loadImage("images/happyDog.png");
  dogImg = loadImage("images/dog.png");
  injectionImg = loadImage("images/Injection.png");
  bedRoomImg = loadImage("images/Bed Room.png");
  deadDogImg = loadImage("images/deadDog.png");
  dogVaccinationImg = loadImage("images/dogVaccination.png");
  foodStockImg = loadImage("images/Food Stock.png");
  gardenImg = loadImage("images/Garden.png");
  lazyDogImg = loadImage("images/Lazy.png")
  livingRoomImg = loadImage("images/Living Room.png");
  runningImg = loadImage("images/running.png");
  runningLeftImg = loadImage("images/runningLeft.png");
  vaccinationImg = loadImage("images/Vaccination.jpg");
  washroomImg = loadImage("images/Wash Room.png");
 
}

function setup() {
	createCanvas(550, 500);
  database = firebase.database();
  var foodStockref = database.ref('Food');
  foodStockref.on("value", readStock);

  fedTimeref = database.ref('lastFed');
  fedTimeref.on("value", (data) =>{
    lastFed = data.val();
  })

  gameStateref = database.ref('gameState');
  gameStateref.on("value", (data) =>{
    gameState = data.val();
  })
  dog = createSprite(800,380,10,10); 
  dog.addImage("sitting", dogImg);
  
  dog.addImage("happy", happyDog)

  dog.scale = 0.3;

  feedDog = createButton("Feed the Dog");
  feedDog.position(650, 100);
  feedDog.mousePressed(feedFoodfunction); 
  addFood = createButton("Add more Food");
  addFood.position(750, 100);

  addFood.mousePressed(addFoodfunction);

  foodObj = new Food();
}


function draw() {  
background(46,139,87);
// background(gardenImg);
  currentTime = hour();
  

  //add styles here
  fill(255);
  
  text("Balance: " +foodS, 200, 20);

  if(lastFed>=12){
  text("Feed Time: " + lastFed%12 +"PM", 200, 60);
  }
  else if(lastFed==0){
      text("Feed Time: 12 AM", 200, 60);
  }
  else{
    text("Feed Time: " + lastFed +"AM", 200, 60);
  }

 // foodObj.display();
 
  if(gameState!="hungry"){
    addFood.hide();
    feedDog.hide();
    dog.remove();
  }
  else{
    addFood.show();
    feedDog.show();
    dog.addImage("sitting", dogImg);
  }
  if(currentTime == (lastFed+1)){
    foodObj.garden();
    update("playing");
  }
  else if(currentTime > (lastFed+2) && currentTime < (lastFed+4)){
    foodObj.washroom();
    update("bathing");
  }
  else{
    update("hungry");
    foodObj.display();

  }

  drawSprites();

}
function readStock(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
  }

function addFoodfunction(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function feedFoodfunction(){
  if(foodObj.getFoodStock() <= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
  dog.changeImage("happy", happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
}
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  lastFed:hour()
})
}
function update(state){
  database.ref('/').update({
    gameState: state
  })
}