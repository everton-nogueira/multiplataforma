import React, { Component } from 'react';
import { View, Image, TextInput, Button, StyleSheet, KeyboardAvoidingView, Alert, Text } from 'react-native';
import { signInOnFirebase } from '../../services/FirebaseApi';
import {inject, observer, Provider} from 'mobx-react';
import {action, autorun, computed, configure, observable, when} from 'mobx';
import loginStore from "../../store/LoginStore";
  
const img = require('../../assets/TodoList.png');


configure({
    enforceActions: "strict"
});

class Login extends Component {

    @observable email:String = "";
    @observable password:String = "";
    @observable filled:Boolean = false;

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        // this.state = { password: '', filled: false };



        // autorun(
        //     () => {alert(this.email);}
        // );
        // when(() => {this.email.length > 2});
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <View style={styles.topView}>
                    <Image style={styles.img} source={img}/>
                </View>
                <View style={styles.bottomView}>
                    <TextInput style={styles.input} placeholder='Email' keyboardType={'email-address'} autoCapitalize='none' onChangeText={(text) => this.setEmail(text)}/>
                    <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={ (text) => this.setPassword(text)}/>
                    <Button title='Sign In' onPress={ () => this.signIn() }/>
                    <View style={styles.textConteiner}>
                        <Text>Not a member? Let's </Text>
                        <Text style={styles.textRegister} onPress={ () => navigate('Register')}>Register.</Text>
                    </View>
                </View>

            </KeyboardAvoidingView>



        );
    }

    signIn() {
        signInOnFirebase(this.computedEmail, this.computedPassword)
            .then( (user) => {
                const { navigate } = this.props.navigation;
                navigate('TaskList');
            })
            .catch( (error) => {
                Alert.alert("Failed Login", error.message);
            });
    }


    @computed get computedPassword() {
        return this.password;
    }

    @action setPassword = (pass) => {this.password = pass};

    @computed get computedEmail() {
        return this.email;
    }

    @action setEmail = (email) => {this.email = email};

}

export default observer(Login)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
    },
    img: {
        width: 200,
        height: 200
    },
    bottomView: {
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20
    },
    input: {
        marginBottom: 20
    },
    textConteiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    textRegister: {
        fontWeight: 'bold'
    } 
});
