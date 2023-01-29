const db = require('../config/db');
const helpRes = require('../helpers/helpRes');

const getUser = (req, res, next) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) helpRes.failed(res, { status: 500 }, err);
    const getUserDB = result[0];
    const bodyOld = {
      emailOld: getUserDB.email,
      fullnameOld: getUserDB.fullname,
    };
    req.bodyOld = bodyOld;
    next();
  });
};

module.exports = {
  getUser,
};
