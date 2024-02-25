import {
    Container,
    Row,
    Col
} from 'react-bootstrap'

const Footer = () => {
    return (
        <footer class="footer">
            <div class="footer-text">
                <a>&copy;{new Date().getFullYear()} Rabid Tasker | Check out our <a
                        style={{ color: 'white' }}
                        href="https://github.com/cytoshell/rabid-tasker"
                        target="_blank"
                        rel="noopener">
                        Github
                    </a></a>
            </div>
        </footer>
    )
}

export default Footer