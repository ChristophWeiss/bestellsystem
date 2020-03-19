import React, {Component} from "react";
import {BrowserRouter, Redirect, Route} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import Home from "./Components/home";

const url = "http://localhost/comparinator/Backend/";
localStorage.setItem('url', url);

class App extends Component {
    state = {
        token: localStorage.getItem('token')
    };

    componentDidMount() {
        //this.setState({token: localStorage.getItem('token')});

    }

    setToken = (token) => {
        localStorage.setItem('token', token);
        this.setState({token: token})

    };


    render() {
        let forceLogin = "";
        if (this.state.token == null) {
            forceLogin = <Redirect to='/home/'/>
        }


        return (
            <BrowserRouter>
                <Route path={'/loggedin/'} component={() =>
                    <div>
                        {forceLogin}
                    </div>
                }/>
                <Route exact path={'/'} component={() =>
                    <Home/>
                }/>
                <Route exact path={'/home/'} component={() =>
                    <Home/>
                }/>
                <Route exact path={'/loggedin/'} component={() =>
                    <Home/>
                }/>

            </BrowserRouter>
        )
    }
}

export default App;