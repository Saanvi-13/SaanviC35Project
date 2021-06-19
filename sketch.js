//Create variables here
var dog,sadDog,happyDog;
var foodObj;
var foodS, foodStock;
var fedTime,lastFed,feed,addFood;

function preload(){
  sadDog=loadImage('images/dog.png')
  happyDog=loadImage('images/happyDog.png')
	//load images here
}

function setup() {
	database = firebase.database()
  createCanvas(1000, 400);

  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  dog=createSprite(800,220,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("fees the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
 
  
}

function draw() {  
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  
  fill(255,255,254);
  textSize(15);
    
  if(lastFed >= 12){
    text("last Feed: " + lastFed %12 + "PM", 350, 30);
  }
  else if(lastFed == 0){
    text("Last Feed: 12AM ", 350,30);
  }
  else{
    text("Last Feed:  " + lastFed + "AM" ,350,30);
  }
  drawSprites();
  //add styles here
 

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()
  })

  }

  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food: foodS
    })
  }




