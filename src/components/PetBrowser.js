import React from 'react';
import Pet from './Pet';

export default class PetBrowser extends React.Component {

	render() {

		return(

			<div className="ui cards">

				{this.props.pets.map(pet => {

					return (< Pet
						pet={pet}
						onAdoptPet={this.props.onAdoptPet}
						key={pet.id}
						/>)

				})}

			</div>)

	};

};