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

class OrderProdcuts extends Component {
    render() {
        if (!this.props.showOrderProducts) { // Prop: The current step
            return null
        }
        return (
                this.getOrderProducts()
        );
    }
    getOrderProducts = () =>{
        console.log(this.props.order.length)

        let data = [];
        data.push(
            <div>
                <ListItem key={"back"} >
                    <ListItemIcon>
                        <ImportContactsIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Ihre Bestellung"}/>
                </ListItem>
                <Divider/>
            </div>
        )
        if(this.props.order.length === 0){
            data.push(
            <ListItem key={"back"} >
                <ListItemIcon>
                    <FastfoodIcon/>
                </ListItemIcon>
                <ListItemText primary={"Noch keine Produkte hinzugefügt"}/>
            </ListItem>
            )
        }



        this.props.order.map( (v,i) => {
                data.push(
                    <ListItem key={i} button onClick={() => this.props.deleteProductOrder(v.id,v.name,1, v.price)}>
                        <ListItemIcon>
                            <FastfoodIcon />
                        </ListItemIcon>
                        <ListItemText primary={v.name  +  " " + v.amount +  " x"} mx="1rem"  />
                        <div className={"line_between_text"}>
                            {v.price} €
                        </div>
                        <ListItemSecondaryAction  mx="1rem" >
                                {v.allPrice} €
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            }

        )
        return data;
    }
}

export default OrderProdcuts;