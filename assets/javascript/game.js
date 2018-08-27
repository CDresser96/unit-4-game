//Page load
$(document).ready(function() {

    //Liliana
    var liliana = {
        nickName: 'liliana',
        name: 'Liliana Vess',
        health: 100,
        attack: 8,
        image: '<img src="assets/images/liliana.png" class="image">'
    };

    //Gideon
    var gideon = {
        nickName: 'gideon',
        name: 'Gideon Jura',
        health: 130,
        attack: 10,
        image: '<img src="assets/images/gideon.png" class="image">'
    };

    //Chandra
    var chandra = {
        nickName: 'chandra',
        name: 'Chandra Nalaar',
        health: 150,
        attack: 2,
        image: '<img src="assets/images/chandra.png" class="image">'
    };

    //Domri
    var domri = {
        nickName: 'domri',
        name: 'Domri Rade',
        health: 80,
        attack: 7,
        image: '<img src="assets/images/domri.png" class="image">'
    };

    //Objects Array
    var characterObjects = [liliana, gideon, chandra, domri];

    //Array of strings w/ nicknames
    var characters = [];
    var $yourCharacter;
    var $currentEnemy;
    //Your character's health and attack
    var yourHealth;
    var yourAttack;
    //current enemy health and attack
    var currentEnemyHealth = 0;
    var currentEnemyAttack = 0;

    var counter = 0;
    var compoundAttack = 0;
    var isThereOpponent = false;

    //=========== functions ================//

    function startGame() {
        new Audio('../images/mtgtheme.mp3').play()

        createCharacters(characterObjects);
        pickYourCharacter();
        pickYourOpponent();
        // fight();
    }


    // function to create each box/characer in the DOM
    function createCharacters(arg) {
        if (arg.length === 4 ) {

            for ( var i = 0; i < arg.length; i++) {

                // jQuery Object that takes the attributes of each character
                var $character = $('<section id='+arg[i].nickName+'>');
                $character.append('<div class="characterName">'+arg[i].name);
                $character.append(arg[i].image);
                $character.append('<div class="characterHealth">'+arg[i].health);
				$character.attr('data_nickName', arg[i].nickName);
				$character.attr("data_name", arg[i].name);
				$character.attr('data_attack', arg[i].attack);
				$character.attr('data_health', arg[i].health);
                $character.attr('class', 'character col-md-3');
                
                characters.push(arg[i].nickName);

                $('#characters').append($character);

                }
            } // end of if statement

            else if (arg.length <=3 ) {

                $('#remainingEnemies').empty()

                characters = [];

                $('#remainingEnemies').append('<div class="title">Remaining Enemies</div>')
                for ( var i = 0; i < arg.length; i++) {

                    // jQuery Object that takes the attributes of each character
					var $character = $('<div id='+arg[i].nickName+'>');
					$character.append('<div class="characterName">'+arg[i].name);
					$character.append(arg[i].image);
					$character.append('<div class="characterHealth">'+arg[i].health);
					// att data attributes to use with the logic of the game
					$character.attr('data_nickName', arg[i].nickName);
					$character.attr("data_name", arg[i].name);
					$character.attr('data_attack', arg[i].attack);
					$character.attr('data_health', arg[i].health);
					$character.attr('class', 'enemy');

                    characters.push(arg[i].nickName);

                    $('#remainingEnemies').append($character);
                }

                if (!$currentEnemy) {
                    pickYourOpponent();
                }
            }

        }; // closing create character

        function pickYourCharacter() {
            // TODO
            // this function should pick your character and then automaticaly make the other charaters enemies.
            $('.character').on('click', function() {
                $('#characters').empty();
                $('#characters').append('<div class="title">Your Character</div>')
    
                $yourCharacter = $(this);
                $yourCharacter.addClass('yourCharacter');
                $yourCharacter.removeClass('col-md-3 character');
    
                yourHealth = parseInt($yourCharacter.attr('data_health'));
                yourAttack = parseInt($yourCharacter.attr('data_attack'));
    
                $('#characters').append($yourCharacter);
    
                $('#remainingEnemies').append('<div class="title">Pick Your Enemy</div>');
    
                // remove the chosen character and then run the createCharacters function again to recreate the 'enemies'
                var indexRemove = characters.indexOf($yourCharacter.attr('data_nickName'))
                charactersObjects.splice(indexRemove, 1);
    
                // call createCharacters function again, but this time there are only 3
                createCharacters(charactersObjects);
    
            });
        };

        function pickYourOpponent() {

                $('.enemy').on('click', function() {
                    $('#characters').empty();
                    $('#currentEnemy').empty();
                    $('#fightButton').empty();

                    //enemy picked
                    $currentEnemy = $(this);

                    $currentEnemy.addClass('currentEnemy');
                    $currentEnemy.removeClass('enemy');

                    //append your character and enemy picked to the fighting area
                    $('#yourCharacter').append($yourCharacter);
                
                $('#attackButton').append('<img src="../images/attack.png" id="fightButton">')

                $('#currentEnemy').append($currentEnemy);
                isThereOpponent = true;


                var indexRemove = characters.indexOf($currentEnemy.attr('data_nickName'));
                charactersObjects.splice(indexRemove, 1);

                createCharacters(charactersObjects);

                currrentEnemyAttack = 0;
                console.log(currentEnemyAttack);

                //Your enemy's health and attack
                currentEnemyAttack = parseInt($currentEnemy.attr('data_attack'));
                //console.log ("current enemy attack: ", currentEnemyAttack);
                currentEnemyHealth = parseInt($currentEnemy.attr('date_health'));

                console.log('IS THERE OPPONENT: ' + isThereOpponent)

                //Check if there is an opponent
                $('#hover').on('click', function() {
                    if (isThereOpponent) {
                        fight();
                    } else {
                        alert('PICK AN OPPONENT');
                    }
                });
            });
    };


    function fight() {

        //We need to isolate the hover click function in order to create some conditions that allow me to stop the game when it doesn't meet some parameters

        counter++;

        compoundAttack += yourAttack;
        console.log("COMPOUND ATTACK: ", compoundAttack);

        // after attack
        currentEnemyHealth = currentEnemyHealth - compoundAttack;
        yourHealth = yourHealth - currentEnemyAttack;
        console.log("CURRENT ENEMY ATTACK: ", currentEnemyAttack);
        console.log("ENEMY HEALTH: ", currentEnemyHealth);
        console.log("YOUR HEALTH: ", yourHealth);


        $('.currentEnemy > .characterHealth').html(currentEnemyHealth).animate({
				fontSize: 60,
				color: '#FF0000'
			}, 300, function() {
				$(this).animate({
					fontSize: 20,
					color: 'white'
				}, 300);
			});
			$('.yourCharacter > .characterHealth').html(yourHealth).animate({
				fontSize: 60,
				color: '#FF0000'
			}, 300, function() {
				$(this).animate({
					fontSize: 20,
					color: 'white'
				}, 300);
			});

        if (currentEnemyHealth <= 0 && yourHealth > 0) {
            
            isThereOpponent = false;
            yourHealth = yourHealth - currentEnemyAttack;

            console.log("YOU HAVE DEFEATED " + $currentEnemy.attr('date_nickName'));
            console.log("IS THERE OPPONENT: " + isThereOpponent)

            $('#currentEnemy').empty();

            //currentEnemyAttack = 0;

            if (characters.length === 0) {
                alert("Congrats, You WON");
                restartGame();
            } else {
                pickYourOpponent();
            };
        }

        else if (yourHealth <= 0) {
            alert("You have been defected");
            alert("try again");
            restartGame();
        };
};

function restartGame() {
    $('.row').empty();
    $('.restart').append('<button class="restartBtn btn btn-lg btn-warning">Restart Game</button>');
        $('.restartBtn').on('click', function() {
            location.reload();
        })
}



        // 	$(document).on('click', '#attackButton', function() {
        // 		counter++;
        // 		console.log("CLICKED ATTACKBUTTON");
        // 		fight();
        // 	});
        // }

        // else if (yourHealth <= 0 && currentEnemyHealth > 0) {
        // 	console.log("You lost");
        // 	$('#remainingEnemies').empty();
        // 	$('#remainingEnemies').append('<div class="title">You Lost</div>');
        // 	$('#remainingEnemies').append('<button class="btn btn-default btn-lg">RESTART');

        // }

        // else if (yourHealth > 0 && currentEnemyHealth <= 0) {
        // 	console.log('Enemy defeated');
        // 	$('#currentEnemy').empty();

        // 	pickYourOpponent();

        // }

    // }

// =========================================================


// ====================== START GAME ====================
// Start the game
startGame();

}); // closing for document load

// new objective, nothing should work unless new enemy is selected. createa boolean that hs to be true in order to continue game


