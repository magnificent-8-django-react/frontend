import React, { Component } from 'react'
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import '../styles/home.css';
import userIcon from '../img/person.png';
import truckIcon from '../img/pointer.png';
import axios from 'axios';


let myIcon = L.icon({
    iconUrl: userIcon,
    iconSize: [30,41],
    iconAnchor: [12.5, 41],
    tooltipAnchor: [2, -25]   
});

let foodIcon = L.icon({
    iconUrl: truckIcon,
    iconSize: [30,41],
    iconAnchor: [12.5, 41],
    tooltipAnchor: [7, -25] 
})

export default class Home extends Component {
    state = {
        // mylat: 36.7378,
        // mylng: -119.7871,
        mylat: 0,
        mylng: 0,
        zoom: 10,
        location_permission: true,
        labels: [],
        locations: []
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({ mylat: position.coords.latitude});
            this.setState({ mylng: position.coords.longitude});
            this.setState({location_permission: true});
            this.setState({zoom: 16});
            console.log(this.state.mylat, this.state.mylng);

            // If truck user, <Test if owners in restaurantProfiles have the same id as user>
              // True --> <Do an axios.put to update the corresponding truck location with mylat/mylng states above>
              // False --> <Continue, no need to update user location because they do not have lat/long fields>

        }, () => {
            this.setState({location_permission: false});
            console.log('Do something else when user location is not provided');
        });
        axios
          .get('http://127.0.0.1:8000/restaurant/profiles/')
          .then( res => {
              this.setState({ locations: res.data.results });
          })
          .catch( err => {
              console.log(err)
          })
    };

    componentWillUnmount() {
        console.log('Default the user locaton');
    }

    refresh = e => {
        e.preventDefault();
        window.location.reload();
    };

    alertLocation= e => {
        e.preventDefault();
        alert('Allow your device location to render your location');
    };

    renderTrucks(truck) {
        if(truck.lat === 0 && truck.long === 0) {
            return "";
        }
        else {
            return(
                <Marker 
                    key={truck.id}
                    position={[truck.lat, truck.long]}
                    icon={foodIcon}
                > 
                    <Tooltip className="markerLabel" permanent={true}>{truck.restaurant}</Tooltip>
                </Marker>
            )
        }
    }

    render() {
        let lat = this.state.mylat;
        let lng = this.state.mylng;
        return (
            <div>
                {this.state.location_permission ?
                        <span className="disableLocation" onClick={this.refresh}>Update Location</span>
                        : 
                        <span className="disableLocation" onClick={this.alertLocation}>Location Disabled</span>
                    }
                <Map className="map" center={[lat, lng]} zoom={this.state.zoom} zoomControl={true}>
                    <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.state.locations.map( location => (
                        this.renderTrucks(location)
                    ))}
                    {this.state.location_permission ?
                        <Marker
                            key={3} 
                            position={[lat, lng]}
                            icon={myIcon}
                        > 
                            <Tooltip className="markerLabel" permanent={true}>Me</Tooltip>
                        </Marker>
                        : 
                        ''
                    }
                </Map>
            </div>
        )
        }
}
