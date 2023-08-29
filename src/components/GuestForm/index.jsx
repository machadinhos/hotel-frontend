import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const GuestForm = (props) => {

    const guest = props.guest;

    return (<>
        <h2>{props.title}</h2>
        <form className="col">
            <input type="hidden" value={props.id} id="id"/>
            <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input type="text" className="form-control" value={guest.firstName} id="firstName"/>
            </div>
            <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-control" value={guest.lastName} id="lastName"/>
            </div>
            <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={guest.email} id="email"/>
            </div>
            <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input type="tel" className="form-control" value={guest.phone} id="phone"/>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary" id="submitButton">Submit</button>
            </div>
        </form>
    </>);
}

export default GuestForm;