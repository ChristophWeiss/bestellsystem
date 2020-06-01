import React, {Component} from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from "@material-ui/core/Avatar";
import {Col, Row,Button} from "react-bootstrap"
import Logout from '@material-ui/icons/ExitToApp';
import "./orderStyle.css"
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Categories from "./Sub/categories"
import SubCategories from "./Sub/sub_Categories"
import Products from "./Sub/products"
import OrderProducts from "./Sub/order_prodcuts"
import CloseIcon from '@material-ui/icons/Close';
import EuroIcon from '@material-ui/icons/Euro';
import BackspaceIcon from "@material-ui/icons/Backspace";
import PrintSharpIcon from '@material-ui/icons/PrintSharp';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import PayProduct from "./Sub/PayProduct";
import ToPayProduct from "./Sub/ToPayProduct";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

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
            {id: 4,description: "HardAlkohol",categories_id:4},
            {id: 5,description: "Saft",categories_id:2}
        ],
        products:[
            {id: 1, name: "Bier",sizes_id:"klein", categories_id: 3,price: 2.5},
            {id: 2, name: "Vodka",sizes_id:"shot", categories_id: 4,price: 1},
            {id:3, name:"Burger", sizes_id: "groß", categories_id: 2,price: 20}
        ],
        showCategories : true,
        showSubCategories: false,
        showOrderProducts:true,
        showProducts:false,
        toPayProducts:[],
        showToPayProducts:false,
        showPayProducts:false,
        order:[],
        toPay: 0,
        categoriesID:null,
        categoriesIDOld:null,
        canPay:false,
        paying:false,
        order_old:[],
        visability:"invisible",
        dialogOpen:false
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
            showPayProducts:false,
            showToPayProducts:false,
            categoriesID:id
        })
    }
    showProducts = (id) =>{
        console.log(id)
        this.setState({
            showCategories : false,
            showSubCategories: false,
            showToPayProducts:false,
            showPayProducts:false,
            showProducts:true,
            categoriesIDOld:this.state.categoriesID,
            categoriesID:id
        })
    }
    backCategories = () =>{
        this.setState({
            showCategories : true,
            showProducts:false,
            showToPayProducts:false,
            showPayProducts:false,
            showSubCategories: false
        })
    }
    deleteProductOutOrder = (id,description,amount,price) =>{
        let arr = this.state.order;
        let help = null;
        let pay = 0;
        console.log(arr.length)
        if(arr.length !== 0 ){
            console.log("del")
            for (let i = 0; i< arr.length; i++){

                if(arr[i].id === id) {
                    if (arr[i].amount === 1) {
                        arr.splice(i, i + 1)
                    } else {
                        help = arr[i];
                        arr[i].amount = arr[i].amount - amount;
                        arr[i].allPrice = arr[i].price * arr[i].amount
                        let product_price = arr[i].price *  arr[i].amount;
                        pay += product_price;
                    }
                }

            }

            this.setState({
                order:arr,
                toPay:pay,
                canPay:true
            })
        }else{
            console.log("del")
            this.setState({
                canPay:false
            })
        }

    }

    showToPay = () =>{
        if(this.state.canPay){
            console.log("i wanna pay")
            console.log(this.state.order)
            this.setState({
                paying:true,
                showCategories : false,
                showProducts:false,
                showOrderProducts:false,
                showToPayProducts:true,
                showSubCategories: false,
                showPayProducts:true,
                errorIsOpen:false,
                order_old:this.state.order,
                visability:"visible"
            })
        }else{
            this.setState({
                errorIsOpen:true
            })
        }
    }
    addProductToOrder = (id,description,amount,price) =>{
        let arr = this.state.order;
        let help = null;
        let pay = 0;
        for (let i = 0; i< arr.length; i++){

            if(arr[i].id === id){
                 help = arr[i];
                 arr[i].amount = arr[i].amount + amount;
                arr[i].allPrice = arr[i].price *  arr[i].amount
            }
            let product_price = arr[i].price *  arr[i].amount;
            pay += product_price;
        }
        if(help === null){
            arr.push({
                id: id, name: description, amount:1,price: price, allPrice:price
            })
            pay+= price * amount;
        }
        this.setState({
            order:arr,
            toPay:pay,
            canPay:true
        })
    }

    addProductToPayOrder = (id,description,amount,price) =>{
        let wannaPay = this.state.order;
        let arr = this.state.toPayProducts;
        let help = null;
        let pay = 0;
        console.log(arr)
        console.log(wannaPay)
        console.log("asasas",wannaPay.length)
        for (let i = 0; i< arr.length; i++) {

            if(arr[i].id === id){
                console.log(arr[i])
                if(wannaPay.length===0){
                    console.log(wannaPay)
                    console.log("first time")
                    if(arr[i].amount === 1){
                        arr[i].amount = arr[i].amount - amount;
                        arr[i].allPrice = arr[i].price * arr[i].amount
                        wannaPay.push({
                            id: id, name: description, amount: 1, price: price, allPrice: price
                        })
                        arr.splice(i, i + 1)
                    }else {
                        arr[i].amount = arr[i].amount - amount;
                        arr[i].allPrice = arr[i].price * arr[i].amount
                        wannaPay.push({
                            id: id, name: description, amount: 1, price: price, allPrice: price
                        })
                    }
                    console.log(wannaPay)
                }else {
                    let length = wannaPay.length;
                    for (let j = 0; j < length; j++) {
                        console.log(wannaPay)
                        console.log(wannaPay[j].id)
                        console.log(id)
                        if (wannaPay[j].id === id) {
                            help = wannaPay[j];
                            console.log("FOUND")
                            if (arr[i].amount === 1) {
                                wannaPay[j].amount = wannaPay[j].amount + amount;
                                wannaPay[j].allPrice = wannaPay[j].price * wannaPay[j].amount
                                arr.splice(i, i + 1)
                            } else {
                                arr[i].amount = arr[i].amount - amount;
                                arr[i].allPrice = arr[i].price * arr[i].amount
                                wannaPay[j].amount = wannaPay[j].amount + amount;
                                wannaPay[j].allPrice = wannaPay[j].price * wannaPay[j].amount
                            }
                        }
                    }
                    if(help == null){
                        console.log(wannaPay)
                        console.log("not first, but after that")
                        arr[i].amount = arr[i].amount - amount;
                        arr[i].allPrice = arr[i].price * arr[i].amount
                        wannaPay.push({
                            id: id, name: description, amount: 1, price: price, allPrice: price
                        })
                    }
                }
            }
            console.log(arr)
            console.log(wannaPay)
            this.setState({
                order:wannaPay,
                toPayProducts:arr
            })
        }
    }
    addAllProductsToPay = () =>{
        console.log(this.state.order_old)
        let arr = this.state.order_old;
            let toPay = arr;
            arr = [];
            this.setState({
                toPayProducts:toPay,
                order:arr
            })

    }



    addProductToPay = (id,description,amount,price) =>{
        let arr = this.state.order;
        let wannaPay = this.state.toPayProducts;
        let help = null;
        let pay = 0;
        for (let i = 0; i< arr.length; i++) {

            if(arr[i].id === id){
                if(wannaPay.length===0){
                    console.log(wannaPay)
                    console.log("first time")
                    if(arr[i].amount === 1){
                        arr[i].amount = arr[i].amount - amount;
                        arr[i].allPrice = arr[i].price * arr[i].amount
                        wannaPay.push({
                            id: id, name: description, amount: 1, price: price, allPrice: price
                        })
                        arr.splice(i, i + 1)
                    }else {
                        arr[i].amount = arr[i].amount - amount;
                        arr[i].allPrice = arr[i].price * arr[i].amount
                        wannaPay.push({
                            id: id, name: description, amount: 1, price: price, allPrice: price
                        })
                    }

                    console.log(wannaPay)
                }else {
                    let length = wannaPay.length;
                    for (let j = 0; j < length; j++) {
                        console.log(wannaPay)
                        console.log(wannaPay[j].id)
                        console.log(id)
                        if (wannaPay[j].id === id) {
                            help = wannaPay[j];
                            console.log("FOUND")
                            if (arr[i].amount === 1) {
                                wannaPay[j].amount = wannaPay[j].amount + amount;
                                wannaPay[j].allPrice = wannaPay[j].price * wannaPay[j].amount
                                arr.splice(i, i + 1)
                            } else {
                                arr[i].amount = arr[i].amount - amount;
                                arr[i].allPrice = arr[i].price * arr[i].amount
                                wannaPay[j].amount = wannaPay[j].amount + amount;
                                wannaPay[j].allPrice = wannaPay[j].price * wannaPay[j].amount
                            }
                        }
                    }
                    if(help == null){
                            console.log(wannaPay)
                            console.log("not first, but after that")
                            arr[i].amount = arr[i].amount - amount;
                            arr[i].allPrice = arr[i].price * arr[i].amount
                            wannaPay.push({
                                id: id, name: description, amount: 1, price: price, allPrice: price
                            })
                    }
                }
            }

        this.setState({
            order:arr,
            toPayProducts:wannaPay
        })
        }
    }

    backSubCategories = () =>{
        this.setState({
            showCategories : false,
            showSubCategories: true,
            showProducts:false,
            categoriesID:this.state.categoriesIDOld
        })
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            this.setState({
                errorIsOpen:false
            })
        }
    };

    openError = () =>{
        this.setState({
            errorIsOpen:true
        })
    }
    handleDialogOpen = () =>{
        this.setState({
            dialogOpen:true
        })
    }
    handleDialogClose = () =>{
        this.setState({
            dialogOpen:false
        })
    }
    paySelectedProducts = () =>{
        let order = this.state.toPayProducts;
        let total = 0;
        if(order.length !== 0){
            for (let i = 0; i< order.length;i++){
                total+= order[i].price * order[i].amount;
            }
            console.log(total)
        }else{
            this.openError();
        }
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
                <List component="nav" aria-label="main mailbox folders" className={"border mb-5 "}>
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
                        addProductOrder={this.addProductToOrder}
                        categories={this.state.categoriesID}
                        backCategories={this.backSubCategories}
                    />
                    <PayProduct
                        showToPayProducts={this.state.showToPayProducts}
                        order={this.state.order}
                        addProductToPay={this.addProductToPay}
                    />
                </List>
                <List component="nav" aria-label="main mailbox folders" className={"border"}>
                    <OrderProducts
                        showOrderProducts={this.state.showOrderProducts}
                        order={this.state.order}
                        deleteProductOrder={this.deleteProductOutOrder}
                    />
                    <ToPayProduct
                        showToPayProducts={this.state.showPayProducts}
                        addProductOrder={this.addProductToPayOrder}
                        paying={this.state.paying}
                        addAllProductsToPay={this.addAllProductsToPay}
                        toPayProducts={this.state.toPayProducts}
                    />
                </List>
                <div className={this.state.visability}>
                    <Button className={"float-right m-2"} onClick={this.paySelectedProducts}>Kassieren</Button>
                </div>
                <Snackbar open={this.state.errorIsOpen} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                        Keine Produkte ausgewählt!!
                    </Alert>
                </Snackbar>

                <Dialog open={this.state.dialogOpen} onClose={this.handleDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates
                            occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDialogClosee} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>


                <Row className={"mt-1 text-center fixed-bottom"}>
                    <Col className={"m-3 col-3  text-center d-flex justify-content-center"}> Abbrechen<CloseIcon/>
                    </Col>
                    <Col className={"mt-3 col-2 text-center d-flex justify-content-center"}>
                        <PrintSharpIcon/>
                    </Col>
                    <Col className={"mt-3 col-2 text-center d-flex justify-content-center"}>
                        <LocalAtmIcon   onClick={this.showToPay}/>
                    </Col>
                    <Col className={"m-3 col-3 text-center d-flex justify-content-center"}>
                        <div> {this.state.toPay + " "} <EuroIcon /> </div>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default Order;