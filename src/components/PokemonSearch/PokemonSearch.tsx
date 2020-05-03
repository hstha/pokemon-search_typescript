import React, { Component } from 'react';

import UserInterface from '../../interface/User';
import PokemonInfoInterface from '../../interface/PokemonInfo';

export default class PokemonSearch extends Component<UserInterface, PokemonInfoInterface> {

    constructor(props: UserInterface){
        super(props);
        this.state = {
            error: false, 
            pokemon: {
                name: '',
                noOfAbilities: 0,
                baseExperience: 0,
                imageUrl: ''
            },
            showResult: false
        }
    }

    onChangeHander = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let targetName: string = evt.target.value;

        // if(targetName === ''){
        //     targetName = '';
        // }

        this.setState({pokemon: {
                        name: targetName,
                        noOfAbilities: 0,
                        baseExperience: 0,
                        imageUrl: ''
                    }
                });

    }

    onSearchHander = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemon.name}`)
            .then(res => {
                if(res.status !== 200){
                    this.setState({
                        error: true,
                        showResult: true
                    });
                    
                    return;
                }

                res.json().then(data => {
                    this.setState({
                        error: false,
                        pokemon: {
                            name: data.name,
                            noOfAbilities: data.abilities.length,
                            baseExperience: data.base_experience,
                            imageUrl: data.sprites.front_default
                        },
                        showResult: true
                    });
                });
            })
    }

    render(){
        const {name : userName, noOfPokemon} = this.props;
        const {error, pokemon, showResult} = this.state;
        const {name, noOfAbilities, baseExperience, imageUrl} = pokemon
        let resultedValue : any = '';
        if(showResult){
            if(name !== ''){
                if(error){
                    resultedValue = <div>
                                        <p>Sorry, no such pokemon could be found.</p>
                                    </div>;
                }else{
                    resultedValue = <div>
                                        <img src = {imageUrl} alt= 'pokemon-image' />
                                        <p>{name} has {noOfAbilities} abilities and {baseExperience} base experience points.</p>
                                    </div>;
                }
            }
        }else{
            resultedValue = '';
        }
        
        return(
            <div>
                <p>User {userName} has {noOfPokemon ? noOfPokemon : 0} pokemons</p>
                <input type='text' onChange={this.onChangeHander} value={this.state.pokemon.name} />
                <button onClick={this.onSearchHander}>
                    Search
                </button> < br />
                {resultedValue}
            </div>
        );
    }
}