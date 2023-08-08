const express = require("express");
const router = express.Router();
require("dotenv").config();
const verifyJWT = require("../middleware/verifyJWT");
const SchoolModel = require("../models/SchoolModel");
const { randomUUID } = require('crypto');
const short = require('short-uuid');
const ClassesModel = require("../models/ClassesModel");


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

router.get('/schools/:q', async (req, res) => {
    const q = req.params.q;
    try {
        const school = await SchoolModel.findOne({ trunkName: q }, { _id: 0, name: 1, uuid: 1, rating: 1, city: 1, state: 1, trunkName: 1 });

        res.status(200).json(school);
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



router.post('/classes/', async (req, res) => {
    const q = req.params.q;
    try {
        const newClass = new ClassesModel({});
        newClass.name = "Calc 2"
        newClass.classCode = "0230"
        newClass.descripCode = "MATH"
        newClass.parentRef = "dLahKVTqXZM48x6foNkvpp"
        newClass.addedBy = "Course Judger"
        newClass.rating = 86;
        newClass.profs = [{ name: "Angela Athanas", ref: "123123123" }]
        newClass.uuid = short.generate();


        newClass.save().then(() => {
            console.log("new class saved");
            res.status(200).json({ message: "Data Successfully Created." });
            return
        },
            (err) => {
                console.log(err);
                res.status(err.status || 400).json({ message: err.message });
                return;

            })

    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});


router.get('/classes/', async (req, res) => {
    const q = req.params.q;
    try {
        const newClasses = await ClassesModel.find({});


        newClasses.forEach((classes) => {
            classes.uuid = short.generate();
            classes.save().then(() => {
                console.log(" class saved");

            },
                (err) => {
                    console.log(err);
                    res.status(err.status || 400).json({ message: err.message });
                    return;

                })
        })




    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});



router.get('/classes/search/:school/:q', async (req, res) => {
    try {
        const school = req.params.school;
        const q = req.params.q;
        console.log(q);
        console.log(school);

        // Start building the search aggregation stage


        let searcher_aggregate = {
            "$search": {
                "index": 'class_search',
                "compound": {

                    "should": [
                        // get home where queries.category is property_type
                        {
                            "text": {
                                "query": q,
                                "path": 'name',
                                "fuzzy": {}
                            }
                        },
                        {
                            "text": {
                                "query": q,
                                "path": 'descripCode',
                                "fuzzy": {}
                            }
                        },
                        {
                            "text": {
                                "query": q,
                                "path": 'classCode',
                                "fuzzy": {}
                            }
                        },
                        {
                            "text": {
                                "query": q,
                                "path": 'profs.name',
                                "fuzzy": {}
                            }
                        },

                    ],
                    "must": [
                        {
                            "text": {
                                "query": school,
                                "path": 'parentRef',
                            }
                        },

                    ]
                }
            }
        };

        let projection = {
            '$project': {
                'name': 1,
                'profs': 1,
                "descripCode": 1,
                "classCode": 1,
                "uuid": 1,
                "rating": 1,
                "_id": 0,
            }
        };


        let results = await ClassesModel.aggregate([searcher_aggregate, projection]).limit(50);
        console.log(results)
        res.send(results).status(200);

    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

router.get('/classes/:q', async (req, res) => {
    const q = req.params.q;
    try {
        const course = await ClassesModel.findOne({ uuid: q }, { _id: 0, name: 1, uuid: 1, rating: 1, profs: 1, descripCode: 1, classCode: 1, });

        res.status(200).json(course);
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
