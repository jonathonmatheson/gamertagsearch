
  const endpoint = 'https://raw.githubusercontent.com/jonathonmatheson/gamertagsearch/refs/heads/main/gamertag.json';
  const cities = [];
  fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));
  
  function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
      // here we need to figure out if the city or state matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.state.match(regex)
    });
  }
  
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
      const rankName = place.rank.replace(regex, `<span class="hl">${this.value}</span>`);
      return `
        <li>
          <span class="pic"><img style="width:50px;height:50px;border-radius:100%;" src="${(place.image)}"/></span>
          <span class="name">${cityName}</span>
          <span class="population">Messaged: ${(place.population)}</span>
          <span class="reply">Replied: ${(place.reply)}</span>
        </li>
      `;
    }).join('');
    suggestions.innerHTML = html;
  }
  
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');
  
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);
  
  
  // modal
  
  // Get the modal
  var modal = document.getElementById("myModal");
  
  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  
  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

