import React, { Component } from 'react';
import NavigationInside from '../components/NavigationInside';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

class Request extends Component {
    state = {
        diploma: false,
        transcript: false,
        alertMessage: '',
        fetching: false,
    }
    diplomaChangeHandler = (e) => {
        this.setState({ diploma: e.target.checked });
    }
    transcriptChangeHandler = (e) => {
        this.setState({ transcript: e.target.checked });
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        this.setState({ fetching: true });
        axios.post('https://tu-issuer.herokuapp.com/recipient/credential', {
                    id: localStorage.getItem("identity"),
                    diploma: this.state.diploma,
                    transcript: this.state.transcript
                })
                .then(response => {
                    var res = response.data;
                    if (res === 'success') {
                        this.setState({
                            diploma: false,
                            transcript: false,
                            alertMessage: '',
                            fetching: false
                        });
                    } else if (res === 'empty_credential') {
                        this.setState({
                            alertMessage: 'Please select diploma or transcript before submit',
                            fetching: false
                        });
                    } else if (res === 'empty_id' || res === 'invalid_id' || res === 'id_length') {
                        this.setState({
                            alertMessage: 'invalid identity',
                            fetching: false
                        });
                    } else if (res === 'invalid_type') {
                        this.setState({
                            alertMessage: 'invalid diploma and transcript type',
                            fetching: false
                        });
                    } else if (res === 'limit') {
                        this.setState({
                            alertMessage: 'Your request limit',
                            fetching: false
                        })
                    }
                    
                })
                .catch(err => {
                    console.log(err);
                });
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
                        { this.state.alertMessage !== '' && <Alert variant="danger">{this.state.alertMessage}</Alert> }
                        { this.state.fetching && <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                        <Form.Group controlId="formBasicChecbox">
                            <Form.Check type="checkbox" label="Diploma" onChange={this.diplomaChangeHandler} checked={this.state.diploma}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicChecbox">
                            <Form.Check type="checkbox" label="Transcript" onChange={this.transcriptChangeHandler} checked={this.state.transcript}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={this.state.fetching}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </React.Fragment>
        );
    };
}

export default Request;