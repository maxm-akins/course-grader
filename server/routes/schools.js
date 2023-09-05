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

router.get('/', async (req, res) => {
    try {
        const schools = await SchoolModel.find({});

        res.status(200).json(schools);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

router.get('/:q', async (req, res) => {
    const q = req.params.q;
    try {
        const school = await SchoolModel.findOne({ trunkName: q }, { _id: 0, name: 1, uuid: 1, rating: 1, city: 1, state: 1, trunkName: 1, departments: 1 });

        res.status(200).json(school);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

router.post('/add', async (req, res) => {
    const data = req.body;
    try {
        const trunkName = data?.name?.replace(/\s+/g, '').toLowerCase();
        const name = data?.name?.trim();
        const dup = await SchoolModel.findOne({ $or: [{ 'trunkName': trunkName }, { 'name': name }] })

        if (dup) {
            res.status(403).json({ message: "A record of the school already exists." });
            console.log("this school already exists");
            return;

        }


        const school = new SchoolModel({});
        school.name = name;
        school.state = data.state;
        school.city = data.city.trim();
        school.trunkName = trunkName;
        school.uuid = short.generate();

        school.save().then(() => {
            console.log("new school saved");
            res.status(200).json({ message: "School Successfully Added" });
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


router.get('/search/:q', async (req, res) => {
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
                            autocomplete: {
                                query: q,
                                path: "name"
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



module.exports = router;
