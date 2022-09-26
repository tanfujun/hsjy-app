import request from './request.js'

/*试卷详情*/
export function getPageById(id) {
    let url = '/api/questions/getQuestionById/' + id;
    return request.get(url);
}

/*试卷类型*/
export function getPageTypes() {
    let url = '/api/questions/types';
    return request.get(url);
}

/*试卷列表*/
export function getPageList(type) {
    let url = '/api/questions/getQuestion?questionType=' + type + '&pageSize=100&currentPage=1';
    return request.get(url);
}

/*提交试卷*/
export function submitExam(data) {
    let url = '/api/questions/submitQuestion';
    return request.post(url, data);
}

/*个人的试卷*/
export function personPageByUid(uid) {
    let url = '/api/questions/getAnswerQuestion?pageSize=100&currentPage=1';
    return request.get(url);
}


/*答卷详情*/
export function examInfoById(id) {
    let url = '/api/questions/getAnswerQuestionById?id=' + id;
    return request.get(url);
}
