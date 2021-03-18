import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { MyNeighbors } from "./components/MyNeighbors.js"
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <MyNeighbors />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
