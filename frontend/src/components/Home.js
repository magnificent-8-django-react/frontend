import React, { Component } from 'react'
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import '../styles/home.css';
import userIcon from '../img/person.png';
import truckIcon from '../img/pointer.png';


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
        mylat: 0,
        mylng: 0,
        zoom: 10,
        location_permission: true,
        labels: [],
        locations: [
            {
                id: 1,
                truck: 'Hive Food Truck',
                // lat: 0,
                // lng: 0
                lat: 36.7342,
                lng: -119.7789
            },
            {
                id: 2,
                truck: '41 Food Truck',
                lat: 36.7356,
                lng: -119.7782
            },
        ]
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({ mylat: position.coords.latitude});
            this.setState({ mylng: position.coords.longitude});
            this.setState({location_permission: true});
            this.setState({zoom: 16});
        }, () => {
            this.setState({location_permission: false});
            console.log('Do something else when user location is not provided');
        });
    };

    refresh = e => {
        e.preventDefault();
        window.location.reload();
    };

    alertLocation= e => {
        e.preventDefault();
        alert('Allow your device location to render your location');
    };

    renderTrucks(truck) {
        if(truck.lat === 0 && truck.lng === 0) {
            return "";
        }
        else {
            return(
                <Marker 
                    key={truck.id}
                    position={[truck.lat, truck.lng]}
                    icon={foodIcon}
                > 
                    <Tooltip className="markerLabel" permanent={true}>{truck.truck}</Tooltip>
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
                        // <Marker 
                        //     key={location.id}
                        //     position={[location.lat, location.lng]}
                        //     icon={foodIcon}
                        // > 
                        //     <Tooltip className="markerLabel" permanent={true}>{location.truck}</Tooltip>
                        // </Marker>
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
