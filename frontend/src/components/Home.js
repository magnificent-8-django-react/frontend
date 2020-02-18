import React, { Component } from 'react';
import { connect } from 'react-redux';
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

export class Home extends Component {
    state = {
        // mylat: 36.7378,
        // mylng: -119.7871,
        userid: "",
        mylat: 0,
        mylng: 0,
        myTruck: {},
        zoom: 10,
        location_permission: true,
        labels: [],
        locations: [],

        isUser: false
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
        axios
          .get('http://127.0.0.1:8000/restaurant/profiles/')
          .then( res => {
              this.setState({ locations: res.data.results });
              
              // If truck user, <Test if owners in restaurantProfiles have the same id as user>
            //   this.setState({ userid: this.props.auth.user.id });
              this.setState({ userid: 100 });
              // True --> <Do an axios.put to update the corresponding truck location with mylat/mylng states above>
              // False --> <Continue, no need to update user location because they do not have lat/long fields>   
              // GRABS OWNER ID AND MATCH WITH CURRENT USER TO SEE IF USER OWNS A TRUCK
              //  console.log(parseInt(this.state.locations[0].owner.substring(28).slice(0, -1))); --> OWNER ID
              for(let i=0; i<this.state.locations.length; i++) {
                if(this.state.userid === parseInt(this.state.locations[i].owner.substring(28).slice(0, -1))) {
                    console.log('ran');
                    this.setState({ myTruck: {
                        "restaurant": this.state.locations[i].restaurant,
                        "username": this.state.locations[i].username,
                        "email": this.state.locations[i].email,
                        "phone": this.state.locations[i].phone,
                        "lat": this.state.mylat,
                        "long": this.state.mylng
                    }})
                    const config = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    axios
                      .put(`http://127.0.0.1:8000/restaurant/profiles/${this.state.locations[i].id}/`, this.state.myTruck, config)
                      .then(res => {
                        console.log('successful update');
                        axios
                          .get('http://127.0.0.1:8000/restaurant/profiles/')
                          .then( res => {
                              this.setState({ locations: res.data.results });
                              console.log(this.state.locations);
                          })
                          .catch( err => {
                              console.log(err);
                          })  
                      })
                      .catch(err => {
                        console.log('unsuccessful update');
                      });
                    break;
                }
                this.setState({ isUser: true });
              };
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
                    {this.state.location_permission && this.state.isUser ?
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default connect(mapStateToProps)(Home);