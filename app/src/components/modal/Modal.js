import React, {PureComponent} from 'react';
import './Modal.css';

class Modal extends PureComponent {


    render(){
        return(
            <div id="modal-pichichis" className="modal-box" style={this.props.show}>
                <div className="modal-content">
                    <ul className="pichichi-list">
                        {
                            this.props.pichichis.map(function (pichichi, i) {                               
                                
                                return (
                                    <li className="pichichi-item" key={pichichi.playerId}>
                                        <span className="pichichi-name">{pichichi.name}</span> 
                                        <span className="pichichi-golas">{pichichi.goals}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <button type="button" className="modal-btn" onClick={this.props.click}>Cerrar</button>
                    <button type="button" className="modal-btn" onClick={this.props.sort}>sort</button>
                </div>
            </div>
        );
    }
}
export default Modal;