var assert = require("assert"),
    component = require("../src/index");


function string(props, propName /*, displayName  */ ) {
    if (typeof(props[propName]) !== "string") {
        return new TypeError("errors.string");
    } else {
        return null;
    }
}

describe("component(options: Object)", function() {
    it("should create new function with prop type checker", function() {
        var signIn = component({
            name: "signIn",
            propTypes: {
                username: string,
                password: string
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

        signIn({}, function(errors) {
            if (errors) {
                assert.equal(errors[0].message, "errors.string");
                assert.equal(errors[1].message, "errors.string");
            }
        });

        signIn({
            username: "username",
            password: "123456"
        }, function(errors, user) {
            if (user) {
                assert.deepEqual(user, {
                    username: "username",
                    password: "123456"
                });
            }
        });
    });
});
