function calculate() {
    for(user of users) {
        user.give = 0;
        user.get = 0;
        for(t of trans) {
            console.log(user.nick + " oraz " + t.kto);
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
                        }
                    }
                }

            }
        }

    }
    console.log(users);
    updateSummaryTable();
}
