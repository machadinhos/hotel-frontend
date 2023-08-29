import axios from 'axios';
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


function RoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/hotel/api/rooms')
                .then(response => {
                    setRooms(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError('An error occurred while fetching rooms');
                    setLoading(false);
                });
    }, []);

    function renderRooms() {
        if (loading) {
            return <h2>Loading...</h2>;
        } else if (error) {
            return <h2>{error}</h2>;
        } else if (rooms.length === 0) {
            return <h2>There are no rooms</h2>;
        }

        return (<tbody>
                {rooms.map(room => (<tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.roomNumber}</td>
                            <td>{room.price}</td>
                            <td>{room.roomType}</td>
                            <td>{room.available + ''}</td>
                        </tr>))}
                </tbody>);
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
                    {renderRooms()}
                </table>
            </div>);
}

export default RoomsPage;