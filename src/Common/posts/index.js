import React from 'react';
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
                                <button>Select</button> 
                        </div>
                </div>
        </div>
            ))}
        </div>
    )
}
export default Posts