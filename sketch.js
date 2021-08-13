var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var feedtime;
//create feed and lastFed variable here

var feed;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here
 if(lastFed>=12){
  fill("white");
  text("LastFeed time : 13 AM",350,30);
 }else if(lastFed==0){
  fill("white");
  text("LastFeed time : 12 AM",350,30);
 }else{
  fill("white");
  text("LastFeed time : 11 AM",350,30);
 }
  
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val *0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }

  lastFed = hour();

  database.ref("/").update({

   Food : foodObj.foodStock,
   FeedTime : lastFed

  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
