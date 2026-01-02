const express = require('express')
const router = express.Router()
const factory_management = require('../controllers/factory-management')
const authMiddleware = require('../middlewares/auth')

router.get('/devicelist/:s_order/:e_order',authMiddleware.isAuthenticated,factory_management.getdevicelist)       // 하우스 기본 정보
router.get('/deviceappointlist',authMiddleware.isAuthenticated,factory_management.getdeviceappointlist)     // 하우스 예약 정보

router.get('/devicelist/search/:column/:data',authMiddleware.isAuthenticated,factory_management.getdevicelist_search)       // 하우스 기본 정보 검색
router.get('/deviceappointlist/search/:device',authMiddleware.isAuthenticated,factory_management.getdeviceappointlist_search)     // 하우스 예약 정보 검색

router.post('/cmd/rbsw',authMiddleware.isAuthenticated,factory_management.rebootsoftware)  //하우스 소프트웨어 재부팅 명령
router.post('/cmd/rbhw',authMiddleware.isAuthenticated,factory_management.reboothardware)  //하우스 하드웨어 재부팅 명령
router.post('/cmd/nf',authMiddleware.isAuthenticated,factory_management.onoffsettings)  //하우스 onoff 명령
router.post('/cmd/ap',authMiddleware.isAuthenticated,factory_management.appointupdate)  //하우스 예약 설정 변경 명령





module.exports = router