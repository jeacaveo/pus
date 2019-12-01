// Reload page with search input as q param
function queryRedirect() {
    // Get query from input field
    const query = `q=${document.getElementById("unitsQuery").value}`;
    // Split URL
    const splitUrl = window.location.href.split("?");
    // Base URL (without params)
    const baseUrl = splitUrl[0];
    // Params for URL (excluding q param)
    const baseParams = (splitUrl.length > 1 ? splitUrl[1] : "")
      .split("&")
      .filter(param => !param.startsWith("q="))
      .join("&");
    // Join query param to the other params
    const params = [baseParams, query].join('&');
    // Join everything and redirect
    location = `${baseUrl}?${baseParams ? params : query}`;
    return false;  // Avoid default behavior
}
