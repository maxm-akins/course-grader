const express = require("express");
const router = express.Router();
require("dotenv").config();
const verifyJWT = require("../middleware/verifyJWT");
const SchoolModel = require("../models/SchoolModel");
const { randomUUID } = require('crypto');
const short = require('short-uuid');
const ClassesModel = require("../models/ClassesModel");
const ProfModel = require("../models/ProfModel");
const ReviewsModels = require("../models/ReviewsModels");
const ProfReviewModel = require("../models/ProfReviewModel");


router.get('/', async (req, res) => {
    const q = req.params.q;
    try {
        const prof = new ProfModel({});
        prof.name = "John Rameriez"
        prof.uuid = short.generate();

        prof.save().then(() => {
            console.log("new prof saved");
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


router.get('/search/:school/:course/:q', async (req, res) => {
    try {
        const school = req.params.school;
        const course = req.params.course;
        const q = req.params.q;
        console.log("q " + q);
        console.log("school " + school);
        console.log("course " + course);

        // Start building the search aggregation stage
        let searcher_aggregate = {
            "$search": {
                "index": 'prof_search',
                "compound": {
                    "must": [
                        {
                            "text": {
                                "query": school,
                                "path": ['schoolRefs', 'schoolRef'],
                            }
                        },

                    ],
                    "mustNot": [
                        {
                            "text": {
                                "query": course,
                                "path": 'courseRefs',
                            },

                        },


                    ],
                    "should": [
                        {
                            "text": {
                                "query": q,
                                "path": 'name',
                                "fuzzy": {}
                            },
                        },
                    ],

                }
            }
        };

        let projection = {
            '$project': {
                'name': 1,
                'fullName': 1,
                'uuid': 1,
                "_id": 0

            }
        };


        let results = await ProfModel.aggregate([searcher_aggregate, projection]).limit(50);
        console.log(results)
        res.send(results).status(200);

    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});



router.get('/search/:school/:q', async (req, res) => {
    try {
        const school = req.params.school;
        const q = req.params.q;
        console.log("q " + q);
        console.log("school " + school);

        // Start building the search aggregation stage
        let searcher_aggregate = {
            "$search": {
                "index": 'prof_search',
                "compound": {
                    "filter": [
                        {
                            "text": {
                                "query": school,
                                "path": ['schoolRefs', 'schoolRef'],
                            }
                        },

                    ],
                    "should": [
                        {
                            autocomplete: {
                                query: q,
                                path: "fullName"
                            }
                        },
                        {
                            autocomplete: {
                                query: q,
                                path: "department"
                            }
                        },
                    ],

                }
            }
        };

        let projection = {
            '$project': {
                'name': 1,
                'fullName': 1,
                'uuid': 1,
                "department": 1,
                "_id": 0

            }
        };


        let results = await ProfModel.aggregate([searcher_aggregate, projection]).limit(50);
        console.log(results)
        res.send(results).status(200);

    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});


router.get('/:q', async (req, res) => {
    const q = req.params.q;
    console.log(q);
    try {





        const prof = await ProfModel.aggregate([
            {
                $match: { uuid: q }
            },
            {
                $lookup: {
                    from: "classes",
                    "localField": "courseRefs",
                    "foreignField": "uuid",
                    as: "courses",
                    pipeline: [
                        {
                            $project: { _id: 0, __v: 0 }
                        }
                    ]
                }
            },

            {
                $project: {
                    _id: 0,
                }
            },
            {
                $sort: { date: -1 }
            },

        ],)



        console.log(prof);
        if (!prof) res.status(403).json({ message: "Professor Not Found" });

        if (prof.length > 1) res.status(403).json({ message: "Duplicates Found" });


        const reviews = await ProfReviewModel.find({ profRef: q })
        console.log(reviews.length)
        const length = reviews?.length;
        let diffAvg = 0;
        let overallAvg = 0;
        reviews?.map((review) => {
            overallAvg += review?.overallRating ? review?.overallRating : 0;
            diffAvg += review?.difficultyRating ? review?.difficultyRating : 0;
        })

        diffAvg = diffAvg / length;
        overallAvg = overallAvg / length;

        prof[0].difficultyRating = diffAvg;
        prof[0].overallRating = overallAvg;
        prof[0].amount = length;

        console.log(prof[0])


        return res.status(200).json(prof[0]);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});



module.exports = router;
