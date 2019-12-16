import React, {Component} from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

export default class App extends Component {

	constructor() {

		super()

		this.state = {

			pets: [],
			filters: {

				type: 'all'

			}

		}

	}

	fetchPets = () => {

		let URL = '';

		if (this.state.filters.type !== 'all') {

			URL = `/api/pets?type=${this.state.filters.type}`;

		} else {

			URL = '/api/pets';

		};

		fetch(URL)
			.then(res => res.json())
			.then(res => this.setState({pets: res}));

	}

	updateFilterType = (event) => {

		this.setState({filters: {type: event.target.value}})

	}

	filterPets = () => {

		this.fetchPets()

	}

	handleFindPetsClick = () => {

		this.filterPets();

	}

	handleAdoptPet = (petId) => {

		let arr = [...this.state.pets]
		arr.map(pet => {
			if (pet.id === petId) {

				pet.isAdopted = true;
				return pet;

			} else {

				return pet;

			}

		})

		this.setState({pets: arr});

	}

	componentDidMount() {

		this.fetchPets();

	}

	render() {

		return (

			<div className="ui container">

				<header>
				<h1 className="ui dividing header">React Animal Shelter</h1>
				</header>
				<div className="ui container">
				<div className="ui grid">
					<div className="four wide column">
					<Filters
						onChangeType={this.updateFilterType}
						onFindPetsClick={this.handleFindPetsClick}
					/>
					</div>
					<div className="twelve wide column">
					<PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdoptPet}/>
					</div>
				</div>
				</div>

			</div>

		)

	}

}