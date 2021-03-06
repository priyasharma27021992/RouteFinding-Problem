import React, {Component} from 'react';
import {maps} from '../../../common/services/index';
import './DirectionsView.scss';
class DirectionView extends Component{
    fromInput;
    fromInputAutoComplete;
    toInputAutoComplete;
    toInput;

    getRoute = () => {
        const from = this.fromInputAutoComplete.getPlace();
        const to = this.toInputAutoComplete.getPlace();
        this.props.getDirections(from,to);
    }

    reset = () => {
           this.fromInput.value= "";
           this.toInput.value="" ;
           this.props.getDirections("","");
    }

    renderAutoComplete = async() => {
        const maps= await this.props.maps();
        this.fromInputAutoComplete = new maps.places.Autocomplete(
            this.fromInput
        );
        this.toInputAutoComplete = new maps.places.Autocomplete(
            this.toInput
        );
    };

    componentDidMount(){
        this.renderAutoComplete();
    }

    render(){
        return(
            <div className="direction-form">
                <div className="form-group">
                <div className="form-input">
                    <label>Starting Location</label>
                    <input type="text" ref={el => (this.fromInput = el)} />
                </div>
                <div className="form-input">
                    <label>Drop-off point</label>
                    <input type="text" ref={el => (this.toInput = el)} />
                </div>
                </div>
                <div className="form-group">
                <div className="get-route-btn">
                    <button onClick={this.getRoute}>Get Route</button>
                </div>
                <div className="get-reset-btn">
                    <button onClick={this.reset}>Reset</button>
                </div>
                </div>
            </div>
        )
    }
}

DirectionView.defaultProps = {
    maps
};

export default DirectionView;