import {
    Container,
    Row,
    Col
} from 'react-bootstrap'

const Footer = () => {
    return (
        <Container>
            <Row>
                <hr style={{ color: 'white' }} />
                <Col className="text-center py-3" style={{ color: 'white' }}>
                    &copy;{new Date().getFullYear()} Rabid Tasker | Check out our <a
                        style={{ color: 'white' }}
                        href="https://github.com/cytoshell/rabid-tasker"
                        target="_blank"
                        rel="noopener">
                        Github
                    </a>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer