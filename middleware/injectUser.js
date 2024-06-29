// middleware/injectUser.js
module.exports = function(req, res, next) {
    if (req.user) {
        res.locals.user = req.user;
    }
    next();
};
