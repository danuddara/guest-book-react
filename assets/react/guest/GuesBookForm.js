import React, {useEffect, useState} from "react";
import axios from "axios";

export default function GuestBookForm({crsfToken, loadList}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('')
    const [browser, setBrowser] = useState('');


    useEffect(() => {
        checkBrowserInfo()
    }, []);

    const clearForm = () => {
        setName('')
        setEmail('')
        setAddress('')
        setMessage('')
        //document.getElementById("guest-book-form").reset();
        loadList()
    }

    const postGuest = () => {
        axios.post('/api/guest/new', {
            name: name,
            email: email,
            address: address,
            message: message,
            browser: browser,
            crsfToken: crsfToken
        }).then(guests => {
            clearForm()
        }).catch(error => {
            console.log('unexpected error occurred.Please try again later')
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postGuest()
        clearForm()
    }

    const checkBrowserInfo = () => {
        let browserName = function (agent) {
            let temp = '';
            switch (true) {
                case agent.indexOf("edge") > -1:
                    temp = "MS Edge";
                    break;
                case agent.indexOf("edg/") > -1:
                    temp = "Edge ( chromium based)";
                    break;
                case agent.indexOf("opr") > -1:
                    temp = "Opera";
                    break;
                case agent.indexOf("chrome") > -1 :
                    temp = "Chrome";
                    break;
                case agent.indexOf("trident") > -1:
                    temp = "MS IE";
                    break;
                case agent.indexOf("firefox") > -1:
                    temp = "Mozilla Firefox";
                    break;
                case agent.indexOf("safari") > -1:
                    temp = "Safari";
                    break;
                default:
                    temp = "other";
            }
            return temp
        };
        let browser = browserName(window.navigator.userAgent.toLowerCase());
        setBrowser(browser)
    }


    const form =
        <form onSubmit={e => handleSubmit(e)} id={'guest-book-form'}>
            <div className="form-group">
                <label>Name: </label>
                <input required={true} className="form-control" type="text" name="name" value={name}
                       onChange={e => setName(e.target.value)}/>

            </div>
            <div className="form-group">
                <label>Address: </label>
                <input className="form-control" type="text" name="address" value={address}
                       onChange={e => setAddress(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Email: </label>
                <input required={true} className="form-control" type="email" name="email" value={email}
                       onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Message:</label>
                <textarea className="form-control" name="message" rows={4} cols={50} value={message}
                          onChange={e => setMessage(e.target.value)}/>
            </div>
            <div className="form-group">
                <input type="submit" value="Submit" className="btn btn-primary"/>
            </div>
        </form>;

    return (
        form
    );

}