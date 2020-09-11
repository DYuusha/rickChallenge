import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
// import CharacterLoader from '../Common/characterLoader/';
import Posts from '../Common/posts';
import { withRouter } from 'react-router-dom';
import Pagination from '../Common/pagination';
import Menu from '../Common/menu';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
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
    searchValue: '',
    checkedList:[]
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
             let checked=[];
             response.data.results.forEach(element =>checked.push(false))
           await this.setState({
                 checkedList: checked
             })
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
    this.saveCharacters();
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
paginate = async(number) => {
    await this.setState({
       currentPage: number
    })
    await this.changePage();
}
saveTop = async () => {
    try {
        let response = await firebase.firestore().collection('characters').doc('completeList')
        let actualCount=[];
        const actualList= this.state.selectedArray;
            let doc = await response.get()
            if(doc.exists){
                actualCount= await doc.data().characters;
                // console.log(actualList)
                await actualList.forEach((element, index) => {
                    let res = actualCount.findIndex(charac => charac.name===element.name)
                    actualCount[res].count+=1
                });
                 await firebase.firestore().collection('top5').add({characters: this.state.selectedArray})
                 await firebase.firestore().collection('characters').doc("completeList").set({characters: actualCount})
                 swal("Good job!", "You added your list!", "success");
                 this.props.history.push('/list')
            }
            else{
                console.log('no such document!')
            }
    }
    catch(error){
        console.log(error)
    }
}
saveCharacters=async()=>{
    let array=[]
    await this.state.posts.forEach(element =>
        array.push({name: element.name, count: 0})
    )
    await firebase.firestore().collection('characters').doc("completeList").set({characters: array})
}
selected =(index)=>{
    let plus = this.state.selected;
    let actualArray = this.state.selectedArray; //actual array
    let positionCheck =index;
    let newElement = this.state.posts[positionCheck]; //clicked element
    let checked = this.state.checkedList;
    console.log(checked)
    console.log(index)
    checked[positionCheck] = !checked[positionCheck]
    if(!actualArray.includes(newElement) ){
        if(actualArray.length<5){
            actualArray.push(newElement)
            plus++;
            this.setState({
                selected: plus,
                selectedArray: actualArray,
                checkedList: checked
            })
        }
    }
    else{
        let position = actualArray.indexOf(newElement);
        // console.log(position)
        actualArray.splice(position, 1);
        // console.log(actualArray)
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
        const {loadingPost,postsPerPage,posts,currentPosts,selected,readyButton,searchValue, checkedList, currentPage} = this.state;
        return (
            <div>
                <Menu 
                value={searchValue} 
                onChange={this.characterFilterOnChange}
                goHome={() => this.props.history.push('/')}
                goTop={() => this.props.history.push('/top')}
                goList={() => this.props.history.push('/list')}
                searchValue={true}
                />
                {loadingPost ?
                    <CircularProgress/>
                :
                <div className="container"> 
                    <h1>Rick y Morty Challenge</h1>
                    <p className="mb-2">Selected: {selected}</p>
                    {/* <input type ="text" value={searchValue}  /> */}
                    {readyButton ?
                    <Button variant="contained" onClick={this.saveTop}>Create Top 5 List</Button>
                    :
                    <Button variant="contained" onClick={this.saveTop} disabled>Create Top 5 List</Button>
                    }
                    <div className="row mt-2 p-0 m-0 d-flex flex-column justify-content-center align-items-center">
                        <Posts 
                        data={currentPosts} 
                        loading={loadingPost}
                        selected ={this.selected}
                        checked={checkedList}
                        currentPage={currentPage}
                        postsPerPage={postsPerPage}
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

export default withRouter(Home)