import axios from 'axios';
import {useEffect, useState} from 'react';


function RoomsPage() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/hotel/api/rooms')
            .then(response => response.data)
            .then(roomsList => setRooms(roomsList));
    }, []);

    function renderRooms() {
        if (rooms.length === 0) {
            return (<h2>There are no rooms</h2>);
        }
        return (<ul>
            {rooms.map((room) => {
                return (<li key={room.id}>
                    <h2>{room.id}</h2>
                </li>);
            })}
        </ul>);

    }

    return (<div>
        <ul>
            {renderRooms()}
        </ul>
    </div>);
}

export default RoomsPage;