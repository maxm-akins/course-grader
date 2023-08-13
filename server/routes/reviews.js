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



router.post('/', async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        let prof = await ProfModel.findOne({ name: { $in: [data.prof, data.newProf] }, schoolRefs: data.schoolRef });
        let profObj = prof.toObject();
        let course = await ClassesModel.findOne({ uuid: data?.courseRef });
        let newProf = null;
        let newProfUUID = null;
        if (data.newProfShow) {
            if (!prof) {
                newProfUUID = await short.generate();


                newProf = new ProfModel({
                    name: data.newProf,
                    uuid: newProfUUID,
                    courseRefs: [data.courseRef],
                    schoolRefs: [data.schoolRef],

                });
                let dup = false;
                dup = course?.profs?.find((obj) => {
                    if (obj.ref === newProfUUID || obj.name === data.newProf) return true
                })

                if (!dup) course?.profs?.push({ name: data.newProf, ref: newProfUUID });
            }
            else {
                let dup1 = false;
                dup1 = course?.profs?.find((obj) => {
                    if (obj.ref === prof?.uuid || obj.name === prof.name) return true
                })

                let dup2 = false;
                dup2 = prof?.courseRefs?.find((obj) => {
                    if (obj === data.courseRef) return true
                })


                if (dup1 || dup2) {
                    throw new Error("The professor or course or both is/are already associated with the other.");

                }
                else {
                    prof?.courseRefs?.push(data.courseRef);
                    course?.profs?.push({ name: prof.name, ref: prof.uuid });
                }

            }
        }

        const review = new ReviewsModels({});
        review.schoolRef = data.schoolRef,
            review.courseRef = data.courseRef,
            review.userRef = "admin",
            review.profName = data.newProfShow ? data.newProf : data.prof,
            review.profRef = (!prof) ? newProfUUID : profObj.uuid,
            review.description = data.description,
            review.title = data?.title || `Review on ${new Date().toLocaleDateString("en-US")} `,
            review.term = data.term,
            review.year = data.year,
            review.profRating = data.profRating,
            review.difficultyRating = data.difficultyRating,
            review.courseRating = data.courseRating,
            review.private = data.privateChecked,
            review.date = new Date(),
            review.uuid = short.generate(),



            console.log(await review.validate());
        if (!prof) console.log(await newProf.validate());
        else console.log(await prof.validate());
        console.log(await course.validate());



        review.save().then(() => {
            console.log("new review saved");
        }, (err) => {
            console.log(err);
            throw new Error(err);
        })

        if (!prof) {
            newProf.save().then(() => {
                console.log("new prof created");
            }, (err) => {
                console.log(err);
                throw new Error(err);
            })
        }
        else {
            prof.save().then(() => {
                console.log("prof updated");
            }, (err) => {
                console.log(err);
                throw new Error(err);
            })
        }

        course.save().then(() => {
            console.log("course updated");
        }, (err) => {
            console.log(err);
            throw new Error(err);
        })

        return res.status(200).json({ message: "Data Successfully Created." });


    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

router.get('/:q', async (req, res) => {
    const q = req.params.q;
    try {
        const reviews = await ReviewsModels.find({ courseRef: q }, { _id: 0, courseRef: 0, schoolRef: 0, }).sort('-date');
        console.log(reviews)
        res.status(200).json(reviews);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});


module.exports = router;
