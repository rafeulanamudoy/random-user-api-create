const express = require("express");
const cors = require("cors");
const fs = require("fs");


const app = express();
app.use(express.json())
app.use(cors());
const PORT = 5000;

app.get("/", (req, res) => {

    res.send("express project start")
})


app.get("/user/random", (req, res) => {

    //res.send("hi i am provide you random user")
    fs.readFile("./user.json", (error, data) => {

        if (error) {
            res.send("user didnt found")
        }
        else {

            const users = JSON.parse(data);
            const randomUser = users[Math.floor(Math.random() * 22)]


            res.json(randomUser)
        }
    })
})
app.get("/user/all", (req, res) => {

    fs.readFile('./user.json', (error, data) => {

        if (error) {

            res.send("user didnt found")
        }
        else {

            // console.log(JSON.parse(data))

            const parseUser = JSON.parse(data);
            const userLimit = req.query.limit;
            const fewUser = parseUser.slice(0, userLimit);

            userLimit ? res.json(fewUser) : res.json(parseUser)


        }
    })


})

app.post("/user/save", (req, res) => {
    console.log(req.body)
    req.body.Id = Math.random() * 100.1234566
    if (!req.body.Id) {
        res.send("your Id propery is missing.please again send your info includng Your Id")
    }
    else if (!req.body.gender) {
        res.send("your gender propery is missing.please again send your info includng Your gender")
    }
    else if (!req.body.name) {
        res.send("your name propery is missing.please again send your info includng Your name")
    }
    else if (!req.body.contact) {
        res.send("your contact propery is missing.please again send your info includng Your contact")
    }
    else if (!req.body.address) {
        res.send("your address propery is missing.please again send your info includng Your address")
    }
    else if (!req.body.photoUrl) {
        res.send("your photoUrl propery is missing.please again send your info includng Your photoUrl")
    }
    else {

        fs.readFile("./user.json", (error, data) => {

            if (error) {
                res.send("user didnt found")
            }
            else {

                const userDetail = JSON.parse(data);


                userDetail.push(req.body)
                // console.log("from 90 line", userDetail)
                fs.writeFile("./user.json", JSON.stringify(userDetail), (error) => {

                    if (error) {
                        res.send("data didnt write succesfully");

                    }
                    else {

                        res.send("data succesfully add");

                    }
                })

            }
        })


    }


    //res.send("saved data")
})

app.patch("/user/update/:id", (req, res) => {




    fs.readFile('./user.json', (error, data) => {

        if (error) {

            res.send("user didnt found")
        }
        else {

            // console.log(JSON.parse(data))
            const { Id, gender, name, contact, address, photoUrl } = req.body;
            const { id } = req.params;
            const parseUser = JSON.parse(data);

            const updateuserInfo = parseUser.find(user => user.Id === Number(id));

            //  console.log(updateuserInfo)

            if (!updateuserInfo) {
                res.send(`this id not exist in user.json file and you send a ${typeof (id)} parameter`)
                return
            }

            //console.log(Id, gender, name)
            if (Id) {
                updateuserInfo.Id = Id;
            }
            if (photoUrl) {
                updateuserInfo.photoUrl = photoUrl
            }
            if (name) {
                updateuserInfo.name = name


            }
            if (gender) {
                updateuserInfo.gender = gender;


            }
            if (contact) {
                updateuserInfo.contact = contact;


            }
            if (address) {
                updateuserInfo.address = address;


            }

            //  const remainingUser = parseUser.filter(user => user.Id !== Number(id))
            // remainingUser.push(updateuserInfo)
            //   console.log(parseUser)
            fs.writeFile("./user.json", JSON.stringify(parseUser), (error) => {

                if (error) {
                    res.send(`data didnt write succesfully and you send a ${typeof (id)} parameter`);

                }
                else {

                    res.send(`data succesfully update and you send a ${typeof (id)} parameter`);

                }
            })









        }
    })

})

app.patch("/user/bulk-update", (req, res) => {
    fs.readFile("./user.json", (error, data) => {

        if (error) {
            res.send("user didnt found")
        }
        else {

            const userDetail = JSON.parse(data);
            const { ids, gender, name, contact, address, photoUrl } = req.body;


            const users = []
            //   console.log(userDetail, userIds)

            ids.map(userId => {
                const updateuserInfo = userDetail.find(user => user.Id === Number(userId));
                //console.log(updateuserInfo)
                if (updateuserInfo) {
                    users.push(updateuserInfo)
                }
                // console.log(userId)

            })
            // console.log(users)

            if (users.length > 0) {
                for (let updateuserInfo of users) {


                    console.log(updateuserInfo)

                    if (photoUrl) {
                        updateuserInfo.photoUrl = photoUrl
                    }
                    if (name) {
                        updateuserInfo.name = name


                    }
                    if (gender) {
                        updateuserInfo.gender = gender;


                    }
                    if (contact) {
                        updateuserInfo.contact = contact;


                    }
                    if (address) {
                        updateuserInfo.address = address;


                    }

                }

                fs.writeFile("./user.json", JSON.stringify(userDetail), (error) => {

                    if (error) {
                        res.send(`data didnt write succesfully `);

                    }
                    else {
                        //  console.log(userDetail)
                        res.send(`data succesfully update `);

                    }
                })




            }

            else {
                res.send("users id doesnt exit in the user,json file")
            }

        }


    })
})

app.delete("/user/delete", (req, res) => {
    //res.send("deleted api called")
    fs.readFile("./user.json", (error, data) => {

        if (error) {
            res.send("user didnt found")
        }
        else {

            const userDetail = JSON.parse(data);

            // console.log(req.body)
            const { Id } = req.body

            const remaingUser = userDetail.filter(user => user.Id !== Number(Id));

            if (userDetail.length === remaingUser.length) {

                res.send("your id didnt exist in the user.json file")

            }
            else {

                fs.writeFile("./user.json", JSON.stringify(remaingUser), (error) => {

                    if (error) {
                        res.send(`data didnt write succesfully `);

                    }
                    else {
                        //  console.log(userDetail)
                        res.send(`data succesfully Delete  `);

                    }
                })


            }


        }
    })



})



app.listen(PORT, () => {

    console.log(`server is starting at ${PORT}`)
})