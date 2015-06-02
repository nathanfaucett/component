component
=======

component for the browser and node.js


```javascript
var component = require("component");

function stringChecker(props, propName, displayName) {
    if (typeof(props[propName]) !== "string") {
        return new TypeError(propName + " must be a string");
    } else {
        return null;
    }
}

var signIn = component({
    name: "signIn",
    propTypes: {
        username: stringChecker,
        password: stringChecker
    },
    call: function(props, callback) {
        var username = props.username,
            password = props.password;

        callback(undefined, {
            username: username,
            password: password
        });
    }
});
```
