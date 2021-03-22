import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"

import { MenuProvider } from "./menus/MenuProvider.js"
import { MenuList } from "./menus/MenuList.js"
import { MenuTable } from "./menus/MenuTable.js"

import { CategoryProvider } from './categories/CategoryProvider.js'
import { CategoryList } from './categories/CategoryList'

import { NavBar } from "./nav/NavBar"
import { AuthContext } from "./auth/AuthProvider.js"

import { UserTable } from "./users/UserTable.js"



export const ApplicationViews = () => {
    const { isAdmin } = useContext(AuthContext);

    return <>
        <NavBar />
        <main style={{
            margin: "1rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <CategoryProvider>
                {/* <TagProvider> */}
                    <MenuProvider>
                        <Route exact path="/">
                            <MenuList />
                        </Route>
                        <Route exact path="/user/menus" render={props => <MenuList {...props} />} />
                        <Route path="/user/menus/:userId(\d+)" render={props => <MenuList {...props} />} />
                        <Route exact path="/menus" render={(props) => {
                            return <>
                                <main className="postContainer">
                                    <h1>Menus</h1>

                                    {/* <PostSearch /> */}
                                    <MenuTable />
                                </main>

                            </>
                        }} />

                        {/* <Route exact path="/menus/create" render={(props) => {
                            return <MenuForm {...props} />
                        }} /> */}

                        {/* <ReactionProvider>
                            <Route path="/posts/:postId(\d+)" render={
                                props => <PostDetails {...props} />
                            } />
                            <Route path="/posts/edit/:postId(\d+)" render={
                                props => <PostForm {...props} />
                            } />
                        </ReactionProvider> */}
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
                    {/* <Route exact path="/tags" render={(props) => {
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
                    }} /> */}
                {/* </TagProvider> */}
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
            {/* <Route path="/users/:userId(\d+)" render={
                props => <UserProfile {...props} />
            } */}
            
        </main>
    </>
}
