import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./css/login.css"
import Row from "react-bootstrap/Row";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="Login father full_height">

            <form onSubmit={handleSubmit} className={""}>
                <Row>
                    <img className={"roundedBorders"} src={"./img/logo-placeholder.png"} alt={"LOGO"}/>
                </Row>
               <Row>
                   <FormGroup controlId="email" bsSize="large" >
                       <FormLabel>Email</FormLabel>
                       <FormControl
                           autoFocus
                           type="email"
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                       />
                   </FormGroup>
               </Row>
               <Row>
                   <FormGroup controlId="password" bsSize="large" >
                       <FormLabel>Password</FormLabel>
                       <FormControl
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           type="password"
                       />
                   </FormGroup>
               </Row>
                <Row className={"d-flex justify-content-center"}>


                    <Button block bsSize="large" disabled={!validateForm()} type="submit" className={"w-75"}>
                        Login
                    </Button>
                </Row>
            </form>
        </div>
    );
}