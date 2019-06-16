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



   


    render(){

       return(
           <div className="postHeader showMe">
               <h1>{this.state.currentPost ? this.state.currentPost.title : "Lorem Ipsum"}</h1>
               <h5>{this.state.currentPost ? this.state.currentPost.content : "Lorem Ipsum"}</h5>
               {this.state.currentPost ? <a href={this.getPostAuthorID()}> {this.getPostAuthor()} </a>: "Lorem Ipsum"}
               {console.log("post",this.state)}
               <div className="comments">
                   <h4>Add a comment</h4>
               {this.state.currentPost ? <CommentModal currentUser={this.props.currentUser} currentGame={this.props.currentGame} currentPost={this.state.currentPost}/>: null}
 
                  {this.renderComments()}
               </div>
            </div>
       )
    }




}
export default withRouter(Post);
