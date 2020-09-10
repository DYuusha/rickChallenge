import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
// import CharacterLoader from '../Common/characterLoader/';
import Posts from '../Common/posts';
import Pagination from '../Common/pagination';
import axios from 'axios';
const initState={
    posts:[],
    loadingPost: true,
    currentPage: 1,
    postsPerPage: 10,
    currentPosts:'',
}

class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
         ...initState
        };
             
    } 
    getData = async () =>{
        try {
            const response = await axios.get('https://rickandmortyapi.com/api/character');
            await this.setState({ 
                posts: response.data.results,
                
             });
          } catch (error) {
            console.log(error);
          }
    }
componentDidMount = async () =>{
    await this.getData()
    await this.changePage();
    this.setState({
            loadingPost: false
        })
    }
 changePage =()=>{
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost- this.state.postsPerPage;
    let currentPost; 
    currentPost = this.state.posts.slice(indexOfFirstPost,indexOfLastPost);
    this.setState({
        currentPosts: currentPost,
    })
 }   
paginate =async(number)=>{
    await this.setState({
       currentPage: number
    })
    await this.changePage();
}
    render (){
        const {loadingPost,postsPerPage,posts,currentPosts} = this.state;
        return (
            <div>
                {loadingPost ?
                    <CircularProgress/>
                :
                <div className="row p-0 m-0">
                    <Posts data={currentPosts} loading={loadingPost}/>
                    <Pagination 
                    postsPerPage={postsPerPage} 
                    totalPosts={posts.length}
                    paginate={this.paginate}
                    />
                </div>
                }
                
            </div>
          );
    }
    
}

export default Home