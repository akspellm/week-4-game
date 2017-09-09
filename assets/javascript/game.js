$("#play").on("click", function(){
	location.href="game.html"
})

// CAT STATS

var lilbub = {
	Name: "Lil Bub",
	"picture" : "assets/images/lilbub.png",
	"HP" : 150,
};

var grumpycat = {
	"Name": "Grumpy Cat",
	"picture": "assets/images/grumpycat.png",
	"HP": 300,
}

var pusheen = {
	"Name": "Pusheen",
	"picture": "assets/images/pusheen.png",
	"HP": 100,
}

var cheshire = {
	Name: "Cheshire Cat",
	"picture" : "assets/images/cheshire.png",
	"HP" : 350,
};

var hk = {
	"Name": "Hello Kitty",
	"picture": "assets/images/hk.png",
	"HP": 50,
}


var maru = {
	"Name": "Maru",
	"picture": "assets/images/maru.png",
	"HP": 250,
}

var luna = {
	"Name": "Luna and Artemis",
	"picture": "assets/images/luna.png",
	"HP": 350,
}
var venus = {
	"Name": "Venus",
	"picture": "assets/images/venus.png",
	"HP": 200,
}


// SET UP PLAYERS


var setUp = function() {

var celebCats = [lilbub, grumpycat, pusheen, cheshire, hk, maru, luna];

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

})
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
        $("#select-direction").toggle();

        $("#vs").toggle();

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
	if (gameOn == true) {

        enemyHealth = enemyHealth - selectedHP;
        enemyStatus.html("Hit! Enemy's Health is now: " + enemyHealth);
        selectedHP = selectedHP * 2;
        console.log("initating attack. Enemy health is: " + enemyHealth);

        selectedHealth = selectedHealth - enemyHP;
        selectedStatus.html("Hit! Your Health is now: " + selectedHealth);
        console.log("initating counter-attack. Selected health is: " + selectedHealth);

        if (selectedHealth < 1) {
        		$("#game-message").html("Game Over! Do you want to play again?")
                gameOn = false;
            }

        else if (enemyHealth < 1 && enemyArray.length > 1) {
            enemyArray.pop();
            console.log(enemyArray.length)

            $("#combat-character").empty();
            $("#combatant-section").toggle();
            $("#vanquished").toggle().delay(600).fadeOut("slow");
            $("#enemy-direction").toggle();
        	$("#enemy-sign").toggle();
			$("#attack-pen").toggle();
            enemySelected = false;
        } 

        else if (enemyHealth < 1) {
            $("#combat-character").empty();
            gameOn = false;
            alert("You win!");
        } 
    };
    if (gameOn == false) {
    	$("#game-over").toggle();
    	$("#reset-button").on("click", function() {
    		location.reload();

    });


};
});
};

game();



	
							




