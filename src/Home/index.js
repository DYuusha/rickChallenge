import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
// import CharacterLoader from '../Common/characterLoader/';
import Posts from '../Common/posts';
import Pagination from '../Common/pagination';
import firebase from 'firebase';
import swal from 'sweetalert';
import axios from 'axios';
const initState={
    posts:[],
    loadingPost: true,
    currentPage: 1,
    postsPerPage: 10,
    currentPosts:'',
    selectedArray:[],
    selected: 0,
    readyButton: false,
    searchValue: ''
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
saveTop =async()=> {
    try {
        console.log(this.state.selectedArray)
        await firebase.firestore().collection('top5').add({characters: this.state.selectedArray})
    }
    catch(error){
        console.log(error)
    }
}
selected =(index)=>{
    let plus = this.state.selected;
    let actualArray = this.state.selectedArray; //actual array
    let newElement = this.state.posts[index]; //clicked element
    
    if(!actualArray.includes(newElement) ){
        if(actualArray.length<5){
            actualArray.push(newElement)
            plus++;
            this.setState({
                selected: plus,
                selectedArray: actualArray
            })
        }
    }
    else{
        let position = actualArray.indexOf(newElement);
        console.log(position)
        actualArray.splice(position, 1);
        console.log(actualArray)
        if(plus>=1){
            plus--;
        }
        else{
            plus=0;
        }
        this.setState({
            selected: plus,
            selectedArray: actualArray
        })
    }
    if(actualArray.length>=5){
        this.setState({
            readyButton:true
        })
    }
    else{
        this.setState({
            readyButton:false
        })
    }
}
characterFilterOnChange =async(event) => {
    await this.setState({
        searchValue: event.target.value
    })
    let filtered = this.state.posts.filter(charac =>{
    return charac.name.toLowerCase().includes(this.state.searchValue.toLowerCase())
    });
    if(this.state.searchValue){
        await this.setState({
            currentPosts: filtered
        })
    }
    else{
        this.changePage();
    }
    
}
    render (){
        const {loadingPost,postsPerPage,posts,currentPosts,selected,readyButton,searchValue} = this.state;
        return (
            <div>
                {loadingPost ?
                    <CircularProgress/>
                :
                <div className="container"> 
                    <h1>Rick y Morty Challenge</h1>
                    <p>Selected: {selected}</p>
                    <input type ="text" value={searchValue} onChange={this.characterFilterOnChange} />
                    {readyButton ?
                    <button onClick={this.saveTop}>Create Top 5 List</button>
                    :
                    <button onClick={this.saveTop} disabled>Create Top 5 List</button>
                    }
                    <div className="row p-0 m-0">
                        <Posts 
                        data={currentPosts} 
                        loading={loadingPost}
                        selected ={this.selected}
                        />
                        <Pagination 
                        postsPerPage={postsPerPage} 
                        totalPosts={posts.length}
                        paginate={this.paginate}
                        
                        />
                        
                    </div>
                </div>
                }
                
            </div>
          );
    }
    
}

export default Home