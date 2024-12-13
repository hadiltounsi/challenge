// base elements for interaction
const searchInput = document.getElementById("pokemon-search");
const searchBtn = document.getElementById("search-btn");
const pokemonCard = document.getElementById("pokemon-card");
const errorMessage = document.getElementById("error-message");

// Elements to add the pokemon data
const pokemonImage = document.getElementById("pokemon-image");
const pokemonName = document.getElementById("pokemon-name");
const pokemonHeight = document.getElementById("pokemon-height");
const pokemonWeight = document.getElementById("pokemon-weight");
const pokemonBaseExp = document.getElementById("pokemon-base-exp");
const pokemonTypes = document.getElementById("pokemon-types");
const pokemonAbilities = document.getElementById("pokemon-abilities");

searchBtn.addEventListener("click", async () => {
  const pokemonNameValue = searchInput.value.trim();

  // Reset previous states
  pokemonCard.classList.add("hidden");
  errorMessage.classList.add("hidden");
  errorMessage.textContent = "";

  if (!pokemonNameValue) {
    errorMessage.textContent = "Please enter a Pokemon name";
    errorMessage.classList.remove("hidden");
    return;
  }

  try {
    // fetch the pokemon from the api
    const response = await fetch(
      https://pokeapi.co/api/v2/pokemon/${pokemonNameValue.toLowerCase()}
    );

    // throw error if pokemon not found
    if (!response.ok) {
      throw new Error("Pokemon not found");
    }

    // parse the pokemon json data
    const pokemon = await response.json();

    // update elements in the html page to show the fetched data
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonImage.alt = pokemon.name;
    pokemonName.textContent = pokemon.name.toUpperCase();
    pokemonHeight.textContent = pokemon.height;
    pokemonWeight.textContent = pokemon.weight;
    pokemonBaseExp.textContent = pokemon.base_experience;
    pokemonTypes.textContent = pokemon.types
      .map((type) => type.type.name)
      .join(", ");
    pokemonAbilities.textContent = pokemon.abilities
      .map((ability) => ability.ability.name)
      .join(", ");

    // Show card
    pokemonCard.classList.remove("hidden");
  } catch (error) {
    // update the error message
    errorMessage.textContent = "Pokemon not found. Please try again.";
    errorMessage.classList.remove("hidden");
  }
});