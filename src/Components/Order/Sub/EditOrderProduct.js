import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";
import Row from "react-bootstrap/Row";

class EditOrderProduct extends Component{
            state={
                product:""
            }

        handleClickOpen = () => {
            this.setState({
                dialogOpen: true
            })
        };

         handleClose = () => {
             this.setState({
                 dialogOpen: false
             })
        };


    render() {
        if(!this.props.isOpen){
            return "";
        }
        return (
            <div>
                <Dialog style={{minHeight: "75%"}} open={this.props.isOpen} onClose={this.handleClose}  fullWidth={true} maxWidth={"sm"} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Product-Edit</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Aktion auswählen
                        </DialogContentText>
                        <Row className={"d-flex justify-content-center"}>
                            <p>{this.props.amount_input + "x " + this.props.product.name}</p>
                        </Row>
                        <Row className={"d-flex justify-content-center"}>
                            <Button className={"w-50 m-1 border"}>
                                Produkt aus Liste löschen
                            </Button>
                        </Row>
                        <Row className={"d-flex justify-content-center"}>
                            {/*}
                            <FormGroup controlId="email"  >
                                <FormLabel>Anzahl:</FormLabel>
                                <FormControl
                                    type="number"
                                    min={1}
                                    autoComplete={"off"}
                                    name={"amount_input"}
                                    value={this.props.amount_input}
                                    onChange={this.props.onChangeIn}
                                />
                            </FormGroup>
                            */}
                        </Row>
                        <Row className={"d-flex justify-content-center"}>
                        <FormGroup controlId="email" >
                            <FormLabel>Bemerkung:</FormLabel>
                            <FormControl
                                placeholder={"Ihre Bemerkung"}
                                autoComplete={"off"}
                                type="text"
                                name={"EnteredNote"}
                                onChange={this.props.onChangeIn}
                                value={this.props.EnteredNote}
                            />
                        </FormGroup>
                        </Row>
                        <Row className={"d-flex justify-content-center"}>
                            <Button className={"w-50 m-1 border"}>
                               Alle ändern
                            </Button>
                        </Row>
                        <Row className={"d-flex justify-content-center"}>
                            <Button className={"w-75 m-1"}>
                                Einzeln ändern
                            </Button>
                        </Row>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EditOrderProduct;