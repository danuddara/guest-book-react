import React, {useEffect, useState} from "react";
import axios from "axios";
import GuestBookForm from "./GuesBookForm";

export default function GuestBookApp() {

    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(10);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);


    useEffect(() => {
        getGuests()
    }, [page]);

    const getGuests = () => {
        axios.get('/api/guest/list?p=' + page).then(guests => {
            setGuests(guests.data)
            setLoading(false)
        }).catch(error => {
            console.log(error.message)
        })

        axios.get('/api/guest/count').then(count => {
            setTotalRecords(count.data)
        }).catch(error => {
            console.log(error.message)
        })
    }

    const pageButtonClick = (event, key) => {
        setPage(key);
    }

    const guestBookForm = document.getElementById('guest-book-app-form')
    let token = guestBookForm.getAttribute("data-crsf-token");


    const records = guests.map((guest) =>
        <tr key={guest.id}>
            <td>{guest.id} </td>
            <td>{guest.name}</td>
            <td>{guest.email} </td>
            <td>{guest.address}</td>
            <td>{guest.message}</td>
            <td>{guest.browser}</td>
            <td>{guest.platform}</td>
            <td>{guest.ipAddress}</td>
        </tr>
    );

    let pagination = [];
    let paginationCount = totalRecords / pageCount
    for (let i = 0; i < paginationCount; i++) {
        let fkey = i + 1;
        pagination.push(<button className={"btn btn-warning m-1"} onClick={e => pageButtonClick(e, fkey)}
                                key={fkey}>{fkey}</button>)
    }

    const loadGuestList = () => {
        getGuests()
    }

    const table =
        <div>
            <div className={"row / mb-5"}>
                <GuestBookForm crsfToken={token} loadList={loadGuestList}/>
            </div>
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
                {records}
                </tbody>
            </table>
            <div>
                {pagination}
            </div>
        </div>;

    let show = loading ? 'loading...' : table;

    return (
        show
    );

}