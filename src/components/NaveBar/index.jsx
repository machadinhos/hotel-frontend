import './style.css';

const NaveBar = () => {

    const handleClick = (url) => {
        return function handleRedirect() {
            window.location.href = url;
        };
    };

    return (<div className="nave-bar">
        <button onClick={handleClick('/')} className="nave-bar__button">Home</button>
        <button onClick={handleClick('/guests')} className="nave-bar__button">Guests</button>
        <button onClick={handleClick('/rooms')} className="nave-bar__button">Rooms</button>
        <button onClick={handleClick('/guestform')} className="nave-bar__button">Guest Form</button>
    </div>);
}

export default NaveBar;