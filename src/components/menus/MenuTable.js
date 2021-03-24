import React, { useState, useContext, useEffect, useRef } from "react"
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment';
import { MenuContext } from "./MenuProvider"
import { TagContext } from "../ingredients/TagProvider"
import { AuthContext } from '../auth/AuthProvider'
import "./Menus.css"

export const MenuTable = () => {
    const { getMenus, getMenusZipCode, menus, searchTerms, releaseMenu, partialyUpdateMenu } = useContext(MenuContext)
    // const { tags, searchTags } = useContext(TagContext)
    const { isAdmin } = useContext(AuthContext)
    const history = useHistory();
    const deleteMenuModal = useRef();

    const [userId, setUserId] = useState(-1)
    const [zipCode, setZipCode] = useState('')
    const [filteredMenus, setFiltered] = useState([])
    const [menuToBeDeleted, setMenuToBeDeleted] = useState(0)

    const getUserId = () => {
        const body = { "token": `${localStorage.getItem("my_neighbors_user_id")}` }
        return fetch("http://localhost:8000/get_current_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                setUserId(res.user_id)
                setZipCode(res.zipcode)
            })
    }

    // const getUserZip = () => {
    //     const body = { "token": `${localStorage.getItem("my_neighbors_user_id")}` }
    //     return fetch("http://localhost:8000/get_current_user_zipcode", {
    //         method: "POST",
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("my_neighbors_user_id")}`
    //         },
    //         body: JSON.stringify(body)
    //     })
    //         .then(res => res.json())
    //         .then(res => setZipCode(res.zipcode))
    // }

    // Initialization effect hook -> Go get post data
    useEffect(() => {
        // getUserZip()
        getMenus()
        getUserId()

       
    }, [])

    useEffect(() => {
        menus.sort((a, b) => (a.ready_eat > b.ready_eat) ? -1 : 1)
        const matchingMenus = menus.filter(menu => menu.name.toLowerCase().includes(searchTerms.toLowerCase()))
        let validMenus = []
        isAdmin ? 
        (validMenus = matchingMenus.filter((menu) => (Date.parse(menu.ready_eat) < Date.now()) && (menu.status === true) && (menu.my_neighbor_user['zipCode'] === zipCode))) :
        (validMenus = matchingMenus.filter((menu) => (Date.parse(menu.ready_eat) < Date.now()) && (menu.status === true) && (menu.my_neighbor_user['zipCode'] === zipCode)))
        // (validMenus = matchingMenus.filter((menu) => (Date.parse(menu.ready_eat) < Date.now()))) :
        // (validMenus = matchingMenus.filter((menu) => (Date.parse(menu.ready_eat) < Date.now()) && (menu.status === true)))      
        setFiltered(validMenus)
    }, [searchTerms])

    // useEffect(() => {
    //     menus.sort((a, b) => (a.ready_eat > b.ready_eat) ? -1 : 1)
    //     const matchingTags = tags.filter(tag => tag.label.includes(searchTags))
    //     let valid
    // })

    useEffect(() => {
        menus.sort((a, b) => (a.ready_eat > b.ready_eat) ? -1 : 1)
        let validMenus = []
        isAdmin ?
        (validMenus = menus.filter((menu) => (Date.parse(menu.ready_eat) < Date.now()) && (menu.status === true) && (menu.my_neighbor_user['zipCode'] === zipCode))) :
        (validMenus = menus.filter((menu) => (Date.parse(menu.ready_eat) < Date.now()) && (menu.status === true) && (menu.my_neighbor_user['zipCode'] === zipCode)))
        setFiltered(validMenus)
    }, [menus])

    const handleIsApprovedUpdate = e => {
        const menuId = parseInt(e.target.value)
        const partialObject = {"approved" : e.target.checked }    
        partialyUpdateMenu(menuId, partialObject)        
    }

    return (
        <div>
            <dialog className="dialog dialog--deletePost" ref={deleteMenuModal}>
                <h4>Are you sure you want to delete this menu?</h4>
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                    <button className="deletePost btn btn-outline-primary" onClick={() => {
                        releaseMenu(menuToBeDeleted)
                            .then(history.push("/menus"))
                            .then(deleteMenuModal.current.close())
                    }}>Ok</button>
                    <button className="btn btn-outline-primary" onClick={e => deleteMenuModal.current.close()}>Cancel</button>
                </div>
            </dialog>
            <div className="d-flex flex-row justify-content-end">
                <button className="d-flex flex-row justify-content-center align-items-center post__add btn btn-primary mr-5"
                    onClick={() => history.push("/menus/create")}
                >
                    Add {zipCode}Menu
                    <i className="fas fa-plus ml-4 mr-2"></i>
                </button>
            </div>
            <div className="posts post__table mt-5 mx-3 px-3">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Menu Name</th>
                            <th scope="col">Ready Eat</th>
                            <th scope="col">Ingredients</th>
                            <th scope="col">Price</th>
                            <th scope="col">Delivery</th>
                            <th scope="col">Pick Up</th>
                            <th scope="col">Dine In</th>
                            <th scope="col">Chef</th>
                            <th scope="col">QTY Available</th>
                            <th scope="col">Category</th>
                            {isAdmin ? (<th scope="col">Status</th>) : (<></>) }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredMenus.map(menu => (
                                <tr key={menu.id}>
                                    {((menu.my_neighbor_user && menu.my_neighbor_user.id) === userId) || (isAdmin) ? (
                                        <td className="p-0">
                                            <div className="d-flex flex-row justify-content-around h-100 align-items-center">
                                                <Link to={`menus/edit/${menu.id}`} ><i className="fas fa-cog"></i></Link>
                                                <i className="far fa-trash-alt text-danger post__hover__delete"
                                                    onClick={() => {
                                                        setMenuToBeDeleted(menu.id)
                                                        deleteMenuModal.current.showModal()
                                                    }}
                                                ></i>
                                            </div>
                                        </td>) : <td></td>}
                                    <td><Link to={`/menus/${menu.id}`}>{menu.name}</Link></td>
                                    <td>{moment(menu.ready_eat).format('hh mm A')}</td>
                                    <td>{menu.ingredients && menu.ingredients.map(tag => (
                                        <div key={tag.id}>{tag.label}</div>
                                    ))}</td>
                                    <td>${menu.price}.00</td>
                                    <td><input type="checkbox" name="isDelivery" checked={menu.delivery} value={menu.id} />{menu.delivery}</td>
                                    <td><input type="checkbox" name="isPick_up" checked={menu.pick_up} value={menu.id} />{menu.pick_up}</td>
                                    <td><input type="checkbox" name="isDine_in" checked={menu.dine_in} value={menu.id} /> {menu.dine_in}</td>
                                    <td>{menu.my_neighbor_user && menu.my_neighbor_user.user.first_name} {menu.my_neighbor_user && menu.my_neighbor_user.user.last_name}</td>
                                    <td>{menu.how_many_left}</td>
                                    <td>{menu.category && menu.category.label}</td>

                                    {isAdmin ? (<td>
                                        <input type="checkbox" name="isApproved" checked={menu.status} value={menu.id} onChange={handleIsApprovedUpdate} />
                                        </td>) : (<></>) }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
