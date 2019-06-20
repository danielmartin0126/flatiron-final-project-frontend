import React from 'react';
import { Header, Icon } from 'semantic-ui-react'
import GameCard from './GameCard';
import {Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';



class PostCard extends React.Component {


    getPostAuthor = () => {
    //     console.log("post",this.props.post)
    //    console.log("oot",this.props.users.find( user => user.id == this.props.post.poster_id))
       let user = this.props.users.find( user => user.id == this.props.post.poster_id)
       if (user) {
           return user.name
       }
    }

    numberOfComments = () => {
        if (this.props.comments.length) {
            let commentCount = this.props.comments.filter(comment => comment.post_id === this.props.post.id)
            return `${commentCount.length} comments`
        }
    }


   


    render(){

       return(
          <Link to={`/posts/${this.props.post.id}`} className="blackText">
            <div className="ui container ">
               <h2 id="postCardTitle">{this.props.post.title}</h2>
               <h5 id="postCardCommentCount">{this.numberOfComments()}</h5>
               {/* {console.log("ayy", this.props.users)} */}
               <h3 id="postCardAuthor">{this.getPostAuthor()}</h3>
            </div>
          </Link>
       )
    }




}
export default withRouter(PostCard);
