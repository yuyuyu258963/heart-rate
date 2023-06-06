/* eslint-disable no-unused-vars */
import axios from "axios";

axios;


/**
 * 请求数据
 * @param {*} params 
 */
function requestData(params) {
    const formData = new FormData();
    // formData.append("person", params.person);
    // formData.append("name", params.person);
    // formData.append("t0", params.person);
    // formData.append("tf", params.person);
    formData.append("person", "1");
    formData.append("name", "F7-T7");
    formData.append("t0", 0);
    formData.append("tf", 3000);
    
    axios({
        method: "post",
        timeout: 5000,
        url: "http://localhost:3000/api/data",
        headers: {
            'Content-Type': '*',
            'Access-Control-Allow-Origin': "*"
        },
        data: formData,
    })
    .then(res => console.log(res))
    .catch((err) => console.log(err));
}



export {
    requestData,
}

