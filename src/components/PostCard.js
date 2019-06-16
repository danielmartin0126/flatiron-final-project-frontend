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


   


    render(){

       return(
          <Link to={`/posts/${this.props.post.id}`}>
            <div className="ui container postcard">
               <h3>{this.props.post.title}</h3>
               {/* {console.log("ayy", this.props.users)} */}
               <h4>{this.getPostAuthor()}</h4>
            </div>
          </Link>
       )
    }




}
export default withRouter(PostCard);
