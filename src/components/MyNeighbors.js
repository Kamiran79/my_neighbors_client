import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { AuthProvider } from "./auth/AuthProvider.js"

export const MyNeighbors = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("my_neighbors_user_id")) {
                return <>
                    <AuthProvider>
                        <ApplicationViews />
                    </AuthProvider>
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={() => {
            if (localStorage.getItem("my_neighbors_id")) {
                return <Redirect to="/" />
            } else {
                return <Login />
            }
        }} />

        <Route path="/register" render={(props) => {
            if (localStorage.getItem("my_neighbors_id")) {
                return <Redirect to="/" />
            } else {
                return <Register {...props} />
            }
        }} />
    </>
)
