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


router.post('/add', async (req, res) => {
    const data = req.body;

    try {
        const dup = await ClassesModel.findOne({ $or: [{ 'trunkName': data?.trunkName }, { 'name': data?.courseName }] }, { schoolRef: data?.schoolRef })

        if (dup) {
            res.status(403).json({ message: "A record of this class already exists for this school." });
            console.log("this course already exists");
            return;

        }
        const uuid = short.generate();


        const couse = new ClassesModel({});
        couse.name = data?.courseName.trim();
        couse.descripCode = data?.subjectCode;
        couse.classCode = data?.classCode;
        couse.trunkName = data?.trunkName;
        couse.schoolRef = data?.schoolRef;
        couse.uuid = uuid;

        couse.save().then(() => {
            console.log("new course saved");
            res.status(200).json({ message: "Course Successfully Added", uuid: uuid });
            return
        },
            (err) => {
                const errs = err?.errors
                const keys = Object.keys(err?.errors);
                const msg = errs[keys[0]]?.properties?.message;
                res.status(err.status || 400).json({ message: msg || err?.message });
                return;

            })

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });;
    }
});






router.post('/', async (req, res) => {
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


router.get('/', async (req, res) => {
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



router.get('/search/:school/:q', async (req, res) => {
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
                    "filter": [
                        {
                            "text": {
                                "query": school,
                                "path": ['parentRef', 'schoolRef'],
                            }
                        },

                    ],
                    "should": [
                        // get home where queries.category is property_type
                        {
                            autocomplete: {
                                query: q,
                                path: "name"
                            }
                        },
                        {
                            autocomplete: {
                                query: q,
                                path: "descripCode"
                            }
                        },
                        {
                            autocomplete: {
                                query: q,
                                path: "classCode"
                            }
                        },

                    ],

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

router.get('/:q', async (req, res) => {
    const q = req.params.q;
    try {
        const courseRes = await ClassesModel.aggregate([
            {
                $match: { uuid: q }
            },
            {
                $lookup: {
                    from: "profs",
                    pipeline: [
                        { $match: { "courseRefs": { $in: [q] } } },
                        { $project: { _id: 0, firstName: 0, middleName: 0, lastName: 0, trunkFullName: 0, department: 0, schoolRef: 0, courseRefs: 0, __v: 0 } }
                    ],
                    as: "betterProfs",
                }
            },

        ]).limit(1);

        console.log(courseRes);
        if (courseRes.length === 0) return res.status(409).send({ message: "No courses found." });
        if (courseRes.length > 1) return res.status(409).send({ message: "Duplicates found." });


        let course = courseRes[0];


        // const course = await ClassesModel.findOne({ uuid: q }, { _id: 0, name: 1, uuid: 1, profs: 1, descripCode: 1, classCode: 1, });
        const reviews = await ReviewsModels.find({ courseRef: q })
        console.log(reviews.length)
        const length = reviews?.length;
        let diffAvg = 0;
        let courseAvg = 0;
        let profAvg = 0;
        reviews?.map((review) => {
            courseAvg += review?.courseRating ? review?.courseRating : 0;
            diffAvg += review?.difficultyRating ? review?.difficultyRating : 0;
            profAvg += review?.profRating ? review?.profRating : 0;
        })

        diffAvg = diffAvg / length;
        courseAvg = courseAvg / length;
        profAvg = profAvg / length;

        course.difficultyRating = diffAvg;
        course.courseRating = courseAvg;
        course.profRating = profAvg;
        course.amount = length;


        res.status(200).json(course);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});




module.exports = router;
