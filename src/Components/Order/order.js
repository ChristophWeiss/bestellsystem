import React, {Component} from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from "@material-ui/core/Avatar";
import {Col, Row, Button} from "react-bootstrap"
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
import {Redirect} from "react-router-dom";
import Product from "./Sub/Models/Product"

import DialogActions from "@material-ui/core/DialogActions";
import EditOrderProduct from "./Sub/EditOrderProduct";

class Order extends Component {
    state = {
        token: localStorage.getItem('token'),
        waiter_name: "Lukas",
        amount: 1,
        redirect: "",
        redirectToLink: false,
        categories: [
            {id: 1, description: "Essen"},
            {id: 2, description: "Trinken"},
            {id: 3, description: "Desert"},
            {id: 4, description: "Alkohol"}
        ],
        subcategories: [
            {id: 1, description: "Nudeln", categories_id: 1},
            {id: 2, description: "Burger", categories_id: 1},
            {id: 3, description: "SoftAlkohol", categories_id: 4},
            {id: 4, description: "HardAlkohol", categories_id: 4},
            {id: 5, description: "Saft", categories_id: 2}
        ],
        product_data: [
            {id: 1, name: "Bier", sizes_id: "klein", categories_id: 3, available: 1000, price: 2.5},
            {id: 2, name: "Vodka", sizes_id: "shot", categories_id: 4, available: 1000, price: 1},
            {id: 3, name: "Burger", sizes_id: "groß", categories_id: 2, available: 1000, price: 20},
            {id: 4, name: "Cola", sizes_id: "groß", categories_id: 5, available: 1000, price: 4.5}
        ],
        note_data: [],
        products_converted: [],
        showCategories: true, //To show CategoriesList
        showSubCategories: false, //To show SubCategoriesList
        showOrderProducts: true, //To show toOrderProductList
        showProducts: false, //To show show ProductsList
        toPayProducts: [], //Products that are in cart
        showToPayProducts: false, //show ProductsThat are to be Payed
        showPayProducts: false, //showProductsFormProducts
        order: [], // show items that are ordered
        toPay: 0, //total to pay for ordered Products
        toPayAfterPayed: 0, //total to BePayed that are selected
        categoriesID: null, //save categories so if you wont go back it knows where you where
        categoriesIDOld: null, //save categories when it gets  changed
        canPay: false, //gets true when you have selected at least one product
        paying: false, //gets true when you are in the paying context
        order_old: [], //saves order to this variable to use it later
        toPayAfterKassieren: 0, //total that is to Pay after you payed some payOrderedProducts but not all
        insertedToPay: 0, //saves the entered Total the waiter gets
        visability: "invisible", //gets true to show button "kassieren" when he gets to the payOrderedProducts
        dialogOpen: false, //toOpen Dialog
        toPayOk: false,
        dialogEditOpen: false,
        product_toEdit: "",
        EnteredNote: "",
        amount_input: 0

    }

    componentDidMount() {
        // //console.log(this.props.match.params.table_nr);
        this.setState({
            tisch_nr: this.props.match.params.table_nr
        })
        this.saveProduct_intoArray();
    }

    saveNoteToState = (arr) => {
        this.setState({
            note_data: arr
        })
    }

    saveProduct_intoArray = () => {
        var products_data = this.state.product_data;
        var array_product = this.state.products_converted;
        var i = 0;
        var length = products_data.length
        for (i; i < length; i++) {
            var x = new Product(products_data[i].id, products_data[i].name, products_data[i].sizes_id, products_data[i].categories_id, products_data[i].available, products_data[i].price);
            array_product.push(x)
        }
        // //console.log(array_product);
        this.setState({
            products_converted: array_product
        })
    }
    openNewBestellung = () => {
        if (this.state.order.length === 0) {
            this.setState({redirectToLink: "/loggedin/Order"})
        }
    }
    showSubCategories = (id) => {
        // //console.log(id)
        this.setState({
            showCategories: false,
            showSubCategories: true,
            showProducts: false,
            showPayProducts: false,
            showToPayProducts: false,
            categoriesID: id
        })
    }
    showProducts = (id) => {
        // //console.log(id)
        this.setState({
            showCategories: false,
            showSubCategories: false,
            showToPayProducts: false,
            showPayProducts: false,
            showProducts: true,
            categoriesIDOld: this.state.categoriesID,
            categoriesID: id
        })
    }
    backCategories = () => {
        this.setState({
            showCategories: true,
            showProducts: false,
            showToPayProducts: false,
            showPayProducts: false,
            showSubCategories: false
        })
    }
    onChangeInputAmount = (event) => {
        if (!isNaN(event.target.value)) {
            var num = parseInt(event.target.value)
            // //console.log(num)
            this.setState({
                amount: num
            })

        }
    }
    onEnterRegisterProduct = (v) => {
        // //console.log("hey")
        // //console.log(this.state.amount)
        this.addProductToOrder(v, this.state.amount);
    }
    deleteProductOutOrder = (v, amount) => {
        let arr = this.state.order;
        let help = null;
        let pay = 0;
        // //console.log(arr.length)
        if (arr.length !== 0) {
            // //console.log("del")
            for (let i = 0; i < arr.length; i++) {

                if (arr[i].id === v.id) {
                    if (arr[i].amount === 1) {
                        arr.splice(i, i + 1)
                    } else {
                        help = arr[i];
                        arr[i].amount = arr[i].amount - amount;
                        arr[i].allPrice = arr[i].price * arr[i].amount
                        let product_price = arr[i].price * arr[i].amount;
                        pay += product_price;
                    }
                }

            }

            this.setState({
                order: arr,
                toPay: pay,
                canPay: true
            })
        } else {
            // //console.log("del")
            this.setState({
                canPay: false
            })
        }

    }

    showToPay = () => {
        if (this.state.canPay) {
            // //console.log("i wanna pay")
            // //console.log(this.state.order)
            this.setState({
                paying: true,
                showCategories: false,
                showProducts: false,
                showOrderProducts: false,
                showToPayProducts: true,
                showSubCategories: false,
                showPayProducts: true,
                errorIsOpen: false,
                order_old: this.state.order,
                visability: "visible"
            })
        } else {
            this.setState({
                errorIsOpen: true
            })
        }
    }
    addProductToOrder = (v, amount) => {
        let arr = this.state.order;
        // //console.log(v)
        // //console.log(arr)
        let help = null;
        let pay = 0;
        for (let i = 0; i < arr.length; i++) {

            if (arr[i].id === v.id) {
                help = arr[i];
                ////console.log(help)
                ////console.log("amount", arr[i].amount + amount);
                ////console.log("allPrice", arr[i].price * arr[i].amount)
                arr[i].amount = arr[i].amount + amount;
                arr[i].allPrice = arr[i].price * arr[i].amount
            }
            let product_price = arr[i].price * arr[i].amount;
            pay += product_price;
        }
        if (help === null) {
            if (v.amount !== 1) {
                ////console.log(amount)
                let priceAll = amount * v.price;
                arr.push({
                    id: v.id, name: v.name, amount: amount, price: v.price, allPrice: priceAll
                })
            } else {
                arr.push({
                    id: v.id, name: v.name, amount: 1, price: v.price, allPrice: v.price
                })
            }

            pay += v.price * amount;
        }
        ////console.log("pay1", this.state.canPay)
        this.setState({
            order: arr,
            toPay: pay,
            canPay: true,
            amount: 1
        })
        ////console.log("pay", this.state.canPay)
    }
    addNoteToProduct = (product) => {
        let notes = this.state.note_data;
        let order = this.state.order;
        let i = 0;
        var counter = 0;
        let length = notes.length
        var index;
        console.log(product)
        if (length > 0) {
            for (i; i < length; i++) {
                for (var j = 0; j < order.length; j++) {
                    if (product.id === order[j].id) {
                        if (order[j].amount > 1) {
                            order[j].amount--;
                        } else {
                            order.splice(j, j + 1)
                        }
                        if (notes[i].product_id === product.id) {
                            counter++;
                            index = i;
                            console.log("same NOte")
                        }
                    }
                }

            }
            if (counter > 0) {
                if (notes[index].note === this.state.EnteredNote) {
                    notes[index].amount++;
                    notes[index].allPrice = notes[index].price * notes[index].amount
                } else {
                    notes.push(
                        {
                            id: notes[notes.length - 1].id++,
                            product_id: product.id,
                            note: this.state.EnteredNote,
                            amount: 1,
                            amount_used: 0,
                            price: product.price,
                            allPrice: product.price * 1
                        }
                    )
                }
            } else {
                console.log("newNote")
                console.log(this.state.EnteredNote)
                notes.push(
                    {
                        id: notes[notes.length - 1].id++,
                        product_id: product.id,
                        note: this.state.EnteredNote,
                        amount: 1,
                        amount_used: 0,
                        price: product.price,
                        allPrice: product.price * 1
                    }
                )
            }
        } else {
            for (var j = 0; j < order.length; j++) {
                if (product.id === order[j].id) {
                    if (order[j].amount > 1) {
                        order[j].amount--;
                    } else {
                        console.log("del")
                        order.splice(j, j + 1)
                    }
                    notes.push(
                        {
                            id: 1,
                            product_id: product.id,
                            note: this.state.EnteredNote,
                            amount: 1,
                            amount_used: 0,
                            price: product.price,
                            allPrice: product.price * 1
                        }
                    )
                }
            }
        }
        console.table(order)
        console.table(notes)
        this.setState({
            order: order,
            note_data: notes,
            dialogEditOpen: false,
            EnteredNote: ""
        })

    }
    addNoteToProducts = () => {
        //console.log("more products_converted")
    }

    addProductToPayOrder = (v, amount) => {
        let wannaPay = this.state.order;
        let arr = this.state.toPayProducts;
        let help = null;
        let pay = 0;
        //console.log(arr)
        //console.log(wannaPay)
        //console.log("asasas", wannaPay.length)
        for (let i = 0; i < arr.length; i++) {

            if (arr[i].id === v.id) {
                //console.log(arr[i])
                if (wannaPay.length === 0) {
                    //console.log(wannaPay)
                    //console.log("first time")
                    if (arr[i].amount === 1) {
                        arr[i].amount = arr[i].amount - amount;
                        arr[i].allPrice = arr[i].price * arr[i].amount
                        wannaPay.push({
                            id: v.id, name: v.name, amount: 1, price: v.price, allPrice: v.price
                        })
                        arr.splice(i, i + 1)
                    } else {
                        arr[i].amount = arr[i].amount - amount;
                        arr[i].allPrice = arr[i].price * arr[i].amount
                        wannaPay.push({
                            id: v.id, name: v.name, amount: 1, price: v.price, allPrice: v.price
                        })
                    }
                    //console.log(wannaPay)
                } else {
                    let length = wannaPay.length;
                    for (let j = 0; j < length; j++) {
                        //console.log(wannaPay)
                        //console.log(wannaPay[j].id)
                        //console.log(v.id)
                        if (wannaPay[j].id === v.id) {
                            help = wannaPay[j];
                            //console.log("FOUND")
                            if (arr[i].amount === 1) {
                                wannaPay[j].amount = wannaPay[j].amount + amount;
                                wannaPay[j].allPrice = wannaPay[j].price * wannaPay[j].amount
                                arr.splice(i, i + 1)
                            } else {
                                arr[i].amount = arr[i].amount - amount;
                                arr[i].allPrice = arr[i].price * arr[i].amount
                                wannaPay[j].amount = wannaPay[j].amount + amount;
                                wannaPay[j].allPrice = wannaPay[j].price * wannaPay[j].amount;
                            }
                        }
                    }
                    if (help == null) {
                        //console.log(wannaPay)
                        //console.log("not first, but after that")
                        arr[i].amount = arr[i].amount - amount;
                        arr[i].allPrice = arr[i].price * arr[i].amount
                        wannaPay.push({
                            id: v.id, name: v.name, amount: 1, price: v.price, allPrice: v.price
                        })
                    }
                }
            }
            //console.log(arr)
            //console.log(wannaPay)
            this.getTotalOfToPay();
            this.setState({
                order: wannaPay,
                toPayProducts: arr
            })

        }

    }
    addAllProductsToPay = () => {
        //console.log(this.state.order_old)
        let arr = this.state.order_old;
        let toPay = arr;
        arr = [];
        this.setState({
            toPayProducts: toPay,
            order: arr
        })

    }


    addProductToPay = (v, amount) => {
        let arr = this.state.order;
        let wannaPay = this.state.toPayProducts;
        let help = null;
        let pay = 0;
        for (let i = 0; i < arr.length; i++) {

            if (arr[i].id === v.id) {
                if (wannaPay.length === 0) {
                    //console.log(wannaPay)
                    //console.log("first time")
                    if (arr[i].amount === 1) {
                        arr[i].amount = arr[i].amount - amount;
                        arr[i].allPrice = arr[i].price * arr[i].amount
                        wannaPay.push({
                            id: v.id, name: v.name, amount: 1, price: v.price, allPrice: v.price
                        })
                        arr.splice(i, i + 1)
                    } else {
                        arr[i].amount = arr[i].amount - amount;
                        arr[i].allPrice = arr[i].price * arr[i].amount
                        wannaPay.push({
                            id: v.id, name: v.name, amount: 1, price: v.price, allPrice: v.price
                        })
                    }
                    this.getTotalOfToPay();
                    //console.log(wannaPay)
                } else {
                    let length = wannaPay.length;
                    for (let j = 0; j < length; j++) {
                        //console.log(wannaPay)
                        //console.log(wannaPay[j].id)
                        //console.log(v.id)
                        if (wannaPay[j].id === v.id) {
                            help = wannaPay[j];
                            //console.log("FOUND")
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
                    if (help == null) {
                        //console.log(wannaPay)
                        //console.log("not first, but after that")
                        arr[i].amount = arr[i].amount - amount;
                        arr[i].allPrice = arr[i].price * arr[i].amount
                        wannaPay.push({
                            id: v.id, name: v.name, amount: 1, price: v.price, allPrice: v.price
                        })
                    }
                }
            }
            //console.log("helpME")
            //console.log(arr)
            this.getTotalOfToPay();
            this.setState({
                order: arr,
                toPayProducts: wannaPay
            })

        }
    }

    backSubCategories = () => {
        this.setState({
            showCategories: false,
            showSubCategories: true,
            showProducts: false,
            categoriesID: this.state.categoriesIDOld
        })
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            this.setState({
                errorIsOpen: false
            })
        }
    };

    openError = () => {
        this.setState({
            errorIsOpen: true
        })
    }
    handleDialogOpen = () => {
        this.setState({
            dialogOpen: true
        })
    }
    handleDialogClose = () => {
        this.setState({
            dialogOpen: false
        })
    }
    handleDialogEditClose = () => {
        this.setState({
            dialogEditOpen: false
        })
    }
    getTotalOfToPay = () => {
        let order = this.state.toPayProducts;
        let total = 0;
        if (order.length !== 0) {
            for (let i = 0; i < order.length; i++) {
                total += order[i].price * order[i].amount;
            }
            //console.log("tatsats", total)
            let toPay = this.state.toPay;
            let help = toPay - total
            this.setState({
                toPayAfterKassieren: total
            });
        } else {
            this.setState({
                toPayAfterKassieren: 0
            });
        }
    }
    paySelectedProducts = () => {
        let order = this.state.toPayProducts;
        let total = 0;
        if (order.length !== 0) {
            for (let i = 0; i < order.length; i++) {
                total += order[i].price * order[i].amount;
            }
            //console.log(total)
            let toPay = this.state.toPay;
            let help = toPay - total
            this.setState({
                toPayAfterKassieren: total,
                toPayAfterPayed: help
            })

            this.handleDialogOpen();


        } else {
            this.openError();
        }
    }
    OpenDialogWithData = (product) => {
        this.setState({
            product_toEdit: product,
            dialogEditOpen: true,
            amount_input: product.amount
        })
    }

    render() {
        if (this.state.redirectToLink != false) {
            return <Redirect to={this.state.redirectToLink}/>;
        }

        return (
            <div className={"w-100 h-100 container"}>
                <Row className={"mt-1text-center"}>
                    <Col className={"m-2 mt-4 col-4 mr-2 text-center d-flex justify-content-center"}> <Logout/> Logout
                    </Col>
                    <Col className={"mt-3  text-center d-flex justify-content-center"}>
                        <Avatar
                            onClick={() => this.openNewBestellung()}>{this.props.match.params.table_nr}</Avatar></Col>
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
                        products={this.state.products_converted}
                        addProductOrder={this.addProductToOrder}
                        categories={this.state.categoriesID}
                        addAmount={this.onEnterRegisterProduct}
                        changeAmount={this.onChangeInputAmount}
                        backCategories={this.backSubCategories}
                        amount={this.state.amount}
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
                        products={this.state.product_data}
                        notes={this.state.note_data}
                        saveNoteToState={this.saveNoteToState}
                        deleteFromOrder={this.deleteProductOutOrder}
                        showEditDialog={this.OpenDialogWithData}
                    />
                    <ToPayProduct
                        showToPayProducts={this.state.showPayProducts}
                        addProductOrder={this.addProductToPayOrder}
                        paying={this.state.paying}
                        totalPrice={this.state.toPayAfterKassieren}
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
                <EditOrderProduct
                    isOpen={this.state.dialogEditOpen}
                    product={this.state.product_toEdit}
                    onChangeIn={this.onChangeInput}
                    addOneNote={this.addNoteToProduct}
                    addMoreNote={this.addNoteToProducts}
                    handleClose={this.handleDialogEditClose}
                    EnteredNote={this.state.EnteredNote}
                    amount_input={this.state.amount_input}
                />
                <Dialog open={this.state.dialogOpen} fullWidth={true} maxWidth={'xs'} onClose={this.handleDialogClose}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Kassieren</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Wechselgeldrechner
                        </DialogContentText>
                        <div className={"w-100"}>
                            <table className={"table_border w-100"}>
                                <tbody>
                                <tr>
                                    <td>Zu zahlen:</td>
                                    <td>
                                        <span>{this.state.toPayAfterKassieren} €</span>
                                    </td>
                                    <td>
                                        <span>Bezahlt: </span>
                                    </td>
                                    <td>
                                        <input ref={"input"} type="number" className={"input_width_order"}
                                               name={"insertedToPay"} onChange={this.onChangeInput} autoFocus={true}
                                               onKeyDown={this.onEnterDisabledFocus} data-mini="true"
                                               placeholder="20,00 €"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Zurück</td>
                                    <td>
                                        <span><b>{this.getBackIfEnteredToWechselGeld()} €</b></span>
                                    </td>
                                    <td>
                                        <span>Zielbetrag: </span>
                                    </td>
                                    <td>
                                        <input type="text" className={"input_width_order"}
                                               value={this.state.toPayAfterKassieren + " €"} data-mini="true"
                                               disabled={true} placeholder="0,00 €"/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose} color="primary">
                            Abbrechen
                        </Button>
                        <Button onClick={this.handleDialogKassieren} disabled={this.canPressKassieren()}
                                color="primary">
                            Kassieren
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
                        <LocalAtmIcon onClick={this.showToPay}/>
                    </Col>
                    <Col className={"m-3 col-3 text-center d-flex justify-content-center"}>
                        <div> {this.state.toPay + " "} <EuroIcon/></div>
                    </Col>
                </Row>

            </div>
        )
    }

    onChangeInput = (e) => {
        let value = e.target.value;
        this.setState({
            [e.target.name]: value
        })
    }
    round = (wert, dez) => {
        wert = parseFloat(wert);
        if (!wert) return 0;
        dez = parseInt(dez);
        if (!dez) dez = 0;

        var umrechnungsfaktor = Math.pow(10, dez);

        return Math.round(wert * umrechnungsfaktor) / umrechnungsfaktor;
    }
    onEnterDisabledFocus = (e) => {
        if (e.key === 'Enter') {
            let help = this.state.insertedToPay - this.state.toPayAfterKassieren;
            if (help >= 0) {
                this.refs.input.blur()
            }

        }
    }
    getBackIfEnteredToWechselGeld = () => {
        if (this.state.insertedToPay !== 0) {
            let help = this.state.insertedToPay - this.state.toPayAfterKassieren;
            if (help >= 0) {
                return this.round(help, 2);
            } else {
                return "Zu wenig"
            }

        } else {
            return "?"
        }
    }
    canPressKassieren = () => {
        if (this.state.insertedToPay !== 0) {
            let help = this.state.insertedToPay - this.state.toPayAfterKassieren;
            if (help >= 0) {
                return false
            }
        } else {
            return true;
        }
    }
    handleDialogKassieren = () => {
        if (this.state.insertedToPay !== 0) {
            let help = this.state.insertedToPay - this.state.toPayAfterKassieren;
            if (help >= 0) {
                this.handleDialogClose();
                if (this.state.order.length !== 0) {
                    this.setState({
                        toPayProducts: [],
                        toPay: this.state.toPayAfterPayed,
                        insertedToPay: 0,
                        toPayAfterKassieren: 0
                    })
                } else {
                    this.setState({
                        toPayProducts: [],
                        toPay: 0,
                        insertedToPay: 0,
                        visability: "invisible",
                        showOrderProducts: true,
                        toPayAfterKassieren: 0
                    })
                    this.backCategories();
                }


            }
        } else {

        }
    }
}

export default Order;