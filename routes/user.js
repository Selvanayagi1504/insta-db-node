const router = require('express').Router()
var nodemailer = require('nodemailer');
var encryptor = require('file-encryptor');
var key = 'My Super Secret Key';
var options = { algorithm: 'aes256' };
var transporter;

const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
var upload = multer({ storage: storage });

class sampleRoute {
  constructor(sampleContoller) {
    this.controller = sampleContoller
    this.init()
  }

  init() {
    router.use('/', async (req, res, next) => {
      console.log("user")
      next()
    })
    router.get('/getallusers',async(req,res)=>{
      try {
            const response = await this.controller.getallusers()
            res.json(response)
          } catch (err) {
            res.json({ code: 500, msg: 'getting Accesses Failed' })
          }
    })
    router.get('/getuser/:moboremail',async(req,res)=>{
      try {
            const response = await this.controller.getuser(req.params.moboremail)
            res.json(response)
          } catch (err) {
            res.json({ code: 500, msg: 'getting Accesses Failed' })
          }
    })
    router.post('/changepost/:email',async(req,res)=>{
      try {
        var p=JSON.stringify(req.body);
        var ma=req.params.email
        const response = await this.controller.changepost(p,ma)
        res.json(response)
      } catch (err) {
        res.json({ code: 500, msg: 'getting Accesses Failed' })
      }
    })
    router.post('/changepass/:email',async(req,res)=>{
      try {
        let npass;
        req.body.forEach(k=>{
          npass= k.pass
        })
        var email=req.params.email
        const response = await this.controller.changepass(npass,email)
        res.json(response)
      } catch (err) {
        res.json({ code: 500, msg: 'getting Accesses Failed' })
      }
    })
    router.post('/changepoto/:email',async(req,res)=>{
      try {
        let npro;
        req.body.forEach(k=>{
          npro= k.url
        })
        var email=req.params.email
        const response = await this.controller.changepoto(npro,email)
        res.json(response)
      } catch (err) {
        res.json({ code: 500, msg: 'getting Accesses Failed' })
      }
    })
    router.post('/edit/:email',async(req,res)=>{
      try {
        var email=req.params.email
        const response = await this.controller.edit(req.body,email)
        res.json(response)
      } catch (err) {
        res.json({ code: 500, msg: 'getting Accesses Failed' })
      }
    })
    router.post('/saveuser',async(req,res)=>{
      try {
        const response = await this.controller.saveuser(req.body)
        res.json(response)
      } catch (err) {
        res.json({ code: 500, msg: 'getting Accesses Failed' })
      }
    })
  }

  // Get Router
  getRouter() {
    return router
  }
}
module.exports = controller => {
  return new sampleRoute(controller)
}
