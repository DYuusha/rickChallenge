import React, { Component } from 'react'
// import '../index.css';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
class ModalCompo extends Component {
    
    render() {
        return (
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit List</h5>
                        </div>
                        <div className="modal-body bg-sky py-3 d-flex flex-column justify-content-center align-items-center">
                            
                                <div className="col-12">
                                    <table className="table table-dark mt-2">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Characters</th>
                                        {/* <th scope="col">Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.list.map((cha, index)=>(
                                        <tr key={index}>
                                        
                                        <th scope="row">{index+1}</th>
                                        <td> 
                                            {cha.name}
                                        </td>
                                         <td><DeleteIcon onClick={()=>this.props.deleteOneElement(index,this.props.idTabla, this.props.list)} style={{cursor:'pointer'}}/></td>
                                         
                                        </tr>
                                    ))}        
                                    </tbody>
                                    </table>
                                    <Button variant="contained" onClick={()=>this.props.deleteSingleTable(this.props.idTabla)}>Delete complete list</Button>
                                </div>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-cancel" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>this.props.updateList(this.props.idTabla)}>Accept</button>
                        </div>
                    </div>
                </div>
        )
    }
}

export default ModalCompo