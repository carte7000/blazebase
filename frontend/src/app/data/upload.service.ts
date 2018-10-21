import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) { }

  async upload(id: string, dataUrl: string) {
    return await this.storage.ref('/').child(id).putString(dataUrl);
  }

  async createDocument(location: Position, dataUrl: string) {
    return await this.firestore.collection('fires').add({
      position: { lat: location.coords.latitude, long: location.coords.longitude }, image: dataUrl, vote: 1,
    });
  }

  async voteUp(id) {
    this.firestore.doc(`fires/${id}`).get().subscribe((snap) => {
      const { vote, ...rest } = snap.data();
      this.firestore.doc((`fires/${id}`)).set({
        vote: vote + 1,
        ...rest
      });
    });
  }

  async voteDown(id) {
    this.firestore.doc(`fires/${id}`).get().subscribe((snap) => {
      const { vote, ...rest } = snap.data();
      this.firestore.doc((`fires/${id}`)).set({
        vote: vote - 1,
        ...rest
      });

    });
  }

  async getFires() {
    this.firestore.collection('fires').stateChanges(['added']).subscribe(() => {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }

      // Let's check whether notification permissions have already been granted
      else if ((Notification as any).permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification("New fire somewhere in the world!!!! or not");
      }

      // Otherwise, we need to ask the user for permission
      else if ((Notification as any) !== "denied") {
        Notification.requestPermission().then(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            var notification = new Notification("New fire somewhere in the world!!!! or not");
          }
        });
      }
    })
    return this.firestore.collection('fires').snapshotChanges().pipe(map((snaps) => {
      return snaps.map((snap) => {
        return {
          id: snap.payload.doc.id,
          ...snap.payload.doc.data(),
          // image: this.storage.ref('/').child(`${snap.payload.doc.id}.dataUrl`)
        }
      });
    }));
  }
}
