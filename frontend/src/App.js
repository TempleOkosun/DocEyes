import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';

import './App.css';


import {MainPage} from './pages';
import {StatusPage} from './pages';

const App = () => (
    <Router>
        <Container className="p-3">
            <Jumbotron>

                <ButtonToolbar className="custom-btn-toolbar">
                    <LinkContainer to="/">
                        <Button>Home</Button>
                    </LinkContainer>
                    <LinkContainer to="/about">
                        <Button>About</Button>
                    </LinkContainer>
                    <LinkContainer to="/status">
                        <Button> Status </Button>
                    </LinkContainer>
                </ButtonToolbar>

                <Switch>
                    <Route path="/" exact> <MainPage /> </Route>
                    <Route path="/status" exact> <StatusPage /> </Route>
                </Switch>

            </Jumbotron>
        </Container>

    </Router>
);

export default App;
