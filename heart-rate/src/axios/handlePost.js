/* eslint-disable no-unused-vars */
import axios from "axios";
import {showMessage} from ".././utls/showMsg";

/**
 * 请求数据
 * @param {*} params 
 */
async function  requestData(params)   {
    const formData = new FormData();
    // formData.append("person", params.person);
    // formData.append("name", params.person);
    // formData.append("t0", params.person);
    // formData.append("tf", params.person);
    formData.append("person", params.person);
    formData.append("name", params.name);
    formData.append("t0", 0);
    formData.append("tf", 3000);
    
    return await axios({
        method: "post",
        timeout: 5000,
        url: "http://localhost:3000/api/data",
        headers: {
            'Content-Type': '*',
            'Access-Control-Allow-Origin': "*"
        },
        data: formData,
    })
    .then(res => {
        if(res){
            showMessage(0, "成功获取数据");
        }
        return res;
    })
    .catch((err) => {
        console.log(err);
        showMessage(2, "请求数据失败");
        return null;
    });
}



export {
    requestData,
}

