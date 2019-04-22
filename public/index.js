let selectState = document.getElementById("NgState");
let localGov = document.getElementById("localGov");

(async () => {
	try {
		let response = await fetch('nigeria.json'); // get data
		
		// ensure data was successful
		if (response.status !== 200) return alert('Page not loaded');

		const Nigeria = await response.json(); // create a global data

		const States = await Nigeria.map(state => state.state.name); // get states
		
		// get lga
		const Lga = state => {
			let stateIndex = Nigeria.findIndex(point => point.state.name.toLowerCase() == state.toLowerCase());
			let stateObj = Nigeria[stateIndex];
			let lga = stateObj.state.locals.map(local => local.name);

			return lga;
		};

		selectState.innerHTML = '<option value"" disabled selected>Select state</option>' + await States.map(
            state => `<option value="${state.toLowerCase()}">${state}</option>`
		).join('');
		
		selectState.onchange = async (e) => {
			let lga = Lga(selectState.value);

			localGov.innerHTML = '<option value"" disabled selected>Select Local government</option>' + await lga.map(
				lg => `<option value="${lg.toLowerCase()}">${lg}</option>`
			).join('');
		}
	} catch (error) {
		console.log(error);
		alert(`Page loaded with errors: ${error.message}`);
	}
})(); // end async instantainous function

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
