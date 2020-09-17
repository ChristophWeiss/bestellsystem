import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import Divider from "@material-ui/core/Divider";
import "./orderProductStyle.css"
import List from "@material-ui/core/List";
import {Button} from "@material-ui/core";
import MessageIcon from '@material-ui/icons/Message';
import products from "./products";

class OrderProdcuts extends Component {
    render() {
        if (!this.props.showOrderProducts) { // Prop: The current step
            return null
        }
        return (
            this.getOrderProducts()
        );
    }

    getOrderProducts = () => {
        //console.log(this.props.order.length)

        let data = [];
        data.push(
            <div>
                <ListItem key={"back"}>
                    <ListItemIcon>
                        <ImportContactsIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Ihre Bestellung"}/>
                </ListItem>
                <Divider/>
            </div>
        )
        if (this.props.order.length === 0 && this.props.notes.length === 0) {
            data.push(
                <ListItem key={"back"}>
                    <ListItemIcon>
                        <FastfoodIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Noch keine Produkte hinzugefügt"}/>
                </ListItem>
            )
        }


        var note = this.props.notes
        //console.log(this.props.order.length)

        if (this.props.order.length === 0) {

            note.map((n, i) => {
                //console.log(n)
                for (var j = 0; j < this.props.products.length; j++) {
                    if (this.props.products[j].id === n.product_id) {
                        var v = this.props.products[j];
                        //console.log(v)
                    }
                }
                data.push(
                    <ListItem key={i} button>
                        <ListItemIcon onClick={() => this.props.deleteFromOrder(v, 1)}>
                            <FastfoodIcon/>
                        </ListItemIcon>
                        <ListItemText
                            onClick={() => this.props.deleteFromOrder(v, 1)}
                            primary={n.amount + "x " + v.name} mx="1rem"
                            secondary={
                                <React.Fragment>
                                    {n.note}
                                </React.Fragment>
                            }
                        />
                        <div className={""} onClick={() => this.props.showEditDialog(v)}>
                            <MessageIcon/>
                        </div>
                        <div className={"line_between_text"}
                             onClick={() => this.props.deleteFromOrder(v, 1)}>
                            {v.price} €
                        </div>
                        <ListItemSecondaryAction mx="1rem"
                                                 onClick={() => this.props.deleteFromOrder(v, 1)}
                        >
                            {v.allPrice} €
                        </ListItemSecondaryAction>
                    </ListItem>)
            })
        }
        this.props.order.map((v, i) => {
            if (note.length > 0) {
                note.map((n, j) => {
                    //console.log("wait", v,"help", n)

                    if (n.product_id == v.id) {
                        //console.log(n)
                        //console.log(v)
                        //console.log("note")
                        //console.log("not used")
                        data.push(
                            <ListItem key={i} button>
                                <ListItemIcon onClick={() => this.props.deleteFromOrder(v, 1)}>
                                    <FastfoodIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    onClick={() => this.props.deleteFromOrder(v, 1)}
                                    primary={n.amount + "x " + v.name} mx="1rem"
                                    secondary={
                                        <React.Fragment>
                                            {n.note}
                                        </React.Fragment>
                                    }
                                />
                                <div className={""} onClick={() => this.props.showEditDialog(v)}>
                                    <MessageIcon/>
                                </div>
                                <div className={"line_between_text"}
                                     onClick={() => this.props.deleteFromOrder(v, 1)}>
                                    {n.price} €
                                </div>
                                <ListItemSecondaryAction mx="1rem"
                                                         onClick={() => this.props.deleteFromOrder(v, 1)}
                                >
                                    {n.allPrice} €
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                        if (j == 0) {
                            data.push(
                                <ListItem key={i} button>
                                    <ListItemIcon onClick={() => this.props.deleteFromOrder(v, 1)}>
                                        <FastfoodIcon/>
                                    </ListItemIcon>
                                    <ListItemText
                                        onClick={() => this.props.deleteFromOrder(v, 1)}
                                        primary={v.amount + "x " + v.name} mx="1rem"
                                    />
                                    <div className={""} onClick={() => this.props.showEditDialog(v)}>
                                        <MessageIcon/>
                                    </div>
                                    <div className={"line_between_text"}
                                         onClick={() => this.props.deleteFromOrder(v, 1)}>
                                        {v.price} €
                                    </div>
                                    <ListItemSecondaryAction mx="1rem"
                                                             onClick={() => this.props.deleteFromOrder(v, 1)}
                                    >
                                        {v.allPrice} €
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        }

                    } else {
                        console.log("no note")
                        data.push(
                            <ListItem key={i} button>
                                <ListItemIcon onClick={() => this.props.deleteFromOrder(v, 1)}>
                                    <FastfoodIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    onClick={() => this.props.deleteFromOrder(v, 1)}
                                    primary={v.amount + "x " + v.name} mx="1rem"
                                />
                                <div className={""} onClick={() => this.props.showEditDialog(v)}>
                                    <MessageIcon/>
                                </div>
                                <div className={"line_between_text"}
                                     onClick={() => this.props.deleteFromOrder(v, 1)}>
                                    {v.price} €
                                </div>
                                <ListItemSecondaryAction mx="1rem"
                                                         onClick={() => this.props.deleteFromOrder(v, 1)}
                                >
                                    {v.allPrice} €
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    }

                })
            } else {
                data.push(
                    <ListItem key={i} button>
                        <ListItemIcon onClick={() => this.props.deleteFromOrder(v, 1)}>
                            <FastfoodIcon/>
                        </ListItemIcon>
                        <ListItemText
                            onClick={() => this.props.deleteFromOrder(v, 1)}
                            primary={v.amount + "x " + v.name} mx="1rem"
                        />
                        <div className={""} onClick={() => this.props.showEditDialog(v)}>
                            <MessageIcon/>
                        </div>
                        <div className={"line_between_text"}
                             onClick={() => this.props.deleteFromOrder(v, 1)}>
                            {v.price} €
                        </div>
                        <ListItemSecondaryAction mx="1rem"
                                                 onClick={() => this.props.deleteFromOrder(v, 1)}
                        >
                            {v.allPrice} €
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            }
        })

        return data;
    }
}

export default OrderProdcuts;