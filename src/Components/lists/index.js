import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Menu from '../../Common/menu/';
import firebase from 'firebase';
import swal from 'sweetalert';
import ModalCompo from '../modal/';
import { withRouter } from 'react-router-dom';
import './index.css';
const initState={
    list:[],
    loadingList: true,
    idList:[],
    actualIndex: null,
    actualList:[]
}

class List extends Component{
    constructor(props) {
        super(props)
        this.state = {
         ...initState
        };
        this.getData();
    } 
    getData =async()=>{
        try{
            let response = await this.getMarker();
            let id= await this.getId();
            this.setState({
                list: response,
                idList: id
            });
        }catch(error){
            console.log(error)
        }
    }
    getMarker = async ()=> {
        const snapshot = await firebase.firestore().collection('top5').get();
        return snapshot.docs.map(doc => doc.data());
    }
    getId = async ()=> {
        const snapshot = await firebase.firestore().collection('top5').get();
        return snapshot.docs.map(doc => doc.id);
    }
    getTable = async()=>{
        let actualDocument = this.state.idList[this.state.actualIndex]
        try{
            let response = await firebase.firestore().collection('top5').doc(actualDocument);
            let doc = await response.get();
            if(doc.exists){
                let  data = doc.data();
               await this.setState({
                   actualList: data.characters,
               });
            }
            else{
                console.log('no such document!')
            }
        }catch(error){
            console.log(error)
        }
    }
    deleteSingleTable = async(id)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this list!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then( async(willDelete) => {
            if (willDelete) {
                firebase.firestore().collection("top5").doc(this.state.idList[id]).delete().then(function() {
                    // console.log("Document successfully deleted!");
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
              swal("Poof! Your list has been deleted!", {
                icon: "success",
              });
              this.state = {
                ...initState
               };
             await this.getData();
            } else {
              swal("Your list is safe!");
            }
          });
    }
    setIndex = async(index)=>{
        await this.setState({
            actualIndex: index
        });
       await this.getTable();
    }
    deleteOneElement = async(index,id, list)=>{
        if(list.length<2){
           await this.deleteSingleTable(id)
        }
        else{
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this element!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then( async(willDelete) => {
                if (willDelete) {
                    let actualArray = list;
                    actualArray.splice(index,1)
                    firebase.firestore().collection('top5').doc(this.state.idList[id]).set({characters: actualArray}).then(function() {
                        console.log("Document successfully deleted!");
                        }).catch(function(error) {
                            console.error("Error removing document: ", error);
                        });
                  swal("Poof! Your list has been updated!", {
                    icon: "success",
                  });
                  this.state = {
                    ...initState
                   };
                  await this.getData();
                } else {
                  swal("Your list is safe!");
                }
              });
        }
    }
    updateList = async(id) => {
        try{
            await firebase.firestore().collection('top5').doc(this.state.idList[id]).set({characters: this.state.actualArray})
        }
        catch(error){
            console.log(error)
        }
    }
    render (){
        const {loadingCharacters,searchValue, list,actualIndex,actualList} = this.state;
        return (
            <div>
                <Menu 
                value={searchValue} 
                onChange={this.characterFilterOnChange}
                goHome={() => this.props.history.push('/')}
                goTop={() => this.props.history.push('/top')}
                goList={() => this.props.history.push('/list')}
                searchValue={false}
                />
                {loadingCharacters ?
                    <CircularProgress/>
                :
                <div className="container"> 
                    <h1>All the lists</h1>
                    <div className="row p-0 m-0">
                    {list.map((cha, index)=>(
                        <div className="col-12 col-md-6 col-lg-4 " data-toggle="modal" data-target="#paw-modal" onClick={()=>this.setIndex(index)} key={index}>
                        <table className="table table-dark singleTable mt-2">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Characters</th>
                            {/* <th scope="col">Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                        {cha.characters.map((specify, index2)=>(
                            <tr key={index2}>
                            <th scope="row">{index2+1}</th>
                            <td> 
                                {specify.name}
                               
                            </td>
                            {/* <td><DeleteIcon style={{cursor:'pointer'}}/></td> */}
                            </tr>
                        ))}           
                        </tbody>
                        </table>
                        <div className="modal fade" id="paw-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <ModalCompo
                                list={actualList}
                                idTabla={actualIndex}
                                deleteSingleTable={this.deleteSingleTable}
                                deleteOneElement={this.deleteOneElement}
                                updateList={this.updateList}
                            />
                        </div>
                        </div>
                    ))}
                    </div> 
                </div>
                }
                

            </div>

          );
    }
    
}

export default withRouter(List)