import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const makeblob = function (dataURL) {
  var BASE64_MARKER = ';base64,';
  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    var parts = dataURL.split(',');
    var contentType = parts[0].split(':')[1];
    var raw = decodeURIComponent(parts[1]);
    return new Blob([raw], { type: contentType });
  }
  var parts = dataURL.split(BASE64_MARKER);
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private http: HttpClient,
  ) { }

  async aiResult(dataUrl) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze?visualFeatures=Description,Tags',
        makeblob(dataUrl), {
          headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': 'a38131eec0974c5cb37df0f607007664'
          },
        }).subscribe((result) => {
          console.log(result);
          resolve({
            result,
          });
        });
    });
  }

  async upload(id: string, dataUrl: string) {
    const img = await this.storage.ref('/').child(id).putString(dataUrl).then(() => null);
    return new Promise((resolve, reject) => {
      this.storage.ref(`/${id}`).getDownloadURL().subscribe((url) => {
        this.http.post(
          'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze?visualFeatures=Description,Tags',
          makeblob(dataUrl), {
            headers: {
              'Content-Type': 'application/octet-stream',
              'Ocp-Apim-Subscription-Key': 'a38131eec0974c5cb37df0f607007664'
            },
          }).subscribe((result) => {
            console.log(result);
            resolve({
              url,
              img,
              result,
            });
          });
      });
    });
  }

  async createDocument(location: Position, dataUrl: string) {
    const { result }: any = await this.aiResult(dataUrl);
    const isFire = !!result.description.tags.find((x) => x === 'fire' || x === 'smoke');
    console.log(isFire);
    return await this.firestore.collection('fires').add({
      isFire,
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
