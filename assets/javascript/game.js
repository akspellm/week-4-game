// CAT STATS

var lilbub = {
	Name: "Lil Bub",
	"picture" : "assets/images/lilbub.png",
	"HP" : 150,
};

var grumpycat = {
	"Name": "Grumpy Cat",
	"picture": "assets/images/grumpycat.png",
	"HP": 500,
}

var pusheen = {
	"Name": "Pusheen",
	"picture": "assets/images/pusheen.png",
	"HP": 100,
}

// SET UP PLAYERS


var setUp = function() {

var celebCats = [lilbub, grumpycat, pusheen];

$.each(celebCats, function(index){
	// new div for each player
	var player = $("<div>")
	player.addClass("unselected");
	$("#player-options").append(player);

	// add cat name to div
	var catName = $("<h5>");
	catName.html(celebCats[index]["Name"]);
	player.append(catName);

	// add cat image to div
	var catImage = $("<img>");
	catImage.attr("src", celebCats[index]["picture"]);
	catImage.addClass("player-photo");
	player.append(catImage);

	// assign hit points as attribute
	player.attr("data-attr", celebCats[index]["HP"]);

	var hitPoints = $("<p>");
	hitPoints.html("HP: " + player.attr("data-attr"));
	player.append(hitPoints);

	// var catStatus = $("<p class='status'>");
	// player.append(catStatus);	
})
};

var reSet = function() {
	$("#selected-character").empty();
	$("#combat-character").empty();
	$("#enemy-characters").empty();
	$("#player-section").toggle();
	$("#enemy-section").toggle();
	$("#combatant-section").toggle();
	$("#enemy-direction").toggle();	
	$("#select-direction").toggle();
	$("#vs").toggle();
	$("#enemy-sign").toggle();
	$("#attack-pen").toggle();
};


	


function game(){

setUp();

var gameOn = true;
var playerSelected =false;
var enemySelected= false;

var selected;
var selectedHealth;
var selectedHP;
var selectedStatus;
var enemyArray = [];
var enemy;
var enemyHealth;
var enemyHP;
var enemyStatus;

		

$(".unselected").on("click", function() {
    // move selected character to "Your Character" slot
    if (playerSelected === false) {
        selected = $(this);
        selectedHealth = selected.attr("data-attr");
        selectedHP = selected.attr("data-attr");
        $("#selected-character").append(selected);
        selected.removeAttr("class").attr("id", "selected");
        selectedStatus = $("<p>");
        selected.append(selectedStatus);
        $("#player-section").toggle();
        $("#vs").toggle();
        $("#select-direction").toggle();

        $(".unselected").each(function() {
            $("#enemy-characters").append($(this));
            $(".unselected").removeAttr("class").attr("class", "enemies");
        });
        $("#enemy-section").toggle();
        $("#enemy-direction").toggle();


        $(".enemies").each(function() {
            enemyArray.push($(this));
        });

        playerSelected = true;

        console.log("selected Health " + selectedHealth);
        console.log("selected HP " + selectedHP);
    };


    // move selected enemy character to combatant slot

    $(".enemies").on("click", function() {
        if (enemySelected === false) {
            enemy = $(this)
            enemyHealth = enemy.attr("data-attr");
            enemyHP = enemy.attr("data-attr");
            $("#combat-character").append(enemy);
            enemy.removeAttr("class").attr("id", "enemy");
            enemyStatus = $("<p>");
            enemy.append(enemyStatus);
            enemySelected = true;
            console.log("enemy Health " + enemyHealth);
            console.log("enemy HP " + enemyHP);
            $(".unselected").each(function() {
            $("#enemy-characters").append($(this));
            $(".unselected").removeAttr("class").attr("class", "enemies");
        });
        $("#combatant-section").toggle();
        $("#enemy-direction").toggle();
        $("#enemy-sign").toggle();
        $("#attack-pen").toggle();
        };
    });
})


	

$("#attack-button").on("click", function() {

        enemyHealth = enemyHealth - selectedHP;
        enemyStatus.html("Hit! Enemy Health is now: " + enemyHealth);
        selectedHP = selectedHP * 2;
        console.log("initating attack. Enemy health is: " + enemyHealth);

        if (enemyHealth < 1 && enemyArray.length > 1) {
            enemyArray.pop();
            console.log(enemyArray.length)

            $("#combat-character").empty();
            alert("You win! Choose another enemy!");
            enemySelected = false;
        } else if (enemyHealth < 1) {
            $("#combat-character").empty();
            gameOn = false;
            alert("You win!");

        } else if (gameOn == true) {

            selectedHealth = selectedHealth - enemyHP;
            selectedStatus.html("Hit! Enemy Health is now: " + selectedHealth);
            console.log("initating counter-attack. Selected health is: " + selectedHealth);

            if (selectedHealth < 1) {
                alert("You Lose!");
                gameOn = false;
            };
        };
    if (gameOn == false) {
    	$("#game-over").toggle();
    };


});

console.log(gameOn)

	

	
	

};



game();

$("#reset-button").on("click", function() {
	$("#game-over").toggle();
	reSet();
	game();
});


	
							




