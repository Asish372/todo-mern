// This file redirects to the API
module.exports = (req, res) => {
  res.status(301).redirect('/api');
};