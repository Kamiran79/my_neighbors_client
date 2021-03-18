import React from "react"
import { Route } from "react-router-dom"
// import { CategoryDetails } from "./categories/CategoryDetail"
// import { CategoryList } from "./categories/CategoryList"
// import { CategoryProvider } from "./categories/CategoryProvider"
// import NewCategory from "./categories/NewCategory"
// import UpdateCategory from "./categories/UpdateCategory"
// import SingleUser from "./Users/SingleUser"
// import { UserList } from "./Users/UserList"
// import { UserProvider } from "./Users/UserProvider"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        </main>

        {/* <CategoryProvider>
            <Route exact path="/categories" render={(props) => {
                return <>
                    <main className="categoryContainer">

                        <CategoryList history={props.history} />
                    </main>

                </>
            }} />

            <Route exact path="/createCategory" render={(props) => {
                return <NewCategory {...props} />
            }} />

            <Route path="/categories/:categoryId" render={
                props =>  <CategoryDetails {...props} />
            } />

            <Route path="/categories/edit/:categoryId" render={
                props => <UpdateCategory {...props} />
            } /> 
        </CategoryProvider> */}

        {/* <UserProvider>
            <Route exact path="/users" render={(props) => {
                return <>
                    <main className="userContainer">

                        <UserList history={props.history} />
                    </main>

                </>
            }} />

            <Route path="/users/:userId" render={
                props =>  <SingleUser {...props} />
            } />            
        </UserProvider> */}
    </>
    
}
