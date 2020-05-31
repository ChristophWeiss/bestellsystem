import React, {Component} from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from "@material-ui/core/Avatar";
import {Col, Row} from "react-bootstrap"
import Logout from '@material-ui/icons/ExitToApp';
import "./orderStyle.css"
import FastfoodIcon from '@material-ui/icons/Fastfood';


class Order extends Component {
    state = {
        token: localStorage.getItem('token'),
        waiter_name: "Lukas",
        categories: [
            {name: "Essen"},
            {name: "Trinken"},
            {name: "Essen"},
            {name: "Trinken"}
        ]
    }

    componentDidMount() {
        console.log("dsadsdsd")
        console.log(this.props.match.params.table_nr);
        this.setState({
            tisch_nr: this.props.match.params.table_nr
        })
    }


    render() {


        return (
            <div className={"w-100 h-100 container"}>
                <Row className={"mt-1text-center"}>
                    <Col className={"m-2 mt-4 col-4 mr-2 text-center d-flex justify-content-center"}> <Logout/> Logout
                    </Col>
                    <Col className={"mt-3  text-center d-flex justify-content-center"}>
                        <Avatar>{this.props.match.params.table_nr}</Avatar></Col>
                    <Col className={"m-2 mt-3 mr-2 col-4 text-center d-flex justify-content-center"}>
                        <Avatar>{this.state.waiter_name.substring(0, 1)}</Avatar>
                        <div className={"waiter_name"}> Kellner {this.state.waiter_name} </div>
                    </Col>
                </Row>

                <Divider className={"mb-5"}/>
                <p>HEHWEH(Uwd</p>
                <List component="nav" aria-label="main mailbox folders" className={"border"}>
                    {this.getCategories()}
                </List>

            </div>
        )
    }

    getCategories = () => {

        let data = [];

        this.state.categories.map( function (v,i) {
                data.push(
                    <ListItem key={i} button>
                        <ListItemIcon>
                            <FastfoodIcon />
                        </ListItemIcon>
                        <ListItemText primary={v.name} />
                    </ListItem>
                )
            }

        )
        return data;

    }
}

export default Order;