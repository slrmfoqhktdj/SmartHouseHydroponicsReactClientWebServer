// const axios = require('axios')
const jwtMiddleware = require('../middlewares/jwt')
require('dotenv').config({ path:'../.env'});



const getdevice_daily_list = async (request, response, next) => {
    console.log('c_getdevice_daily_list')
     
    try{
        // const comfirm = await axios({
        //     method:'GET',
        //     url:process.env.OCPPURL.concat('/devicedailylist'),
        //     headers: { Authorization: `Bearer ${request.session.tokens.access_token}` },
        //     params:{user:request.session.user.email,s_order:request.params.s_order,e_order:request.params.e_order},
        // })

        // response.send(comfirm.data);

        const result = await jwtMiddleware.callGoAPI(request,'GET','/devicedailylist',null,{user:request.session.user.email,s_order:request.params.s_order,e_order:request.params.e_order})

        response.send(result);
    }catch(e){
        
        if(e.response?.status==401){
            request.session.destroy()
            response.send(401)
        }else{
            console.log("err : "+e);
            response.send([]);
        }
    }

    
}

const getdevice_daily_list_search = async (request, response, next) => {
    console.log('c_getdevice_daily_list_search')

    try{
        // const comfirm = await axios({
        //     method:'GET',
        //     url:process.env.OCPPURL.concat('/devicedailylist/search'),
        //     headers: { Authorization: `Bearer ${request.session.tokens.access_token}` },
        //     params:{user:request.session.user.email,column:request.params.column,data:request.params.data},
        // })

        // response.send(comfirm.data);


        const result = await jwtMiddleware.callGoAPI(request,'GET','/devicedailylist/search',null,{user:request.session.user.email,column:request.params.column,data:request.params.data})

        response.send(result);

    }catch(e){
        if(e.response?.status==401){
            request.session.destroy()
            response.send(401)
        }else{
            console.log("err : "+e);
            response.send([]);
        }
    }

    
}


// const getcharge_daily_graph_list = async (request, response, next) => {
//     console.log('c_getcharge_daily_graph_list')

//     let result = []

//     let comfirm;            /// ocpp 연결 여부 
//     try{
//         comfirm = await axios({
//             method:'GET',
//             url:process.env.OCPPURL.concat('/chargedailygraphlist'),
//             headers: { Authorization: `Bearer ${request.session.tokens.access_token}` }
//         })
//         // console.log(comfirm.data)

//         const rows = comfirm.data.item

//         for(i = 0; i < rows.length; i ++){
    
//             const sendcharge_daily_GraphData ={
//                 device_id: rows[i].id,
//             }
    
    
//             result.push(sendcharge_daily_GraphData)
//         }
    
//         response.send(result);
//     }catch(e){
//         if(e.response?.status==401){
//             request.session.destroy()
//             response.send(401)
//         }else{
//             console.log("err : "+e);
//             response.send(result);
//         }
//     }
//     // const rows = await dbc.getcharge_daily_graph(StartTime,EndTime)

    
// }

const getdevice_daily_graph = async (request, response, next) => {
    console.log('c_getdevice_daily_graph')

    const StartTime = request.body.starttime
    const EndTime = request.body.endtime
    const Device = request.body.id
    // const DeviceType = request.body.devicetype


    try{
        // const comfirm = await axios({
        //     method:'POST',
        //     url:process.env.OCPPURL.concat('/devicedailygraph'),
        //     headers: { Authorization: `Bearer ${request.session.tokens.access_token}` },
        //     params:{user:request.session.user.email},
        //     data: {
        //         starttime: StartTime,
        //         endtime: EndTime,
        //         id: Device
        //     } 
        // })
        
        // response.send({item:comfirm.data.item,listitem:comfirm.data.listitem});


        const result = await jwtMiddleware.callGoAPI(request,'POST','/devicedailygraph', {starttime: StartTime,endtime: EndTime,id: Device} ,{user:request.session.user.email})
        response.send(result);

    }catch(e){
        if(e.response?.status==401){
            request.session.destroy()
            response.send(401)
        }else{
            console.log("err : "+e);
            response.send({item:[],listitem:[]});
        }
    }
    // const rows = await dbc.getcharge_daily_graph(StartTime,EndTime)

    
}




module.exports = {

    getdevice_daily_list,
    getdevice_daily_list_search,
    // getcharge_daily_graph_list,
    getdevice_daily_graph,
}