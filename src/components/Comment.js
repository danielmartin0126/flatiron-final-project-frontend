import React from 'react';
import { Header, Icon } from 'semantic-ui-react'
import GameCard from './GameCard';
import {Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';



class Comment extends React.Component {


    getPostAuthor = () => {
        console.log("post",this.props.post)
       console.log("oot",this.props.users.find( user => user.id == this.props.comment.user_id))
       let user = this.props.users.find( user => user.id == this.props.comment.user_id)
       if (user) {
           return user.name
       }
    }


   


    render(){
        console.log("comments", this.props)

       return(
            <div className="ui container comment showMeComments">
               <h3>{this.props.comment.content}</h3>
               <h4>{this.getPostAuthor()}</h4>
            </div>
       )
    }




}
export default withRouter(Comment);
