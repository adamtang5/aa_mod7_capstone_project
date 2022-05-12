import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import SplashHeader from "./SplashHeader";
import './SplashPage.css';

const SplashPage = () => {
    return (
        <div className="page-container">
            <header className="centered fixed">
                <SplashHeader />
            </header>
            <main className="centered">
                <div className="splash-banner">
                    Splash Banner Goes Here
                </div>
            </main>
        </div>
    )
};

export default SplashPage;
