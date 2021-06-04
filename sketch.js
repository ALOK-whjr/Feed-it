var ball;

function setup(){
    createCanvas(500,500);
	database = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
	database.ref("ball/position").on("value",readPos,showErr);
}

function readPos(data){
	ball.x = data.val().x;
	ball.y = data.val().y;
}

function showErr(){
	console.log("ERROR");
}
function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
	database.ref("ball/position").update({
		x : ball.x ,
		y : ball.y
	});
}
