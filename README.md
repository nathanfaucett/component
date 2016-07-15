createComponentFunction
=======

create component function for the browser and node.js


```javascript
var createComponentFunction = require("@nathanfaucett/create_component_function");


function stringChecker(props, propName, displayName/*, locale */) {
    if (typeof(props[propName]) !== "string") {
        return new TypeError(propName + " must be a string from "+ displayName);
    } else {
        return null;
    }
}

var signIn = createComponentFunction({
        name: "signIn",
        propTypes: {
            username: stringChecker,
            password: stringChecker
        }
    },
    function(props, callback) {
        var username = props.username,
            password = props.password;

        callback(undefined, {
            username: username,
            password: password
        });
    }
);

signIn({
    username: "username",
    password: "password"
}, "en", function(errors, data) {
    if (errors) {
        // handle errors
    } else {
        // do stuff with data
    }
});
```
