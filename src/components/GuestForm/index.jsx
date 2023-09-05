import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

const GuestForm = (props) => {
    const navigate = useNavigate();
    const [isCheckedIn, setCheckedIn] = useState(false);
    const [rooms, setRooms] = useState([]);

    const guest = props.guest;

    useEffect(() => {
        axios.get('http://localhost:8080/hotel/api/room/available')
                .then(response => setRooms(response.data.data))
                .then(() => {
                    if (guest.roomId) {
                        const roomGuest = axios.get('http://localhost:8080/hotel/api/room/' + guest.roomId)
                                .then(response => response.data.data)
                                .then(room => {
                                    setRooms([...rooms, room]);
                                });
                    }
                });
        setCheckedIn(guest.checkedIn);
        renderRoomsSelect();
    }, []);

    const renderRoomsSelect = () => {
        if (rooms.length === 0 || !isCheckedIn) {
            return;
        }

        return (<select id="roomSelect" className="form-select" aria-label="Guest">
            {rooms.map(room => (<option key={room.id} value={room.id}>{room.roomNumber}</option>))}
        </select>);
    };

    const handleSubmitClick = (event) => {
        event.preventDefault();

        const button = event.target;

        const id = button.form[0].value;
        const firstName = button.form[1].value;
        const lastName = button.form[2].value;
        const email = button.form[3].value;
        const phoneNumber = button.form[4].value;
        const checkedIn = !button.form[5].checked;
        let roomId;
        if (!checkedIn) {
            roomId = null;
        } else {
            roomId = button.form[7].value;
        }

        const guest = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            checkedIn: checkedIn,
            roomId: roomId
        };

        props.setGuest(guest);

        console.log(guest);

        axios[props.guestHttpRequestType](props.guestUrl, guest)
                .then(response => console.log(response))
                .then(() => navigate('/guests'))
                .catch(() => navigate('/guests'));
    };

    return (<>
        <h2>{props.guestFormTitle}</h2>
        <form className="col">
            <input type="hidden" value={guest.id} id="id"/>
            <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input type="text" className="form-control" defaultValue={guest.firstName} id="firstName"/>
            </div>
            <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-control" defaultValue={guest.lastName} id="lastName"/>
            </div>
            <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" defaultValue={guest.email} id="email"/>
            </div>
            <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input type="tel" className="form-control" defaultValue={guest.phoneNumber} id="phone"/>
            </div>
            <div className="col-md-6">
                <label className="form-label">Checked In</label>
                <div className="form-check">
                    <input onClick={() => setCheckedIn(false)} className="form-check-input" type="radio"
                           name="checkedIn"
                           id="false"
                           defaultChecked={!guest.checkedIn}/>
                    <label className="form-check-label" htmlFor="false">
                        false
                    </label>
                </div>
                <div className="form-check">
                    <input onClick={() => setCheckedIn(true)} className="form-check-input" type="radio"
                           name="checkedIn" id="true" defaultChecked={guest.checkedIn} disabled={!rooms.length > 0}/>
                    <div id="guestsSelectDiv">
                        <label className="form-check-label" htmlFor="true">
                            true
                        </label>
                        {renderRoomsSelect()}
                    </div>
                </div>
            </div>
            <div className="col-12">
                <button onClick={handleSubmitClick} type="submit" className="btn btn-primary" id="submitButton">Submit
                </button>
            </div>
        </form>
    </>);
}

export default GuestForm;