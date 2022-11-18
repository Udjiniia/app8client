import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {Link} from "react-router-dom"
import {instance} from "../axios.js";
import axios from "axios";
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";
import {Navigate} from 'react-router-dom';


export const Login = () => {
    const [errorMsg, setErrorMsg] = useState("")
    const [auth, setAuth] = useState(false)

    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: "E@gmail.com",
            password: "123456"
        }, mode: "onChange"
    })

    const onSubmit = (values) => {
        try {
            instance.post('/login', {
                email: values.email,
                password: values.password
            }).then(res => {
                window.localStorage.setItem("token", res.data.token)
                setAuth(true);
            }).catch(error => {
                if (error.response.status === 400) {
                    const msg = error.response.data[0];
                    setErrorMsg(msg.msg);
                } else {
                    setErrorMsg(error.response.data.message);
                }
            })
        } catch
            (error) {
            if (error.response) {
                console.log(error.response.data.message);
            }
        }
    }

    if (auth) {
        return <Navigate to="/me"/>
    }

    return (
        <div className="Auth-form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <TextField
                            {...register("email", {required: "Submit email"})}
                            id={"email"}
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            error={Boolean(errors.email?.message)}
                            helperText={errors.email?.message}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <TextField
                            {...register("password", {required: "Submit password"})}
                            id={"password"}
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            error={Boolean(errors.password?.message)}
                            helperText={errors.password?.message}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <div className="forgot-password text-right mt-2" style={{color: 'red'}}>
                        {errorMsg}
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Don't have an account? <Link to="#"> Sigh up</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};