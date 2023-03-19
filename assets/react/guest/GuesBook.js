import React, {Component} from "react";
import axios from "axios";

export default class GuestBookApp extends Component{
    constructor() {
        super();
        this.state = { guests: [], loading: true , pageCount:10 , page:1 , totalRecords:0};
        console.log(this.state)
    }

    componentDidMount() {
        this.getGuests()
    }

    getGuests() {
        axios.get('/api/guest/list?p='+this.state.page).then(guests => {
            this.setState({guests:guests.data, loading:false })
        }).catch(error=> {
            console.log (error.message)
        })

        axios.get('/api/guest/count').then(count => {
            this.setState({totalRecords:count.data })
        }).catch(error=> {
            console.log(error.message)
        })
    }

    pageButtonClick= (event,key)=> {
        this.state.page = key;
        this.getGuests()
    }

    render() {
        const loading = this.state.loading;
        const records = this.state.guests.map((guest)=>
            <tr key={guest.id}>
                <td>{ guest.id } </td>
                <td>{ guest.name }</td>
                <td>{ guest.email } </td>
                <td>{ guest.address }</td>
                <td>{ guest.message }</td>
                <td>{ guest.browser }</td>
                <td>{ guest.platform }</td>
                <td>{ guest.ipAddress }</td>
            </tr>
        );

        let pagination = [];
        let paginationCount = this.state.totalRecords/this.state.pageCount
        for (let i=0 ; i < paginationCount ;i++) {
            let fkey = i+1;
            pagination.push(<button className={"btn btn-warning m-1"} onClick={ e => this.pageButtonClick(e,fkey)} key={fkey} >{fkey}</button>)
        }

        const table =
            <div>
            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Message</th>
                    <th>Browser</th>
                    <th>Platform</th>
                    <th>IP Address</th>
                </tr>
                </thead>
                <tbody>
                { records }
                </tbody>
            </table>
                <div>
                {pagination}
                </div>
            </div>;

        let show  = loading ? 'loading...' : table;

        return (
            show
        );
    }
}