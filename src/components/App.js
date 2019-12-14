import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'
// import { isAbsolute } from 'path'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = type => {
    this.setState({ filters: {type} });
  };
  fetchPets = (type = '') => {
    fetch('/api/pets' + type).then(res => res.json())
    .then(pets => this.setState({pets}))
  };
  onFindPetsClick = () => {
    if (this.state.filters.type !== 'all') {
      this.fetchPets(`?type=${this.state.filters.type}`)
    } else {
      this.fetchPets();
    }
  };
  onAdoptPet = id => {
    const pets = this.state.pets.map(pet => {
      if (pet.id === id ){
        return {...pet, isAdopted: true}; 
      } 
        return pet;
    })
    // console.log(this.state.pets);
    this.setState({pets});
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} 
              onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
