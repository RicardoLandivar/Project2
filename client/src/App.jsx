import React, { Fragment, useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Routes, Navigate, Redirect} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { HEARTH_API_URL, hearthApiOptions } from "./routes/Api";

// Components
import UpdateCard from "./components/UpdateCard";
import CurrentCard from "./components/CurrentCard";

// Pages
import Home from "./pages/Home";
import CardDetailPage from "./pages/CardDetailPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";


const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const setAuth = boolean => {
        setIsAuthenticated(boolean);
      };
      async function isAuth() {
        try {

            const response = await fetch("http://localhost:4000/auth/is-verify", 
           { method: "POST",
           headers: { token : localStorage.token }
        });

        const parseRes = await response.json()
        parseRes === true ? setIsAuthenticated(true) :
        setIsAuthenticated(false);
            
        } catch (err) {
            console.error(err.message);
            
        }
      }

      useEffect(() => {
        isAuth()
      }, [])

     


    return (
        <Fragment>
        <Router>
            <div className="container">
            <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cards/:id/update" element={<UpdateCard/>}/>
            <Route path="/cards/:id" element={<CardDetailPage/>}/>
            <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" /> } />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setAuth}/> : <Navigate to="/login" /> } />
            <Route path="/register" element={!isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to="/dashboard" /> } />
            <Route path="/search" element={<Search/>}   />
            </Routes>
            </div>
        </Router>
        </Fragment>
    )
   
};

export default App;