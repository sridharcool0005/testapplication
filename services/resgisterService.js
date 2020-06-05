



module.exports.adminCreate = async (req, res) => {
  const { doId,id,name, email, DOA,DOB,password,Maritual,gender, mobile, whatsapp, address, pincode, state, city,image } = req.body;

const adminModel = require('../models/do.model');
  const adminService = new adminModel({
    agentId: id,
    doId:doId,
    name: name,
    Maritual:Maritual,
    gender:gender,
    DOB:DOB,
    DOA:DOA,
    email: email,
    password: password,
    mobile: mobile,
    whatsapp: whatsapp,

    address:address,
    state: state,
    pincode: pincode,
    city: city,
    image:image,
    status: 'NEW'
  });

  return await adminService.save()
    .then((result) => {
      res.status(200).send({message: 'admin registered' });
    })
    .catch((err) => {
      console.log('err in admin controller', err);
      res.status(400).send({ success: false, message: err.message })
    });
};




