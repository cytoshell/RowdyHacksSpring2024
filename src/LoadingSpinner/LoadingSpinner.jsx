import { Spinner } from "react-bootstrap";
import './LoadingSpinner.css'


const LoadingSpinner = () => {
    return (
        <Spinner id='spins' animation="border" variant="light" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}

export default LoadingSpinner;