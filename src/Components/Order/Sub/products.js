import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ListItemText from "@material-ui/core/ListItemText";
import BackspaceIcon from "@material-ui/icons/Backspace";

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
                            <ListItemIcon>
                                <FastfoodIcon/>
                            </ListItemIcon>
                            <ListItemText primary={v.name}/>
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