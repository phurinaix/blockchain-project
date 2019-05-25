import React, { Component } from 'react';
import NavigationInside from '../components/NavigationInside';
import AddIssuerInstruction from '../components/AddIssuerInstruction';
import { Spinner } from 'react-bootstrap';
import EmailForm from '../components/EmailForm';
import axios from 'axios';

class Add extends Component {
    state = {
        isGiveEmail: false,
        fetching: false
    }
    isGiveEmailHandle = () => {
        this.setState({ isGiveEmail: true });
    };
    componentDidMount = () => {
        this.setState({ fetching: true });
        axios.post('https://tu-issuer.herokuapp.com/recipient/session', {
                key: localStorage.getItem("key0")
            })
            .then(response => {
                let res = response.data;
                if (res === 'unauthorized') {
                    this.props.history.push('/blockchain-project');
                } else {
                    var studentId = localStorage.getItem("identity");
                    axios.get(`https://tu-issuer.herokuapp.com/recipient/${studentId}`)
                        .then(response => {
                            console.log(response);
                            if (response.data) {
                                this.setState({ 
                                    isGiveEmail: true,
                                    fetching: false
                                });
                            } else {
                                this.setState({ 
                                    isGiveEmail: false,
                                    fetching: false
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
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
                <div className="mb-5">
                        { this.state.fetching ? 
                            <div className="text-center mt-5">
                                <br/><br/><br/>
                                <br/><br/><br/>
                                <Spinner animation="border"role="status"><span className="sr-only">Loading...</span></Spinner>
                            </div>
                        :
                            <React.Fragment>
                                <h3 className="text-center">Add Issuer</h3>
                                {this.state.isGiveEmail ?
                                    <AddIssuerInstruction />
                                :
                                    <div className="text-center">
                                        <h5>You have to provide an email before add issuer</h5>
                                        <EmailForm email={this.isGiveEmailHandle} buttonText="Submit"/>
                                    </div>
                                }
                            </React.Fragment>
                        }
                </div>
            </React.Fragment>
        );
    };
}

export default Add;