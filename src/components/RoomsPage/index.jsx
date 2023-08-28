import axios from 'axios';
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


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
        return (<>
            {rooms.map((room) => {
                return (<tr key={room.id}>
                    <td>{room.id}</td>
                    <td>{room.roomNumber}</td>
                    <td>{room.price}</td>
                    <td>{room.roomType}</td>
                    <td>{room.available + ''}</td>
                </tr>);
            })}
        </>);

    }

    return (<div>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Id</th>
                <th>Room Number</th>
                <th>Price</th>
                <th>Room type</th>
                <th>Available</th>
            </tr>
            </thead>
            <tbody>
            {renderRooms()}
            </tbody>
        </table>
    </div>);
}

export default RoomsPage;