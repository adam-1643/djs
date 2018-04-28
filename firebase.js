
var config = {
    apiKey: "AIzaSyCe2omptPIVRq3mfjkRMHbf_Dcm6VkYG0c",
    authDomain: "baza-djs.firebaseapp.com",
    databaseURL: "https://baza-djs.firebaseio.com",
    projectId: "baza-djs",
    storageBucket: "baza-djs.appspot.com",
    messagingSenderId: "417060931400"
};

firebase.initializeApp(config);

var database = firebase.database();


function reloadUserData() {

    var form = document.getElementById("myForm");

    //format formularza
    for(i = form.kto.options.length - 1 ; i >= 0 ; i--)
    {
        form.kto.remove(i);
    }
    for(i = form.komu.options.length - 1 ; i >= 0 ; i--)
    {
        form.komu.remove(i);
    }

    for(var i = 0; i < users.length; i++) {
        var opt = document.createElement('option');
        opt.value = users[i].nick;
        opt.innerHTML = users[i].nick;
        form.kto.appendChild(opt);
    }

    for(var i = 0; i < clients.length; i++) {
        var opt = document.createElement('option');
        opt.value = clients[i].name;
        opt.innerHTML = clients[i].name;
        form.komu.appendChild(opt);
    }

    form.kiedy.value = formatDateString();
}

function updateUserChoiceTable() {

    var x = document.getElementById("userChoiceTab");
    let noOfUsers = Object.keys(userConfig.tableLayout.left.users).length;
    var row = x.insertRow();
    for(var i = 1; i <= noOfUsers; i++) {
        var cell = row.insertCell();
        var u = "user" + i;
        cell.innerHTML = userConfig.tableLayout.left.users[u];
        cell.setAttribute("onclick","setTable(this);");
        cell.setAttribute("class","hoverCell");
    }
}

function setTable(sm) {
    console.log(sm.innerHTML);
    chosenLeftTable = sm.innerHTML;
    updateLeftTable();
}

function loadData() {
    //load transaction data
    //trans = [];
    //transKey = [];
    var leadsRef = database.ref('/transactions/' + month);
    leadsRef.on('value', function(snapshot) {
        trans = [];
        transKey = [];
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            transKey.push(childSnapshot.key);
            console.log(childSnapshot.key);
            trans.push(childData);
        });
        updateData();
    });
}


function loadUser() {

    //load all users
    users = [];
    var leadsRef = database.ref('users');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            users.push(childData);
        });
        reloadUserData();
    });

    //load all clients
    clients = [];
    var leadsRef = database.ref('clients');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            clients.push(childData);
        });
        reloadUserData();
    });

    //load userConfig
    var leadsRef2 = database.ref('users/');
    leadsRef2.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            if(childSnapshot.val().nick == currentUser) {
                userConfig = childSnapshot.val().config;
            }
        });
        userDataLoaded = true;
        updateUserChoiceTable();
    });

}

function deleteTransaction(id) {

console.log(id.id);

    var leadsRef = database.ref('transactions/' + month + "/" + id.id + "/active").set({
    "isActive": 0
  });

    document.getElementById("fade").style ="";
          // Animate loader off screen
      $(".se-pre-con").fadeOut(1000);


  //updateCenterTable();
}
