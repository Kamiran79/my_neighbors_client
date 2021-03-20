import React, { useRef } from "react"
import { useHistory } from "react-router-dom"

import Logo from "../nav/myNeighborsChef.jpg"
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
    const address = useRef()
    const city = useRef()
    const state = useRef()
    const zipCode = useRef()
    const telephone = useRef()
    const isChef = useRef()

    const history = useHistory()

    const handleRegister = (e) => {
        e.preventDefault()

        if (passwordCheck(password, verifyPassword)) {
            const newUser = {
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                // "bio": bio.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "username": email.current.value,
                // "is_staff": true,
                "address": address.current.value,
                "city": city.current.value,
                "state": state.current.value,
                "zipCode": zipCode.current.value,
                "telephone": telephone.current.value,
                "isChef": isChef.current.checked,
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
                    localStorage.setItem("my_neighbors_user_id", res.token)
                    // localStorage.setItem( "my_neighbors_id", res.user_id )
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
                            <img src={Logo} alt="Rare Logo" className="logo-register" />
                        </div>
                        <fieldset className="register_fields">
                            <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                        </fieldset>
                        <fieldset className="register_fields">
                            <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                        </fieldset>
                        <fieldset className="register_fields">
                            <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                        </fieldset>
                        <fieldset className="register_fields">
                            <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                            <p style={{ fontSize: '.8em', fontWeight: 'bold', padding: '0' }}><em> Minimum eight characters, at least one uppercase letter, one lowercase letter and one number </em></p>
                        </fieldset>
                        <fieldset className="verify-password register_fields">
                            <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                        </fieldset>                        
                    </div>
                    <div style={{ padding: "50px" }}>
                        <fieldset className="register_fields">
                            <input type="text" ref={address} name="address" className="form-control" placeholder="Address" required />
                        </fieldset>
                        <fieldset className="register_fields">
                            <input type="text" ref={city} name="city" className="form-control" placeholder="City" required />
                        </fieldset>
                        <fieldset className="register_fields">
                            <input type="text" ref={state} name="state" className="form-control" placeholder="State" required />
                        </fieldset>
                        <fieldset className="register_fields">
                            <input type="text" ref={zipCode} name="zipCode" className="form-control" placeholder="Zip Code" required />
                        </fieldset>
                        <fieldset className="register_fields">
                            <input type="text" ref={telephone} name="telephone" className="form-control" placeholder="Telephone" required />
                        </fieldset>                        
                        <fieldset className="register_fields">
                            <label className="switch input1">
                                Is Chef
                                </label>
                            <input className="input1" type="checkbox" ref={isChef} name="isChef"></input>
                        </fieldset>                                                                                                                   
                        <fieldset className="register_fields">
                            <textarea ref={profileImageUrl} name="profileImageUrl" className="form-control" placeholder="Profile Image URL" />
                        </fieldset>
                        <fieldset className="register_fields">
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
