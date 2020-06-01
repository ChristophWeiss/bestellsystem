import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import ListItemText from "@material-ui/core/ListItemText";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";


class ToPayProduct extends Component {
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
        console.log(this.props.toPayProducts.length)

        let data = [];

        data.push(
            <div>
                <ListItem key={"back"} >
                    <ListItemIcon>
                        <ImportContactsIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Bezahlen"}/>
                </ListItem>
                <Divider/>
            </div>
        )

        /*
        if(!this.props.paying){
                data.push(
                    <div>
                        <ListItem key={"back"} >
                            <ListItemIcon>
                                <ImportContactsIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Bezahlen"}/>
                        </ListItem>
                        <Divider/>
                    </div>
                )
        }else {
            data.push(
                <div>
                    <ListItem key={"back"} >
                        <ListItemIcon>
                            <ImportContactsIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Bezahlen"}/>
                        <ListItemSecondaryAction>
                            <Button onClick={() => this.props.addAllProductsToPay()}>Alle</Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider/>
                </div>)
        }

         */


        this.props.toPayProducts.map( (v,i) => {
                data.push(
                    <ListItem key={i} button  onClick={() => this.props.addProductOrder(v.id,v.name,1, v.price)}>
                        <ListItemIcon>
                            <FastfoodIcon />
                        </ListItemIcon>
                        <ListItemText primary={v.name  +  " " + v.amount +  " x"} />
                        <ListItemSecondaryAction>
                            {v.allPrice} €
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            }

        )
        return data;
    }
}

export default ToPayProduct;