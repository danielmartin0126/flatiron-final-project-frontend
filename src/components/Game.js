import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import {Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';


class Game extends React.Component {
    state={
        currentGame: null
    }

    setCurrentGame = () => {
        fetch(`http://localhost:3000/api/v1/games/${this.props.match.params["id"]}`)
        .then(r => r.json())
        .then(data => {
          this.setState({
              currentGame: data
          })
        })

    }
    componentDidMount(){
        
        fetch(`http://localhost:3000/api/v1/games/${this.props.match.params["id"]}`)
        .then(r => r.json())
        .then(data => {
          this.setState({
              currentGame: data
          })
        })
    }

    totalFollowers = () => {
        let count = this.props.followers.filter(follower => follower.game_id == this.state.currentGame.id)
        console.log("yahoo",count)
        return count.length
    }

    renderPage = () => {
        return (
            <div className="game ui grid flex center">
                <div className="image gamePageHeader">
                    <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${this.state.currentGame.app_id}/header.jpg`}/>
                </div>
                <div className="content center">
                    <h1 className="header">{this.state.currentGame.name}</h1>
                    <div className="description">
                        {this.state.currentGame.desc}
                    </div>
                </div>
                <div className="extra content flex followers">
                    <p>
                        <i className="user icon"></i>
                        {this.totalFollowers()} Followers
                    
                    </p>
                    <div>
                        <button className="mini ui icon button green followButton">
                            <i className="plus icon"></i>
                        </button>
                    </div>
                    
                </div>
               </div> 
        )
    }

    waitRender = () => {
        return(
        <div className="game">
                {console.log("i am game",this.props.match.params["id"])}
                {console.log("I AM THE SENATE", this.state)}
               <div className="ui card">
                <div className="image">
                    <img src={`https://i.imgur.com/ajXW2td.jpg`}/>
                </div>
                <div className="content">
                    <a className="header">Game Name</a>
                    <div className="meta">
                    </div>
                    <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    </div>
                </div>
                <div className="buttonBar">
                    <div>
                        <button className="ui button inverted green ">
                            View Game
                        </button>
                    </div>
                    <div>
                        <button className="mini ui icon button green followButton">
                            <i className="plus icon"></i>
                        </button>
                    </div>

                </div>
                <div className="extra content">
                    <a>
                        <i className="user icon"></i>
                    </a>
                    
                </div>
                    </div>
        </div> )
    }


    render() {
       return(
               <div className="ui flex">
                    {this.state.currentGame ? this.renderPage() : this.waitRender()}
                    {console.log("i am game",this.props.match.params["id"])}
                    {console.log("I AM THE SENATE", this.state)}
               
               </div> 
       )
    }




}
export default withRouter(Game);
