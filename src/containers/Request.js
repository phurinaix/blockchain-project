import React, { Component } from 'react';
import NavigationInside from '../components/NavigationInside';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

class Request extends Component {
    state = {
        diploma: null,
        transcript: null
    }
    diplomaChangeHandler = (e) => {
        this.setState({ diploma: e.target.checked });
    }
    transcriptChangeHandler = (e) => {
        this.setState({ transcript: e.target.checked });
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        console.log('Diploma => ', this.state.diploma);
        console.log('Transcript => ', this.state.transcript);
    }
    componentDidMount = () => {
        axios.post('https://tu-issuer.herokuapp.com/recipient/session', {
                key: localStorage.getItem("key0")
            })
            .then(response => {
                let res = response.data;
                if (res === 'unauthorized') {
                    this.props.history.push('/blockchain-project');
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    render() {
        return (
            <React.Fragment>
                <NavigationInside />
                <div>
                    <h2>Request</h2>
                    <Form onSubmit={this.onSubmitHandler}>
                        <h5>Which credentials you want ?</h5>
                        <Form.Group controlId="formBasicChecbox">
                            <Form.Check type="checkbox" label="Diploma" onChange={this.diplomaChangeHandler}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicChecbox">
                            <Form.Check type="checkbox" label="Transcript" onChange={this.transcriptChangeHandler}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </React.Fragment>
        );
    };
}

export default Request;