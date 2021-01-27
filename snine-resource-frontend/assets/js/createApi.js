exports.createApi  = ($axios) => (resourse) => {
    let api = {};
    
    if(resourse.indexOf('user' > 0)){
        api.PostLogin = (payload) => $axios.$post(`${resourse}/login`, payload);
        api.PostRegister = (payload) => $axios.$post(`${resourse}/register`, payload);
    }

    if(resourse.indexOf('upload' > 0)){
        api.PostUploadFile = (payload) => $axios.$post(`${resourse}/file`, payload);
        api.PostUploadArticle = (payload) => $axios.$post(`${resourse}/article`, payload);
    }

    if(resourse.indexOf('query' > 0)){
        api.GetQueryAllImg = (payload) => $axios.$get(`${resourse}/allImg`, payload);
        api.GetQueryArticle = (payload) => $axios.$get(`${resourse}/article`, payload);
    }

    return api;
}