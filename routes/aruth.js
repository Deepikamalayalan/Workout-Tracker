const express=require('express');
const router=express.Router();
const usercontroller=require('../controllers/user')


router.get('/edit/:id',usercontroller.edit)
router.get('/editwork/:id',usercontroller.editwork)
router.post('/editrecord/:id',usercontroller.editdata)
router.post('/editworkrecord/:id',usercontroller.editworkdata)
router.get('/delete/:id',usercontroller.delete);
router.get('/deletework/:id',usercontroller.deletework);
router.post('/search',usercontroller.search)


module.exports=router;