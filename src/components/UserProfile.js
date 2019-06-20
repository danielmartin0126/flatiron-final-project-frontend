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
                    <h1 id="userInfo">{this.state.userProfile.name}</h1>
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
                <div>
                    <div className="followedGameCard ui grid">
                        {followedGames.length ? followedGames.map(game=> <ProfileGameCard game={game} followers={this.props.followers} games={this.props.games} currentUser={this.props.currentUser}/>):<div id="notFollowing" className=""><h5>Not yet following any games</h5></div>}
                    </div>
                    <div className="ui divider" id="gamedivider"></div>
                </div>

            )

        }

    }

    getGameNameFromPostID = (poster_id) => {
        // console.log("checking post", poster_id)
        let game = this.props.games.find(game => game.id === poster_id)
        // console.log("checking game", game)

        return game.name
    }

    renderUserPosts = () => {
        if (this.props.posts.length) {
            let posts= this.props.posts.filter(post => post.poster_id === this.state.userProfile.id)
            // console.log("poots", posts)
            return (
                <div>
                    { posts.length && this.props.games.length ? posts.map(post => <div className="post postcard lined posts"><a href={'/games/' + post.game_id} className="blackText">{this.getGameNameFromPostID(post.game_id)}</a><PostCard users={this.props.users} post={post} comments={this.props.comments}/></div>): <div id="notFollowing"><h5>No available posts</h5></div>}
                </div>
            )
        }
    }

    renderFriendButton = () => {
        if (this.props.friends.length) {
            let checkFriend = this.props.friends.find(friend => friend.user_id === this.props.currentUser.id && friend.friend_id === this.state.userProfile.id)
            if (checkFriend) {
                return(<button className="mini ui icon button blueFollowButton yes okay cmon" id="friendReqButton" onClick={()=> console.log("unfriend")}>
                    <i className="heart icon"></i>
                </button>)
    
            } else {
                return (<button className="mini ui icon button blueFollowButton yes okay cmon" id="friendReqButton" onClick={this.handleFriendClick}>
                    <i className="plus icon"></i>
                </button>)
            }
        }
    }

    handleFriendClick = () => {
        let friend = this.props.users.find(user=> user.id === this.state.userProfile.id)
        console.log("friend req",friend)
        let user = this.props.currentUser
        // this.props.handleGameFollower(followedGame)
        fetch(`http://localhost:3000/api/v1/friends`,
        {
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({user_id: user.id, friend_id: this.state.userProfile.id})
        })
        .then(r => r.json())
        .then(data =>  this.props.handleFriendReq(data))
    }

    getFriendURL = (friend) => {
        return `/profile/${friend.friend_id}`
    }

    renderFriends = () => {
        if (this.state.userProfile && this.props.friends.length) {
            console.log("this persons friends",this.props.friends.filter(friend => friend.user_id === this.state.userProfile.id))
            let friends = this.props.friends.filter(friend => friend.user_id === this.state.userProfile.id)
            if (this.props.users.length) {
                return (
                    <div className="friends">
                        <h4>Friends</h4>
                       {friends.map(friend => <a href={`/profile/${friend.friend_id}`}>{this.props.users.find(user => user.id === friend.friend_id).name}</a>)} 
                    </div>
                )
            }

        }
    }


    




    render() {
       return(
               <div className="ui flex">
                   {/* {console.log("user prof state",this.state)} */}
                   <div className="userInfo">
                    {this.renderUserInfo()}
                    {this.renderFriendButton()}
                   </div>
                    {/* {console.log("i am game",this.props.match.params["id"])}
                    {console.log("I AM THE SENATE", this.props)} */}
                    <div className="followedGames marginTop">
                        <h2>Followed Games</h2>
                        {/* {console.log("up", this.props.followers)} */}
                        {this.renderFollowedGames()}
                        <h3>{this.state.userProfile.name} posts</h3>
                        {this.renderUserPosts()}
                        {this.renderFriends()}

                    </div>
               </div> 
       )
    }




}
export default withRouter(UserProfile);
