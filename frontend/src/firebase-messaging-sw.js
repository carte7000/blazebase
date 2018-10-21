importScripts('https://www.gstatic.com/firebasejs/5.5.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.5/firebase-messaging.js');
firebase.initializeApp({
    'messagingSenderId': '568610930926'
});

const messaging = firebase.messaging();

messaging.requestPermission().then(function () {
    console.log('Notification permission granted.');
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // ...
}).catch(function (err) {
    console.log('Unable to get permission to notify.', err);
});
