import React from 'react';
import { Header, Icon } from 'semantic-ui-react'
import {Route, withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom';



class Navbar extends React.Component {

    loggedIn = () => {
        if (this.props.currentUser) {
            return (<Link to="/login">
                <a className="item" onClick={this.props.handleLogOut}>
                    Log out
                </a>
                </Link>

                )
        }
        else {
            return(<Link to="/login">
                <a className="item">
                    Log in
                </a>
                </Link>)
        }
    }

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
                {this.loggedIn()}
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
