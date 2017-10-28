import {BehaviorSubject, Observable} from 'rxjs/Rx';

export const session = new BehaviorSubject({
  token: null,
  hasSession: false,
  username: null
});

export const usernameObs = new BehaviorSubject("");
export const emailObs = new BehaviorSubject("");
export const passwordObs = new BehaviorSubject("");
export const confirmPasswordObs = new BehaviorSubject("");

export const loginErrObs = new BehaviorSubject(null);
export const registerErrObs = new BehaviorSubject(null);

const notEmpty = s => s.length > 0;

const errMsg = msg => condition => condition ? null : msg;

const wewladdy = forgotten => `wew there laddy you forgot a ${forgotten}`;

const count = v => v + 1;
const changed = v => v > 1;

export const usernameChanged = usernameObs.scan(count, 0).map(changed);
export const passwordChanged = passwordObs.scan(count, 0).map(changed);
export const confirmPasswordChanged = confirmPasswordObs.scan(count, 0).map(changed);

export const usernameValidate = usernameObs.map(notEmpty).map(errMsg(wewladdy("username")));
export const passwordValidate = passwordObs.map(notEmpty).map(errMsg(wewladdy("password")));

export const passwordMatchValidate = Observable.combineLatest(passwordObs, confirmPasswordObs, (p, pv) => p === pv).map(errMsg("REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"));
export const confirmPasswordValidate = Observable.combineLatest(confirmPasswordObs.map(notEmpty).map(errMsg(wewladdy("confirmation password"))), passwordMatchValidate, (a, b) => a || b);


export const registerFormValidate = Observable.combineLatest(
  usernameValidate, passwordValidate, confirmPasswordValidate,
  (uv, pv, cv) => !Boolean(uv || pv || cv)
);

export const loginFormValidate = Observable.combineLatest(usernameValidate, passwordValidate, (uv, pv) => !Boolean(uv || pv));

export const doLogin = (username, password) => {
  Observable.ajax({
    url: 'http://localhost:9000/session',
    method: 'POST',
    responseType: 'json',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      userName: username,
      password: password
    }
  }).subscribe({
    next: resp => session.next({
      token: resp.response.Token,
      hasSession: true,
      username
    }),
    error: err => loginErrObs.next("sumpin bad happened: " + err)
  });
};

export const doRegister = (username, email, password) => {
  Observable.ajax({
    url: 'http://localhost:9000/user',
    method: 'POST',
    responseType: 'json',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      userName: username,
      email: email,
      password: password
    }
  }).subscribe({
    next: () => doLogin(username, password),
    error: err => registerErrObs.next("Sumpin bad happened: " + err)
  });
}
