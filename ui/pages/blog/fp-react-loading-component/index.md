---
title: Functional Programming with React - A Loading Component Example
date: 07/30/2017
categories: Node.js, AWS,
summary:  Functional programming (FP) has been all the rave in recent years, especially in the JavaScript world. When you combine FP with React you get all sorts of magic. 
---

Functional programming (FP) has been all the rave in recent years, especially in the JavaScript world. When you combine FP with React you get all sorts of magic. It’s also not hard to find FP while traversing (no pun) the React ecosystem. You’ll find `array.map` used very commonly to iterate over props, and return an array of components. You can create a React component as a pure function. Redux commonly uses higher order functions/components. Also if you look at React core you will find a ton of functional programming examples!

Warning! This blog entry assumes you are familar with basic functional programming concepts. If you need a refresher [check out JavaScript Guru Eric Elliot's blog entry](https://medium.com/javascript-scene/the-two-pillars-of-javascript-pt-2-functional-programming-a63aa53a41a4)

While the above examples are rather common, what about something a bit more rare? I think it’s harder to find examples of leveraging currying and closures in the React ecosystem. Given this, I’ve put together an example that shows how you can use these two concepts in a lightweight and elegant way.

Before I go on to explain the example, let’s first clarify the problem I will be solving. 

Imagine you have a data feed in your UI like Facebook or LinkedIn. The feed takes time to load, but some parts of the feed or page might be ready before others. Why prevent a user from using those parts of the page? Also, sometimes a page load is slower than ideal, one strategy to increase user experience is to use some type of loading animation. This makes the user feel like they are waiting less and is great **as long as they aren’t waiting that long!** Also it makes the user feel the page is loading and not stalled.

We’ll use functional programming to create loading components for our main components!

[You can get the finished project here](https://github.com/danielbh/functional-programming-react-loading-component)

To get started I recommend you use [create react app](https://github.com/facebookincubator/create-react-app). It's the easiest way to bootstrap a React application in your local development environment. Once you've created a new project continue with the tutorial.

First create the following folders `src/containers` `src/containers/Panel` `src/utils`

 The first file should be `src/containers/Panel/loading.js`. 

```javascript
import React from 'react';
import './index.css';
import ReactLoading from 'react-loading'

const PanelLoading = () => (
  <div className="panel">
      <ReactLoading type="bars" color="white" delay={0}/>
  </div>
);

export default PanelLoading
```
Here we have our loading component. We use a nifty open source project for creating loading animations called [react-loading](https://github.com/fakiolinho/react-loading). React loading must be added as a dependency with either typing `yarn add react-loading` or npm `npm i react-loading` in the terminal in the root project directory. For the `ReactLoading` component I've made it of type "bar". The loading indicator will be white and there will be no delay for when it starts appearing. By default there is a second delay. 


Now add `src/containers/Panel/index.css`. 

```css
.panel {
    background: blue;
    width: 600px;
    height: 350px;
    margin: 15px;

    color: white;
    font-weight: bold;
    font-size: 2em;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
}

```

This will be the styling for our component. We will give it a blue background and make the text inside have a larger font. We'll also use flexbox to center the the children inside the component.

Now here comes the fun part! `src/util/compose.js` where we will begin using functional programming

```javascript
import React from 'react';

/**
 * @param loadingHandler a React component that represents loading state
 * @returns {Function} A React component that has receives fetched data as props
 */
export default function compose(loadingHandler) {
  return function (Component) {
    class Container extends React.Component {
      
      // Need to initialize state initially to avoid not defined error
      state = {
        data: null
      };

      componentDidMount() {
        // Fake API call
        setTimeout(() => this.setState({data: "Loaded!"}), 1500)
      }

      render() {
        if (!this.state.data) {
          return loadingHandler();
        }
        return (
          <Component {...this.state} />
        );
      }
    }
    return Container;
  }
}
```
The `compose` function takes some data asynchronously whether it be from an http request, a websocket, or something else, and then loads that data into a component that is passed into the returned function. Here we have an example of a closure that holds internal state that can only be accessed by passing in a Component. The method of passing the component in is currying.

You can see the implementation in `src/containers/index.js`

```javascript
import React from 'react';
import PanelLoading from './loading'
import compose from '../../utils/compose'
import './index.css';

const Panel = (props) => (
  <div className="panel">
    {props.data}
  </div>
);

export default compose(PanelLoading)(Panel);
```

Look how elegant that is! Wow! And in such few lines of code!

Now finish it up by modifying `src/App.js`

```javascript
import React from 'react';
import Panel from './containers/Panel'
import './App.css';

const App = () => (
  <div className="App">
    <Panel/>
    <Panel/>
    <Panel/>
    <Panel/>
  </div>
);

export default App;
```

and `src/App.css`

```css
.App {
  padding: 20px;
  flex-wrap: wrap;

  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  justify-content: space-around;
}
```
`src/App.css` uses flexbox to align the Panel components in rows. Components wrap as the browser window gets narrower.

Now run the app with `yarn start` or `npm start`

Refresh the page to see see the effect repeat.

There you have it! Now you have an easy to drop in component that can be used to generate loading animations on components. All of this was written with basic functional programming concepts.

This example is actually a watered down version of [react-komposer](https://github.com/arunoda/react-komposer) an abandoned project by a genius Arunoda Susiripala who was big in the Meteor world before he left Meteor. More recently he’s been working on [Next.js](https://github.com/zeit/next.js/) which is a great project for server rendered React. He also is working on [React Storybook](https://github.com/storybooks/storybook) which is a sandbox tool for understanding how React components work.

This is just one of many potential examples of how to apply FP to React. It’s essential to be fluent in functional programming to be not only a good React or JavaScript developer, but to be a good developer period. 

If you have questions or want to talk about FP [feel free to contact me](/contact/).
