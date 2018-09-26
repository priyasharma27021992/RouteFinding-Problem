import React, {Component} from 'react';
import {findDirections} from './services/directions/DirectionService';
import {DirectionView,DirectionsMap,RouteFinder} from './components';
import './Directions.scss';
import {Loader} from '../common/loader';
import {checkIfEmpty} from "../common/utils/HelperMethods";

class Directions extends Component{
    constructor(){
        super();

        this.state ={
            directionResponse: null,
            isLoading: false
        }
    }
    getDirections = async(from,to) => {
        if(checkIfEmpty(from)&& checkIfEmpty(to)) {
            this.setState(() => ({
                directionResponse: null
            }));
            return;
        }
        this.toggleLoader(true);
        const response = await findDirections(from,to).catch(e => {
            this.showErrorMessage('Internal Server Error');
        });

        this.toggleLoader(false);

        if(response && response.error){
            this.showErrorMessage(response.error);
            return;
        }

        if(response && response.path){
            this.setState(() => ({
                    directionResponse: response
                }));
        }
    }

    toggleLoader = isLoading => {
        this.setState(() => ({
                isLoading
            }));
    }

    showErrorMessage = message => {
        this.setState(() => ({
                directionResponse: null
            }));
        alert(message);
    }

    render(){
        const { directionResponse,isLoading } = this.state;
        return(
            <div className="directions-container">
                <div className="direction-form-container">
                    <Loader isLoading={isLoading}/>
                    <DirectionView getDirections={this.getDirections}/>
                    <div className="directions-route-info">
                        {directionResponse && (
                            <RouteFinder {...directionResponse}/>
                        )}
                    </div>
                </div>
                <div className="direction-map-container">
                <DirectionsMap directions={directionResponse}/>
                </div>
            </div>
        );
    }
}

export default Directions;