import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { saveToken } from '../store/actions/push-token.action';
import { PushTokenState } from '../store/reducers/push-token.reducer';

@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject(null);
  token: string;

  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private store: Store<PushTokenState>,
    private http: HttpClient
    ) {

  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        this.store.dispatch(saveToken({token: token}));
        this.token = token;
        console.log(token)
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      this.currentMessage.next(payload);
    });
  }

  sendPushNotification(title: string, token: string, message: string) {
    const body = {
      "notification": {
          "title": title,
          "body": message
      },
      "to": this.token
  }
    return this.http.post(`https://fcm.googleapis.com/fcm/send`, body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `key=${environment.serverId}`,
      },
    })
  }
}
