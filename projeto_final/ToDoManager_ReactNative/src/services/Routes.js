import React from 'react';
import { Button, Alert } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import App from '../App';
import Login from '../screens/acesso/Login';
import Register from '../screens/Register';
import ToDoList from '../screens/ToDoList';
import DoneList from '../screens/DoneList';
import Task from '../screens/Task';

export const MainScreenNavigator = TabNavigator({
    ToDoList: { screen: ToDoList, title: 'To Do' },
    DoneList: { screen: DoneList, title: 'Done' }
});

export const Routes = StackNavigator({
    App: { screen: App },
    Login: { screen: Login },
    Register: { screen: Register },
    TaskList: {
        screen: MainScreenNavigator,
        navigationOptions: {
            title: 'Task List',
            headerLeft: null
        }
    },
    Task: { screen: Task }
});
