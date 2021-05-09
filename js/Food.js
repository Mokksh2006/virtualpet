class Food{
    constructor(){
      this.milkImg = loadImage("images/milk.png");
      this.foodS = 0;
      this.lastFed;
    }
    getFoodStock(){
        return this.foodS;
    }
    updateFeedtime(lastFeed){
     this.lastFed = lastFeed; 
    }
    updateFoodStock(foodStock){
      this.foodS = foodStock;
    }
    deductFoodStock(){
      if(this.foodS>0){
        this.foodS--;
      }
    }
    display(){
        var x = 80, y = 100;
        imageMode(CENTER);
        image(this.milkImg, 670, 460, 80,80);
        if(this.foodS != 0){
          for(var i = 0; i< this.foodS; i++){
            if(i%10==0){
              x=80,
              y = y+50;
              }
            image(this.milkImg, x, y, 50, 50);
            x+=30;
          }
        }
    }
    washroom(){
      background(washroomImg);
    }
    garden(){
      background(gardenImg);
    }
    bedroom(){
      background(bedRoomImg);
    }
}
