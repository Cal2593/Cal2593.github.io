import React from "react";
import './root.css';
import { ReservationSelector } from "../ReservationParts/ReservationSelector";

export default function Root() {
    return (
      <>
        <div id="sidebar">
          <h1>Cars...so many cars</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <form method="post">
              <button type="submit">New</button>
            </form>
          </div>
          <nav>
            <ul>
              <li>
                <a href={`/pages/Signup`}>Create Account</a>
              </li>
              <li>
                <a href={`/pages/Signin`}>Sign In</a>
              </li>
              <li>
                <a href={`/pages/ContactUs`}>Contact Us</a>
              </li>
              <li>
                <a href={`/pages/MyBookings`}>MyBookings</a>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail"></div>
        <div className="res-select">
          <ReservationSelector />
        </div>
      </>
    );
  }