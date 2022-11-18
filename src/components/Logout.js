import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {Link} from "react-router-dom"
import {instance} from "../axios.js";
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";
import {Navigate} from 'react-router-dom';
import axios from "axios";


export const Logout = () => {
    const [auth, setAuth] = useState(true)

    const onLogout = () => {
        window.localStorage.setItem("token", "")
        setAuth(false);
    }

    if (!auth) {
        return <Navigate to="/"/>
    }

    return (
        <div className="position-relative">
            <div className="position-absolute bottom-0 end-0">
                <button onClick={onLogout} className="btn btn-primary">
                    Log out
                </button>
            </div>
        </div>
    );
};