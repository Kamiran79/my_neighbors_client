import React, { useState, useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import "./Users.css"



export const User = (props) => {  
    
return (
    <tr key={props.appuser.id}>                                   
                    
                    <td><Link to={`/users/${props.appuser.id}`}>{props.appuser.user.username}</Link></td>
                    <td>
                        <span>{props.appuser.user.first_name} {props.appuser.user.first_name}</span>
                    </td>
                    <td>
                        <input type="checkbox" className= "mr-2" name="isActive" checked={props.appuser.user.is_active} readOnly value={props.appuser.id} />
                        <label className="form-check-label">Active</label>
                    </td>
                    
                    <td className="d-flex justify-content-center align-items-center" >           
                        <input type="radio" className="mr-2" name={props.appuser.user.id} readOnly checked={!(props.appuser.user.is_staff)} value="author" />
                        <label className="form-check-label mr-4">Author</label>
                    
                        <input type="radio" className="mx-2" name={props.appuser.user.id} readOnly checked={props.appuser.user.is_staff} value="admin" />
                        <label className="form-check-label">Admin</label>
                    </td>     
                    
                    
    </tr>
    )
}
