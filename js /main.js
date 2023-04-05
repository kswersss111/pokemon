const pokemonList = document.getElementById('pokemon-list');
const pokemonInfo = document.getElementById('pokemon-info');
const previousBtn = document.getElementById('previous-btn');
const nextBtn = document.getElementById('next-btn');
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
let nextUrl = '';
let previousUrl = '';

async function getPokemonList(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		nextUrl = data.next;
		previousUrl = data.previous;
		const results = data.results;
		pokemonList.innerHTML = '';
		results.forEach(async (result) => {
			const pokemon = await getPokemon(result.url);
			const pokemonElement = document.createElement('div');
			pokemonElement.classList.add('pokemon');
			pokemonElement.innerText = pokemon.name;
			pokemonElement.addEventListener('click', () => {
				showPokemonInfo(pokemon);
			});
			pokemonList.appendChild(pokemonElement);
		});
		if (previousUrl) {
			previousBtn.disabled = false;
		} else {
			previousBtn.disabled = true;
		}
	} catch (error) {
		console.log(error);
	}
}

async function getPokemon(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		const pokemon = {
			name: data.name,
			type: data.types.map((type) => type.type.name).join(', '),
			height: data.height,
			weight: data.weight,
			image: data.sprites.front_default
		};
		return pokemon;
	} catch (error) {
		console.log(error);
	}
}

function showPokemonInfo(pokemon) {
	pokemonInfo.innerHTML = '';
	const pokemonInfoElement = document.createElement('div');
	pokemonInfoElement.classList.add('pokemon-info');
	const nameElement = document.createElement('p');
	nameElement.innerText = `Name: ${pokemon.name}`;
	pokemonInfoElement.appendChild(nameElement);
	const typeElement = document.createElement('p');
	typeElement.innerText = `Type: ${pokemon.type}`;
	pokemonInfoElement.appendChild(typeElement);
	const heightElement = document.createElement('p');
	heightElement.innerText = `Height: ${pokemon.height}`;
	pokemonInfoElement.appendChild(heightElement);
	const weightElement = document.createElement('p');
	weightElement.innerText = `Weight: ${pokemon.weight}`;
	pokemonInfoElement.appendChild(weightElement);
	const imageElement = document.createElement('img');
	imageElement.src = pokemon.image;
	pokemonInfoElement.appendChild(imageElement);
	pokemonInfo.appendChild(pokemonInfoElement);
}

nextBtn.addEventListener('click', () => {
	getPokemonList(nextUrl);
});

previousBtn.addEventListener('click', () => {
	getPokemonList(previousUrl);
});

getPokemonList(apiUrl);
