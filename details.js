const pokemonInput = document.getElementById("pokemon-input");
const fetchBtn = document.getElementById("fetch-btn");
const pokemonDetails = document.getElementById("pokemon-details");
const errorMessage = document.getElementById("error-message");

// Elements to populate
const frontSprite = document.getElementById("front-sprite");
const backSprite = document.getElementById("back-sprite");
const pokemonName = document.getElementById("pokemon-name");
const baseExperience = document.getElementById("base-experience");
const heightElement = document.getElementById("height");
const weightElement = document.getElementById("weight");
const typesElement = document.getElementById("types");
const abilitiesElement = document.getElementById("abilities");

fetchBtn.addEventListener("click", async () => {
  const pokemonNameValue = pokemonInput.value.trim();

  // Reset previous states
  pokemonDetails.classList.add("hidden");
  errorMessage.classList.add("hidden");
  errorMessage.textContent = "";

  if (!pokemonNameValue) {
    errorMessage.textContent = "Please enter a Pokemon name";
    errorMessage.classList.remove("hidden");
    return;
  }

  try {
    const response = await fetch(
      https://pokeapi.co/api/v2/pokemon/${pokemonNameValue.toLowerCase()}
    );

    if (!response.ok) {
      throw new Error("Pokemon not found");
    }

    const pokemon = await response.json();

    // Populate details
    frontSprite.src = pokemon.sprites.front_default;
    frontSprite.alt = ${pokemon.name} front sprite;
    backSprite.src = pokemon.sprites.back_default;
    backSprite.alt = ${pokemon.name} back sprite;
    pokemonName.textContent = pokemon.name.toUpperCase();
    baseExperience.textContent = pokemon.base_experience;
    heightElement.textContent = pokemon.height;
    weightElement.textContent = pokemon.weight;
    typesElement.textContent = pokemon.types
      .map((type) => type.type.name)
      .join(", ");
    abilitiesElement.textContent = pokemon.abilities
      .map((ability) => ability.ability.name)
      .join(", ");

    // Show details
    pokemonDetails.classList.remove("hidden");
  } catch (error) {
    errorMessage.textContent = "Pokemon not found. Please try again.";
    errorMessage.classList.remove("hidden");
  }
});