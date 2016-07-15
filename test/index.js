var tape = require("tape"),
    createComponentFunction = require("..");


function stringChecker(props, propName /*, displayName, locale  */ ) {
    if (typeof(props[propName]) !== "string") {
        return new TypeError("Invalid String");
    } else {
        return null;
    }
}

tape("createComponentFunction(options: Object, func: Function) should create new function with prop type checker", function(assert) {
    var signIn = createComponentFunction({
            name: "signIn",
            propTypes: {
                username: stringChecker,
                password: stringChecker
            }
        },
        function signIn(props, callback) {
            var username = props.username,
                password = props.password;

            callback(undefined, {
                username: username,
                password: password
            });
        }
    );

    signIn({}, "en", function onSignIn(errors) {
        assert.equal(errors[0].message, "Invalid String");
        assert.equal(errors[1].message, "Invalid String");
    });

    signIn({
        username: "username",
        password: "123456"
    }, "en", function onSignIn(errors, user) {
        assert.deepEqual(user, {
            username: "username",
            password: "123456"
        });
    });

    assert.end();
});
