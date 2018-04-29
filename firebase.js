
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
        if(users[i].nick == currentUser) {
            form.kto.selectedIndex = i;
        }
    }

    for(var i = 0; i < clients.length; i++) {
        var opt = document.createElement('option');
        opt.value = clients[i].name;
        opt.innerHTML = clients[i].name;
        form.komu.appendChild(opt);
        if(clients[i].name == currentUser) {
            form.komu.selectedIndex = i;
        }
    }

    form.kiedy.value = formatDateString();
}

function downloadObjectAsJson(exportObj, exportName){
   var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
   var downloadAnchorNode = document.createElement('a');
   downloadAnchorNode.setAttribute("href",     dataStr);
   downloadAnchorNode.setAttribute("download", exportName + ".json");
   downloadAnchorNode.click();
   downloadAnchorNode.remove();
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
        //cell.setAttribute("")
        if(userConfig.tableLayout.left.users[u] == currentUser) {
            cell.setAttribute("class", "hover2Cell");
        }
    }
}

function setTable(sm) {
    var x = document.getElementById("userChoiceTab");
    let noOfUsers = Object.keys(userConfig.tableLayout.left.users).length;
    for(var i = 0; i < noOfUsers; i++) {
        var cell = x.rows[0].cells[i];
        cell.setAttribute("class","hoverCell");
    }
    console.log(sm.innerHTML);
    chosenLeftTable = sm.innerHTML;
    sm.setAttribute("class","hover2Cell");
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
  }).then(function() {
      var modal = document.getElementById('failureAlert');
      modal.style.display = "block";
          $(".failureModal").fadeOut(3000);
  });

  //updateCenterTable();
}
