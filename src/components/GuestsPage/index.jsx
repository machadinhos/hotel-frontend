import axios from 'axios';
import {useEffect, useState} from 'react';


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
        return (<ul>
            {guests.map((guest) => {
                return (<li key={guest.id}>
                    <h2>{guest.firstName}</h2>
                </li>);
            })}
        </ul>);
    }

    return (<div className="guests-page">
        <ul>
            {renderGuests()}
        </ul>
    </div>);
}

export default GuestsPage;