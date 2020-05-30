import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import Axios from "axios";


class Order extends Component {
    state = {
        token: localStorage.getItem('token')
    };

    componentDidMount() {
        console.log("dsadsdsd")
        console.log(this.props.match.params.table_nr);
        this.setState({
            tisch_nr:this.props.match.params.table_nr
        })
    }


    render() {


        return (
            <div className="container h-100">
                <p>{this.props.match.params.table_nr}</p>
                <p>HEHWEH(Uwd</p>
            </div>
        )
    }
}

export default Order;