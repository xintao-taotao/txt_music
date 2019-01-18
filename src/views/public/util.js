import _this from '../../main';
import Vue from 'vue'

//路由跳转
export const goPageByPath = (pageName, query, newWindow = false) => {
  if(_this.$route.path===pageName){
    window.location.reload();
  }else{
    let params = localStorage.getItem(pageName);
    localStorage.setItem(pageName, query ? JSON.stringify(query) : (params && params != '' ? params : ''));
    if (newWindow) {
        window.open(
            _this.$router.resolve({
                path: pageName,
                query: query
            }).href,
            "_blank"
        );
    } else {
        _this.$router.push({
            path: pageName,
            query: query
        });
    }
  }
};