import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {Link} from "react-router-dom"
import {instance} from "../axios.js";
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";
import {Navigate} from 'react-router-dom';
import axios from "axios";


export const Header = (props) => {
    const update = props.update;

    return (

        <div className="position-relative">
            <div className="position-absolute top-0 end-0">
                <Link to={ update ? "/me" : "/updateProfile"} className="btn btn-primary">
                    {update ? "My profile" : "Update profile"}
                </Link>
            </div>
        </div>
    );
};