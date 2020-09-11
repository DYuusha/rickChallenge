import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Favorite from '@material-ui/icons/Favorite';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import './index.css';
const Posts = props =>{
    if(props.loading){
        return <h2>Loading...</h2>;
    }
    // console.log(props.checked)
    
    return (
        <div className="row p-0 m-0">
            {props.data.map((post, index)=>(
                <div className="col-12 col-xs-6 col-md-6 col-lg-4 col-xl-3 p-0 m-0 mb-2" key={index}>
                <div className="w-100 row p-0 m-0 d-flex justify-content-center align-items-center">
                        <div className="col-12 image  d-flex justify-content-center align-items-center" >
                            <img src={post.image} style={{maxWidth:'250px'}}/>
                        </div>
                        <div className="col-12 charContent  d-flex flex-column justify-content-center align-items-start pt-1" style={{maxWidth:'250px'}}>
                                <p className="charData mb-0"><b>Name:</b> {post.name}</p>
                                <p className="charData mb-0"><b>Specie:</b> {post.species}</p>
                                <p className="charData mb-0"><b>Episodes:</b> {post.episode.length}</p>
                                <p className="charData mb-0"><b>Status:</b> {post.status}</p>
                                <FormControlLabel
                                    control={<Checkbox icon={<FavoriteBorder />} 
                                    checkedIcon={<Favorite />} 
                                    name="checkedH"
                                    checked={props.checked[post.id-1]}
                                    />}
                                    onClick={()=>props.selected(post.id-1)}
                                /> 
                        </div>
                </div>
        </div>
            ))}
        </div>
    )
}
export default Posts