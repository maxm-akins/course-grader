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



    const newReview = new ReviewsModels({
        schoolRef: data?.schoolRef,
        courseRef: data?.courseRef,
        term: data?.term,
        year: data?.year,
        description: data?.description,
        profRating: data?.profRating,
        courseRating: data?.courseRating,
        difficultyRating: data?.difficultyRating,
        date: new Date(),
        uuid: short.generate(),
    });


    try {
        let prof = null;
        let course = null;
        let school = null;
        let schoolSave = true;
        if (data.addProf === 0) {
            prof = await ProfModel.findOne({ uuid: data?.prof, schoolRef: data?.schoolRef })
            if (!prof) return res.status(400).json({ message: "There was an error finding that professor." });
            else {
                newReview.profRef = data?.prof;
            }
        }
        else if (data.addProf === 1) {
            prof = await ProfModel.findOne({ uuid: data?.prof?.uuid });
            if (!prof) return res.status(400).json({ message: "There was an error finding that professor." });
            else {
                newReview.profRef = prof?.uuid;
                prof?.courseRefs?.push(data?.courseRef);

            }
            course = await ClassesModel.findOne({ uuid: data?.courseRef });
            if (!course) return res.status(400).json({ message: "There was an error finding this course." });
            else {
                course?.profs?.push(data?.prof?.uuid);
            }
        }
        else if (data.addProf === 2) {
            const fullName = `${data?.firstName} ${data?.middleName ? data.middleName + " " : ""}${data?.lastName}`
            const trunkFullName = fullName.replace(/\s+/g, '').toLowerCase();
            prof = await ProfModel.findOne({ schoolRef: data?.schoolRef, $or: [{ fullName: fullName }, { trunkFullName: trunkFullName }, { $and: [{ firstName: data?.firstName }, { lastName: data?.lastName }] }], });
            console.log(prof);
            if (!prof) {
                prof = new ProfModel({
                    uuid: short.generate(),
                    firstName: data?.firstName,
                    middleName: data?.middleName,
                    lastName: data?.lastName,
                    fullName: fullName,
                    trunkFullName: trunkFullName,
                    department: data?.department,
                    courseRefs: [data?.courseRef],
                    schoolRef: data?.schoolRef,
                })
                newReview.profRef = prof.uuid;

                course = await ClassesModel.findOne({ uuid: data?.courseRef });
                if (!course) return res.status(400).json({ message: "There was an error finding this course." });
                else {
                    course?.profs?.push(prof.uuid);
                }

                school = await SchoolModel.findOne({ uuid: data?.schoolRef });
                if (!school) return res.status(400).json({ message: "There was an error finding this school." });
                else {
                    trunkDepartment = data?.department.replace(/\s+/g, '').toLowerCase();
                    school?.trunkDepartments?.forEach((department) => {
                        if (department === trunkDepartment) {
                            schoolSave = false;
                            return;
                        }

                    })
                    if (schoolSave) {
                        school?.trunkDepartments?.push(trunkDepartment);
                        school?.departments?.push(data?.department);
                    }
                }
            }
            else {
                return res.status(400).json({ message: "This professor is already in our records for this school." });
            }
        }



        if (data?.addProf !== 0) {
            await prof.validate();
            await course.validate();
            if (schoolSave) school.validate();
        }
        await newReview.validate();


        if (data?.addProf !== 0) {
            await prof.save().then(() => {
                console.log("prof updated");
            }, (err) => {
                console.log(err);
                throw new Error(err);
            })
            await course.save().then(() => {
                console.log("course updated");
            }, (err) => {
                console.log(err);
                throw new Error(err);
            })
            if (schoolSave) {
                await school.save().then(() => {
                    console.log("school updated");
                }, (err) => {
                    console.log(err);
                    throw new Error(err);
                })
            }
        }
        await newReview.save().then(() => {
            console.log("review added");
        }, (err) => {
            console.log(err);
            throw new Error(err);
        })


        return res.status(200).json({ message: "Review Successfully Uploaded" });

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
});

router.get('/:q', async (req, res) => {
    const q = req.params.q;
    try {
        // const reviews = await ReviewsModels.find({ courseRef: q }, { _id: 0, courseRef: 0, schoolRef: 0, }).sort('-date');

        const reviews = await ReviewsModels.aggregate([
            {
                $match: { courseRef: q }
            },
            {
                $lookup: {
                    from: "profs",
                    "localField": "profRef",
                    "foreignField": "uuid",
                    as: "prof",
                    pipeline: [
                        {
                            $project: { _id: 0, firstName: 0, middleName: 0, lastName: 0, trunkFullName: 0, department: 0, schoolRef: 0, courseRefs: 0, __v: 0 }
                        }
                    ]
                }
            },
            {
                $unwind: "$prof"
            },
            {
                $project: {
                    _id: 0, uuid: 0, profName: 0, schoolRef: 0, courseRef: 0, profRef: 0, title: 0, private: 0
                }
            },
            {
                $sort: { date: -1 }
            },

        ],)








        console.log(reviews)
        res.status(200).json(reviews);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});


module.exports = router;
