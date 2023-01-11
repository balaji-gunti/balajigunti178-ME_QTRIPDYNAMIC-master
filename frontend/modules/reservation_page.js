import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const result = await fetch(config.backendEndpoint + `/reservations/`);
    const data = await result.json();
    return data;
  } catch(e) {
      return null;
  }
  return null;
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length === 0) {
    document.getElementById('no-reservation-banner').style.display = 'block';
    document.getElementById('reservation-table-parent').style.display = 'none';
  } else {
    document.getElementById('no-reservation-banner').style.display = 'none';
    document.getElementById('reservation-table-parent').style.display = 'block';
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

    reservations.forEach((obj) => {
      console.log(obj);
      let dateObj = new Date(obj.date)
      let date = dateObj.toLocaleDateString('en-IN', {day: 'numeric', month: 'numeric', year: 'numeric'})

      let timeObj = new Date(obj.time)
      let time = timeObj.toLocaleDateString('en-IN', {day: 'numeric', month: 'long', year: 'numeric'}) + ', ' + timeObj.toLocaleTimeString('en-IN')

      console.log(date, time)
      let row = `
      <td>${obj.id}</td>
      <td>${obj.name}</td>
      <td>${obj.adventureName}</td>
      <td>${obj.person}</td>
      <td>${date}</td>
      <td>${obj.price}</td>
      <td>${time}</td>
      <td id="${obj.id}"><a class="reservation-visit-button" href="/frontend/pages/adventures/detail/?adventure=${obj.adventure}">Visit Adventure</a></td>
      `

      let tr = document.createElement('tr')
      tr.innerHTML = row;
      document.getElementById('reservation-table').appendChild(tr);
    })
  }

}


export { fetchReservations, addReservationToTable };
// ${new Date(key.time).toLocaleDateString("en-IN", {
//   year: "numeric",
//   day: "numeric",
//   month: "long",
// })}, ${new Date(key.time).toLocaleTimeString("en-IN")}