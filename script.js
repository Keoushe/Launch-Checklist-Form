// Write your JavaScript code here!
window.addEventListener("load", function () {
  let form = document.getElementById("launchForm");
  let sub = document.getElementById("formSubmit");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let faultyItems = document.getElementById("faultyItems");
    let copilotStatus = document.getElementById("copilotStatus");
    let pilotStatus = document.getElementById("pilotStatus");
    let pilotName = document.querySelector("input[name=pilotName]");
    let coPilot = document.querySelector("input[name=copilotName]");
    let fuelLevel = document.querySelector("input[name=fuelLevel]");
    let cargoMass = document.querySelector("input[name=cargoMass]");
    if (
      pilotName.value !== "" &&
      isNaN(pilotName.value) === true &&
      coPilot !== "" &&
      isNaN(coPilot.value) === true &&
      fuelLevel !== "" &&
      isNaN(fuelLevel.value) === false &&
      fuelLevel.value >= 10000 &&
      cargoMass.value < 10000 &&
      cargoMass !== "" &&
      isNaN(cargoMass.value) === false
    ) {
      faultyItems.id = "visible";
      launchStatus.innerHTML = `Shuttle is ready for launch!`;
      launchStatus.style.color = "green";
      pilotStatus.innerHTML = `${pilotName.value} is ready!`;
      copilotStatus.innerHTML = `${coPilot.value} is ready!`;
      fetch("https://handlers.education.launchcode.org/static/planets.json")
        .then(function (response) {
          return response.json();
        })
        .then(function (obj) {
          const chosenWorld = obj[3];
          const target = document.getElementById("missionTarget");
          target.innerHTML = `<h2>Mission Destination</h2>
          <ol>
             <li>Name: ${chosenWorld.name}</li>
             <li>Diameter: ${chosenWorld.diameter}</li>
             <li>Star: ${chosenWorld.star}</li>
             <li>Distance from Earth: ${chosenWorld.distance}</li>
             <li>Number of Moons: ${chosenWorld.moons}</li>
          </ol>
          <img src="${chosenWorld.image}">`;
          console.log(chosenWorld);
        });
    }

    if (
      pilotName.value === "" ||
      coPilot.value === "" ||
      fuelLevel.value === "" ||
      cargoMass.value === ""
    ) {
      alert(`all fields required`);
    }

    if (
      isNaN(pilotName.value) === false &&
      isNaN(coPilot.value) === false &&
      isNaN(fuelLevel.value) === true &&
      isNaN(cargoMass.value) === true
    ) {
      alert(`please enter valid information for each fields`);
    }

    if (pilotName.value === "") {
      alert(`PIlot name is required`);
    } else if (isNaN(pilotName.value) === false) {
      alert(`Pilot name required string`);
    }
    if (coPilot.value === "") {
      alert(`Copilot name is required`);
    } else if (isNaN(coPilot.value) === false) {
      alert(`Co-pilot name required string`);
    }
    if (fuelLevel.value === "") {
      alert(`Fuel Level amount is required`);
    } else if (isNaN(fuelLevel.value) === true) {
      alert(`fuel level should be a number`);
    }
    if (cargoMass.value === "") {
      alert(`Cargo Mass is required`);
    } else if (isNaN(cargoMass.value) === true) {
      alert(`cargo mass should be a number`);
    }

    if (fuelLevel.value < 10000) {
      faultyItems.id = "visible";
      fuelStatus.innerHTML = `there is not enough fuel for the journey`;
      launchStatus.innerHTML = `shuttle not ready for launch`;
      launchStatus.style.color = "red";
    }

    if (cargoMass.value > 10000) {
      faultyItems.id = "visible";
      cargoStatus.innerHTML = `there is to much mass for the shuttle to take off!`;
      launchStatus.innerHTML = `shuttle not ready for launch`;
      launchStatus.style.color = "red";
    }

    console.log("were live");
  });
});
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
