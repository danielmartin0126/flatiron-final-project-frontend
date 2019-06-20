import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import {Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import PostCard from './PostCard';
import PostModal from './PostModal';


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
              isOpen: false,
              currentGame: data
          })
        })
        console.log("pls god", this.props)
    }

    totalFollowers = () => {
        let count = this.props.followers.filter(follower => follower.game_id == this.state.currentGame.id)
        console.log("yahoo",count)
        console.log("followers",this.props.followers)
        return count.length
    }

    listPosts = () => {
        let postsList = this.props.posts.filter(post => post.game_id == this.state.currentGame.id)
        return (
            <div>
                {postsList.map(post => <div className="post postcard lined posts"><PostCard post={post} users={this.props.users} comments={this.props.comments}/></div>)}
            </div>
        )

    }
    
    renderFollowButton = () => {
        if (this.props.followers.length) {
            let checkFollow = this.props.followers.filter(follower => follower.game_id == this.state.currentGame.id)
            // console.log("check follow", checkFollow)
            if (checkFollow.length) {
                return(<button className="mini ui icon button blueFollowerButton yes okay cmon followButton" onClick={()=>console.log("unfollow")}>
                    <i className="heart icon"></i>
                </button>)
            } else {
                return (<button className="mini ui icon button blueFollowerButton yes okay cmon followButton" onClick={()=>this.handleFollowClick(this.state.currentGame.id)}>
                    <i className="plus icon"></i>
                </button>)
            }
        }
    }

    handleFollowClick = (e) => {
        console.log("follow", e)
        let followedGame = this.props.games.find(game=> game.id === e)
        let user = this.props.currentUser
        console.log(followedGame,"yayassd")
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

    

    renderPage = () => {
        console.log("PROPS", this.props)
        return (
            <div>
            <div className="game ui grid flex center">
                <div>
                    <div className="image gamePageHeader">
                        <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${this.state.currentGame.app_id}/header.jpg`}/>
                    </div>
                    <div className="content center">
                        <h1 className="header">{this.state.currentGame.name}</h1>
                        <div className="description">
                            {this.state.currentGame.desc}
                        </div>
                    </div>
                </div>
                <div id="gameDescription"className="extra content flex followers">
                    <p>
                        <i className="user icon"></i>
                        {this.props.posts ? this.totalFollowers(): null} Followers
                    
                    </p>
                    <div>
                        {this.renderFollowButton()}
                    </div>
                    
                </div>
                
               </div> 
               <div className="ui divider" id="gamedivider"></div>
               <div>
                    <h2>Posts</h2>
                    <div className="postBox">
                        <h4>Create new post</h4>
                        <PostModal currentUser={this.props.currentUser} currentGame={this.state.currentGame} posts={this.props.posts}/>
                    </div>
                    <div className="ui container grid" id="startPosts">
                        {this.listPosts()}
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
                        <button className="ui button inverted blueFollowerButton yes okay cmon followButton ">
                            View Game
                        </button>
                    </div>
                    <div>
                        <button className="mini ui icon button blueFollowerButton yes okay cmon followButton">
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
        console.log("danny",this.props);
        
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
