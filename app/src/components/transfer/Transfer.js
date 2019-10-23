import React, {PureComponent} from 'react';
import './Transfer.css';

class Transfer extends PureComponent {

    state = {
        player_send: {},
        players: {},
        playerTrade: []
    }

    constructor(props) {
        super(props);   
        const filteredTeams = props.teams.filter(x => x.id != props.player_send.teamId);
        console.log('filtered teams', filteredTeams);     
        this.state = {
            player_send: props.player_send,
            players: props.players,
            playerTrade: [],
            teams: filteredTeams,
            money: 0
        }
        this.loadTeamPlayers = this.loadTeamPlayers.bind(this);     
    }

    loadTeamPlayers(){
        const teamSelected = document.getElementById('selectTeam').value;
        if(teamSelected > 0){
            const moneyAvailable = this.state.teams.find(x => x.id == teamSelected).money;
            const playersTrade = this.state.players.filter(x => x.teamId == teamSelected);
            console.log('trade players:',playersTrade);
            this.setState(() =>({
                playerTrade: playersTrade,
                money: moneyAvailable
            }));
        }
    }

    sendTransfer = () => {
        const teamSelected = document.getElementById('selectTeam').value;
        const playerSelected = this.props.player_send.id;
        const body = {
            playerId : parseInt(playerSelected),
            teamId: parseInt(teamSelected)
        }
        console.log('transfer:', body);

        if(teamSelected > 0 && playerSelected > 0){
            this.props.doTransfer(body);
        }
    }

    render(){      
        
        const { playerTrade } = this.state;
        const { teams } = this.state;
        const { money } = this.state;

        return(
            <div className="modal-transfer">
                <div className="transfer-box">
                    <div className="transfer-content">
                        <h2>Transferencia: {this.props.player_send.name}</h2>
                        <div className="transfer-group">
                            <label>Equipo destino: </label>
                            <select id="selectTeam" onChange={this.loadTeamPlayers}>
                                <option value="0">Seleccione Equipo...</option>
                                {
                                    teams.map(function (team) {
                                        return (
                                            <option key={team.id} value={team.id}>{team.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <span className="transfer-money">$ 
                                {
                                    money
                                }
                            </span>  
                        </div>
                        <div className="transfer-group">
                            <label>Jugador a intercambiar: </label>
                            <select id="selectPlayer">
                                {
                                    playerTrade.map(function (player) {
                                        return (
                                            <option key={player.id} value={player.id}>{player.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="transfer-footer">
                        <button type="button" className="transfer-btn confirm" onClick={this.sendTransfer}>Aceptar</button>
                        <button type="button" className="transfer-btn" onClick={this.props.click}>Cerrar</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Transfer;