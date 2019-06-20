import React from 'react';
import { Header, Icon } from 'semantic-ui-react'
import GameCard from './GameCard';
import {Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import Comment  from './Comment';
import CommentModal from './CommentModal';



class Post extends React.Component {

    state= {
        currentPost: null
    }

    componentDidMount(){
        fetch(`http://localhost:3000/api/v1/posts/${this.props.match.params["id"]}`)
        .then(r => r.json())
        .then(data => {
          this.setState({
              currentPost: data
          })
        })
    }

    getPostAuthor = () => {
    //    console.log("oot",this.props.users.find( user => user.id == this.state.currentPost.poster_id))
       let user = this.props.users.find( user => user.id == this.state.currentPost.poster_id)
       if (user) {
           return user.name
       }
    }

    getPostAuthorID = () => {
        //    console.log("oot",this.props.users.find( user => user.id == this.state.currentPost.poster_id))
           let user = this.props.users.find( user => user.id == this.state.currentPost.poster_id)
           if (user) {
               return `/profile/${user.id}`
           }
        }

    renderComments = () => {
        if (this.state.currentPost) {
            let comments = this.props.comments.filter(comment => comment.post_id === this.state.currentPost.id)
            console.log("post2", this.state.currentPost)
            return comments.map(comment => <Comment comment={comment} users={this.props.users}/>)
        }
    }

    getGameName = () => {
        if (this.props.games.length && this.state.currentPost) {
            let game = this.props.games.filter(game => game.id === this.state.currentPost.game_id)[0]
            console.log("get game name", game)
            return <a id="gameNameOnPost"className="blackText" href={"/games/" + game.id}>{game.name}</a>
        }
    }



   


    render(){

       return(
           <div className="postHeader">
               {this.getGameName()}
               <h1 id="postTitle">{this.state.currentPost ? this.state.currentPost.title : "Lorem Ipsum"}</h1>
               <h5 id="postBody">{this.state.currentPost ? this.state.currentPost.content : "Lorem Ipsum"}</h5>
               {this.state.currentPost ? <a id="postAuthor" href={this.getPostAuthorID()}> {this.getPostAuthor()} </a>: "Lorem Ipsum"}
               {console.log("post",this.state)}
               <div className="ui divider" id="gamedivider"></div>

               <div id="addComments" className="comments postBox">
                   <h4 id="addAComment">Add a comment</h4>
               {this.state.currentPost ? <CommentModal currentUser={this.props.currentUser} currentGame={this.props.currentGame} currentPost={this.state.currentPost} handleCommentAdded={this.props.handleCommentAdded}/>: null}
               </div>
                <div className="ui container grid">
                  {this.renderComments()}
                </div>
            </div>
       )
    }




}
export default withRouter(Post);
