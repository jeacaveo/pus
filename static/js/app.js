// Create unit element
function addUnitToPage(unit) {
  const innerDiv = document.createElement("div");
  innerDiv.classList.add("card");
  innerDiv.classList.add("col-md-6");
  imageHtml = `
    <img
      src="${unit.panel_url ? unit.panel_url : 'https://via.placeholder.com/453x217/696969/FFF/?text=' + unit.name}"
      class="card-img-top" alt="${unit.name}">`;
  innerDiv.innerHTML = `
    <a href="https://prismata.gamepedia.com${unit.wiki_path}" target="_blank">
      ${imageHtml}
    </a>
    <p class="card-text text-warning"><small>Supply: ${unit.supply}</small></p>`;
  document.getElementById("unitDisplay").appendChild(innerDiv);
  return innerDiv;
}


// Handle post-load actions
function onLoad() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search.slice(1));

  // Re-populate search input
  document.getElementById("unitsQuery").value = params.get("q");

  if (params.has("q")) {
    // Hide cheatsheet
    const cheatsheet = document.getElementById("cheatsheet");
    cheatsheet.classList.add("d-none");

    // Show loading spinner
    const spinner = document.getElementById("unitsSpinner");
    spinner.classList.add("d-flex");

    // Call API
    const url = new URL('https://papi.ancobl.in/api/latest/units/');
    fetch(
        `${url.toString()}?q=${params.get("q")}`,
        {headers: {'Content-Type': 'application/json'}})
      .then(response => response.json())
        .then(data => {
          spinner.classList.remove("d-flex");  // Hide loading spinner
          const units = data.map(addUnitToPage);

          // No results
          if (units.length == 0) {
            // Show alert and cheatsheet
            document.getElementById("notFoundAlert").classList.remove("d-none");
            cheatsheet.classList.remove("d-none");
          }
        }).catch(err => console.log(err));
  }
}


// Reload page with search input as q param
function queryRedirect() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search.slice(1));

    // Remove existing q param and replace with the current search value
    params.delete("q");
    params.append("q", document.getElementById("unitsQuery").value);

    // Re-join everything and redirect
    location = `${url.pathname}?${params.toString()}`;
    return false;  // Avoid default behavior
}
