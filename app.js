const express = require('express')
const mongoose = require('mongoose');
const routes = require('./routes/routes.js')




const app = express()


app.use(express.json());
app.use('/api', routes);
// app.use('apii', tokensender)


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/realtimePratice').then(()=> (console.log("successful connected")));
}




 const  firstScheme =  mongoose.Schema({
    name : String,
    fatherName : String,
    class : String,
    rollNo : String,
    // Date : Date.now
    });


    const  firstSchemeModel = mongoose.model("studentData" , firstScheme);


   async function datacollection() {

    const zeeshanData = firstSchemeModel({
        name : "Zeeshan",
        fatherName : "Habib ur rehman",
        class : "Graduated",
        rollNo : "10",
    });

    const zamanData = firstSchemeModel({
        name : "zaman",
        fatherName : "Habib ur rehman",
        class : "BS IT 1st Semester",
        rollNo : "008",
    });

    const kamranData = firstSchemeModel({
        name : "Kamran",
        fatherName : "Habib ur rehman",
        class : "BS Agriculture Engreening 2nd Semester",
        rollNo : "004",
    });

    const usmanData = firstSchemeModel({
        name : "usman",
        fatherName : "Habib ur rehman",
        class : "10th",
        rollNo : "01",
    });

    // const finalData = await firstSchemeModel.insertMany([zeeshanData ,zamanData,kamranData,usmanData]);
    // console.log(finalData)
    }

    // datacollection();

   


    



app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
