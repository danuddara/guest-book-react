import React, {Component} from "react";
import axios from "axios";

export default class GuestBookForm extends Component{
    constructor(data) {
        console.log(data)
        super();
        this.state = { name: '', email: '' , address:'' , message:'' , browser: null , crsfToken: data.crsfToken};
    }

    componentDidMount() {
        this.checkBrowserInfo()
    }

    clearForm() {
        this.setState ({ name: '', email: '' , address:'' , message:''})
        document.getElementById("guest-book-form").reset();
        this.props.loadList()
    }

    postGuest() {
        axios.post('/api/guest/new',this.state).then(guests => {
            this.clearForm()
        }).catch(error=> {
            console.log('unexpected error occurred.Please try again later')
        });
    }

    handleChange(event,variable) {
        this.setState({[variable]: event.target.value});
    }

    handleSubmit= (e)=> {
        e.preventDefault()
        this.postGuest()
        this.clearForm()
    }

    checkBrowserInfo() {
        let browserName = function (agent) {
            let temp='';
            switch (true) {
                case agent.indexOf("edge") > -1: temp =  "MS Edge";break;
                case agent.indexOf("edg/") > -1: temp = "Edge ( chromium based)";break;
                case agent.indexOf("opr") > -1: temp = "Opera";break;
                case agent.indexOf("chrome") > -1 : temp = "Chrome";break;
                case agent.indexOf("trident") > -1: temp = "MS IE";break;
                case agent.indexOf("firefox") > -1: temp = "Mozilla Firefox";break;
                case agent.indexOf("safari") > -1: temp = "Safari";break;
                default: temp = "other";
            }
            return temp
        };
        let browser = browserName(window.navigator.userAgent.toLowerCase());
        this.setState({browser: browser});
    }

    render() {
        const form =
            <form onSubmit={e=>this.handleSubmit(e)} id={'guest-book-form'}>
                <div className="form-group">
                    <label>Name:  </label>
                    <input required={true} className="form-control" type="text" name="name" value={this.state.name} onChange={ e=>this.handleChange(e,'name')}/>

                </div>
                <div className="form-group">
                    <label>Address: </label>
                    <input className="form-control" type="text" name="address" value={this.state.address} onChange={e=>this.handleChange(e,'address')}/>
                </div>
                <div className="form-group">
                <label>Email: </label>
                <input required={true} className="form-control" type="email" name="email" value={this.state.email} onChange={e=>this.handleChange(e,'email')}/>
                </div>
                <div className="form-group">
                <label>Message:</label>
                <textarea className="form-control" name="message" rows={4} cols={50} value={this.state.message} onChange={e=>this.handleChange(e,'message')} />
                </div>
                <div className="form-group">
                <input type="submit" value="Submit" className="btn btn-primary" />
                </div>
            </form>;

        return (
            form
        );
    }
}