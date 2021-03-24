import React, { useState, useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import "./Users.css"



export const User = (props) => {  
    
return (
    <tr key={props.my_neighbors.id}>                                   
                    
                    <td><Link to={`/users/${props.my_neighbors.id}`}>{props.my_neighbors.user.username}</Link></td>
                    <td>
                        <span>{props.my_neighbors.user.first_name} {props.my_neighbors.user.first_name}</span>
                    </td>
                    <td>
                        <input type="checkbox" className= "mr-2" name="isActive" checked={props.my_neighbors.user.is_active} readOnly value={props.my_neighbors.id} />
                        <label className="form-check-label">Active</label>
                    </td>
                    
                    <td className="d-flex justify-content-center align-items-center" >           
                        <input type="radio" className="mr-2" name={props.my_neighbors.user.id} readOnly checked={!(props.my_neighbors.user.is_staff)} value="author" />
                        <label className="form-check-label mr-4">Author</label>
                    
                        <input type="radio" className="mx-2" name={props.my_neighbors.user.id} readOnly checked={props.my_neighbors.user.is_staff} value="admin" />
                        <label className="form-check-label">Admin</label>
                    </td>     
                    
                    
    </tr>
    )
}
