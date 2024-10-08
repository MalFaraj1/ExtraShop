const router = require('express').Router();
const authMiddleWare = require("../middleware/authMiddleware");
const Notification = require("../models/notificationsModel");


//add a notification
router.post("/notify", authMiddleWare, async (req, res) => {
    try {
        const newNotification = new Notification(req.body);
        await newNotification.save();
        res.send({
            success: true,
            message: "Notification added successfully",
        });
    } catch (error) {
        res.send({
            success: true,
            message: error.message,
        });
    }
});

//get all notification by user
router.get("/get-all-notifications", authMiddleWare, async (req, res) => {
    try {
        const notifications = await Notification.find({user: req.body.userId,}).sort({ createdAt: -1 });
        res.send({
            success: true,
            data: notifications,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
});

//delete notifivation
router.delete("/delete-notification/:id" ,authMiddleWare, async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: "Notification deleted successfylly",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

//read all notification by user
router.put("/read-all-notifications", authMiddleWare, async (req, res) => {
    try {
        await Notification.updateMany(
            { user: req.body.userId, read: false },
            { $set: { read: true }}
        );
        res.send({
            success: true,
            message: "All notifications marked as readed",
        });
    } catch (error) {
        res.send({
            success: false, 
            message: error.message,
        });
    }
});

module.exports = router;