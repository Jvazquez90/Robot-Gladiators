var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1)) + min;

  return value;
}

// function to set player robot name
var getPlayerName = function () {
  var name = prompt("Welcome to Robot Gladiators! \nWhat is your robot's name?");

  // ensure player robot name is a valid entry
  while (!name) {
      name = prompt("Please enter a valid name for your robot.");
  }

  console.log(`Your robot's name is ${name}`);
  return name;
}

// get player robot name set player stats
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 12,
  score: 10,
  reset: function () {
      this.health = 100;
      this.attack = 12;
      this.score = 10;
  },
  refillHealth: function() {
      if (this.score >= 7) {
          this.health += 20;
          this.score -= 7;
          alert(`Refilling ${this.name}'s health by 20. This cost you 7 points. \n${this.name}'s health is now ${this.health}. \nYour score is now ${this.score}.`);
          shop();
      } else {
          alert("Your score isn't high enough to purchase this.");
          shop();
      }
  },
  upgradeAttack: function () {
      if (this.score >= 7 ) {
          this.attack += 6;
          this.score -= 7;
          alert(`Upgrading ${this.name}'s attack by 6. This cost you 7 points. \n${this.name}'s attack is now ${this.attack}. \nYour score is no ${this.score}.`);
          shop();
      } else {
          alert("Your score isn't high enough to purchase this.")
          shop();
      }
  }
}

// set enemy robot names and stats
var enemyInfo = [
  {
      name: "Roborto",
      attack: randomNumber(10, 14)
  }, 
  {
      name: "Amy-Android",
      attack: randomNumber(10, 14)
  }, 
  {
      name: "Robo-Trumble",
      attack: randomNumber(10, 14)
  }
];

var fightOrSkip = function () {
  // ask if player wants to fight or skip
  var promptFight = prompt("Would you like to FIGHT or SKIP this battle? \nEnter 'FIGHT' to fight. \nEnter 'SKIP' to skip.");
      
  // ensure valid entry 
  if (!promptFight) {
      alert("You need to provide a valid answer. Please try again.");
      return fightOrSkip();
  }

  // if skip, cost player and end round
  if (promptFight.toLowerCase() === "skip") {
      // confirm player wants to skip
      var confirmSkip = confirm("You will be penalized for skipping. \nAre you sure you want to skip?");

      // if yes leave fight
      if (confirmSkip) {
          alert(`This is embarrassing... ${playerInfo.name} has decided to skip this fight.`)

          // reduce player score for skipping
          playerInfo.score = Math.max(0, playerInfo.score - 10);
          
          // return true if player wants to leave
          return true
      }
  }

  return false
}

// fight function
var fight = function(enemy) {
  // repeat and execute while enemy-robot is alive
  while (enemy.health > 0 && playerInfo.health > 0) {
      // ask player to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
          // if true, leave fight by breaking loop
          break;
      }

      // generate random damage value and deduct enemy.health by it
      var damage = randomNumber(playerInfo.attack - 9, playerInfo.attack)
      enemy.health = Math.max(0, enemy.health - damage);

      // log a resulting message to the console that it worked
      console.log(`${playerInfo.name} attacked ${enemy.name} and dealt ${damage} damage. ${enemy.name} now has ${enemy.health} health remaining.`);

      // check enemy's health
      if (enemy.health <= 0) {
          alert(`${enemy.name} had been defeated!`);
          break;
      } else {
          alert(`${enemy.name} still has ${enemy.health} health left.`)
      }

      // generate random damage value and deduct playerInfo.health by it
      var damage = randomNumber(enemy.attack - 9, enemy.attack)
      playerInfo.health = Math.max(0, playerInfo.health - damage);

      // log a resulting message to the console that it worked
      console.log(`${enemy.name} attacked ${playerInfo.name} and dealt ${damage} damage. ${playerInfo.name} now has ${playerInfo.health} health remaining.`);

      // check player's health
      if (playerInfo.health <= 0) {
          alert(`${playerInfo.name} had been defeated!`);
          break;
      } else {
          alert(`${playerInfo.name} still has ${playerInfo.health} health left.`)
      }
  }
};

// function to start a new game
var startGame = function() {
  // reset player stats
  playerInfo.reset();

  // loop through enemyInfo array and run fight function with current enemy
  for (var i = 0; i < enemyInfo.length; i++) {
      if (playerInfo.health > 0) {
          // alert player to round 
          alert(`${playerInfo.name} vs ${enemyInfo[i].name} \nRound ${(i + 1)} \nFIGHT!`);
      
          // pick new enemy based on index of enemyInfo
          var currentEnemyObj = enemyInfo[i];

          // set enemy health
          currentEnemyObj.health = randomNumber(40, 60);

          //user debugger to pause script if needed
          // debugger;

          // pass currentEnemyObj value into fight function
          fight(currentEnemyObj);

          // if player is still alive and there is still an enemy to face
          if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
              // ask if player wants to use the store before next round
              var storeConfirm = confirm("The round has ended. \nWould you like to visit the shop before the next round?");

              // if yes, enter shop
              if (storeConfirm) {
                  shop();
              }
          }
      } else {
          alert("You have lost your robot in battle! Game Over!");
          break;
      }
  }

  // run endGame function
  endGame();
};

// function to end the game
var endGame = function() {
  // if player is still alive, player wins
  if (playerInfo.health > 0) {
      alert(`Great job, you've survived the game! You have a score of ${playerInfo.score}.`);
  } else {
      alert(`You've lost your robot in battle.`)
  }

  // ask player if they'd like to play again
  var playAgainConfirm = confirm("Would you like to play again?");

  if (playAgainConfirm) {
      // restart game
      startGame();
  } else {
      alert("Thank you for playing Robot Gladiators! Come back soon!")
  }
}

var shop = function() {
  // aks player what they'd like to do
  var shopOptionPromp = prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );

  // use switch to carry out action
  switch (parseInt(shopOptionPromp)) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store.");
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
      shop();
      break;
  }
};

startGame();
