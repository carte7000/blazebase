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
