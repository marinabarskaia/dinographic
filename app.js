// Create Dino Constructor

function Dino([species, weight, height, diet, where, when, fact]) {
  this.species = species;
  this.image = encodeURI("images/" + this.species + ".png");
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
}

// Create Dino Objects

const dinoArray = [];

//Get data from json
const getData = async () => {
  const fetchedData = await fetch("./dino.json");
  const data = await fetchedData.json();
  return data.Dinos;
};

getData()
  .then(data => {
    const dinos = data;

    dinos.forEach(dino => {
      const dinoObj = new Dino([
        dino.species,
        dino.weight,
        dino.height,
        dino.diet,
        dino.where,
        dino.when,
        dino.fact
      ]);
      dinoArray.push(dinoObj);
    });
  });


  
  console.log(dinoArray);

// Create Human Object

const humanObj = {
  image: "images/human.png",
  species: "humanObj"
};


  // Use IIFE to get humanObj input 
//const humanObj = {};
document.getElementById("btn").addEventListener("click", event => {
  (function getHumans() {
    event.preventDefault();
    humanObj.name = document.getElementById("name").value,
    humanObj.feet = parseInt(document.getElementById("feet").value);
    humanObj.inches = parseInt(document.getElementById("inches").value);
    humanObj.height = humanObj.feet * 12 + humanObj.inches;
    humanObj.weight = parseInt(document.getElementById("weight").value);
    humanObj.diet = document.getElementById("diet").value;
  })();
 
  dinoArray.forEach(dino => {
    dino.heightFact = dino.compareHeight(humanObj);
    dino.weightFact = dino.compareWeight(humanObj);
    dino.dietFact = dino.compareDiet(humanObj);
    dino.where = `The ${dino.species} lived in ${dino.where}.`;
    dino.when = `The ${dino.species} lived in the ${dino.when}.`;
  });

  const dinosArrayOne = dinoArray.slice(0, 4);
  const dinosArrayTwo = dinoArray.slice(4, 8);
  const allSpeciesArray = dinosArrayOne.concat(humanObj, dinosArrayTwo);

  // Add tiles to DOM

  allSpeciesArray.forEach(item => {
    appendTiles(item);
  });

  hideForm();
});

// Create Dino Compare
//Method 1-Height
// NOTE: Height in JSON file is in inches.

Dino.prototype.compareHeight = function() {
  const humanHeight = humanObj.height;
  const dinoHeight = this.height;
  const diffHtH = humanHeight - dinoHeight;
  const diffHtD = dinoHeight - humanHeight; 

  if (humanHeight > dinoHeight) {
    return ` ${this.species} was  only ${this.height} inches tall.  ${this.species} was ${diffHtH} inches shorter than you.`;
  }
  if (humanHeight < dinoHeight) {
    return ` ${this.species} was ${this.height} inches tall. ${this.species} was ${diffHtD} inches  taller than you. `;
  }
  if (humanHeight == dinoHeight) {
    return `You and ${this.species} have same height! `;
  }
};

// Create Dino Compare
// Method 2-Weight
// NOTE: Weight in JSON file is in lbs.

Dino.prototype.compareWeight = function() {
  const humanWeight = humanObj.weight;
  const dinoWeight = this.weight;
  const diffWtH = humanWeight - dinoWeight;
  const diffWtD = dinoWeight - humanWeight; 

  if (humanWeight > dinoWeight) {
    return ` ${this.species} weighed  only ${this.weight} lbs. ${this.species} was  ${diffWtH} lbs lighter than you. \n`;
  }
  if (humanWeight < dinoWeight) {
    return ` ${this.species} weighed ${this.weight} lbs. ${this.species} was ${diffWtD} lbs heavier than you. `;
  }
  if (humanWeight == dinoWeight) {
    return ` You an ${this.species} have same weight! `;
  }
};

// Create Dino Compare
// Method 3-Diet.

Dino.prototype.compareDiet = function() {
  const humanDiet = humanObj.diet;
  const dinoDiet = this.diet;
  if (humanDiet === dinoDiet) {
    return ` You and ${this.species} had the same diet. You are both ${humanObj.diet}.`;
  }
  {
    return `${this.species} was a ${this.diet}.`;
  }
};

// Generate Tiles for each Dino in Array and append to DOM

const generateGrid = document.querySelector("main");

const appendTiles = function(dino) {
  let tile = document.createElement("div");

  tile.classList.add("grid-item");
  if (dino.species === "humanObj") {
    tile.innerHTML = `<h3>${dino.name.toUpperCase()}</h3>`;
  } else if (dino.species === "Pigeon") {
    tile.innerHTML = `<h3>${dino.species}</h3>`;
    tile.innerHTML += `<p>${dino.fact}</p>`;
  } else {
    tile.innerHTML = `<h3>${dino.species}</h3>`;
    const fact = randomFact(dino);
    tile.innerHTML += `<p>${fact}</p>`;

  }

  tile.innerHTML += `<img src= ${dino.image}>`;
  generateGrid.appendChild(tile);


  



};


// Remove form from screen

const dataForm = document.querySelector("#dino-compare");

function hideForm() {
  dataForm.style.display = "none";
  
}

//Select random Dino fact to display

const randomFact = function(obj) {
  const facts = [
    "fact",
    "weightFact",
    "heightFact",
    "dietFact",
    "when",
    "where"
  ];
  const random = facts[Math.floor(Math.random() * facts.length)];
  return obj[random];
};




  //Create tooltip element to display extra facts on hover
  let tooltip = document.createElement("div");
  tooltip.style.display = "none";
  tooltip.style.opacity = '0';
  tooltip.style.position = 'fixed';
  tooltip.style.left = '10px';
  tooltip.style.top = '10px';
  tooltip.style.width = '200px';
  tooltip.style.height = '200px';
  tooltip.style.padding = '10px';
  tooltip.style.background = '#fff';
  tooltip.style.borderRadius = "25px"
  document.body.appendChild(tooltip);



tile.addEventListener("mouseover", showExtraFacts);
tile.addEventListener("mouseout", hideExtraFacts);


function showExtraFacts() { 
tooltip.style.display = "block";
tooltip.style.opacity = "0.7";
tooltip.innerHTML += `<span>${dino.species} \n ${dino.fact}</span>`;
console.log(dino);
};

function hideExtraFacts() { 
tooltip.style.display = "none";
tooltip.style.opacity = "0";
tooltip.innerHTML = '';
}; 

