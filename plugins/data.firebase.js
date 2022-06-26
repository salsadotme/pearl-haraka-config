// data.firebase

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();
const db = getFirestore();

exports.hook_data = function (next, connection) {
    connection.transaction.parse_body = true;
    next();
}

exports.hook_data_post = async function (next, connection) {
    const recipient = connection.transaction.rcpt_to[0].user;
    this.loginfo(connection.transaction.body.bodytext);
    const body = JSON.parse(connection.transaction.body.bodytext);

    // save to firebase
    await db.collection('recipients')
        .doc(recipient)
        .collection('messages')
        .doc(connection.transaction.uuid)
        .set(body);

    /*const topic = `${body.projectId}-${body.type}`; // e.g. BAYC-event

    const message = {
        notification: {
            title: body.title,
            body: body.body,
            key: "1",
        },
    };
    await admin.messaging().sendToTopic(topic, message);*/
    next();
}