import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const GuestForm = (props) => {
    const navigate = useNavigate();

    const guest = props.guest;

    const handleSubmitClick = (event) => {
        event.preventDefault();

        const button = event.target;

        const id = button.form[0].value;
        const firstName = button.form[1].value;
        const lastName = button.form[2].value;
        const email = button.form[3].value;
        const phoneNumber = button.form[4].value;

        const guest = {
            id: id, firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber
        };

        props.setGuest(guest);

        axios[props.guestHttpRequestType](props.guestUrl, guest)
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
            <div className="col-12">
                <button onClick={handleSubmitClick} type="submit" className="btn btn-primary" id="submitButton">Submit
                </button>
            </div>
        </form>
    </>);
}

export default GuestForm;