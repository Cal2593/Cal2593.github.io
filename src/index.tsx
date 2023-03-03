import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { ReservationDate } from './ReservationParts/ReservationDate';
import { TimeDropdown } from './ReservationParts/ReservationTime';
import { Signup } from './SignUpParts/SignUpForm';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './pages/error-page';
import { SignUp } from './pages/Signup';
import { SignIn } from './pages/Signin';
import { ContactUs } from './pages/ContactUs';
import { MyBookings } from './pages/MyBookings';

const container = document.getElementById('app-root')!
const root = createRoot(container);

class Main extends React.Component {
    render() {
        return(
            <>
                <div className="main">
                    <div className='leftHand'>
                        <ReservationDate />
                    </div>
                    <div className='rightHand'>
                        <Signup />
                    </div>
                </div>
            </>
        )
    }
    
};

const App = () => {
    return <Main/>
}


root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Root />} errorElement={<ErrorPage />} />,
            <Route path="/pages/Signin" element={<SignIn />} />
            <Route path="/pages/Signup" element={<SignUp />} />
            <Route path="/pages/ContactUs" element={<ContactUs />} />
            <Route path="/pages/MyBookings" element={<MyBookings />} />
        </Routes>
    </BrowserRouter>
)