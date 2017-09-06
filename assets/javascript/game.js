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
	setUp();

}

setUp();

// $(document).ready

var game = function () {$(".unselected").on("click",function() {
	// move selected character to "Your Character" slot
	var selected = $(this);
	var selectedHealth = selected.attr("data-attr");
	var selectedHP = selected.attr("data-attr"); 
	$("#selected-character").append(selected);
	selected.removeAttr("class").attr("id", "selected");
	var selectedStatus = $("<p>");
	selected.append(selectedStatus);


	$(".unselected").each(function() {
		$("#enemy-characters").append($(this));
	$(".unselected").removeAttr("class").attr("class", "enemies");
});	
	enemyArray = [];
	$(".enemies").each(function(){
		enemyArray.push($(this));
	});

	// move selected enemy character to combatant slot
	var enemy = "";
	var enemyHealth="";
	var enemyStatus="";
	var enemyHP="";

	var chooseEnemy = function(){
	$(".enemies").on("click", function() {
		enemy = $(this);
		enemyHealth = enemy.attr("data-attr");
		enemyHP = enemy.attr("data-attr");
		$("#combat-character").append(enemy);
		enemy.removeAttr("class").attr("id", "enemy");
		enemyStatus = $("<p>");
		enemy.append(enemyStatus);
	});
};
	chooseEnemy();
	

	
	$("#attack-button").on("click", function(){
		for (i=0; i < 1; i++) {
		enemyHealth = enemyHealth - selectedHP;
		enemyStatus.html("Hit! Enemy Health is now: "+ enemyHealth);
		console.log("enemy Health "+ enemyHealth);
		console.log("enemy HP "+ enemyHP);

		selectedHealth = selectedHealth - enemyHP;
		selectedHP = selectedHP * 2;
		selectedStatus.html("You were hit! Your health is now: " + selectedHealth);

		console.log("selected Health "+ selectedHealth);
		console.log("selected HP "+ selectedHP);

	};
	
		
		if(selectedHealth < 0) {
			alert("You Lose! Better luck next time");
			reSet();
			game();
		}
		else if(enemyHealth < 1) {

			if (enemyArray.length > 0) {
				$("#combat-character").empty();
				alert("You win! Choose another enemy!");
				chooseEnemy();
				}

			else {
				alert("You win!");
				game();
			}
		}

		else {
			console.log("do nothing");
		}
							

});


});

};

game();



