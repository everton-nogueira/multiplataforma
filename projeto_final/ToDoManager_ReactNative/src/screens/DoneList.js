import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, SectionList } from 'react-native';
import { readTasksOnFirebase } from '../services/FirebaseApi';

const imgDone = require('../assets/done.png');

export default class DoneList extends Component {

    static navigationOptions = {
        tabBarLabel: 'Done',
        tabBarIcon: ({ tintColor }) => (
          <Image source={imgDone} style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      };

    componentWillMount() {
        readTasksOnFirebase(this.fetchTasks);
    }

    render() {
        return (
            <View style={styles.container}>
                <SectionList renderSectionHeader={ (section) =>  this.renderSectionHeader(section)}
                    sections={[ // homogenous rendering between sections
                        {data: this.state.tasks.filter( (data) => {
                            return data.priority && data.isDone
                        }), key: "hightPriority", title: 'Hight Priority'},
                        {data: this.state.tasks.filter( (data) => {
                            return !data.priority && data.isDone
                        }), key: "lowPriority", title: 'Low Priority'},
                    ]}
                    renderItem={(data) => this.renderItem(data)}/>
            </View>
        );
    }

    renderSectionHeader = (sectionData) => {
        return (
            <View style={styles.headerConteiner}>
                <View style={styles.headerTagConteiner}>
                    <Text style={styles.headerTagText}>{sectionData.section.title.substr(0, 1)}</Text>
                </View>
                <Text style={styles.headerText}>{sectionData.section.title}</Text>
            </View>
        );
    }

    renderItem = (itemData) => {
        return (
            <TouchableOpacity>
                <View style={styles.itemConteiner}>
                    <Text style={styles.itemTextTitle}>{itemData.item.title}</Text>
                    <Text>{itemData.item.resume}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    fetchTasks = (tasks) => {
        this.setState({tasks: tasks});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10
    },
    icon: {
        width: 26,
        height: 26,
    },
    headerConteiner: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'silver',
        borderRadius: 25,
        marginTop: 20
    },
    headerTagConteiner: {
        backgroundColor: 'gray',
        height: 35,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    headerTagText: {
        color: '#FFF',
        fontSize: 22
    },
    headerText: {
        fontSize: 16,
        marginLeft: 10
    },
    itemConteiner: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F3F2F0',
        marginTop: 5,
        padding: 10
    },
    itemTextTitle: {
        fontSize: 22
    },
    img: {
        width: 50,
        height: 50
    }
});
