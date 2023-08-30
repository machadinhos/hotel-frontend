import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NaveBar from './components/NaveBar/index.jsx';
import GuestsPage from './components/GuestsPage/index.jsx';
import RoomsPage from './components/RoomsPage/index.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import GuestForm from './components/GuestForm/index.jsx';
import {useState} from 'react';

const App = () => {
    const [guest, setGuest] = useState({});
    const [guestFormTitle, setGuestFormTitle] = useState('Add Guest');
    const [httpRequestType, setHttpRequestType] = useState('post');
    const [url, setUrl] = useState('http://localhost:8080/hotel/api/guest');

    return (<>
        <Router>
            <h1 className="title">Hotel Management system</h1>
            <NaveBar/>
            <div className="mainContainer">
            <Routes>
                <Route path="/" element={<h1>Home</h1>}/>
                <Route path="/guestform"
                       element={<GuestForm url={url} httpRequestType={httpRequestType} guestFormTitle={guestFormTitle}
                                           setGuest={setGuest} guest={guest}/>}/>
                <Route path="/guests" element={<GuestsPage setUrl={setUrl} setHttpRequestType={setHttpRequestType}
                                                           setGuestFormTitle={setGuestFormTitle}
                                                           setGuest={setGuest}/>}/>
                <Route path="/rooms" element={<RoomsPage/>}/>
            </Routes>
            </div>
        </Router>
    </>);
}

export default App;