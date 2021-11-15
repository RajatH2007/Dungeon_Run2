
var bg_Img;
var knight, kngt_Walk, kngt_Jump;
var invis_grnd, invisible, invis;
var plt, plt1, plt2, plt3, plt4;
var coin, coin_Img;
var pltGroup, invisibleGroup;


function preload(){
  bg_Img = loadImage("./Assets/Background_01.png");
  kngt_Walk = loadAnimation("./Knight/walk1.png", "./Knight/walk2.png", "./Knight/walk3.png", "./Knight/walk4.png", "./Knight/walk5.png", 
  "./Knight/walk6.png");
  kngt_Jump = loadAnimation("./Knight/jump1.png", "./Knight/jump2.png", "./Knight/jump3.png", "./Knight/jump4.png", "./Knight/jump5.png", 
  "./Knight/jump6.png","./Knight/jump7.png");
  plt1 = loadImage("./Assets/Ground_Merged.png");
  plt2 = loadImage("./Assets/Ground.png");
  plt3 = loadImage("./Assets/Ground_i.png");
  plt4 = loadImage("./Assets/Ground_ii.png");
  coin_Img = loadAnimation("./Assets/Coin_01.png", "./Assets/Coin_02.png", "./Assets/Coin_03.png", "./Assets/Coin_04.png", "./Assets/Coin_05.png", "./Assets/Coin_06.png");
}

function setup() {
  createCanvas(windowWidth*3,windowHeight);
  invis_grnd = createSprite(windowWidth/2, height-70, windowWidth*5, 10);
  invis_grnd.visible = false;
  
  knight = createSprite(100, height-80, 50, 50);
  knight.addAnimation("walk", kngt_Walk);
  //knight.debug = true;
  knight.setCollider("rectangle",-20,9,40,69);

  pltGroup = new Group();
  invisibleGroup = new Group();
}

function draw() {
  background(bg_Img); 
   
  if(keyDown(RIGHT_ARROW)){
    knight.x +=5;
  }
  if(keyDown(LEFT_ARROW)){
    knight.x -=5;
  }
  if(keyDown(UP_ARROW)){
    knight.addAnimation("jump", kngt_Jump);
    knight.velocityY -=2;
  }
  knight.velocityY = knight.velocityY+0.8;

  if(invisibleGroup.isTouching(knight)){
    knight.collide(invisibleGroup);
  }

  knight.collide(invis_grnd);  

  spawnPlatform();

  //spawnCoin();
  drawSprites();
}

function spawnPlatform() {
  if (frameCount % 100 === 0) {
    plt = createSprite(windowWidth,500);
    plt.addImage(plt1);
    plt.scale = 0.7;

    grd = createSprite(windowWidth,windowHeight-75);
    grd.velocityX = -7;
    grd.addImage(plt3);

    invisible = createSprite(windowWidth,300)
    invisible.width = plt.width-200;
    invisible.height= 2;

    invis = createSprite(windowWidth,300)
    invis.width = grd.width-200;
    invis.height= 2;

    coin = createSprite(windowWidth, 300, 30, 30);
    coin.addAnimation("spinning",coin_Img);
    coin.scale=0.5;

    plt.x = Math.round(random(windowWidth, windowWidth*4))
    plt.y = Math.round(random(300,700))
    plt.velocityX = -7;

    
    invisible.x = plt.x;
    invisible.y = plt.y-40;
    invisible.velocityX = -7;

    invis.x = grd.x;
    invis.y = grd.y-60;
    invis.velocityX = -7;

    coin.x = plt.x;
    coin.y = plt.y-80;
    coin.velocityX = -7
    //var ran = Math.round(random(1, 2));
    
    pltGroup.add(plt);
    pltGroup.add(grd);
    invisibleGroup.add(invisible);
    invisibleGroup.add(invis);
  }
}
