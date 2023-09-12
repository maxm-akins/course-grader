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

// PROP TYPE END POINTS



router.post('/', async (req, res) => {
    const data = req.body;
    console.log(data);



    const newReview = new ReviewsModels({
        schoolRef: data?.schoolRef,
        courseRef: data?.courseRef,
        term: data?.term,
        year: data?.year,
        grade: data?.grade,
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
        let schoolSave = false;
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
                if (prof?.courseRefs?.includes(data?.courseRef) === false) {
                    console.log("course not in prof data. adding now.");
                    prof?.courseRefs?.push(data?.courseRef);
                }
            }
            course = await ClassesModel.findOne({ uuid: data?.courseRef });
            if (!course) return res.status(400).json({ message: "There was an error finding this course." });
            else {

                if (course?.profs?.includes(data?.prof?.uuid) === false) {
                    console.log("prof not in course data. adding now.");
                    course?.profs?.push(data?.prof?.uuid);
                }

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
                    if (course?.profs?.includes(prof?.uuid) === false) {
                        console.log("prof not in course data. adding now.");
                        course?.profs?.push(prof?.uuid);
                    }
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
        const errs = err?.errors
        const keys = Object.keys(err?.errors);
        const msg = errs[keys[0]]?.properties?.message;
        res.status(err.status || 400).json({ message: msg || err?.message });
        return;
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


router.post('/prof', async (req, res) => {

    try {

        const data = req.body;
        console.log(data);

        prof = await ProfModel.findOne({ uuid: data?.profRef });
        if (!prof) return res.status(400).json({ message: "There was an error finding that professor." });
        else {
            if (prof?.courseRefs?.includes(data?.courseRef) === false) {
                console.log("course not in prof data. adding now.");
                prof?.courseRefs?.push(data?.courseRef);
            }
        }
        course = await ClassesModel.findOne({ uuid: data?.courseRef });
        if (!course) return res.status(400).json({ message: "There was an error finding this course." });
        else {
            if (course?.profs?.includes(data?.profRef) === false) {
                console.log("prof not in course data. adding now.");
                course?.profs?.push(data?.profRef);
            }
        }

        const newReview = new ProfReviewModel({
            schoolRef: data?.schoolRef,
            courseRef: data?.courseRef,
            profRef: data?.profRef,
            term: data?.term,
            year: data?.year,
            grade: data?.grade,
            description: data?.description,
            overallRating: data?.overallRating,
            difficultyRating: data?.difficultyRating,
            date: new Date(),
            uuid: short.generate(),
        });

        await newReview.validate();
        await prof.validate();
        await course.validate();

        await course.save().then(() => {
            console.log("course saved");
        }, (err) => {
            console.log(err);
            throw new Error(err);
        })
        await prof.save().then(() => {
            console.log("prof added");
        }, (err) => {
            console.log(err);
            throw new Error(err);
        })
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
        res.sendStatus(400);
    }
});

router.post('/profplus', async (req, res) => {

    try {
        const data = req.body;
        console.log(data);
        let school = null;
        let course = null;
        const fullName = `${data?.firstName} ${data?.middleName ? data.middleName + " " : ""}${data?.lastName}`
        const trunkFullName = fullName.replace(/\s+/g, '').toLowerCase();
        let prof = await ProfModel.findOne({ schoolRef: data?.schoolRef, $or: [{ fullName: fullName }, { trunkFullName: trunkFullName }, { $and: [{ firstName: data?.firstName }, { lastName: data?.lastName }] }], });
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

            course = await ClassesModel.findOne({ uuid: data?.courseRef });
            if (!course) return res.status(400).json({ message: "There was an error finding this course." });
            else {
                if (course?.profs?.includes(prof?.uuid) === false) {
                    console.log("prof not in course data. adding now.");
                    course?.profs?.push(prof?.uuid);
                }
            }
            let schoolSave = true;
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


        const newReview = new ProfReviewModel({
            schoolRef: data?.schoolRef,
            courseRef: data?.courseRef,
            profRef: prof?.uuid,
            term: data?.term,
            year: data?.year,
            grade: data?.grade,
            description: data?.description,
            overallRating: data?.overallRating,
            difficultyRating: data?.difficultyRating,
            date: new Date(),
            uuid: short.generate(),
        });

        await prof.validate();
        await school.validate();
        await course.validate();
        await newReview.validate();


        await course.save().then(() => {
            console.log("course saved");
        }, (err) => {
            console.log(err);
            throw new Error(err);
        })
        await school.save().then(() => {
            console.log("school saved");
        }, (err) => {
            console.log(err);
            throw new Error(err);
        })
        await prof.save().then(() => {
            console.log("prof added");
        }, (err) => {
            console.log(err);
            throw new Error(err);
        })
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
        res.sendStatus(400);
    }
});


router.get('/prof/:q', async (req, res) => {
    const q = req.params.q;
    try {
        // const reviews = await ReviewsModels.find({ courseRef: q }, { _id: 0, courseRef: 0, schoolRef: 0, }).sort('-date');

        const reviews = await ProfReviewModel.aggregate([
            {
                $match: { profRef: q }
            },
            {
                $lookup: {
                    from: "classes",
                    "localField": "courseRef",
                    "foreignField": "uuid",
                    as: "course",
                    pipeline: [
                        {
                            $project: { _id: 0, addedBy: 0, profs: 0, rating: 0, schoolRef: 0, __v: 0 }
                        }
                    ]
                }
            },
            {
                $unwind: "$course"
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