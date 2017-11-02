import {BehaviorSubject, Subject} from 'rxjs/Rx';
import websocketConnect from 'rxjs-websockets';
import {QueueingSubject} from 'queueing-subject';

export const channelNameObs = new BehaviorSubject("");
export const channelNameValid = channelNameObs.map(name => name.length > 0);

export const sendMessageObs = new QueueingSubject();
export const messagesObs = new Subject();

messagesObs.subscribe(ayy => console.log(ayy));

export const socketObs = new BehaviorSubject();

export const createChannel = (channelName, token) => {
  const connection = websocketConnect(`ws://localhost:9000/channel/${channelName}`, sendMessageObs, token);

  connection.messages.retryWhen(errs => errs.delay(1000)).subscribe(message => {
    const parsedMessage = JSON.parse(message);
    sendMessageObs.next(JSON.stringify({to: parsedMessage.from, from: parsedMessage.to, body: parsedMessage.body}));
    messagesObs.next(message);
  });

  socketObs.next(connection);
}
