/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

function restrict() {
  return async (req, res, next) => {
    try {
    if (!req.session || !req.session.user) {
      res.status(401).json({ you: 'shall not pass!' });
    }
    next()

    } catch (err) {
        next(err)
    }
  }
}

module.exports = restrict;
