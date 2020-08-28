const container: HTMLElement | any = document.getElementById("app");
const numberOfPokemons: number = 151;

interface Pokemon {
    id: number;
    name: string;
    image: string;
    type: string;
}
const fetchData = async (cb: (pokemon: Pokemon) => void): Promise<void> => {
    for (let i = 1; i <= numberOfPokemons; i++) {
        cb(await getPokemon(i));
    }
}

const fetchData2 = async (cb: (pokemons: Pokemon[]) => void): Promise<void> => {
    let pokemons: Promise<Pokemon>[] = new Array(numberOfPokemons);
    for (let i = 1; i <= numberOfPokemons; i++) {
        pokemons[i] = getPokemon(i);
    }
    cb((await Promise.all(pokemons)).sort((a, b) => a.id - b.id));
}

const getPokemon = async (id: number): Promise<Pokemon> => {
    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon: any = await data.json();
    const pokemonType: string = pokemon.types
        .map((poke: any) => poke.type.name)
        .join(", ");

    const transformedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: `${pokemon.sprites.front_default}`,
        type: pokemonType,
    }

    return transformedPokemon;
}

const presentPokemons = (pokemons: Pokemon[]): void => {
    pokemons.forEach(value => showPokemon(value));
}

const showPokemon = (pokemon: Pokemon): void => {
    let output: string = `
        <div class="card">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
    `
    container.innerHTML += output;
}

fetchData(showPokemon);
//fetchData2(presentPokemons);
