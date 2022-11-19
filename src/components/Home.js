import React, {useState} from "react";
import {useForm} from "react-hook-form";
import axios, {instance} from "../axios";
import TextField from "@mui/material/TextField";
import {Link, Navigate, useLocation} from "react-router-dom";

export const Home = () => {
    const location = useLocation();
    const msg = location.state === null ? "" : location.state.msg
    const [role, setRole] = useState("")
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    const [group, setGroup] = useState("")
    const [variant, setVariant] = useState("")
    const [email, setEmail] = useState("")

    try {
        instance.get("/me").then(res => {
            setEmail(res.data.userData.email);
            setRole(res.data.userData.role);
            setVariant(res.data.userData.variant);
            setFullName(res.data.userData.fullName);
            setGroup(res.data.userData.group);
            setPhone(res.data.userData.phone);
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


    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h6 className="Auth-form-title"> {msg}</h6>
                    <h3 className="Auth-form-title"> Welcome {role}</h3>
                    <div className="form-group mt-3">

                    </div>
                    <div className="form-group mt-3">
                        <p> Full name: {fullName} </p>
                        <p> Group: {group} </p>
                        <p> Phone: {phone} </p>
                        <p>Variant: {variant} </p>
                        <p> Email: {email} </p>
                    </div>
                </div>
            </form>
        </div>
    )
};
