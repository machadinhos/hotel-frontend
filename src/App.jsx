import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NaveBar from './components/NaveBar/index.jsx';
import GuestsPage from './components/GuestsPage/index.jsx';
import RoomsPage from './components/RoomsPage/index.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import GuestForm from './components/GuestForm/index.jsx';
import {useState} from 'react';

const App = defaultValue => {

    const [guest, setGuest] = useState({});

    const updateGuest = (guest) => {
        setGuest(guest);
    };

    return (<>
        <Router>
            <h1 className="title">Hotel Management system</h1>
            <NaveBar/>
            <div className="mainContainer">
            <Routes>
                <Route path="/" element={<h1>Home</h1>}/>
                <Route path="/guestform" element={<GuestForm guest={guest}/>}/>
                <Route path="/guests" element={<GuestsPage setGuest={updateGuest}/>}/>
                <Route path="/rooms" element={<RoomsPage/>}/>
            </Routes>
            </div>
        </Router>
    </>);
}

export default App;