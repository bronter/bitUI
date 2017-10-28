import {BehaviorSubject, Observable, Subject} from 'rxjs/Rx';
import websocketConnect from 'rxjs-websockets';

export const channelNameObs = new BehaviorSubject("");
export const channelNameValid = channelNameObs.map(name => name.length > 0);

export const sendMessageObs = new Observable();
export const messagesObs = new Subject();

export const socketObs = new BehaviorSubject();

export const createChannel = (channelName, token) => {
  const connection = websocketConnect(`ws://localhost:9000/channel/${channelName}`, sendMessageObs, token);

  connection.messages.retryWhen(errs => errs.delay(1000)).subscribe(message => messagesObs.next(message));
  socketObs.next(connection);
}
