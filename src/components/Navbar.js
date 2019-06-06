import React from 'react';
import { Header, Icon } from 'semantic-ui-react'


class Navbar extends React.Component {

    render(){
       return(
        <div>
            <div className="ui pointing menu">
                <a className="item">
                Home
                </a>
                <a className="item">
                Browse Games
                </a>
                <a className="item active">
                My Profile
                </a>
                <div className="right menu">
                <div className="item">
                    <div className="ui transparent icon input">
                    <input type="text" placeholder="Search..."></input>
                    <i className="search link icon"></i>
                    </div>
                </div>
                </div>
            </div>
            
      </div>


       )
    }




}
export default Navbar;
