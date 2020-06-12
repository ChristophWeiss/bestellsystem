import React, {Component} from "react";
import {BrowserRouter, Redirect, Route} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import Bestellen from "./Components/Order/order_tableNr";
import Order from "./Components/Order/order";
import Login from "./Components/Login/login";
import EditOrderProduct from "./Components/Order/Sub/EditOrderProduct";

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


//http://localhost:3000/loggedin/order/14/
        return (
            <BrowserRouter>
                <Route exact path={'/'} component={() =>
                    <Redirect to="/loggedin/Order" />
                }/>
                <Route exact path={'/login'} component={() =>
                    <Login />
                }/>
                <Route exact path={'/home/'} component={() =>
                    <Bestellen/>
                }/>
                <Route exact path={'/loggedin/Order'} component={() =>
                    <Bestellen/>
                }/>
                <Route exact path={'/loggedin/EditOrder'} component={() =>
                    <EditOrderProduct/>
                }/>
                <Route exact path={'/loggedin/Order/:table_nr/'} render={(props) =>
                    <Order {...props}/>
                }/>
            </BrowserRouter>
        )
    }
}

export default App;