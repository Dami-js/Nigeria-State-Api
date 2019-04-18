let allStates, stateArray;
let selectState = document.getElementById("NgState");
let stateOutput = "";
let localGov = document.getElementById("localGov");

fetch("http://127.0.0.1:8000/nigeria.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    stateOutput += '<option value="">Select a state</option>';
    stateArray = data;
    for (let i in data) {
      allStates = data[i].state.name;
      stateOutput +=
        '<option value="' +
        allStates +
        '" id="name_of_state">' +
        allStates +
        "</option>";
    }
    selectState.innerHTML = stateOutput;
  })
  .catch(err => {
    throw err;
  });

function getlocals() {
  for (let i in stateArray) {
    let selectedState = selectState.value;

    if (selectedState == stateArray[i].state.name) {
      let statesLocalGov = stateArray[i].state.locals;
      let statesLocalGovOutput = "";
      for (let j in statesLocalGov) {
        statesLocalGovOutput += `<option value="${statesLocalGov[j].name}">${
          statesLocalGov[j].name
        }</option>`;
      }
      localGov.innerHTML = statesLocalGovOutput;
    }
  }
}

/**
 * Function to view the details
 * details => state and the local government
 */
function viewDetails() {
  let detailsElemnt = "";
  let stateValue = selectState.value;
  let localGovtValue = localGov.value;
  detailsElemnt += `<p><strong>State:</strong> ${stateValue}</p>
                    <p><strong>Local Government:</strong> ${localGovtValue}</p>`;
  document.getElementById("details").innerHTML = detailsElemnt;
}
