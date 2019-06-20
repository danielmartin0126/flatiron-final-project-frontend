import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import {Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { Button } from 'semantic-ui-react';


class GamesCard extends React.Component {

    state={
        currentGame: null
    }

    totalFollowers = () => {
        let count = this.props.followers.filter(follower => follower.game_id == this.props.game.id)
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

    handleFollowClick = (e) => {
        console.log("follow", e)
        
        let followedGame = this.props.games.find(game=> game.id === e)
        let user = this.props.currentUser
        this.props.handleGameFollower(followedGame)
        fetch(`http://localhost:3000/api/v1/followed_games`,
        {
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({user_id: user.id, game_id: followedGame.id, app_id: followedGame.app_id})
        })
        .then(r => r.json())
        .then(data => console.log("posted", data))
    }

    handleUnfollowClick = (e) => {
        // console.log("unfollow", e)
        // if (this.props.follower.length && this.props.games.length) {
        //     let follower = this.props.followers.find(follower => follower.game_id == this.props.game.id && this.props.currentUser.id == follower.user_id)
        //     let followedGame = this.props.games.find(game=> game.id === e)
        //     console.log("unfollow obj", follower)
        //     let user = this.props.currentUser
        //         fetch(`http://localhost:3000/api/v1/followed_games/${follower.id}`,
        //         {
        //             method: "DELETE",
        //         })
        // }
    }
    
    renderFollowButton = () => {
        if (this.props.game) {
            let checkFollow = this.props.followers.filter(follower => follower.user_id === this.props.currentUser.id && follower.game_id === this.props.game.id)
            console.log("check follow", checkFollow)
            if (checkFollow.length) {
                return(<button className="mini ui icon button blueFollowerButton yes okay cmon followButton" onClick={this.handleUnfollowClick}>
                    <i className="heart icon"></i>
                </button>)
    
            } else {
                return (<button className="mini ui icon button blueFollowerButton yes okay cmon followButton" onClick={()=>this.handleFollowClick(this.props.game.id)}>
                    <i className="plus icon"></i>
                </button>)
            }

        }
    }

    render() {
       return(
          
               <div className="game">
               <div className="ui card gameCard">
                <div className="image">
                    <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${this.props.game.app_id}/header.jpg`} />
                </div>
                <div className="content">
                    <a className="header">{this.props.game.name}</a>
                    <div className="meta">
                    </div>
                    <div className="">
                        {this.props.game.desc}
                    </div>
                </div>
                <div className="buttonBar">
                    <div>
                        <Link to={`/games/${this.props.game.id}`}>
                            <button className="ui button inverted yes blueButton ok cmon">
                                View Game
                            </button>
                        </Link>
                    </div>
                    <div>
                        {this.renderFollowButton()}
                    </div>

                </div>
                <div className="extra content">
                    <a className="outer space yes ok cmon">
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
