import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ListItemText from "@material-ui/core/ListItemText";
import BackspaceIcon from "@material-ui/icons/Backspace";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

class SubCategories extends Component {
    render() {
        console.log(this.props.showSubCategories)
        if (!this.props.showSubCategories) { // Prop: The current step
            return null
        }
        return (
            this.getSubCategories()
        );
    }
    getSubCategories = () => {

        console.log(this.props.sub_categories.length)
        let length = this.props.sub_categories.length;
        let data = [];

        data.push(
            <ListItem button key={"back"} onClick={ this.props.backCategories}>
                <ListItemIcon>
                    <BackspaceIcon />
                </ListItemIcon>
                <ListItemText primary={"Zurück"} />
            </ListItem>
        )
        if(length !== 0){
            let counter = 0;
            this.props.sub_categories.map((v,i) => {
                    if(this.props.categories === v.categories_id){
                        counter++;
                        data.push(
                            <ListItem key={i} button onClick={ () => this.props.showProducts(v.id)}>
                                <ListItemIcon>
                                    <FastfoodIcon />
                                </ListItemIcon>
                                <ListItemText primary={v.description} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="forward">
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    }

                }

            )
            if(counter === 0){
                data.push(
                    <ListItem key={"-1"} button>
                        <ListItemIcon>
                            <FastfoodIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Keine Kategorie verfügbar"}/>
                    </ListItem>
                )
            }
        }

        return data;

    }
}

export default SubCategories;