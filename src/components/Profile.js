import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import {Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import PostCard from './PostCard';
import GameCard from './GameCard';
import ProfileGameCard from './ProfileGameCard'



class Profile extends React.Component {
    
    state = {
        followedGames: []
    }

    componentDidMount() {
        let currentFollows = this.props.followers.filter(follower => this.props.currentUser.id == follower.user_id)
        let games = this.props.games
        currentFollows.map(follow=> games.find(game=> game.id === follow.game_id))
        this.setState({
            followedGames: currentFollows
        },console.log("pls", this.state))
    }

    renderUserInfo = () => {
        if (this.props.currentUser) {
            return(
                <div className="userInfo">
                    <h1>{this.props.currentUser.username}</h1>
                </div>
            )
        }
    }


    renderFollowedGames = () => {
        if (this.props.currentUser) {
            let currentFollows = this.props.followers.filter(follower => this.props.currentUser.id == follower.user_id)
            let games = this.props.games
            let followedGames = []
            console.log("before", currentFollows)
            currentFollows.map(follow=> followedGames.push(games.find(game=> game.id === follow.game_id)))
            let followed = this.props.followers.filter(follower => this.props.currentUser.id == follower.user_id)
            console.log("following", followedGames)
    
            return(
                <div className="followedGameCard ui grid">
                    {followedGames.length ? followedGames.map(game=> <ProfileGameCard game={game} followers={this.props.followers} games={this.props.games} currentUser={this.props.currentUser}/>): console.log("not following shit")}
                </div>
            )

        }

    }


    




    render() {
       return(
               <div className="ui flex">
                    {this.renderUserInfo()}
                    {console.log("i am game",this.props.match.params["id"])}
                    {console.log("I AM THE SENATE", this.props)}
                    <div className="followedGames marginTop">
                        <h3>Your followed games</h3>
                        {this.renderFollowedGames()}
                        <h3>Your Posts</h3>

                    </div>
               </div> 
       )
    }




}
export default withRouter(Profile);
