import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Switch, Text, Button, Alert} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { writeTaskOnFirebase } from '../services/FirebaseApi';

export default class Task extends Component {

    static navigationOptions = {
        title: 'Task'
    }

    constructor(props) {
        super(props);

        try {
            let task = this.props.navigation.state.params.task;
            this.state = {
                key: task.key,
                title: task.title,
                resume: task.resume,
                priority: task.priority,
                isDone: task.isDone
            }
        } catch (error) {
            this.state = { key: '', title: '', resume: '', priority: true, isDone: false}
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder='Title'
                    value={this.state.title}
                    onChangeText={(value) => this.setState({title: value})}/>
                <TextInput style={[styles.input, styles.multilineInput]} placeholder='Resume' multiline={true} numberOfLines={4}
                    value={this.state.resume}
                    onChangeText={(value) => this.setState({resume: value})}/>
                <View style={styles.switchContainer}>
                    <Switch value={this.state.priority}
                        onValueChange={(value) => this.setState({priority: value})}
                        value={this.state.priority}/>
                    <Text style={styles.switchText}>Hight Priority</Text>
                </View>
                <View style={styles.switchContainer}>
                    <Switch value={this.state.isDone}
                        onValueChange={(value) => this.setState({isDone: value})}
                        value={this.state.isDone}/>
                    <Text style={styles.switchText}>Is Done?</Text>
                </View>
                <Button style={styles.button} title='Save' onPress={ () => this.saveTask() }/>
            </View>
        );
    }

    saveTask = () => {

        var data = {
            key: this.state.key,
            title: this.state.title,
            resume: this.state.resume,
            priority: this.state.priority,
            isDone: this.state.isDone
        };

        writeTaskOnFirebase(data)
            .then( (success) => {
                let backAction = NavigationActions.back({key: null});
                this.props.navigation.dispatch(backAction);
            })
            .catch( (error) => {
                Alert.alert("Erro Saving", error.message);
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
    },
    input: {
        marginBottom: 20
    },
    multilineInput: {
        height: 100
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20
    },
    switchText: {
        marginLeft: 10,
        color: 'black',
        fontSize: 18
    }
});
