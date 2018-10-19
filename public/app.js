document.addEventListener("DOMContentLoaded", event => {
    
    const app = firebase.app();
    console.log(app);

});

/// Login with Google Auth
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    /// Popup with Google Sign-In
    /*
     * Returns a Promise, so we attach 'then'.
     * This gives us the user once that promise resolves.
     */
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.write(`Hello ${user.displayName}`);
            console.log(user);
        })
        .catch(console.log);
}