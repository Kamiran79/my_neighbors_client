import React, { useRef } from "react"
import { useHistory } from "react-router-dom"

import "./Auth.css"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const displayName =  useRef()
    const profileImageUrl = useRef('')

    const history = useHistory()

    const handleRegister = (e) => {
        e.preventDefault()

        if (passwordCheck(password, verifyPassword)) {
            const newUser = {
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "bio": bio.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "username": email.current.value,
                "is_staff": true,
                "display_name": displayName.current.value,
                "profile_image_url": profileImageUrl.current.value
            }

            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
            .then(res => res.json())
            .then(res => {
                if ("token" in res) {
                    localStorage.setItem("my_neighbors_token", res.token)
                    localStorage.setItem( "my_neighbors_id", res.user_id )
                    history.push("/")
                }
            })
        }
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--register" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <div className="field-container">
                    <div style={{ padding: "50px" }}>
                        <div className="logo-container-register">
                            <img src="https://i.ibb.co/k0ff5JZ/rare-logo.jpg" alt="Rare Logo" className="logo-register" />
                        </div>
                        <fieldset>
                            <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                        </fieldset>
                        <fieldset>
                            <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                        </fieldset>
                        <fieldset>
                            <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                        </fieldset>
                    </div>
                    <div style={{ padding: "50px" }}>
                        <fieldset>
                            <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                            <p style={{ fontSize: '.8em', fontWeight: 'bold', padding: '0' }}><em> Minimum eight characters, at least one uppercase letter, one lowercase letter and one number </em></p>
                        </fieldset>
                        <fieldset className="verify-password">
                            <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                        </fieldset>
                        <fieldset>
                            <input type="text" ref={displayName} name="displayName" className="form-control" placeholder="Display name" required />
                        </fieldset>
                        <fieldset>
                            <textarea ref={profileImageUrl} name="profileImageUrl" className="form-control" placeholder="Profile Image URL" />
                        </fieldset>
                        <fieldset>
                            <textarea ref={bio} name="bio" className="form-control" placeholder="Let other rare users know a little bit about you..." />
                        </fieldset>
                        <fieldset style={{
                            textAlign: "center"
                        }}>
                            <button className="login-button" type="submit">Register</button>
                        </fieldset>
                    </div>
                </div>
            </form>
        </main>
    )
}

const passwordCheck = (password, verifyPassword) => {

    // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (password.current.value === verifyPassword.current.value) {
        if (password.current.value.match(regex)) {
            return true;
        }
        else {
            return alert("Password requires a minimum of eight characters, at least one uppercase letter, one lowercase letter and one number")
        }
    }

    else {
        return alert("Passwords do not match.");
    }
}
