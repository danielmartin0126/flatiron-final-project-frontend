import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import {Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import PostCard from './PostCard';
import GameCard from './GameCard';
import ProfileGameCard from './ProfileGameCard'



class Profile extends React.Component {
    
    state = {
        followedGames: [],
        userPosts: [],
    }

    componentDidMount() {
        let currentFollows = this.props.followers.filter(follower => this.props.currentUser.id == follower.user_id)
        let games = this.props.games
        currentFollows.map(follow=> games.find(game=> game.id === follow.game_id))
        this.setState({
            followedGames: currentFollows
        })
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

    getGameNameFromPostID = (poster_id) => {
        let game = this.props.games.find(game => game.id === poster_id)
        return game.name
    }

    renderUserPosts = () => {
        if (this.props.posts.length) {
            let posts= this.props.posts.filter(post => post.poster_id === this.props.currentUser.id)
            console.log("poots", posts)
            return (
                <div>
                    {posts.map(post => <div className="post showMe"><h3>{this.getGameNameFromPostID(post.game_id)}</h3><PostCard users={this.props.users} post={post}/></div>)}
                </div>
            )
        }
    }

  


    renderFollowedGames = () => {
        if (this.props.currentUser) {
            let currentFollows = this.props.followers.filter(follower => this.props.currentUser.id == follower.user_id)
            let games = this.props.games
            let followedGames = []
            // console.log("before", currentFollows)
            currentFollows.map(follow=> followedGames.push(games.find(game=> game.id === follow.game_id)))
            let followed = this.props.followers.filter(follower => this.props.currentUser.id == follower.user_id)
            // console.log("following", followedGames)
    
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
                    {console.log("oog", this.props.posts)}

             
                    <div className="followedGames marginTop">
                        <h3>Your followed games</h3>
                        {this.renderFollowedGames()}
                        <h3>Your Posts</h3>
                        {this.renderUserPosts()}

                    </div>
               </div> 
       )
    }




}
export default withRouter(Profile);
