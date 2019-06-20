import React from 'react';
import { Header, Icon } from 'semantic-ui-react'
import GameCard from './GameCard';
import {Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';



class Comment extends React.Component {


    getPostAuthor = () => {
        console.log("IN COMMENT post",this.props.post)
    //    console.log("oot",this.props.users.find( user => user.id == this.props.comment.user_id))
       let user = this.props.users.find( user => user.id == this.props.comment.user_id)
       if (user) {
           return user.name
       }
    }

    getPostAuthorID = () => {
        //    console.log("oot",this.props.users.find( user => user.id == this.state.currentPost.poster_id))
           let user = this.props.users.find( user => user.id == this.props.comment.user_id)
           if (user) {
               return `/profile/${user.id}`
           }
        }


    render(){
        // console.log("comments", this.props)

       return(
            <div className="ui container comment">
               <h3>{this.props.comment.content}</h3>
               {this.props.comment ? <a id="commentAuthor" href={this.getPostAuthorID()}> {this.getPostAuthor()} </a>: "Lorem Ipsum"}

            </div>
       )
    }




}
export default withRouter(Comment);
