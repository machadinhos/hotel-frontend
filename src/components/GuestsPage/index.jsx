import axios from 'axios';
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


function GuestsPage() {
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/hotel/api/guests')
                .then(response => {
                    setGuests(response.data);
                    setLoading(false);
                })
            .catch(() => {
                    setError('An error occurred while fetching guests');
                    setLoading(false);
                });
    }, []);

    function renderGuests() {
        if (loading) {
            return <h2>Loading...</h2>;
        } else if (error) {
            return <h2>{error}</h2>;
        } else if (guests.length === 0) {
            return <h2>There are no guests</h2>;
        }

        return (<tbody>
                {guests.map(guest => (<tr key={guest.id}>
                            <td>{guest.id}</td>
                            <td>{guest.firstName}</td>
                            <td>{guest.lastName}</td>
                            <td>{guest.email}</td>
                            <td>{guest.phoneNumber}</td>
                        </tr>))}
                </tbody>);
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
                    {renderGuests()}
                </table>
            </div>);
}

export default GuestsPage;
