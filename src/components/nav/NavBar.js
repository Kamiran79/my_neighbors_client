import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from '../auth/AuthProvider'
import { Link, useHistory } from "react-router-dom"

import "./NavBar.css"
import Logo from "./myNeighborsChef.jpg"

export const NavBar = () => {
    const { getUserAdminStatus, isAdmin, isChef } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        getUserAdminStatus()
    }, [])

    return (
        <ul className="mt-3">
            <div className="d-flex flex-row flex-nowrap">
                <li className="navbar__item mx-3">
                    <Link to="/">
                        <img className="navbar__logo" alt="" src={Logo} />
                    </Link>
                </li>
                <li className="navbar__item mx-3">
                    <div className="d-flex justify-content-center">
                        <Link to="/menus" className="btn btn-outline-primary w-100">Menus</Link>
                    </div>
                </li>
                <li className="navbar__item mx-3">
                    <div className="d-flex justify-content-center">
                        <Link to="/orders" className="btn btn-outline-primary w-100">Orders</Link>
                    </div>
                </li>                
                {isAdmin ? (
                    <li className="navbar__item mx-3">
                        <div className="d-flex justify-content-center">
                            <Link to="/user/menus" className="btn btn-outline-primary w-100">My Menus</Link>
                        </div>
                    </li>
                ) : (<></>)}
                {isAdmin ? (
                    <li className="navbar__item mx-3">
                        <div className="d-flex justify-content-center">
                            <Link to="/categories" className="btn btn-outline-primary w-100">Category</Link>
                        </div>
                    </li>
                ) : (<></>)}
                {isAdmin ? (
                    <li className="navbar__item mx-3">
                        <div className="d-flex justify-content-center">
                            <Link to="/tags" className="btn btn-outline-primary w-100">Ingredient</Link>
                        </div>
                    </li>
                ) : (<></>)}
                {/* Change 'true' to whatever the is_admin check will be */}
                {isAdmin ? (
                    <li className="navbar__item mx-3">
                        <div className="d-flex justify-content-center">
                            <Link to="/users" className="btn btn-outline-primary w-100">Users</Link>
                        </div>
                    </li>
                ) : (<></>)}
                {
                    (localStorage.getItem("my_neighbors_user_id") !== null) ?
                        <li className="navbar__item ml-auto mr-3">
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-outline-primary w-100"
                                    onClick={() => {
                                        localStorage.removeItem("my_neighbors_user_id");
                                        history.push({ pathname: "/" });
                                    }}
                                >Logout</button>
                            </div>
                        </li> :
                        <>
                            <li className="navbar__item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="navbar__item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
                }
            </div>
        </ul>
    )
}
