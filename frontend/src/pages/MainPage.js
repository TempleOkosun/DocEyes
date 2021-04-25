import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

import { PathMapper } from '../Components';

import '../App.css';

export const MainPage = () => (
    <Container className="p-3">
        <Jumbotron>
            <h1 className="header">Welcome To DocEyes</h1>
            <PathMapper />
        </Jumbotron>
    </Container>
);


