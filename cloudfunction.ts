import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {firestore} from "firebase-admin";
admin.initializeApp();

exports.postCreated = functions.firestore
    .document("users/{userId}/posts/{postid}")
    .onCreate( async (snap, context) => {
      const user = context.params.userId;
      const postId = context.params.postid;
      const batch = admin.firestore().batch();
      try {
        const followerssnapshot = await admin.firestore()
            .doc(`user/${users}/fllrs/3`).get();
        console.log("Am ajuns la followerstwo");
        const data = followerssnapshot.data();
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            console.log(`Aici avem urmaritorii: ${key}`);
            const numberofposts = admin.firestore().doc(`feed/${key}`);
            const postref = admin.firestore()
                .doc(`feed/${key}/3/${postId}`);
            batch.set(postref, snap.data());
            batch.set(numberofposts, {
              posts: firestore.FieldValue.increment(1),
              sent: false}, {merge: true});
          }
        }
        return batch.commit();
      } catch (error) {
        //  Handlle the error
        console.log("error: "+error);
        return null;
      }
    });
