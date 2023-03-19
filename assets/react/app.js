import React from "react";
import GuestBookApp from "./guest/GuesBook";
import * as ReactDOMClient from 'react-dom/client';
import GuestBookForm from "./guest/GuesBookForm";

// --------------------------------------------------------
// load guest book list
// --------------------------------------------------------
const guestBook= document.getElementById('guest-book-app')
if (guestBook) {
    const rootGuestBook = ReactDOMClient.createRoot(guestBook)
    rootGuestBook.render(<GuestBookApp/>);
}

