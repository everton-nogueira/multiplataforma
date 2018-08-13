import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDtVC3VQ1Z8XzQYDkWwnTOC_NFo8ny5c90",
    authDomain: "todomanager-5444a.firebaseapp.com",
    databaseURL: "https://todomanager-5444a.firebaseio.com",
    projectId: "todomanager-5444a",
    storageBucket: "todomanager-5444a.appspot.com",
    messagingSenderId: "254572727152"
};

export const initializeFirebaseApi = () => {
    firebase.initializeApp(config);
}

var firebaseUser = null;

export function currentFirebaseUser() {
    return new Promise( (resolve, reject) => {
        var unsubscribe = null;
        unsubscribe = firebase.auth().onAuthStateChanged( (user) => {
            firebaseUser = user;
            resolve(user);    
        }, (error) => {
            reject(error);
        }, (completed) => {
            unsubscribe();
        });
    });
}

export function createUserOnFirebase(email, password) {
    return new Promise( (resolve, reject) => {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then( (success) => {
                resolve(success);
            })
            .catch( (error) => {
                reject(error);
            });
    });
}

export function signInOnFirebase(email, password) {
    return new Promise( (resolve, reject) => {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then( (success) => {
                resolve(success);
            })
            .catch( (error)  => {
                reject(error);
            });
    });
}

export function writeTaskOnFirebase(data) {

    var key = data.key ?
        data.key : 
        firebase.database().ref(firebaseUser.uid).child('tasks').push().key;

    return new Promise( (resolve, reject) => {
        firebase.database()
            .ref(firebaseUser.uid)
            .child('tasks/' + key)
            .update(data)
            .then( (success) => {
                resolve(success);
            })
            .catch( (error) => {
                reject(error);
            });
        });
}

export function readTasksOnFirebase(listener) {
    var tasksReference = firebase.database().ref(firebaseUser.uid).child('tasks');
    tasksReference.on('value', (snapshot) => {

        var tasks = [];
        snapshot.forEach(function(element) {
            var task = element.val();
            task.key = element.key;
            tasks.push(task);
        });

        listener(tasks);
    });
}