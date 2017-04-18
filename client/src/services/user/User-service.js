let user = {
    isSignedIn: function() {
        const user = localStorage.getItem('user');
        if(user!=undefined && user!= "") {
           return true;
        } else {
            return false;
        }
    },

    getUserName: function() {
        return localStorage.getItem('user');
    },

    logOut: function() {
        localStorage.clear();
        location.replace("/");
    },

    signIn: function(user) {
        location.reload();
        localStorage.setItem('user', user);
    }
}

export default user;