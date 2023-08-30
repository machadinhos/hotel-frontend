import axios from 'axios';
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import {useNavigate} from 'react-router-dom';

const GuestsPage = (props) => {
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    const handleAddGuestClick = () => {
        props.setGuestHttpRequestType('post');
        props.setGuest({});
        props.setGuestUrl('http://localhost:8080/hotel/api/guest');
        props.setGuestFormTitle('Add Guest');
        navigate('/guestform');
    };

    const handleEditGuestClick = (guest) => {
        return () => {
            props.setGuestHttpRequestType('put');
            props.setGuest(guest);
            props.setGuestUrl('http://localhost:8080/hotel/api/guest/' + guest.id);
            props.setGuestFormTitle('Edit Guest ' + guest.id);
            navigate('/guestform');
        };
    };

    const handleDeleteGuestClick = (guest) => {
        return () => {
            axios.delete('http://localhost:8080/hotel/api/guest/' + guest.id)
                    .then(() => window.location.reload());
        }
    }

    const renderGuests = () => {
        if (loading || error || guests.length === 0) {
            return;
        }

        return (<>
                {guests.map(guest => (<tr key={guest.id}>
                            <td>{guest.id}</td>
                            <td>{guest.firstName}</td>
                            <td>{guest.lastName}</td>
                            <td>{guest.email}</td>
                            <td>{guest.phoneNumber}</td>
                    <td>
                        <button onClick={handleEditGuestClick(guest)} type="button" className="btn btn-success">Edit
                        </button>
                    </td>
                    <td>
                        <button onClick={handleDeleteGuestClick(guest)} type="button"
                                className="btn btn-danger">Delete
                        </button>
                    </td>
                        </tr>))}
        </>);
    }

    const addButton = <button type="button" className="btn btn-primary" onClick={handleAddGuestClick}>+ Add
        Guest</button>;

    return (<div className="guests-page">
        <h2>Guests</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderGuests()}
                    </tbody>
                </table>
        {loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2> : guests.length === 0 ? <><h2>There are no
            guests</h2>{addButton}</> : addButton}
            </div>);
};

export default GuestsPage;