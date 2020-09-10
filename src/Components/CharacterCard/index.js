import React from 'react';

const CharacterCard = (props) => {

    return (
       
            <div className="col-12 col-md-6 col-lg-4 mb-2">
                    <div className="w-100 row p-0 m-0">
                            <div className="col-12 image">
                                <img src={props.image} />
                            </div>
                            <div className="w-100">
                                    <p>Name: {props.name}</p>
                                    <p>Specie: {props.species}</p>
                                    <p>Episodes: {props.numberEpisodes}</p>
                                    <p>Status: {props.status}</p>
                                    <button>Select</button> 
                            </div>
                    </div>
            </div>
    );
}

export default CharacterCard