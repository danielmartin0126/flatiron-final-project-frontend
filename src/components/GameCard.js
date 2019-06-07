import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import {Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';


class GamesCard extends React.Component {

    state={
        currentGame: null
    }

    totalFollowers = () => {
        let count = this.props.followers.filter(follower => follower.game_id == this.props.game.id)
        console.log("yahoo",count)
        return count.length
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

    render() {
       return(
          
               <div className="game">
               <div className="ui card">
                <div className="image">
                    <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${this.props.game.app_id}/header.jpg`} />
                </div>
                <div className="content">
                    <a className="header">{this.props.game.name}</a>
                    <div className="meta">
                    </div>
                    <div className="description">
                        {this.props.game.desc}
                    </div>
                </div>
                <div className="buttonBar">
                    <div>
                        <Link to={`/games/${this.props.game.id}`}>
                            <button className="ui button inverted green ">
                                View Game
                            </button>
                        </Link>
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
                        {this.totalFollowers()} Followers
                    </a>
                    
                </div>
                    </div>
               </div> 
       )
    }




}
export default withRouter(GamesCard);
