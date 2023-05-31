import { message, notification } from 'ant-design-vue';
import { SmileOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';

/**
 * 
 * @param {*} degree 等级 
 * @param {*} text  内容
 */
function showMessage(degree, text) {
    if (degree==0) {
        message.success(text);
    } else if (degree==1) {
        message.warning(text);
    }   else if (degree==2) {
        message.error(text);
    }
}

/**
 * 
 * @param {*} degree notificate
 * @param {*} text 
 */
function notificate(degree, text) {
    if (degree==0) {
        // notification.success(text);
        notification.open({
            message: '消息',
            description:
            text,
            icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
            })
    } else if (degree==1) {
        notification.warning(text);
    }   else if (degree==2) {
        notification.error(text);
    }
}


export {
    showMessage,
    notificate
}