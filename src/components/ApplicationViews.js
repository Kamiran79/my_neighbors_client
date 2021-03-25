import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"

import { MenuDetails } from "./menus/MenuDetails.js"
import { MenuSearch } from "./menus/MenuSearch.js"
import { MenuProvider } from "./menus/MenuProvider.js"
import { MenuList } from "./menus/MenuList.js"
import { MenuTable } from "./menus/MenuTable.js"
import { MenuForm } from "./menus/MenuForm.js"

import { TagProvider } from "./ingredients/TagProvider.js"
import { TagList } from "./ingredients/TagList.js"

import { CategoryProvider } from './categories/CategoryProvider.js'
import { CategoryList } from './categories/CategoryList'

import { NavBar } from "./nav/NavBar"
import { AuthContext } from "./auth/AuthProvider.js"

import { UserTable } from "./users/UserTable.js"
import { UserProfile } from "./users/UserProfile.js"
import { OrderProvider } from "./orders/OrderProvider.js"
import { OrderList } from "./orders/OrderList.js"
import { OrderTable } from "./orders/OrderTable.js"
import { CreateOrder } from "./orders/CreateOrder.js"



export const ApplicationViews = () => {
    const { isAdmin } = useContext(AuthContext);

    return <>
        <NavBar />
        <main style={{
            margin: "1rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <CategoryProvider>
                <TagProvider>
                    <MenuProvider>
                        <Route exact path="/">
                            <MenuList />
                        </Route>
                        {/* <Route exact path="/user/menus" render={props =>{
                            isAdmin
                            ?<MenuList {...props} />:
                            <Redirect to="/" />} 
                        }/> */}
                        
                        <Route exact path="/user/menus" render={(props) => 
                            { return <>
                            {
                                <MenuList {...props} />
                            }
                                </>
                            }} />

                        <Route path="/user/menus/:userId(\d+)" render={props => <MenuList {...props} />} />
                        {/* <Route exact path="/user/menus" render={() => {
                            return <>
                                {
                                    isAdmin
                                        ? <main className="categoriesContainer">
                                            <h1>Available Categories</h1>
                                            <MenuList />
                                        </main>
                                        : <Redirect to="/" />
                                }
                            </>
                        }} />                         */}
                        <Route exact path="/menus" render={(props) => {
                            return <>
                                <main className="postContainer">
                                    <h1>Menus</h1>

                                    <MenuSearch />
                                    <MenuTable />
                                </main>

                            </>
                        }} />

                        <Route exact path="/menus/create" render={(props) => {
                            return <MenuForm {...props} />
                        }} />

                        <Route path="/menus/:menuId(\d+)" render={
                            props => { 
                                return <>
                                    <main>
                                        <MenuDetails {...props} />

                                    </main>                                                                
                                </>
                            }
                        } />
                        <OrderProvider>
                            <Route path="/orders/create/:menuId(\d+)" render={
                                props => <CreateOrder {...props} />
                            } />
                        </OrderProvider>                         
                        <Route path="/menus/edit/:menuId(\d+)" render={
                            props => <MenuForm {...props} />
                        } />

                        {/* <CommentProvider>

                            <Route path="/post/:postId(\d+)/comments" render={(props) => {
                                return <>
                                    <main className="postContainer">

                                        <PostComments {...props} />
                                    </main>

                                </>
                            }} />


                        </CommentProvider> */}
                    </MenuProvider>
                    <Route exact path="/tags" render={(props) => {
                        return <>
                            {
                                isAdmin
                                    ? <main className="tagsContainer">
                                        <h1>Available Tags</h1>
                                        <TagList {...props} />
                                    </main>
                                    : <Redirect to="/" />
                            }
                        </>
                    }} />
                </TagProvider>
                <Route exact path='/categories' render={() => {
                    return <>
                        {
                            isAdmin
                                ? <main className="categoriesContainer">
                                    <h1>Available Categories</h1>
                                    <CategoryList />
                                </main>
                                : <Redirect to="/" />
                        }
                    </>
                }} />
                {/* <PostProvider>
                    <Route path="/categories/:categoryId(\d+)" render={props => {
                        return <>
                            {
                                isAdmin
                                    ? <main className="categoryPostContainer">
                                        <CategoryPost {...props} />
                                    </main>
                                    : <Redirect to="/" />
                            }
                        </>
                    }} />
                </PostProvider> */}

            </CategoryProvider>
            <Route exact path='/users' render={() => {
                return <>
                    {
                        isAdmin
                            ? <main className="usersContainer">
                                <UserTable />
                            </main>
                            : <Redirect to="/" />
                    }
                </>
            }} />

            <Route path="/users/:userId(\d+)" render={
                    props => <UserProfile {...props} />
                } 
            />
            <OrderProvider>
                <Route exact path="/orders" render={(props) => 
                    { return <>
                        {
                            <OrderTable {...props} />
                        }
                        </>
                    }} /> 
                              
            </OrderProvider> 

            {/* <Route path="/users/:userId(\d+)" render={
                props => <UserProfile {...props} />
            } */}
            
        </main>
    </>
}
