import 'bootstrap/dist/css/bootstrap.min.css';

const H1style = {
    color: '#F05A22'
};

const Home = () => {
    return (
        <section class="home" id='home'>
            <h1 style={H1style}>Welcome to the home page</h1>
        </section>
    )
}

export default Home