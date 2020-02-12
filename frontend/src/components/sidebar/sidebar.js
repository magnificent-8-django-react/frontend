import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import Avatar from 'react-avatar';


export default props => {

    return (
    <div>

        <Menu>
            <Avatar className="avatar-custom" size="75" round={true} src="https://i7.pngguru.com/preview/1/964/992/user-profile-computer-icons-login-clip-art-profile-picture-icon.jpg" text="Dashboard"/>

            <a className="menu-item" href="/favorites">
                Favorites
            </a>

            <a className="menu-item" href="/search">
                Search
            </a>

            <a className="menu-item" href="/map-view">
                Map View
            </a>

            <a className="menu-item" href="/add-food-truck">
                Add Food Truck
            </a>

            <a className="menu-item" href="/help">
                Help
            </a>

        </Menu>
    </div>
    );
};