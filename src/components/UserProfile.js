import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import {Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import PostCard from './PostCard';
import GameCard from './GameCard';
import ProfileGameCard from './ProfileGameCard'



class UserProfile extends React.Component {
    
    state = {
        userProfile: []
    }

    componentDidMount() {
        let currentFollows = this.props.followers.filter(follower => this.state.userProfile.id == follower.user_id)
        let games = this.props.games
        currentFollows.map(follow=> games.find(game=> game.id === follow.game_id))
        this.setState({
            followedGames: currentFollows
        })
        fetch(`http://localhost:3000/api/v1/users/${this.props.match.params["id"]}`)
        .then(r => r.json())
        .then(data => {
          this.setState({
              userProfile: data
          })
        })
    }
  


    renderUserInfo = () => {
        if (this.state.userProfile) {
            return(
                <div className="userInfo">
                    <h1>{this.state.userProfile.name}</h1>
                </div>
            )
        }
    }


    renderFollowedGames = () => {
        if (this.state.userProfile) {
            let currentFollows = this.props.followers.filter(follower => this.state.userProfile.id == follower.user_id)
            let games = this.props.games
            let followedGames = []
            // console.log("before", currentFollows)
            currentFollows.map(follow=> followedGames.push(games.find(game=> game.id === follow.game_id)))
            let followed = this.props.followers.filter(follower => this.state.userProfile.id == follower.user_id)
            // console.log("following", followedGames)
    
            return(
                <div className="followedGameCard ui grid">
                    {followedGames.map(game=> <ProfileGameCard game={game} followers={this.props.followers} games={this.props.games} currentUser={this.props.currentUser}/>)}
                </div>
            )

        }

    }


    




    render() {
       return(
               <div className="ui flex">
                   {/* {console.log("user prof state",this.state)} */}
                    {this.renderUserInfo()}
                    {/* {console.log("i am game",this.props.match.params["id"])}
                    {console.log("I AM THE SENATE", this.props)} */}
                    <div className="followedGames marginTop">
                        <h2>Followed Games</h2>
                        {this.renderFollowedGames()}

                    </div>
               </div> 
       )
    }




}
export default withRouter(UserProfile);
