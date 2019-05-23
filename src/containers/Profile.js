import React, { Component } from 'react';
import NavigationInside from '../components/NavigationInside';
import EmailForm from '../components/EmailForm';
import axios from 'axios';

class Profile extends Component {

    emailHandle = () => {

    }
    componentDidMount = () => {
        axios.post('https://tu-issuer.herokuapp.com/recipient/session', {
                key: localStorage.getItem("key0")
            })
            .then(response => {
                let res = response.data;
                if (res === 'unauthorized') {
                    this.props.history.push('/blockchain-project');
                } else {
                    if (!localStorage.getItem("identity")) {
                        this.props.history.push('/blockchain-project/logout');
                    }
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
                    <h2 className="text-center">Your Profile</h2>
                    <EmailForm email={this.emailHandle}/>
                </div>
            </React.Fragment>
        );
    }
};

export default Profile;