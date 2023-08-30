import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const RoomForm = (props) => {
    const navigate = useNavigate();

    const room = props.room;

    const handleSubmitClick = (event) => {
        event.preventDefault();

        const button = event.target;

        const id = button.form[0].value;
        const roomNumber = button.form[1].value;
        const price = button.form[2].value;
        const roomType = button.form[3].value;
        const available = button.form[4].value;

        const room = {
            id: id, roomNumber: roomNumber, price: price, roomType: roomType, available: available
        };

        props.setRoom(room);

        console.log(room);

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
                <select className="form-select" aria-label="Available">
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>
            <div className="col-12">
                <button onClick={handleSubmitClick} type="submit" className="btn btn-primary" id="submitButton">Submit
                </button>
            </div>
        </form>
    </>);

};

export default RoomForm;