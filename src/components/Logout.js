import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {Link} from "react-router-dom"
import {instance} from "../axios.js";
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";
import {Navigate} from 'react-router-dom';
import axios from "axios";


export const Logout = (props) => {
    const [auth, setAuth] = useState(true)
    const deleteAcc = props.delete;

    const onLogout = () => {
        window.localStorage.setItem("token", "")
        setAuth(false);
    }

    const onDelete = () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            try {
                instance.delete("/me/deleteAccount").then(res => {
                    onLogout();
                })
                    .catch(error => {
                        console.log(error.response.data.message);
                    })
            } catch
                (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                }
            }
        }
    }

    if (!auth) {
        return <Navigate to="/"/>
    }

    return (
        <div className="position-relative">
            <div className="position-absolute bottom-0 end-0">
                <button onClick={ deleteAcc ? onDelete : onLogout} className="btn btn-primary">
                    {deleteAcc ? "Delete profile" : "Log out"}
                </button>
            </div>
        </div>
    );
};