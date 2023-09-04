import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useEffect, useState} from 'react';
import './style.css';

const RoomForm = (props) => {
    const navigate = useNavigate();
    const [isAvailable, setAvailable] = useState(true);
    const [guests, setGuests] = useState([]);

    const room = props.room;

    if (room.available === undefined) {
        room.available = true;
    }

    useEffect(() => {
        axios.get('http://localhost:8080/hotel/api/guests')
                .then(response => setGuests(response.data.data));
    }, []);

    const renderGuestsSelect = () => {
        if (guests.length === 0 || isAvailable) {
            return;
        }

        return (<select id="guestSelect" className="form-select" aria-label="Guest">
            {guests.map(guest => (<option key={guest.id} value={guest.id}>{guest.firstName} {guest.lastName}</option>))}
        </select>);
    };

    const handleSubmitClick = (event) => {
        event.preventDefault();

        const button = event.target;

        const id = button.form[0].value;
        const roomNumber = button.form[1].value;
        const price = button.form[2].value;
        const roomType = button.form[3].value;

        const room = {
            id: id, roomNumber: roomNumber, price: price, roomType: roomType, available: isAvailable
        };

        props.setRoom(room);

        axios[props.roomHttpRequestType](props.roomUrl, room)
                .then(() => navigate('/rooms'))
                .catch(() => navigate('/rooms'));
    };

    return (<>
        <h2>{props.roomFormTitle}</h2>
        <form className="col">
            <input type="hidden" value={room.id} id="id"/>
            <div className="col-md-6">
                <label className="form-label">Room Number</label>
                <input type="number" min="1" className="form-control" defaultValue={room.roomNumber} id="firstName"/>
            </div>
            <div className="col-md-6">
                <label className="form-label">Price</label>
                <input type="number" min="0" className="form-control" defaultValue={room.price} id="lastName"/>
            </div>
            <div className="col-md-6">
                <label className="form-label">Room Type</label>
                <select className="form-select" aria-label="Room Type">
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                </select>
            </div>
            <div className="col-md-6">
                <label className="form-label">Available</label>
                <div className="form-check">
                    <input onClick={() => setAvailable(true)} className="form-check-input" type="radio" name="available"
                           id="true"
                           defaultChecked={room.available}/>
                    <label className="form-check-label" htmlFor="true">
                        true
                    </label>
                </div>
                <div className="form-check">
                    <input onClick={() => setAvailable(false)} className="form-check-input" type="radio"
                           name="available" id="false" defaultChecked={!room.available}/>
                    <div id="guestsSelectDiv">
                        <label className="form-check-label" htmlFor="false">
                            false
                        </label>
                        {renderGuestsSelect()}
                    </div>
                </div>
            </div>
            <div className="col-12">
                <button onClick={handleSubmitClick} type="submit" className="btn btn-primary" id="submitButton">Submit
                </button>
            </div>
        </form>
    </>);
};

export default RoomForm;