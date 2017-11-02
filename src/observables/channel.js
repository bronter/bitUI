import {BehaviorSubject, Observable} from 'rxjs/Rx';

export const channelListObs = new BehaviorSubject([]);

export const getChannels = () => Observable.ajax({
  url: 'http://localhost:9000/channels',
  method: 'GET',
  responseType: 'json',
  crossDomain: true
}).subscribe({
  next: resp => channelListObs.next(resp.response)
});

export const messageChannel = (channelName, message) => Observable.ajax({
  url: `http://localhost:9000/channel/${channelName}`,
  method: 'POST',
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  body: {type: "sdpOffer", sdp: message}
}).subscribe({
  next: resp => console.log("resp is: ", resp)
})
