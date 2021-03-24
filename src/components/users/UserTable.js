import React, { useState, useContext, useEffect, useRef } from "react"
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import "./Users.css"

export const UserTable = () => {
    const { currentUser, getCurrentUser, isAdmin, getUsers, users, partialyUpdateUser } = useContext(AuthContext)
    const [sortedUsers, setSortedUsers] = useState([])   
    const deleteUserModal = useRef(); 
    const tempPopupModal = useRef();
    const changeUserTypeModal = useRef();
    const history = useHistory();

    const [selectedUser, setSelectedUser] = useState(0)
    const [checkboxStatus, setCheckboxStatus] = useState(true)
    const [adminRadioStatus, setAdminRadioStatus] = useState(false)

    useEffect(() => {
        getUsers()      
        getCurrentUser()  
    }, [])

    useEffect(() => {
        const tempSortedUsers = users.sort((a, b) => (a.user.username.toLowerCase() < b.user.username.toLowerCase()) ? -1 : 1)
        setSortedUsers(tempSortedUsers)
    }, [users])

    const handleUserType = e => {
        const my_neighbors_userId = selectedUser
        const selectedmy_neighbors_user = users.find((my_neighbors_user)=> my_neighbors_user.id === my_neighbors_userId)
        const userId = selectedmy_neighbors_user.user.id
        const partialObject = {"user" : {"is_staff" : adminRadioStatus, "id": userId} }   
        partialyUpdateUser(my_neighbors_userId, partialObject)
            .then(history.push("/users"))
            .then(changeUserTypeModal.current.close())              
    }

    const showDeactivated = e => {
        const deactivatedUsers = users.filter((my_neighbors_user) => (my_neighbors_user.user.is_active !== true))
        if(deactivatedUsers.length === 0){
            tempPopupModal.current.showModal()
        } 
        setSortedUsers(deactivatedUsers)                     
    }
    const showAll = e => {
        getUsers()
            .then(history.push("/users"))                     
    }

    const handleIsActive = e => {
        const my_neighbors_userId = selectedUser
        const selectedmy_neighbors_user = users.find((my_neighbors_user)=> my_neighbors_user.id === my_neighbors_userId)
        const userId = selectedmy_neighbors_user.user.id
        const partialObject = {"user" : {"is_active" : checkboxStatus, "id": userId} }   
        partialyUpdateUser(my_neighbors_userId, partialObject)
            .then(history.push("/users"))
            .then(deleteUserModal.current.close())
    }

    return (
        <div>
            <dialog className="dialog dialog--deleteUser" ref={deleteUserModal}>
                { checkboxStatus ?
                <h4>Are you sure you want to reactivate this user?</h4>:
                <h4>Are you sure you want to deactivate this user?</h4>
                }                
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                    <button className="deleteUser btn btn-outline-primary" onClick={handleIsActive}>Ok</button>
                    <button className="btn btn-outline-primary" onClick={e => deleteUserModal.current.close()}>Cancel</button>
                </div>
            </dialog>
            <dialog className="dialog " ref={changeUserTypeModal}>
                { adminRadioStatus ?
                <h4>Are you sure you want to promote this user to admin?</h4>:
                <h4>Are you sure you want to demote this user to author?</h4>                
                }                
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                    <button className="btn btn-outline-primary" onClick={handleUserType}>Ok</button>
                    <button className="btn btn-outline-primary" onClick={e => changeUserTypeModal.current.close()}>Cancel</button>
                </div>
            </dialog>
            <dialog className="dialog" ref={tempPopupModal}>                
                <h4>There are no deactivated users to show</h4>                               
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                    <button className="btn btn-outline-primary" onClick={e => tempPopupModal.current.close()}>Ok</button>
                </div>
            </dialog>
            <div className="d-flex justify-content-center mt-5">
            <h1>Users</h1>
            </div>
            <div className="mx-3 px-3">
            <button className="btn btn-outline-primary mr-3" onClick={showDeactivated}>Show deactivated</button>
            <button className="btn btn-outline-primary" onClick={showAll}>Show all</button>
            </div>  

            <div className="users user__table mt-5 mx-3 px-3">
                <table className="table table-bordered table-striped">
                   
                    <tbody>
                        {
                            sortedUsers.map(my_neighbors_user => (
                                <tr key={my_neighbors_user.id}>
                                    
                                    <td><Link to={`/users/${my_neighbors_user.id}`}>{my_neighbors_user.user.username}</Link></td>
                                    <td>
                                        <span>{my_neighbors_user.user.first_name} {my_neighbors_user.user.first_name}</span>
                                    </td>
                                    <td>
                                        <input type="checkbox" className= "mr-2" name="isActive" checked={my_neighbors_user.user.is_active} value={my_neighbors_user.id} onChange={(e) => {
                                            setSelectedUser(my_neighbors_user.id)
                                            setCheckboxStatus(e.target.checked)
                                            deleteUserModal.current.showModal()
                                            }} />
                                        <label className="form-check-label">Active</label>
                                    </td>
                                    
                                    <td className="d-flex justify-content-center align-items-center" onChange = {(e) => {
                                        setSelectedUser(my_neighbors_user.id)
                                        if (e.target.value === "admin") {
                                            setAdminRadioStatus(true) }
                                        else {
                                            setAdminRadioStatus(false)
                                        } 
                                        changeUserTypeModal.current.showModal()
                                    }} >           
                                        <input type="radio" className="mr-2" name={my_neighbors_user.user.id} checked={!(my_neighbors_user.user.is_staff)} value="author" />
                                        <label className="form-check-label mr-4">Author</label>
                                    
                                        <input type="radio" className="mx-2" name={my_neighbors_user.user.id} checked={my_neighbors_user.user.is_staff} value="admin" />
                                        <label className="form-check-label">Admin</label>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
