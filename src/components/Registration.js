import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {Link} from "react-router-dom"
import {instance, url} from "../axios.js";
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";
import {useNavigate} from 'react-router-dom'


export const Registration = (props) => {
    const navigation = useNavigate()
    const [errorMsg, setErrorMsg] = useState("")
    const [registr, setRegistr] = useState(false)
    const registration = props.signUp;
    const [updateAcc, setUpdateAcc] = useState(false)
    const [role, setRole] = useState("user")
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    const [group, setGroup] = useState("")
    const [variant, setVariant] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("/uploads/anon.jpg")
    const inputFileRef = React.useRef(null);

    useEffect(() => {
        document.getElementById(role).setAttribute("checked", true);
    })

    const {handleSubmit, formState: {errors, isValid}} = useForm({})

    const registerSubmit = () => {
        try {
            instance.post('/register', {
                email: email,
                password: password,
                role: role,
                phone: phone,
                variant: variant,
                group: group,
                avatarUrl: avatarUrl,
                fullName: fullName
            }).then(res => {
                setRegistr(true)
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

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append("image", file);
            const {data} = await instance.post("/upload", formData)
            setAvatarUrl(data.url)
        } catch
            (error) {
            alert("Couldn`t upload the image")
            if (error.response) {
                console.log(error.response.data.message);
            }
        }
    }

    useEffect(() => {
        try {
            instance.get("/me").then(res => {
                setEmail(res.data.userData.email)
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
    }, [registration])

    const updateSubmit = () => {
        try {
            instance.patch('/me/updateAccount', {
                email: email,
                password: password,
                role: role,
                phone: phone,
                variant: variant,
                group: group,
                avatarUrl: avatarUrl,
                fullName: fullName
            }).then(res => {
                setUpdateAcc(true)
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

    if (updateAcc) {
        navigation('/me', {
            state: {
                msg: "Your profile changed",
            }
        });
    }

    if (registr) {
        navigation('/login', {
            state: {
                msg: "You have signed in!",
            }
        });
    }


    return (
        <div className="Auth-form-container">
            <form onSubmit={handleSubmit(registration ? registerSubmit : updateSubmit)} className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">{registration ? "Sign up" : "Update your profile"}</h3>
                    <div className="form-group mt-sm-0">
                        <label>Email address</label>
                        <TextField
                            required
                            id={"email"}
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter email"
                            error={Boolean(errors.email?.message)}
                            helperText={errors.email?.message}
                        />
                    </div>
                    <div className="form-group mt-sm-0">
                        <label>Password</label>
                        <TextField
                            required
                            id={"password"}
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter password"
                            error={Boolean(errors.password?.message)}
                            helperText={errors.password?.message}
                        />
                    </div>
                    <div className="form-group mt-sm-0">
                        <label>Group</label>
                        <TextField
                            required
                            id={"group"}
                            type="text"
                            value={group}
                            onChange={e => setGroup(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter group "
                            error={Boolean(errors.group?.message)}
                            helperText={errors.group?.message}
                        />
                    </div>
                    <div className="form-group mt-sm-0">
                        <label>Phone</label>
                        <TextField
                            required
                            id={"phone"}
                            type="text"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter phone"
                            error={Boolean(errors.phone?.message)}
                            helperText={errors.phone?.message}
                        />
                    </div>
                    <div className="form-group mt-sm-0">
                        <label>Full name</label>
                        <TextField
                            required
                            id={"fullName"}
                            type="text"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter full name"
                            error={Boolean(errors.fullName?.message)}
                            helperText={errors.fullName?.message}
                        />
                    </div>
                    <div className="form-group mt-sm-0">
                        <label>Variant</label>
                        <TextField
                            required
                            id={"variant"}
                            type="number"
                            value={variant}
                            onChange={e => setVariant(e.target.value)}
                            className="form-control mt-sm-0"
                            placeholder="Enter variant"
                            error={Boolean(errors.variant?.message)}
                            helperText={errors.variant?.message}
                        />
                    </div>
                    <div onChange={event => setRole(event.target.value)}>
                        <input className="form-group mt-3" type="radio" id="admin"
                               name="contact" value="admin"/> Admin
                        <input style={{marginLeft: '10px'}} className="form-group mt-3" type="radio" id="user"
                               name="contact" value="user"/> User
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="button" onClick={() => inputFileRef.current.click()} className="btn btn-outline-primary">
                            Upload avatar
                        </button>
                    </div>
                    <input ref={inputFileRef} type="file" accept="image/*" onChange={handleChangeFile} hidden/>
                    {avatarUrl !== "/uploads/anon.jpg" && avatarUrl !== ""  && (
                        <div className="d-grid gap-2 mt-3">
                            <button type="button" onClick={() => setAvatarUrl("")} className="btn btn-outline-primary">
                                Remove avatar
                            </button>
                            <div className={"d-flex justify-content-center header"}>
                            <img alt="Uploaded"  src={`${url}${avatarUrl}`}
                                 style={{ borderRadius: "50%", width: "200px", height: "200px"}}/>
                            </div>
                        </div>
                    )}
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <div className=" forgot-password text-right mt-2" style={{color: 'red'}}>
                        {errorMsg}
                    </div>
                    {registration ?
                        <p className=" forgot-password text-right mt-2">
                            Already have an account? <Link to="/login"> Sign in</Link>
                        </p> : ""}
                </div>
            </form>
        </div>
    );
};