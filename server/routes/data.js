const express = require("express");
const router = express.Router();
require("dotenv").config();
const verifyJWT = require("../middleware/verifyJWT");
const SchoolModel = require("../models/SchoolModel");
const { randomUUID } = require('crypto');
const short = require('short-uuid');


// PROP TYPE END POINTS


router.get('/schools', async (req, res) => {
    try {
        const schools = await SchoolModel.find({});

        res.status(200).json(schools);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});


router.get('/schools/search/:q', async (req, res) => {
    try {
        const q = req.params.q;
        console.log(q);

        // Start building the search aggregation stage
        let searcher_aggregate = {
            "$search": {
                "index": 'search_schools',
                "compound": {
                    "must": [
                        // get home where queries.category is property_type
                        {
                            "text": {
                                "query": q,
                                "path": 'name',
                                "fuzzy": {}
                            }
                        },

                    ]
                }
            }
        };

        let projection = {
            '$project': {
                'name': 1,
                'trunkName': 1,
                "_id": 0

            }
        };


        let results = await SchoolModel.aggregate([searcher_aggregate, projection]).limit(50);
        res.send(results).status(200);

    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

// router.get('/projects', async (req, res) => {
//     try {
//         const projs = await ProjectsModel.find({}, { _id: 0, __v: 0 }).sort({ order: -1 });
//         console.log(projs);

//         res.status(200).json(projs);
//     }
//     catch (err) {
//         console.log(err);
//         res.sendStatus(400);
//     }
// });

// router.get('/classes', async (req, res) => {
//     try {
//         const classes = await ClassesModel.find({}, { _id: 0, __v: 0 });
//         console.log(classes);

//         res.status(200).json(classes);
//     }
//     catch (err) {
//         console.log(err);
//         res.sendStatus(400);
//     }
// });


// router.post('/workExperience', async (req, res) => {
//     try {
//         const newClass = new ClassesModel({});
//         newClass.name = "Applied Statistical Methods"
//         newClass.details = "This course is an intensive introduction to statistical methods. It is designed for students who want to do data analysis and to study further ideas in applied statistics beyond this course. The topics covered include descriptive statistics, elementary probability, random sampling, controlled experiments, hypothesis testing, regression and the analysis of variance. Emphasis will be placed on the statistical reasoning underlying the methods. Students will also become proficient at the use of a statistical software package."
//         newClass.grade = "A"
//         newClass.term = "Fall 2022-2023"
//         newClass.code = "STAT 1000"



//         newClass.save().then(() => {
//             console.log("new proj experience saved");
//             res.status(200).json({ message: "Data Successfully Created." });
//             return
//         },
//             (err) => {
//                 console.log(err);
//                 res.status(err.status || 400).json({ message: err.message });
//                 return;

//             })
//     }
//     catch (err) {
//         console.log(err);
//         res.sendStatus(400);
//     }
// });



module.exports = router;
