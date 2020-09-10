import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Favorite from '@material-ui/icons/Favorite';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const Posts = props =>{
    if(props.loading){
        return <h2>Loading...</h2>;
    }
    return (
        <div className="row p-0 m-0">
            {props.data.map((post, index)=>(
                <div className="col-12 col-md-6 col-lg-3 mb-2" key={index}>
                <div className="w-100 row p-0 m-0">
                        <div className="col-12 image">
                            <img src={post.image} style={{maxWidth:'250px'}} />
                        </div>
                        <div className="w-100">
                                <p>Name: {post.name}</p>
                                <p>Specie: {post.species}</p>
                                <p>Episodes: {post.episode.length}</p>
                                <p>Status: {post.status}</p>
                                <FormControlLabel
                                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                                    onClick={()=>props.selected(index)}
                                /> 
                        </div>
                </div>
        </div>
            ))}
        </div>
    )
}
export default Posts