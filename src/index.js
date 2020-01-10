import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const ENTRIES = [
    {"artist": "Tío Benito", "track": "smothered like some wafflehouse hashbrowns", "embed": "https://soundcloud.com/tio574/smothered-like-some-waffle-house-hash-browns"},
    {"artist": "CarlJones", "track": "interest of time", "embed": "https://soundcloud.com/user-568787898/interest-of-time"},
    {"artist": "[ bsd.u ]", "track": "new socks", "embed": "https://soundcloud.com/bsdu/new-socks"},
    {"artist": "J Dilla", "track": "Love Jones", "embed": "https://soundcloud.com/jdilla/love-jones-extended"},
    {"artist": "twuan & bc.einstein", "track": "boleta", "embed": "https://soundcloud.com/expandorexpire/twuan-bc-boleta"}
]

ReactDOM.render(<App entries={ENTRIES} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
