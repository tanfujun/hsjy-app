import request from './request.js'

export function getNews({cate_id = ''}) {
  let url = '/api/news/flist?currentPage=1&pageSize=100&cate_id=' + cate_id;
  return request.get(url);
}


export function getCategory() {
  let url = '/api/cate/flist';
  return request.get(url);
}


export function getDetail(id) {
  let url = '/api/news/detail?newsId=' + id;
  return request.get(url);
}


export function addComment(data) {
  let url = '/api/comment/submitComment';
  return request.post(url, data);
}


export function getComments(id, page = 1, size = 3) {
  let url = '/api/comment/getCommentList?newsId=' + id + '&pageSize=' + size + '&currentPage=' + page;
  return request.get(url);
}


export function viewCountAdd(id) {
  let url = '/api/news/viewAdd';
  return request.post(url, {_id: id});
}

export function collectNews(id, uid) {
  let url = '/api/questions/collectQuestion?userId=' + uid + '&questionId=' + id;
  return request.get(url);
}

export function collectNewsList(uid) {
  let url = '/api/questions/getCollectQuestion?pageSize=100&currentPage=1&userId=' + uid;
  return request.get(url);
}


export function cancelCollect(id, uid) {
  let url = '/api/questions/cancelCollectQuestion?userId=' + uid + '&questionId=' + id;
  return request.get(url);
}


