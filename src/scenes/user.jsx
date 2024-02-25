import 'bootstrap/dist/css/bootstrap.min.css';

const H1style = {
    color: '#F05A22'
};

const user = () => {
    return (
        <section class="user" id='user'>
            <h1 style={H1style}>Welcome to the user page</h1>
        </section>
    )
}

export default user