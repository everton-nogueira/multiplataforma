import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "./store/index";
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { initializeFirebaseApi, currentFirebaseUser } from './services/FirebaseApi';
import { connect } from 'react-redux';

export default class App extends Component {

    constructor(props) {
        super(props);
        initializeFirebaseApi();
    }

    render() {
        const { newValue } = this.props;
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <ActivityIndicator style={styles.loading} />
                </View>
            </Provider>
        );
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        currentFirebaseUser()
            .then((user) => {
                if (user) {
                    navigate('TaskList');
                } else {
                    navigate('Login');
                }
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        width: 50,
        height: 50
    }
})
