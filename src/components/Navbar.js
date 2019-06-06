import React from 'react';
import { Header, Icon } from 'semantic-ui-react'


class Navbar extends React.Component {

    render(){
       return(
        <div>
            <div class="ui pointing menu">
                <a class="item">
                Home
                </a>
                <a class="item">
                Browse Games
                </a>
                <a class="item active">
                My Profile
                </a>
                <div class="right menu">
                <div class="item">
                    <div class="ui transparent icon input">
                    <input type="text" placeholder="Search..."></input>
                    <i class="search link icon"></i>
                    </div>
                </div>
                </div>
            </div>
            
      </div>


       )
    }




}
export default Navbar;
