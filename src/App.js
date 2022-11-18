import './App.css';

import {Routes, Route, Navigate} from 'react-router-dom';
import {instance, PrivateRoute, PublicRoute} from "./axios"


import {Login} from "./components/Login.js"
import {Home} from "./components/Home";
import {Logout} from "./components/Logout";
import {Registration} from "./components/Registration"

function App() {

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login"/>}/>
            <Route path="/register" element={
                <PublicRoute>
                    <Registration/>
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
                path="/me"
                element={
                    <PrivateRoute>
                        <Home/>
                        <Logout/>
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default App;
