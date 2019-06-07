import React from 'react';
import { Header, Icon } from 'semantic-ui-react'
import {Route, withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom';



class Navbar extends React.Component {

    render(){
       return(
        <div>
            <div className="ui pointing menu">
                <Link to="/">
                    <a className="item">
                    Home
                    </a>
                </Link>
                <Link to="/games">
                    <a className="item">
                    Browse Games
                    </a>
                </Link>
                <Link to="/profile">
                    <a className="item">
                    My Profile
                    </a>
                </Link>
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
export default withRouter(Navbar);
