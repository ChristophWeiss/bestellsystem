import React, { Component } from 'react';
import Keyboard from 'react-simple-keyboard';
import {Redirect} from "react-router-dom";
import 'react-simple-keyboard/build/css/index.css';
import './order_tableNrStyle.css'

class order_tableNr extends Component {
    state={
        tisch_nr: "",
        redirectToLink:false,
        redirect:""
    }

    addtoValue = (e) =>{
        let help = this.state.tisch_nr;
            console.log(e);
        let number = e;
        if(this.hasNumber(number)){
            help +=  number;
            this.setState({
                tisch_nr:help
            })
    }else{
        if(number=="DEL"){

            var valueshelp = this.state.tisch_nr;
            console.log(valueshelp,valueshelp.toString().length)
            if(valueshelp.toString().length > 0){
                if(valueshelp.toString().length == 1){
                    this.setState({
                        tisch_nr:""
                    })
                }else {
                    valueshelp = valueshelp.toString();
                    valueshelp = valueshelp.slice(0, -1);
                    valueshelp = parseInt(valueshelp);
                    this.setState({
                        tisch_nr:valueshelp
                    })
                }

            }

        }

    }
};
    hasNumber = (myString) => {
    return /\d/.test(myString);
};
     empty = (e) => {
        switch (e) {
            case "":
            case null:
            case false:
            case typeof(e) == "undefined":
                return true;
            default:
                return false;
        }
    }

    addValuefromInput = (e) =>{
        let value = parseInt(e.target.value);
        this.setState({
            tisch_nr:value
        })
    };
    handleSubmit = event => {
        event.preventDefault();
        if(!this.empty(this.state.tisch_nr)){
            console.log(this.state.tisch_nr)
            alert(this.state.tisch_nr)
            this.openOrderView(this.state.tisch_nr);
            this.setState({
                tisch_nr : ""
            })

        }

    }



    render(){
        const styleofButtons={
            fontSize: "25px",
            margin: "5px"
        }
        if (this.state.redirectToLink !== false) {
            console.log(<Redirect to={this.state.redirect}/>)
            return <Redirect to={this.state.redirect}/>;
        }


        return (
            <div className="container ">
                    <div className="father full_width">
                        <form onSubmit={this.handleSubmit} className={"child"}>
                            <table cellPadding="2" cellSpacing="2" border="0" c>
                                <tbody>
                                <tr>
                                    <td colSpan="3" align="center">
                                        <input type="number" value={this.state.tisch_nr} pattern="[0-9]" min={0} id="tisch" name="tisch_nr" style={{margin:"5px"}} size="20" onChange={this.addValuefromInput}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input type="button" id="1" defaultValue="  1  " style={styleofButtons}
                                               onClick={e => this.addtoValue(e.target.id)}/></td>
                                    <td><input type="Button" id="2" defaultValue="  2  " style={styleofButtons}
                                               onClick={e => this.addtoValue(e.target.id)}/></td>
                                    <td><input type="Button" id="3" defaultValue="  3  " style={styleofButtons}
                                               onClick={e => this.addtoValue(e.target.id)}/></td>
                                </tr>
                                <tr>
                                    <td><input type="Button" id="4" defaultValue="  4  " style={styleofButtons}
                                               onClick={e => this.addtoValue(e.target.id)}/></td>
                                    <td><input type="Button" id="5" defaultValue="  5  " style={styleofButtons}
                                               onClick={e => this.addtoValue(e.target.id)}/></td>
                                    <td><input type="Button" id="6" defaultValue="  6  " style={styleofButtons}
                                               onClick={e => this.addtoValue(e.target.id)}/></td>
                                </tr>
                                <tr>
                                    <td><input type="Button" id="7" defaultValue="  7  " style={styleofButtons}
                                               onClick={e => this.addtoValue(e.target.id)}/></td>
                                    <td><input type="Button" id="8" defaultValue="  8  " style={styleofButtons}
                                               onClick={e => this.addtoValue(e.target.id)}/></td>
                                    <td><input type="Button" id="9" defaultValue="  9  " style={styleofButtons}

                                               onClick={e => this.addtoValue(e.target.id)}/></td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="Submit" id="0" defaultValue="  ✓  " style={styleofButtons}
                                               data-toggle='modal' data-target='#myModal'/>
                                    </td>
                                    <td><input type="Button" id="0" defaultValue="  0  " style={styleofButtons}
                                               onClick={e => this.addtoValue(e.target.id)}/></td>
                                    <td><input type="Button" id="DEL" defaultValue=" ⌫ "
                                               style={styleofButtons} onClick={e => this.addtoValue(e.target.id)}/></td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
            </div>
        );
    }
    openOrderView = (id) => {
        this.setState({
            redirect: "./Order/" + id,
            redirectToLink: true
        })
    };
}
export default order_tableNr;