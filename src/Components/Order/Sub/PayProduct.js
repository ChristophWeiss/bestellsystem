import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import BackspaceIcon from "@material-ui/icons/Backspace";
import ListItemText from "@material-ui/core/ListItemText";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ImportContactsIcon from "@material-ui/icons/ImportContacts"
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import "./orderProductStyle.css"

class PayProduct extends Component {
    render() {
        console.log(this.props.showToPayProducts)
        if (!this.props.showToPayProducts) { // Prop: The current step
            return null
        }
        return (
            this.getProductsToPay()
        );
    }
    getProductsToPay = () =>{
        console.log(this.props.order.length)

        let data = [];

        data.push(
            <ListItem key={"back"} >
                <ListItemIcon>
                    <LocalAtmIcon/>
                </ListItemIcon>
                <ListItemText primary={"Zu Bezahlen"}/>
            </ListItem>
        )

        this.props.order.map( (v,i) => {
                data.push(
                    <ListItem key={i} button onClick={() => this.props.addProductToPay(v,1)}>
                        <ListItemIcon>
                            <FastfoodIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={v.name  +  " " + v.amount +  " x"} mx="1rem"
                            secondary={
                                <React.Fragment>
                                    {v.note}
                                </React.Fragment>
                            }
                        />
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

export default PayProduct;