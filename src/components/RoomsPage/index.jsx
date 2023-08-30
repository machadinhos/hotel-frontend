import axios from 'axios';
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const RoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/hotel/api/rooms')
                .then(response => {
                    setRooms(response.data);
                    setLoading(false);
                })
            .catch(() => {
                    setError('An error occurred while fetching rooms');
                    setLoading(false);
                });
    }, []);

    function renderRooms() {
        if (loading || error || rooms.length === 0) {
            return;
        }

        return (<>
                {rooms.map(room => (<tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.roomNumber}</td>
                            <td>{room.price}</td>
                            <td>{room.roomType}</td>
                            <td>{room.available + ''}</td>
                        </tr>))}
        </>);
    }

    const handleAddRoomClick = () => {
        props.setRoom();
        window.location.href = '/guestform';
    };

    const addButton = <button type="button" className="btn btn-primary" onClick={handleAddRoomClick}>+ Add
        Room</button>;

    return (<div>
        <h2>Rooms</h2>
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
        {loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2> : rooms.length === 0 ? <><h2>There are no
            rooms</h2>{addButton}</> : addButton}
            </div>);
}

export default RoomsPage;