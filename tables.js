function updateCenterTable() {
    var x = document.getElementById("tab");

    for(i = x.rows.length - 1 ; i >= 0 ; i--)
    {
        if(x.rows[i].id == 'centerTable') {
            x.deleteRow(i);
        }
    }

    for (var i = 0; i < trans.length; i++) {

        if(trans[i].active.isActive == 0) {
            continue;
        }

        let c = userConfig.tableLayout.center.client;
        if(trans[i].komu != c){
            continue;
        }

        var row = x.insertRow();
        row.id = "centerTable";
        var cell;

        cell = row.insertCell();
        var img = document.createElement('img');
        img.src = "trash.png";
        img.width="20";
        img.height="20";
        cell.appendChild(img);
        cell.setAttribute("id",transKey[i]);
        cell.setAttribute("onclick","deleteTransaction(this)");
        cell.setAttribute("class","centerTrashClass");

        cell = row.insertCell();
        cell.innerHTML = trans[i].kiedy;
        cell.className = "centerDateClass";
        cell = row.insertCell().innerHTML = trans[i].co;
        let noOfUsers = Object.keys(userConfig.tableLayout.center.users).length;
        for(var j = 1; j <= noOfUsers; j++) {
            let u = "user" + j;
            cell = row.insertCell();
            cell.innerHTML = trans[i].kto == userConfig.tableLayout.center.users[u] ? round2Fixed(trans[i].ile).toLocaleString("pl") + " zł" : "";
            cell.className = "centerName" + j + "Class";
        }
    }
}

function updateLeftTable() {

    //insert left user name
    var leftUser = document.getElementById("leftUser");
    leftUser.innerHTML=chosenLeftTable;

    var x = document.getElementById("leftTab");
    //clear table
    for(i = x.rows.length - 1 ; i >= 1 ; i--)
    {
        x.deleteRow(i);
    }

    for (var i = 0; i < trans.length; i++) {

        if(trans[i].active.isActive == 0) {
            continue;
        }
        //choose only user transactions
        if(trans[i].komu != chosenLeftTable){
            continue;
        }
        //insert row
        var row = x.insertRow();
        row.id = "leftTable";
        var cell;

        //insert trash cell
        cell = row.insertCell();
        var img = document.createElement('img');
        img.src = "trash.png";
        img.width="20";
        img.height="20";
        cell.appendChild(img);
        cell.setAttribute("id",transKey[i]);
        cell.setAttribute("onclick","deleteTransaction(this)");
        cell.setAttribute("class","leftTrashClass");

        //insert date cell
        cell = row.insertCell();
        cell.innerHTML = trans[i].kiedy;
        cell.className = "leftDateClass";
        //insert thing cell
        cell = row.insertCell().innerHTML = trans[i].co;
        //insert amount cell
        cell = row.insertCell();
        cell.innerHTML = round2Fixed(trans[i].ile).toLocaleString("pl") + " zł";
        cell.className = "leftName1Class";
        //insert payer cell
        cell = row.insertCell();
        cell.innerHTML = trans[i].kto.charAt(0);
        cell.className = "leftName2Class";
    }
}

function updateRightTable() {
    var x = document.getElementById("rightTab");
    //clear table
    for(i = x.rows.length - 1 ; i >= 1 ; i--)
    {
        if(x.rows[i].id == 'rightTable') {
            x.deleteRow(i);
        }
    }

    for (var i = 0; i < trans.length; i++) {

        if(trans[i].active.isActive == 0) {
            continue;
        }

        let c = userConfig.tableLayout.center.client;
        if(trans[i].komu == c){
            continue;
        }
        var isValid = true;
        let noOfClients = Object.keys(userConfig.tableLayout.left.users).length;
        for(var j = 1; j <= noOfClients; j++) {
            let u = "user" + j;
            if(userConfig.tableLayout.left.users[u] == trans[i].komu) {
                isValid = false;
            }
        }
        if(isValid == false) {
            continue;
        }

        //insert row
        var row = x.insertRow();
        row.id = "rightTable";
        var cell;

        //insert trash cell
        cell = row.insertCell();
        var img = document.createElement('img');
        img.src = "trash.png";
        img.width="20";
        img.height="20";
        cell.appendChild(img);
        cell.setAttribute("id",transKey[i]);
        cell.setAttribute("onclick","deleteTransaction(this)");

        //insert date cell
        cell = row.insertCell().innerHTML = trans[i].kiedy;
        //insert thing cell
        cell = row.insertCell();

        var img = document.createElement('img');
        img.src = "images/editButton.png";
        img.width="10";
        img.height="10";
        img.setAttribute("class","editButton");
        cell.appendChild(img);
        cell.setAttribute("id",transKey[i]);

        cell.innerHTML += trans[i].co;



        cell.setAttribute("onclick","ttt(this)");
        //insert buyer cell
        cell = row.insertCell().innerHTML = trans[i].komu;
        //insert amount cell
        cell = row.insertCell();
        cell.innerHTML = trans[i].ile;
        cell.setAttribute("onclick","ttt(this);");
        //insert kto cell
        cell = row.insertCell().innerHTML = trans[i].kto.charAt(0);
        // let noOfUsers = Object.keys(userConfig.tableLayout.right.users).length;
        // for(var j = 1; j <= noOfUsers; j++) {
        //     let u = "user" + j;
        //     cell = row.insertCell().innerHTML = trans[i].kto == userConfig.tableLayout.center.users[u] ? trans[i].ile : "";
        // }
    }
}




function ttt(cell) {
    var row = cell.parentElement;

    for(var  i = row.cells.length-1; i > 0; i--) {
        row.cells[i].setAttribute("contenteditable", "true");
    }
    row.cells[0].firstElementChild.src = "images/acceptButton.png";
    row.cells[0].setAttribute("onclick","updateEditedData(this)");

    //cell.setAttribute("contenteditable", "true");
}

function updateEditedData(cell) {
    console.log("uuu");
    var row = cell.parentElement;

    for(var  i = row.cells.length-1; i > 0; i--) {
        row.cells[i].setAttribute("contenteditable", "false");
    }
    row.cells[0].firstElementChild.src = "trash.png";
    row.cells[0].setAttribute("onclick","deleteTransaction(this)");

    console.log(row.cells[5].innerHTML);              //kto
    console.log(row.cells[3].innerHTML);              //komu
    console.log(row.cells[2].innerHTML);              //co
    console.log(row.cells[4].innerHTML);              //ile
    console.log(row.cells[1].innerHTML);              //kiedy
    console.log(currentUser);
}
