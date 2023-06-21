/*
  - React is a JavaScript library for building the interface.
  - ReactDOM has methods for rendering React components into the DOM.
  HTML code is structured with a DOM (document object model). Each
  element in the document represent a node in the tree.  So, we are
  converting virutal representation of the DOM (which is a JavaScript object)
  into the actual DOM nodes. React takes the virtual object, which again, is a
  JavaScript object that mirrors the actual DOM, and updates the actual DOM
  if there's new differences.  If a new React component is added, a new DOM node
  will be added.
  - "bootstrap.css" allows for styling your application.
  - Import App will import the code from App.js.
  - ReactDom.renders first parameter is the app component. The second one, helps
   to render the App into the index.html part that has the "root" id.
*/
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';


import './components/EventListener.js';



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
