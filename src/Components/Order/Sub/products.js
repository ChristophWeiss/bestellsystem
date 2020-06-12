import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ListItemText from "@material-ui/core/ListItemText";
import BackspaceIcon from "@material-ui/icons/Backspace";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./productsStyle.css"

class products extends Component {


    render() {
        console.log(this.props.showProducts)
        if (!this.props.showProducts) { // Prop: The current step
            return null
        }
        return (
            this.getProdcuts()
        );
    }
    uf = (e,v) => {
        if (e.key === 'Enter') {
            this.refs.input.blur()
            this.props.addAmount(v)
        }

    }
    getProdcuts = () => {
        console.log(this.props.products.length)
            let length = this.props.products.length;
            let data = [];

        data.push(
            <ListItem key={"back"} button onClick={this.props.backCategories}>
                <ListItemIcon>
                    <BackspaceIcon/>
                </ListItemIcon>
                <ListItemText primary={"Zurück"}/>
            </ListItem>
        )

        if (length !== 0) {
            let counter = 0;

            this.props.products.map((v, i) => {

                if (this.props.categories === v.categories_id) {
                    counter++;
                    data.push(
                        <ListItem key={i} button>
                            <ListItemIcon onClick={() => this.props.addProductOrder(v,1)}>
                                <FastfoodIcon/>
                            </ListItemIcon>
                            <ListItemText primary={v.name} onClick={() => this.props.addProductOrder(v,1)}/>
                            <input ref={"input"} className={"ml-3 mr-3 input_width"} value={this.props.amount} type={"number"} onChange={this.props.changeAmount} onKeyDown={(e) => this.uf(e,v)}/>
                            <ListItemSecondaryAction onClick={() => this.props.addProductOrder(v,1)}>
                                {v.price} €
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                }
            });
            if(counter === 0){
                data.push(
                    <ListItem key={"-1"} button>
                        <ListItemIcon>
                            <FastfoodIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Keine Produkte verfügbar"}/>
                    </ListItem>
                )
            }

            return data;

        }
    }
}

export default products;