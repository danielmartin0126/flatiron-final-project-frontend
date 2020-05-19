import React from 'react';
import { Header, Icon } from 'semantic-ui-react'
import GameCard from './GameCard';
import {Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import Login from './Login'
import PostCard from './PostCard';




class Home extends React.Component {

    state ={
        followers: [],
    }



    listPosts = () => {
        if (this.props.games.length && this.props.currentUser && this.props.posts.length && this.props.followers.length) {
            let myFollows = this.props.followers.filter(follower => follower.user_id === this.props.currentUser.id)
            let myGames = []
            let myFeed = []
            myFollows.map(follow=> myGames.push(follow.game_id))
            console.log("followimng", myGames)
            console.log(this.props.followers)
            myGames.map(game => {
                let currentGame= game
                console.log(currentGame)
                myFeed.push(this.props.posts.filter(post => post.game_id == currentGame))
            })
            return myFeed.flat().map(post => <div className="post postcard lined posts"><PostCard post={post} users={this.props.users} comments={this.props.comments}/></div>)
    }}





    render(){

       return(
           <div className="home">
               <div className="header">
                <h1>Steam Condenser</h1>
               </div>
               <div className="mainContent">
                    <h3>Your post feed</h3>
                    <div className="postFeed">
                        {this.listPosts()}
                    </div>
               </div>
            </div>
       )
    }




}
export default withRouter(Home);
