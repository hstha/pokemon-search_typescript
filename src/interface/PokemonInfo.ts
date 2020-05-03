export default interface PokemonInfo {
    error: boolean,
    pokemon: Pokemon,
    showResult: boolean
}

interface Pokemon{
    name: string,
    noOfAbilities: number,
    baseExperience: number,
    imageUrl: string
}