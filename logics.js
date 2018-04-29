function calculate() {
    for(user of users) {
        user.give = 0;
        user.get = 0;
        user.paid = 0;
        for(t of trans) {
            //console.log(user.nick + " oraz " + t.kto);
            if(user.nick === t.kto) {
                user.give += Number(t.ile);
            }
            for(c of clients) {
                if(t.komu == c.name) {
                    let noOfUsers = Object.keys(c).length - 1;
                    for(var i = 1; i <= noOfUsers; i++) {
                        let u = "user" + i;
                        if(user.nick == c[u]) {
                            user.get += Number(t.ile)/noOfUsers;
                            if(t.co.charAt(0) == "(" && t.co.charAt(1) == "Z" && t.co.charAt(2) == ")") {
                            } else {
                                user.paid +=Number(t.ile)/noOfUsers;
                            }
                        }
                    }
                }

            }
        }

    }
    updateSummaryTable();
    calcStatistics();
}

function calcStatistics() {

    var nav = document.getElementById("summaryNav");
    for(user of users) {
        if(user.nick != currentUser) {
            continue;
        }
        var p = document.createElement("p");
        p.innerHTML = user.nick + ": " + round2Fixed(user.paid);
        nav.appendChild(p);
    }

}
