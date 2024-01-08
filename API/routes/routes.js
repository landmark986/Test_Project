
const express = require('express');
const router = express.Router();
let UserController = require('../controllers/UserController');

router.post('/registration', UserController.signup);

router.post('/login', UserController.userLogin);  

router.get('/jobListings/:id',UserController.getJobListings);

//router.post('/jobListings', authenticateUser, UserController.jobListings);
router.post('/jobListings', UserController.jobListings);

router.post('/jobListingUpdate', UserController.jobListingsUpdate);

router.get('/jobListingDelete/:id', UserController.jobListingsDelete);

module.exports = router;