const express = require("express");
const router = express.Router();
require("dotenv").config();
const verifyJWT = require("../middleware/verifyJWT");
const SchoolModel = require("../models/SchoolModel");
const { randomUUID } = require('crypto');
const short = require('short-uuid');
const ClassesModel = require("../models/ClassesModel");
const ProfModel = require("../models/ProfModel");
const ReviewsModels = require("../models/ReviewsModels")

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
        const course = await ClassesModel.findOne({ uuid: q }, { _id: 0, name: 1, uuid: 1, profs: 1, descripCode: 1, classCode: 1, });
        const reviews = await ReviewsModels.find({ courseRef: q })
        console.log(reviews.length)
        const length = reviews.length;
        let diffAvg = 0;
        let courseAvg = 0;
        let profAvg = 0;
        reviews.map((review) => {
            courseAvg += review?.courseRating ? review?.courseRating : 0;
            diffAvg += review?.difficultyRating ? review?.difficultyRating : 0;
            profAvg += review?.profRating ? review?.profRating : 0;
        })

        diffAvg = diffAvg / length;
        courseAvg = courseAvg / length;
        profAvg = profAvg / length;


        const results = course.toObject();


        results.difficultyRating = diffAvg;
        results.courseRating = courseAvg;
        results.profRating = profAvg;


        res.status(200).json(results);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});


router.get('/profs', async (req, res) => {
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


router.get('/profs/search/:school/:q', async (req, res) => {
    try {
        const school = req.params.school;
        const q = req.params.q;
        console.log(q);
        console.log(school);

        // Start building the search aggregation stage
        let searcher_aggregate = {
            "$search": {
                "index": 'prof_search',
                "compound": {
                    "must": [
                        // get home where queries.category is property_type
                        {
                            "text": {
                                "query": q,
                                "path": 'name',
                                "fuzzy": {}
                            },

                        },


                    ],
                    "should": [
                        {
                            "text": {
                                "query": school,
                                "path": 'schoolRefs',
                            }
                        },

                    ]
                }
            }
        };

        let projection = {
            '$project': {
                'name': 1,
                'uuid': 1,
                "schoolRefs": 1,
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


router.post('/review', async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        let prof = await ProfModel.findOne({ name: { $in: [data.prof, data.newProf] }, schoolRefs: data.schoolRef });
        let profObj;
        let course = await ClassesModel.findOne({ uuid: data?.courseRef });
        let newProf = null;
        let newProfUUID = null;
        if (data.newProfShow) {
            if (!prof) {
                newProfUUID = await short.generate()
                newProf = new ProfModel({
                    name: data.newProf,
                    uuid: newProfUUID,
                    courseRefs: [data.courseRef],
                    schoolRefs: [data.schoolRef],

                });
                course?.profs?.push({ name: data.newProf, ref: newProfUUID });
            }
            else {
                profObj = prof.toObject();
                prof?.courseRefs?.push(data.courseRef);
                course?.profs?.push({ name: prof.name, ref: prof.uuid });
            }
        }

        const review = new ReviewsModels({});
        review.schoolRef = data.schoolRef,
            review.courseRef = data.courseRef,
            review.userRef = "admin",
            review.profName = data.newProfShow ? data.newProf : data.prof,
            review.profRef = data.newProfShow ? newProfUUID : profObj.uuid,
            review.description = data.description,
            review.title = data.title,
            review.term = data.term,
            review.year = data.year,
            review.profRating = data.profRating,
            review.difficultyRating = data.difficultyRating,
            review.courseRating = data.courseRating,
            review.private = data.privateChecked,
            review.date = new Date(),
            review.uuid = short.generate(),




            review.save().then(() => {
                console.log("new review saved");
            }, (err) => {
                console.log(err);
            })

        if (!prof) {
            newProf.save().then(() => {
                console.log("new prof created");
            }, (err) => { console.log(err); })
        }
        else {
            prof.save().then(() => {
                console.log("prof updated");
            }, (err) => { console.log(err); })
        }

        course.save().then(() => {
            console.log("course updated");
        }, (err) => { console.log(err); })

        return res.status(200).json({ message: "Data Successfully Created." });


    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

router.get('/reviews/:q', async (req, res) => {
    const q = req.params.q;
    try {
        const reviews = await ReviewsModels.find({ courseRef: q }, { _id: 0, courseRef: 0, schoolRef: 0, });
        console.log(reviews)
        res.status(200).json(reviews);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});


module.exports = router;
