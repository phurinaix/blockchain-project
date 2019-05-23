import React, { Component } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import FormGroup from './FormGroup';
import axios from 'axios';

class EmailForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            alertMessage: '',
            fetching: false
        }
    }
    emailChangeHandle = (e) => {
        this.setState({ email: e.target.value });
    };

    submitHandle = (e) => {
        e.preventDefault();
        this.setState({ fetching: true });
        var identity = localStorage.getItem("identity");
        if (identity) {
            axios.post('https://tu-issuer.herokuapp.com/recipient/email', {
                    email: this.state.email,
                    identity: identity
                })
                .then(response => {
                    if (response.data === 'success') {
                        this.setState({ 
                            alertMessage: '',
                            fetching: false
                        })
                        this.props.email();
                    } else {
                        this.setState({
                            alertMessage: 'Failed',
                            fetching: false
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
    componentDidMount = () => {
        var studentId = localStorage.getItem("identity");
        if (studentId) {
            axios.get(`https://tu-issuer.herokuapp.com/recipient/${studentId}`)
                .then(response => {
                    if (response.data) {
                        this.setState({ email: response.data });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
    render() {
        return (
            <Form onSubmit={this.submitHandle} className="col-md-5 mx-auto" autoComplete="off">
                { this.state.alertMessage !== '' && <Alert variant="danger">{this.state.alertMessage}</Alert> }
                { this.state.fetching && <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>}
                <FormGroup label="Student Email" type="email" text="" value={this.state.email} change={this.emailChangeHandle}/>
                <Button variant="primary" type="submit" className="w-100" disabled={this.state.fetching}>
                    Submit
                </Button>
            </Form>
        );
    }
};

export default EmailForm;