import './App.css';

import {Routes, Route, Navigate} from 'react-router-dom';
import {instance, PrivateRoute, PublicRoute} from "./axios"


import {Login} from "./components/Login.js"
import {Home} from "./components/Home";
import {Logout} from "./components/Logout";
import {Registration} from "./components/Registration"
import {Header} from "./components/Header";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login"/>}/>
            <Route path="/register" element={
                <PublicRoute>
                    <Registration signUp={true}/>
                </PublicRoute>
            }/>
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login/>
                    </PublicRoute>
                }
            />
            <Route
                path="/updateProfile"
                element={
                    <PrivateRoute>
                        <Header update={true}/>
                        <Registration signUp={false}/>
                        <Logout delete={true}/>
                    </PrivateRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <Header update={false}/>
                        <Home/>
                        <Logout delete={false}/>
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default App;
