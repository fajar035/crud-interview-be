/* eslint-disable no-promise-executor-return */
/* eslint-disable operator-linebreak */
/* eslint-disable prefer-template */
const mysql = require('mysql2');
const db = require('../config/db');

const getAllUsers = (keyword, query) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM users';
    const statement = [];
    const { sort, by } = query;
    let orderBy = '';

    if (sort && sort.toLowerCase() === 'email') orderBy = 'email';
    if (sort && sort.toLowerCase() === 'fullname') orderBy = 'fullname';

    if (keyword.length !== 2) {
      sql += ' WHERE fullname LIKE ?';
      statement.push(mysql.raw(keyword));
    }

    if (by && orderBy) {
      sql += ' ORDER BY ? ?';
      statement.push(mysql.raw(orderBy), mysql.raw(by));
    }
    const countQuery = `select count(*) as "count" from users`;

    db.query(countQuery, (err, result) => {
      if (err) return reject({ status: 500, err });

      const page = parseInt(query.page, 10);
      const limit = parseInt(query.limit, 10);
      const { count } = result[0];
      const totalPage = Math.ceil(count / limit);

      if (query.page && query.limit) {
        sql += ' LIMIT ? OFFSET ?';
        const offset = (page - 1) * limit;
        statement.push(limit, offset);
      }

      const meta = {
        next: isNaN(page)
          ? null
          : page == Math.ceil(count / limit)
          ? null
          : `/api/users?by=id&order=asc&page=${page + 1}&limit=${limit}`,
        prev: isNaN(limit)
          ? null
          : page == 1 || page == 0
          ? null
          : `/api/users?by=id&order=asc&page=${page - 1}&limit=${limit}`,
        totalPage,
        count,
      };

      db.query(sql, statement, (err, result) => {
        if (err) return reject({ status: 500, err });
        if (result.length === 0)
          return resolve({
            status: 404,
            result: {
              Message: 'Data not found',
            },
          });
        resolve({ status: 200, result, meta });
      });
    });
  });
};

const addUser = ({ email, fullname }) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO users VALUES(null, ?, ?, ?)';
    const d = new Date();
    // const date = d.toISOString().split('T')[0];
    const date =
      [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-') +
      ' ' +
      [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

    if (!email || !fullname)
      return reject({
        status: 400,
        err: { message: 'Harap isi input email / fullname' },
      });
    const statement = [email, fullname, date];
    db.query(sql, statement, (err, result) => {
      if (err) return reject({ status: 500, err });
      return resolve({
        status: 201,
        result: {
          id: result.insertId,
          email,
          fullname,
          date,
        },
      });
    });
  });
};

module.exports = { getAllUsers, addUser };
