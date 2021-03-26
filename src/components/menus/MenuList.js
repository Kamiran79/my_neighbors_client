import React, { useState, useContext, useEffect, useRef } from "react"
import { useHistory } from 'react-router-dom'
import { MenuContext } from "./MenuProvider"
import { AuthContext } from '../auth/AuthProvider'
import MenuCard from "./MenuCard"
import "./Menus.css"

export const MenuList = (props) => {
    const { getMenus, menus, searchTerms, getMenusByUserId, getMenusByCurrentUserId, releaseMenu } = useContext(MenuContext)
    const { getUserById } = useContext(AuthContext)
    const [userProfile, setUserProfile] = useState({})
    const { isAdmin } = useContext(AuthContext)

    const history = useHistory()
    const deleteMenuModal = useRef()

    const [filteredMenus, setFiltered] = useState([])
    const [deleteMenuId, setDeleteMenuId] = useState(0)
    const [userId, setUserId] = useState(-1)
    const [zipCode, setZipCode] = useState('')    

    const deleteAMenu = (id) => {
        releaseMenu(deleteMenuId)
            .then(setDeleteMenuId())
            .then(deleteMenuModal.current.close())
    }

    // Initialization effect hook -> Go get post data
    useEffect(() => {
        // if (props.location && props.location.pathname.includes('/user/menus') && props.match.params.userId) {
        //     // get posts by user id
        //     getMenusByUserId(parseInt(props.match.params.userId))
        if (props.location && props.location.pathname === '/user/Menus') {
            getMenusByCurrentUserId()
        } else {
            // get all posts
            getMenus()
        }
    }, [])

    useEffect(() => {
        menus.sort((a, b) => (a.ready_eat > b.ready_eat) ? -1 : 1)
        const matchingMenus = menus.filter(menu => menu.name.toLowerCase().includes(searchTerms.toLowerCase()))
        const validMenus = matchingMenus.filter((menu) => (Date.parse(menu.ready_eat) < Date.now()) && (menu.status === true))
        setFiltered(validMenus)
    }, [searchTerms])

    useEffect(() => {
        menus.sort((a, b) => (a.ready_eat > b.ready_eat) ? -1 : 1)
        const validMenus = menus.filter((menu) => (Date.parse(menu.ready_eat) < Date.now()) && (menu.status === true) && (menu.my_neighbor_user.user['id'] === userId))
        setFiltered(validMenus)
    }, [menus])




    useEffect(() => {
        const userId = props.match && parseInt(props.match.params.userId)
        if (userId) {
            getUserById(userId)
            .then(setUserProfile)
        }else {
            getUserId()
        }

    }, [])

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



    return (
        <div>
            {
                isAdmin?
                <div className="d-flex flex-row justify-content-end">
                <button className="d-flex flex-row justify-content-center align-items-center post__add btn btn-primary mr-5"
                    onClick={() => history.push("/menus/create")}
                >
                    Add Menu
                    <i className="fas fa-plus ml-4 mr-2"></i>
                </button>
            </div>
            : ''
            }

            <dialog className="dialog dialog--deleteMenu" ref={deleteMenuModal}>
                <h4>Are you sure you want to delete this menu?</h4>
                <div className="d-flex flex-row justify-content-around align-items-center w-100">
                    <button className="deletePost btn btn-outline-primary" onClick={deleteAMenu}>Ok</button>
                    <button className="btn btn-outline-primary" onClick={e => deleteMenuModal.current.close()}>Cancel</button>
                </div>
            </dialog>
            <div className="posts post__list mt-5 mx-5 px-3">
                <h2>{
                    props.location && props.location.pathname.includes('/user/menus')
                    && userProfile.user && `${userProfile.user.first_name} ${userProfile.user.last_name}'s menus`
                }</h2>
                {
                    filteredMenus.map(menu => <MenuCard key={menu.id} menu={menu} setDeleteMenuId={setDeleteMenuId} deleteMenuModal={deleteMenuModal} />)
                }
            </div>
        </div>
    )
}
