const success = (res, status, data) => {
  if (data.length === 0)
    return res.status(404).json({
      error: { message: 'Data not found' },
    });
  return res.status(status).json({
    status,
    data,
  });
};

const failed = (res, status, err) => {
  res.status(status).json({ status, err });
};

module.exports = { success, failed };
