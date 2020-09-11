import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Menu from '../../Common/menu/';
import firebase from 'firebase';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';
const initState={
    character:[],
    loadingCharacters: true
}

class Top extends Component{
    constructor(props) {
        super(props)
        this.state = {
         ...initState
        };
          this.getData();   
    } 
    getData = async ()=>{
        try{
            let response = await firebase.firestore().collection('characters').doc('completeList');
            let doc = await response.get();
            if(doc.exists){
                let  data = doc.data().characters;
                data = data.sort(function (a, b) {
                    if (a.count < b.count) {
                      return 1;
                    }
                    if (a.count > b.count) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                  });
               await this.setState({
                   character:data,
                   loadingCharacters: false
               });
            }
            else{
                console.log('no such document!')
            }
        }catch(error){
            console.log(error)
        }
    }
    render (){
        const {loadingCharacters,searchValue, character} = this.state;
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
                    <h1>All characters points</h1>
                    <table className="table table-dark mt-2">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Character</th>
                        <th scope="col">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {character.map((cha, index)=>(
                        <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{cha.name}</td>
                        <td>{cha.count}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                }
                
            </div>
          );
    }
    
}

export default withRouter(Top)