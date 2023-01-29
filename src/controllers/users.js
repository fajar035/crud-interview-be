const helpRes = require('../helpers/helpRes');
const usersModel = require('../models/users');

const getAllUsers = (req, res) => {
  const { query } = req;
  let keyword = `%%`;
  if (query.search) keyword = `'%${query.search}%'`;
  usersModel
    .getAllUsers(keyword, query)
    .then(({ status, result, meta }) => {
      return helpRes.success(res, status, { result, meta });
    })
    .catch(({ status, err }) => {
      return helpRes.failed(res, status, err);
    });
};

const addUser = (req, res) => {
  const { body } = req;
  usersModel
    .addUser(body)
    .then(({ status, result }) => {
      return helpRes.success(res, status, result);
    })
    .catch(({ status, err }) => {
      return helpRes.failed(res, status, err);
    });
};

module.exports = { getAllUsers, addUser };
