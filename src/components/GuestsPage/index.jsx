import axios from 'axios';
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const GuestsPage = (props) => {
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

    const renderGuests = () => {
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

    const handleAddGuestClick = () => {
        props.setGuest({firstName: 'Pedro'});
        window.location.href = '/guestform';
    };

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
        <button type="button" className="btn btn-primary" onClick={handleAddGuestClick}>+ Add Guest</button>
            </div>);
}

export default GuestsPage;
