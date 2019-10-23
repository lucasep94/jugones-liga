import React, { PureComponent } from 'react';

import Modal from './components/modal/Modal';

import './App.css';
import reactSvg from './react.svg';

const domain = 'http://localhost:3001';

class App extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      teams: [],
      players: [],
      pichichis: [],
      showModal: true,
      sortDesc: true
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.sortPichichis = this.sortPichichis.bind(this);
  }

  componentDidMount() {        
    this.getTeams();
    this.getPlayers();
    this.getPichichis();
  }  

  getTeams() {
    fetch(`${domain}/teams`)
      .then(response => {
        return response.json();
      })
      .then(teams => {
        this.setState({ teams })
      });
  }

  getPlayers() {
    fetch(`${domain}/players`)
      .then(response => {
        return response.json();
      })
      .then(players => {
        this.setState({ players })
      });
  }

  getPichichis(){
    fetch(`${domain}/pichichis`)
      .then(response => {
        return response.json();
      })
      .then(pichichis => {

        var tempArray = pichichis;

        tempArray.forEach(p => {
          p.name = this.getPlayerName(p.playerId);
        });
        console.log(tempArray);
        
        this.setState({ pichichis })
      });
  }

  openModal() {    
    this.setState(() =>({
      showModal: true
    }));
  }
  closeModal(){
    this.setState(() =>({
      showModal: false
    }));
  }

  sortPichichis() {    
    var tempPichichis = this.state.pichichis;
    var sort = this.state.sortDesc;
    tempPichichis = tempPichichis.sort(function(a, b) {
      
      if(sort) {
        return parseInt(a.goals) > parseInt(b.goals) ? 1 : parseInt(a.goals) < parseInt(b.goals) ? -1 : 0;        
      }
      else {
        return parseInt(a.goals) > parseInt(b.goals) ? -1 : parseInt(a.goals) < parseInt(b.goals) ? 1 : 0;
      }
    });   
    this.setState(() =>({
      pichichis: tempPichichis,
      sortDesc: !sort
    }));

    console.log('sorted',tempPichichis);
  }

  getPlayerName(playerId){
    var playersTemp = this.state.players;
    var player = playersTemp.find(x=> x.id == playerId);
    return player.name;
  }

  render() {
    const { players } = this.state;
    const { teams } = this.state;
    const { pichichis } = this.state;
    
    let showStyle =  {
      display: this.state.showModal ? 'block' : 'none'
    };

    const modal = <Modal getPlayer={this.getPlayerName} show={showStyle} click={this.closeModal} sort={this.sortPichichis} pichichis={this.state.pichichis} />

    return <div className="App">
      <header className="App-heading App-flex">   
      <button type="button" className="header-btn" onClick={this.openModal}>Pichichis</button>
      </header>
      <div className="App-teams App-flex">
        {/* 
          TODO ejercicio 2
          Debes obtener los players en lugar de los equipos y pintar su nombre. 
          Borra todo el código que no sea necesario. Solo debe existir un título: Los jugadores
          y una lista con sus nombres. 
          ** Los comentarios de los ejercicios no los borres.
        */}       
        {
          modal
        }
        <ul className="player-list">
          {/* 
            TODO ejercicio 3
            Vamos a pasar a darle diseño. Crea el diseño propuesto en el readme con los requerimientos que se necesite.
            Guiate por las imágenes.
           */}
          {players.map(function (player, i) {
            const team = teams.find(x => x.id === player.teamId);
            return (
              <li className="player-item" key={player.name}>
                <div className="player-photo" style={{'backgroundImage': 'url('+player.img+')'}}></div>
                <div className="player-data">
                  <span className="row-1">{player.name} <b>{player.position}</b></span>
                  <span className="row-2">{team.name}</span>
                </div>
                <div className="player-badge" style={{'backgroundImage': 'url('+team.shield +')'}}>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      {/* <div className="App-instructions App-flex">
        <img className="App-logo" src={reactSvg}/>
        <p>Edit <code>src/App.js</code> and save to hot reload your changes.</p>
      </div> */}
    </div>
  }
}

export default App
