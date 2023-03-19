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

/**
 *
 * @type {HTMLElement}
 */
const guestBookForm= document.getElementById('guest-book-app-form')
if (guestBookForm) {
    const rootGuestBook = ReactDOMClient.createRoot(guestBookForm)
    let token = guestBookForm.getAttribute("data-crsf-token");
    rootGuestBook.render(<GuestBookForm crsfToken={token}/>);
}

