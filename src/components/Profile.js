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
        if (this.props.currentUser) {
            let currentFollows = this.props.followers.filter(follower => this.props.currentUser.id == follower.user_id)
            let games = this.props.games
            currentFollows.map(follow=> games.find(game=> game.id === follow.game_id))
            this.setState({
                followedGames: currentFollows
            })
        }
    }

    renderUserInfo = () => {
        if (this.props.currentUser) {
            return(
                <div >
                    <h1 id="userInfo">{this.props.currentUser.username}</h1>
                </div>
            )
        }
    }

    getGameNameFromPostID = (poster_id) => {
        if (this.props.games.length) {
            let game = this.props.games.find(game => game.id === poster_id)
            return game.name
        }
    }

    renderUserPosts = () => {
        if (this.props.posts.length && this.props.currentUser) {
            let posts= this.props.posts.filter(post => post.poster_id === this.props.currentUser.id)
            // console.log("poots", posts)
            return (
                <div className="post">
                    {posts.map(post => <div className="postcard lined posts"><a href={'/games/' + post.game_id} className="blackText">{this.getGameNameFromPostID(post.game_id)}</a><PostCard users={this.props.users} post={post} comments={this.props.comments}/></div>)}
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

    renderFriends = () => {
        if (this.props.currentUser && this.props.friends.length) {
            // console.log("my friends",this.props.friends.filter(friend => friend.user_id === this.props.currentUser.id))
            let friends = this.props.friends.filter(friend => friend.user_id === this.props.currentUser.id)
            if (this.props.users.length) {
                return (
                    <div className="friends">
                        <h4>Friends</h4>
                       {friends.map(friend => <a class="friend blackText yes okay cmon" href={`/profile/${friend.friend_id}`}>{this.props.users.find(user => user.id === friend.friend_id).name}</a>)} 
                    </div>
                )
            }

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
                        {this.renderFriends()}

                    </div>
               </div> 
       )
    }




}
export default withRouter(Profile);
