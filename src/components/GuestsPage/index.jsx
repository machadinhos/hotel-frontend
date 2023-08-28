import axios from 'axios';
import {useEffect, useState} from 'react';


function GuestsPage() {
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/hotel/api/guests')
                .then(response => response.data)
                .then(guestList => setGuests(guestList));
    }, []);

    console.log(guests);

    return (<div className="guests-page">
        <ul>
            {guests.map((guest) => {
                return (<li key={guest.id}>
                    <h2>{guest.firstName}</h2>
                </li>);
            })}
        </ul>
    </div>);
}

export default GuestsPage;