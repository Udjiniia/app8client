import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {instance, url} from "../axios";
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
    const [avatarUrl, setAvatarUrl] = useState("")

    try {
        instance.get("/me").then(res => {
            setEmail(res.data.userData.email);
            setRole(res.data.userData.role);
            setVariant(res.data.userData.variant);
            setFullName(res.data.userData.fullName);
            setGroup(res.data.userData.group);
            setPhone(res.data.userData.phone);
            setAvatarUrl(res.data.userData.avatarUrl)
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
                        <div className={"d-flex justify-content-center header"}>
                            <img alt="Uploaded" src={`${url}${avatarUrl}`}
                                 style={{borderRadius: "50%", width: "200px", height: "200px"}}/>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p style={{marginTop: "20px"}}> Full name: {fullName} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Group: {group} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Phone: {phone} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p>Variant: {variant} </p>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <p> Email: {email} </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
};
