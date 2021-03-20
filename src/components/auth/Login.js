import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"


export const Login = () => {
    const email = React.createRef()
    const password = React.createRef()
    const isStaff = React.createRef()
    const invalidDialog = React.createRef()
    const history = useHistory() 

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //"Accept": "application/json"
            },
            body: JSON.stringify({
                username: email.current.value,
                password: password.current.value,
                is_staf: isStaff.current.checked
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem( "my_neighbors_user_id", res.token )
                    //localStorage.setItem( "my_neighbors_user_id", res.user_id )
                    history.push("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Email or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section className="login-section">
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>My Neighbors App - Chef</h1>
                    <fieldset>
                        <input ref={email} type="email" id="email" className="form-control"  placeholder="Email address" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <input ref={password} type="password" id="password" className="form-control"  placeholder="Password" required />
                    </fieldset>                        
                    <fieldset className="register_fields">
                            <label className="switch input1">
                                Is Chef
                                </label>
                            <input className="input1" type="checkbox" ref={isStaff} name="isStaff"></input>
                    </fieldset> 
                    <fieldset style={{
                        textAlign:"center"
                    }}>
                        <button className="login-button" type="submit">Login</button>
                    </fieldset>
                </form>
            </section>
            <section>
                <Link to="/register" className="link--register">Don't have an account yet? Click here to sign up!</Link>
            </section>
        </main>
    )
}
