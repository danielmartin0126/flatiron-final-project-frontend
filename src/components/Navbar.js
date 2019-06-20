import React from 'react';
import { Header, Icon } from 'semantic-ui-react'
import {Route, withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom';



class Navbar extends React.Component {

    state = {
        searchTerm: ""
    }

    loggedIn = () => {
        if (this.props.currentUser) {
            return (<Link to="/login">
                <a className="item lavenderGray fontColor navbar" onClick={this.props.handleLogOut}>
                    Log out
                </a>
                </Link>

                )
        }
        else {
            return(<Link to="/login">
                <a className="item lavenderGray fontColor navbar">
                    Log in
                </a>
                </Link>)
        }
    }

    handleSearch = (e) => {
        e.preventDefault()
        this.props.handleGameSearch(this.state.searchTerm)
    }

    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            searchTerm: e.target.value
        })
    }

    

    render(){
       return(
        <div>
            <div className="ui pointing menu navbar border selectBorder">
                <Link to="/">
                    <a className="item lavenderGray fontColor navbar">
                        Home
                    </a>
                </Link>
                <Link to="/games">
                    <a className="item lavenderGray fontColor navbar">
                    Browse Games
                    </a>
                </Link>
                <Link to="/profile">
                    <a className="item lavenderGray fontColor navbar">
                    My Profile
                    </a>
                </Link>
                {this.loggedIn()}
                <div className="right menu">
                <div className="item">
                    <div className="ui transparent icon input">
                        <form onSubmit={this.handleSearch}>
                            <input type="text" placeholder="Search games" name="search" id="searchBar" onChange={this.handleChange}></input>
                        </form>
                    </div>
                </div>
                </div>
            </div>
            
      </div>


       )
    }




}
export default withRouter(Navbar);
