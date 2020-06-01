import React, {Component} from 'react';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import BackspaceIcon from '@material-ui/icons/Backspace';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class Categories extends Component {
    render() {
        if (!this.props.showCategories) { // Prop: The current step
            return null
        }
      return(
          this.getCategories()
      )
    }
    getCategories = () => {

        console.log(this.props.categories.length)

        let data = [];


        this.props.categories.map( (v,i) => {
                data.push(
                    <ListItem key={i} button onClick={ () => this.props.showSubCategories(v.id)}>
                        <ListItemIcon>
                            <FastfoodIcon />
                        </ListItemIcon>
                        <ListItemText primary={v.description} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="forward">
                                <ArrowForwardIosIcon onClick={ () => this.props.showSubCategories(v.id)} />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            }

        )
        return data;

    }
}

export default Categories;