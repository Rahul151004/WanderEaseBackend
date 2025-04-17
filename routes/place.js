const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add', placeController.addPlace);
router.get('/all', placeController.getAllPlaces);
router.post('/favourite', authMiddleware, placeController.addFavourite);
router.post('/unfavourite', authMiddleware, placeController.removeFavourite);
router.get('/userfavourites', authMiddleware, placeController.userFavourites);

module.exports = router;