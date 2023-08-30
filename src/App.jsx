import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NaveBar from './components/NaveBar/index.jsx';
import GuestsPage from './components/GuestsPage/index.jsx';
import RoomsPage from './components/RoomsPage/index.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import GuestForm from './components/GuestForm/index.jsx';
import {useState} from 'react';
import RoomForm from './components/RoomForm/index.jsx';

const App = () => {
    const [guest, setGuest] = useState({});
    const [guestFormTitle, setGuestFormTitle] = useState('Add Guest');
    const [guestHttpRequestType, setGuestHttpRequestType] = useState('post');
    const [guestUrl, setGuestUrl] = useState('http://localhost:8080/hotel/api/guest');
    const [room, setRoom] = useState({});
    const [RoomFormTitle, setRoomFormTitle] = useState('Add Room');
    const [roomHttpRequestType, setRoomHttpRequestType] = useState('post');
    const [roomUrl, setRoomtUrl] = useState('http://localhost:8080/hotel/api/room');

    return (<>
        <Router>
            <h1 className="title">Hotel Management system</h1>
            <NaveBar/>
            <div className="mainContainer">
            <Routes>
                <Route path="/" element={<h1>Home</h1>}/>
                <Route path="/guestform"
                       element={<GuestForm guestUrl={guestUrl} guestHttpRequestType={guestHttpRequestType}
                                           guestFormTitle={guestFormTitle}
                                           setGuest={setGuest} guest={guest}/>}/>
                <Route path="/guests"
                       element={<GuestsPage setGuestUrl={setGuestUrl} setGuestHttpRequestType={setGuestHttpRequestType}
                                                           setGuestFormTitle={setGuestFormTitle}
                                                           setGuest={setGuest}/>}/>
                <Route path="/rooms" element={<RoomsPage setRoom={setRoom} setRoomFormTitle={setRoomFormTitle}
                                                         setRoomHttpRequestType={setRoomHttpRequestType}
                                                         setRoomUrl={setRoomtUrl}/>}/>
                <Route path="/roomform" element={<RoomForm roomUrl={roomUrl} roomHttpRequestType={roomHttpRequestType}
                                                           roomFormTitle={RoomFormTitle} setRoom={setRoom}
                                                           room={room}/>}/>
            </Routes>
            </div>
        </Router>
    </>);
}

export default App;