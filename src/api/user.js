import request from './request.js'

/*
* 用户登录
* */
export function login(data) {
    let url = '/api/v1/user/login';
    return request.post(url, data);
}

/*校验用户是否登录*/
export function checkLogin() {
    let url = '/api/user/checkLogin';
    return request.post(url);
}

/*
* 修改密码
* */
export function changePwd(data) {

    let url = '/api/v1/user/updatePwd';
    return request.post(url, data);

}

/*
* 修改用户头像
* */

export function updateAvatar(data) {
    let url = '/api/user/updateAvatar';
    return request.post(url, data);
}

export function uploadAvatar(data) {
    let url = '/api/upload/store';
    return request.post(url, data);
}

/*获取验证码*/
export function getCode(email) {
    let url = '/api/user/getCode';
    return request.post(url, {email});
}

export function emailIsValidate(email) {
    let url = '/api/user/emailIsValidate';
    return request.post(url, {email});
}


/*用户注册 register */
export function register(info) {
    let url = '/api/user/register';
    return request.post(url, info);
}

/*用户评论列表*/
export function commentsByUid() {
    let url = '/api/comment/getUserComment?pageSize=100&currentPage=1&';
    return request.get(url);
}

/*删除评论*/
export function delCommentsByid(id) {
    let url = '/api/comment/delete/' + id;
    return request.get(url);
}
