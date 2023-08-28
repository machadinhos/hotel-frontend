import axios from 'axios';
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


function GuestsPage() {
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/hotel/api/guests')
                .then(response => response.data)
                .then(guestList => setGuests(guestList));
    }, []);

    function renderGuests() {
        if (guests.length === 0) {
            return (<h2>There are no guests</h2>);
        }
        return (<>
            {guests.map((guest) => {
                return (<tr key={guest.id}>
                    <td>{guest.id}</td>
                    <td>{guest.firstName}</td>
                    <td>{guest.lastName}</td>
                    <td>{guest.email}</td>
                    <td>{guest.phoneNumber}</td>
                </tr>);
            })}
        </>);
    }

    return (<div className="guests-page">
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
            </tr>
            </thead>
            <tbody>
            {renderGuests()}
            </tbody>
        </table>
    </div>);
}

export default GuestsPage;