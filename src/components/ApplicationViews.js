import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"

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
                {/* <TagProvider>
                    <PostProvider>
                        <Route exact path="/">
                            <PostList />
                        </Route>
                        <Route exact path="/user/posts" render={props => <PostList {...props} />} />
                        <Route path="/user/posts/:userId(\d+)" render={props => <PostList {...props} />} />
                        <Route exact path="/posts" render={(props) => {
                            return <>
                                <main className="postContainer">
                                    <h1>Posts</h1>

                                    <PostSearch />
                                    <PostTable />
                                </main>

                            </>
                        }} />

                        <Route exact path="/posts/create" render={(props) => {
                            return <PostForm {...props} />
                        }} />

                        <ReactionProvider>
                            <Route path="/posts/:postId(\d+)" render={
                                props => <PostDetails {...props} />
                            } />
                            <Route path="/posts/edit/:postId(\d+)" render={
                                props => <PostForm {...props} />
                            } />
                        </ReactionProvider>
                        <CommentProvider>

                            <Route path="/post/:postId(\d+)/comments" render={(props) => {
                                return <>
                                    <main className="postContainer">

                                        <PostComments {...props} />
                                    </main>

                                </>
                            }} />


                        </CommentProvider>
                    </PostProvider>
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
                </TagProvider> */}
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
