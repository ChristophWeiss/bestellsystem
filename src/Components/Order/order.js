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
import Categories from "./Sub/categories"
import SubCategories from "./Sub/sub_Categories"
import Products from "./Sub/products"


class Order extends Component {
    state = {
        token: localStorage.getItem('token'),
        waiter_name: "Lukas",
        categories: [
            {id: 1,description: "Essen"},
            {id: 2,description: "Trinken"},
            {id: 3,description: "Desert"},
            {id: 4,description: "Alkohol"}
        ],
        subcategories:[
            {id: 1,description: "Nudeln",categories_id:1},
            {id: 2,description: "Burger",categories_id:1},
            {id: 3,description: "SoftAlkohol",categories_id:4},
            {id: 4,description: "Saft",categories_id:2}
        ],
        products:[
            {id: 1, name: "Bier",sizes_id:"klein", categories_id: 3,price: 2.3}
        ],
        showCategories : true,
        showSubCategories: false,
        showProducts:false,
        categoriesID:null,
        categoriesIDOld:null
    }

    componentDidMount() {
        console.log(this.props.match.params.table_nr);
        this.setState({
            tisch_nr: this.props.match.params.table_nr
        })
    }
    showSubCategories = (id) =>{
        console.log(id)
        this.setState({
            showCategories : false,
            showSubCategories: true,
            showProducts:false,
            categoriesID:id
        })
    }
    showProducts = (id) =>{
        console.log(id)
        this.setState({
            showCategories : false,
            showSubCategories: false,
            showProducts:true,
            categoriesIDOld:this.state.categoriesID,
            categoriesID:id
        })
    }
    backCategories = () =>{
        this.setState({
            showCategories : true,
            showProducts:false,
            showSubCategories: false
        })
    }
    backSubCategories = () =>{
        this.setState({
            showCategories : false,
            showSubCategories: true,
            showProducts:false,
            categoriesID:this.state.categoriesIDOld
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
                <List component="nav" aria-label="main mailbox folders" className={"border"}>
                    <Categories
                        showCategories={this.state.showCategories}
                        categories={this.state.categories}
                        showSubCategories={this.showSubCategories}
                        backCategorie={this.backCategories}
                    />
                    <SubCategories
                        showSubCategories={this.state.showSubCategories}
                        sub_categories={this.state.subcategories}
                        categories={this.state.categoriesID}
                        showProducts={this.showProducts}
                        backCategories={this.backCategories}
                    />
                    <Products
                        showProducts={this.state.showProducts}
                        products={this.state.products}
                        categories={this.state.categoriesID}
                        backCategories={this.backSubCategories}
                    />
                </List>

            </div>
        )
    }
}

export default Order;