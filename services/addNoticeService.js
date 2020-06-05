const addNoticeModule=require('../models/addNotice');


module.exports.addNotice= async (req, res) => {
  const {title,Source,date,description,Category,file} = req.body;

  const notice = new addNoticeModule({
    title: title,
    Source: Source,
    date: date,
    description: description,
    Category: Category,
    file:  file

  });

  return await notice.save()
    .then((result) => {
      res.send({ success: true, message: 'Notice uploaded success' });
    })
    .catch((err) => {
      console.log('err in uploading', err);
      res.status(400).send({ success: false, message: err.message })
    });
};
