const Place = require('../models/Place');
const User = require('../models/User');

const addPlace = async (req, res) => {
    try{
        const place = new Place(req.body);
        await place.save();

        res.status(201).json(place);
    }catch (err){
        res.status(500).json({ error : 'Failed to create Place' });
    }
};

const getAllPlaces = async (req, res) => {
    try{
        const places = await Place.find();
        res.status(200).json(places);
    } catch (err){
        res.status(500).json({ error : 'Failed to retrieve places' });
    }
};

const addFavourite = async (req, res) => {
    const userId = req.user.id;
    const placeId = req.body._id;
    
    try{
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        if(!user.favourites.includes(placeId)){
            user.favourites.push(placeId);
            await user.save();
        }
        res.json({ message : 'Added to favourites' });
    } catch (err){
        res.status(400).json({ error : 'Failed to add to favourites' });
    }
};

const removeFavourite = async (req, res) => {
    const userId = req.user.id; 
    const placeId = req.body._id

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.favourites = user.favourites.filter(fav => fav.toString() !== placeId);
        await user.save();

        res.json({ message : "Removed from favourites" });
    } catch (err){
        res.status(500).json({ error : 'Failed to remove from favourites' });
    }
};


const userFavourites = async (req, res) => {
    const userId = req.user.id;

    try{
        const user = await User.findById(userId).populate('favourites');

        if(!user) return res.status(404).json({ error : "User Not Found" });

        res.status(200).json(user.favourites);
    } catch (err){
        res.status(500).json({ error : "Failed to fetch user's favourites" });
    }
};


module.exports = {
    addPlace,
    getAllPlaces,
    addFavourite,
    removeFavourite,
    userFavourites
}