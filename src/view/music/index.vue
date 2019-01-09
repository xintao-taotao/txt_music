<template>
<
</template>

<script>
import Vue from "vue";
import { Button, Table, Icon, Spin, Input, Form, FormItem } from "iview";
import util from "../../mutu/mutu.js";
import aplayer from "vue-aplayer";
aplayer.disableVersionBadge = true;
import axios from "Axios";
Vue.component("Table", Table);
Vue.component("Button", Button);
Vue.component("Input", Input);
Vue.component("Form", Form);
export default {
  components: {
    aplayer,
    Icon,
    Spin,
    FormItem
  },
  data() {
    return {
      music_width: 0,
      plneirong: "",
      dangqianbofang: "",
      music_height: 0,
      aplayera: false,
      f_alpha_img: false,
      details: false,
      page_index: 0,
      on_list: 0,
      music_search: "",
      geshou_on: false,
      geshou_danye: true,
      userid: 0,
      onlist: false,
      jishiqi: 1,
      jiuxu: false,
      deLogin: false,
      music_list: [],
      geshou: [],
      zongshu: 0,
      music_id: 0,
      gedan: [],
      music_object: {
        title: "",
        artist: "",
        src: "",
        pic: "",
        lrc: ""
      },
      formInline: {
        user: "",
        password: ""
      },
      search_data: [],
      ruleInline: {
        user: [
          { required: true, message: "请填写您的手机号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请填写您的密码", trigger: "blur" }
        ]
      },
      username: "",
      userbackgroundurl: "",
      useravatarurl: "",
      geshou_axinxi: false,
      geshou_xinxi: {
        name: "",
        url: "",
        miaoshu: ""
      },
      music_xiangqing: [],
      music_xiangre: [],
      huifu_button: false,
      //计算是否是第一次播放歌曲提示不能点击回复
      // huifu_inpout: true,
      music_pinglun_index: 0
    };
  },
  created() {
    this.music_width = `${document.documentElement.clientHeight}px`;
    this.music_height = `${document.documentElement.clientHeight - 106}px`;
    this.on_list = `${document.documentElement.clientHeight - 195}px`;
    util.vue = this;
    util.title("音乐网站-仿网易云 - 音乐页面");
    if (this.userid != 0 || localStorage.getItem("userid") != null) {
      util.ajax
        .get("/user/detail?uid=" + localStorage.getItem("userid") + "")
        .then(rep => {
          this.deLogin = true;
          this.user_onxinxi(rep.data);
        });
      this.userid = localStorage.getItem("userid");
      util.ajax
        .get("/user/playlist?uid=" + localStorage.getItem("userid") + "")
        .then(rep => {
          var data = rep.data.playlist[0].id;
          util.ajax.get("/playlist/detail?id=" + data + "").then(rep => {
            var data = rep.data.playlist.tracks;
            this.gedan = [];
            data.forEach(item => {
              this.gedan.push({
                id: item.id,
                name: item.name,
                singer:
                  item.ar.length == 1
                    ? item.ar[0].name
                    : item.ar[0].name + "-" + item.ar[1].name
              });
            });
          });
        });
    }
    let that = this;
    setTimeout(function() {
      that.clearlocal();
    }, 10800000);
    util.ajax
      .get("/top/artists?offset=" + this.page_index + "&limit=20")
      .then(rep => {
        const data = rep.data;
        this.geshou = [];
        for (var a = 0; a < data.artists.length; a++) {
          this.geshou.push({
            id: data.artists[a].id,
            name: data.artists[a].name,
            url: data.artists[a].img1v1Url
          });
        }
      });
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.music_width = `${document.documentElement.clientHeight}px`;
        that.music_width = window.music_width;
      })();
    };
  },
  watch: {
    music_width(val) {
      if (!this.timer) {
        this.music_width = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    }
  },
  methods: {
    fbpl() {
      util.ajax
        .get(
          "/comment?action=1&type=0&id=" +
            this.music_id +
            "&content=" +
            this.plneirong
        )
        .then(rep => {
          console.log(rep);
          if(rep.data.code===200){
            this.plneirong="";
            util.success("评论成功！");
            this.music_pinglun();
            return;
          }else{
            util.error(rep.data.msg);
            return;
          }
        });
    },
    dianzan() {
      // /comment/like?id=186016&cid=4956438&t=1&type=0
    },
    deleteping(id, commentId) {
      util
        .ajax({
          method: "get",
          url: "/comment?action=0&type=0&id=" + id + "&commentId=" + commentId,
          xhrFields: {
            withCredentials: true
          }
        })
        .then(rep => {
          var data = rep.data;
        });
    },
    gecipl() {
      // /comment/music?id=186016&limit=1
      // axios.get('http://localhost:3000/playlist/detail?id='+data+'')
      // .then(rep=>{
      //   var data=rep.data.playlist.tracks;
      //   this.gedan=[];
      //   data.forEach(item=>{
      //     this.gedan.push({
      //       id:item.id,
      //       name:item.name,
      //       singer:item.ar.length==1?item.ar[0].name:item.ar[0].name+"-"+item.ar[1].name,
      //     });
      //   })
      // })
    },
    changeLang(lang) {
      this.$store.commit("switchLang", lang);
      util.title(this.$t("projectName") + "-" + this.$t("home"));
    },
    admin() {
      this.f_alpha_img = !this.f_alpha_img;
      this.aplayera = true;
    },
    detailsa() {
      this.details = !this.details;
    },
    pave_page(type) {
      if (this.page_index != 0 && type == 1) {
        //上一页代码
        this.page_index = this.page_index - 20;
        util.ajax
          .get("/top/artists?offset=" + this.page_index + "&limit=20")
          .then(rep => {
            const data = rep.data;
            this.geshou = [];
            for (var a = 0; a < data.artists.length; a++) {
              this.geshou.push({
                id: data.artists[a].id,
                name: data.artists[a].name,
                url: data.artists[a].img1v1Url
              });
            }
          });
      } else if (type == 2) {
        //下一页代码
        this.page_index = this.page_index + 20;
        util.ajax
          .get("/top/artists?offset=" + this.page_index + "&limit=20")
          .then(rep => {
            const data = rep.data;
            this.geshou = [];
            for (var a = 0; a < data.artists.length; a++) {
              this.geshou.push({
                id: data.artists[a].id,
                name: data.artists[a].name,
                url: data.artists[a].img1v1Url
              });
            }
          });
      } else if (this.page_index == 0) {
        util.error("已经是第一页！");
        return;
      }
    },
    handleSubmit() {
      util
        .ajax({
          method: "get",
          url:
            "/login/cellphone?phone=" +
            this.formInline.user +
            "&password=" +
            this.formInline.password,
          xhrFields: { withCredentials: true }
        })
        .then(rep => {
          let data = rep.data;
          this.userid = data.account.id;
          localStorage.setItem("userid", this.userid);
          util.ajax.get("/user/detail?uid=" + this.userid + "").then(rep => {
            var data = rep.data;
            util.ajax
              .get("/user/playlist?uid=" + this.userid + "")
              .then(rep => {
                var data = rep.data.playlist[0].id;
                util.ajax.get("/playlist/detail?id=" + data + "").then(rep => {
                  var data = rep.data.playlist.tracks;
                  this.gedan = [];
                  data.forEach(item => {
                    this.gedan.push({
                      id: item.id,
                      name: item.name,
                      singer:
                        item.ar.length == 1
                          ? item.ar[0].name
                          : item.ar[0].name + "-" + item.ar[1].name
                    });
                  });
                });
              });
            this.user_onxinxi(data);
            this.deLogin = true;
          });
        });
    },
    huifu(id, content) {
      util.ajax
        .get("/comment?action=1&type=0&id=" + id + "&content=" + content)
        .then(rep => {
          var data = rep.data.playlist.tracks;
          this.gedan = [];
          data.forEach(item => {
            this.gedan.push({
              id: item.id,
              name: item.name,
              singer:
                item.ar.length == 1
                  ? item.ar[0].name
                  : item.ar[0].name + "-" + item.ar[1].name
            });
          });
        });
    },
    on_diange(item, data) {
      this.dangqianbofang = data;
      this.jiuxu = false;
      this.music_id = item;
      // const _this=this;
      // if (this.huifu_inpout) {
      //   //全局提示，等待删除中
      //   console.log(this.$Notice);
      //   this.$Notice.open({
      //     title: "警告",
      //     desc: "点击回复会有bug，等待修复中。谢谢！",
      //     duration: 0
      //   });
      //   this.huifu_inpout = false;
      // }
      if (data == "gedan") {
        util.ajax.get("/song/url?id=" + item + "").then(rep => {
          var data = rep.data;
          if (
            data.data[0].url != "" &&
            data.data[0].url != null &&
            data.data[0].url != undefined
          ) {
            this.music_object.src = data.data[0].url;
            util.ajax.get("/song/detail?ids=" + item + "").then(rep => {
              var data = rep.data.songs;
              this.music_object.artist =
                data[0].ar.length == 1
                  ? (this.music_object.artist = data[0].ar[0].name)
                  : data[0].ar[0].name + "-" + data[0].ar[1].name;
              this.music_object.title = data[0].name;
              this.music_object.pic =
                data[0].al.picUrl == undefined
                  ? require("../../assets/images/wutu.png")
                  : data[0].al.picUrl;
              this.music_pinglun();
              util.ajax.get("/lyric?id=" + item + "").then(rep => {
                var data = rep.data;
                this.music_object.lrc = "";
                if (data.lrc == undefined) {
                  this.music_object.lrc = "[00:00.400]此音乐为纯音乐";
                } else {
                  this.music_object.lrc = data.lrc.lyric;
                }
                this.jiuxu = true;
              });
            });
          } else {
            this.music_object.src = "http://music.163.com/song/media/outer/url?id="+item+".mp3";
            util.ajax.get("/song/detail?ids=" + item + "").then(rep => {
              var data = rep.data.songs;
              this.music_object.artist =
                data[0].ar.length == 1
                  ? (this.music_object.artist = data[0].ar[0].name)
                  : data[0].ar[0].name + "-" + data[0].ar[1].name;
              this.music_object.title = data[0].name;
              this.music_object.pic =
                data[0].al.picUrl == undefined
                  ? require("../../assets/images/wutu.png")
                  : data[0].al.picUrl;
              this.music_pinglun();
              util.ajax.get("/lyric?id=" + item + "").then(rep => {
                var data = rep.data;
                this.music_object.lrc = "";
                if (data.lrc == undefined) {
                  this.music_object.lrc = "[00:00.400]此音乐为纯音乐";
                } else {
                  this.music_object.lrc = data.lrc.lyric;
                }
                this.jiuxu = true;
              });
            });
          }
        });
      } else {
        util.ajax.get("/song/url?id=" + item + "").then(rep => {
          var data = rep.data;
          if (
            data.data[0].url != "" &&
            data.data[0].url != null &&
            data.data[0].url != undefined
          ) {
            this.music_object.src = data.data[0].url;
            util.ajax.get("/song/detail?ids=" + item + "").then(rep => {
              var data = rep.data.songs;
              this.music_object.artist =
                data[0].ar.length == 1
                  ? (this.music_object.artist = data[0].ar[0].name)
                  : data[0].ar[0].name + "-" + data[0].ar[1].name;
              this.music_object.title = data[0].name;
              this.music_object.pic =
                data[0].al.picUrl == undefined
                  ? require("../../assets/images/wutu.png")
                  : data[0].al.picUrl;
              this.music_pinglun();
              util.ajax.get("/lyric?id=" + item + "").then(rep => {
                var data = rep.data;
                this.music_object.lrc = "";
                if (data.lrc == undefined) {
                  this.music_object.lrc = "[00:00.400]此音乐为纯音乐";
                } else {
                  this.music_object.lrc = data.lrc.lyric;
                }
                this.jiuxu = true;
              });
            });
          } else {
            util.error("对不起！您点播的歌曲暂无权限和资料，请换歌！");
            this.on_diange(this.search_data[0].id, "search_data");
            this.jiuxu = true;
            return;
          }
        });
      }
      this.jishiqi = 0;
      this.jishiqi = this.jishiqi + parseInt(item);
    },
    music_pinglun(item, data) {
      if (item == "pinglun") {
        if (data == "shang") {
          if (this.music_pinglun_index == 0) {
            util.error("已经是第一页了！");
            return;
          } else {
            this.music_pinglun_index = this.music_pinglun_index - 20;
            util.ajax
              .get(
                "/comment/music?id=" +
                  this.music_id +
                  "&offset=" +
                  this.music_pinglun_index +
                  "&limit=20"
              )
              .then(rep => {
                var data = rep.data;
                this.zongshu = 0;
                this.zongshu = data.total;
                this.music_xiangqing = [];
                data.comments.forEach(item => {
                  this.music_xiangqing.push({
                    userimg: item.user.avatarUrl,
                    username: item.user.nickname,
                    id: item.user.userId,
                    content: item.content.replace(/\n/g, "<br/>"),
                    huifu: {
                      username:
                        item.beReplied.length == 0
                          ? ""
                          : item.beReplied[0].user.nickname,
                      userneirong:
                        item.beReplied.length == 0
                          ? ""
                          : item.beReplied[0].content == null
                            ? "该评论已删除！"
                            : item.beReplied[0].content.replace(/\n/g, "<br/>"),
                      userimg:
                        item.beReplied.length == 0
                          ? ""
                          : item.beReplied[0].user.avatarUrl
                    },
                    likedCount: item.likedCount,
                    commentId: item.commentId
                  });
                });
                if (this.music_pinglun_index == 0) {
                  this.music_xiangre = [];
                  data.hotComments.forEach(item => {
                    this.music_xiangre.push({
                      userimg: item.user.avatarUrl,
                      username: item.user.nickname,
                      id: item.user.userId,
                      content: item.content.replace(/\n/g, "<br/>"),
                      huifu: {
                        username:
                          item.beReplied.length == 0
                            ? ""
                            : item.beReplied[0].user.nickname,
                        userneirong:
                          item.beReplied.length == 0
                            ? ""
                            : item.beReplied[0].content == null
                              ? "该评论已删除！"
                              : item.beReplied[0].content.replace(
                                  /\n/g,
                                  "<br/>"
                                ),
                        userimg:
                          item.beReplied.length == 0
                            ? ""
                            : item.beReplied[0].user.avatarUrl
                      },
                      likedCount: item.likedCount,
                      commentId: item.commentId
                    });
                  });
                }
              });
          }
        } else {
          this.music_pinglun_index = this.music_pinglun_index + 20;
          util.ajax
            .get(
              "/comment/music?id=" +
                this.music_id +
                "&offset=" +
                this.music_pinglun_index +
                "&limit=20"
            )
            .then(rep => {
              var data = rep.data;
              this.zongshu = 0;
              this.zongshu = data.total;
              this.music_xiangqing = [];
              data.comments.forEach(item => {
                this.music_xiangqing.push({
                  userimg: item.user.avatarUrl,
                  username: item.user.nickname,
                  id: item.user.userId,
                  content: item.content.replace(/\n/g, "<br/>"),
                  huifu: {
                    username:
                      item.beReplied.length == 0
                        ? ""
                        : item.beReplied[0].user.nickname,
                    userneirong:
                      item.beReplied.length == 0
                        ? ""
                        : item.beReplied[0].content == null
                          ? "该评论已删除！"
                          : item.beReplied[0].content.replace(/\n/g, "<br/>"),
                    userimg:
                      item.beReplied.length == 0
                        ? ""
                        : item.beReplied[0].user.avatarUrl
                  },
                  likedCount: item.likedCount,
                  commentId: item.commentId
                });
              });
              if (this.music_pinglun_index == 0) {
                this.music_xiangre = [];
                data.hotComments.forEach(item => {
                  this.music_xiangre.push({
                    userimg: item.user.avatarUrl,
                    username: item.user.nickname,
                    id: item.user.userId,
                    content: item.content.replace(/\n/g, "<br/>"),
                    huifu: {
                      username:
                        item.beReplied.length == 0
                          ? ""
                          : item.beReplied[0].user.nickname,
                      userneirong:
                        item.beReplied.length == 0
                          ? ""
                          : item.beReplied[0].content == null
                            ? "该评论已删除！"
                            : item.beReplied[0].content.replace(/\n/g, "<br/>"),
                      userimg:
                        item.beReplied.length == 0
                          ? ""
                          : item.beReplied[0].user.avatarUrl
                    },
                    likedCount: item.likedCount,
                    commentId: item.commentId
                  });
                });
              }
            });
        }
      } else {
        util.ajax
          .get("/comment/music?id=" + this.music_id + "&offset=0&limit=20")
          .then(rep => {
            var data = rep.data;
            this.zongshu = 0;
            this.zongshu = data.total;
            this.music_xiangqing = [];
            data.comments.forEach(item => {
              this.music_xiangqing.push({
                userimg: item.user.avatarUrl,
                username: item.user.nickname,
                id: item.user.userId,
                content: item.content.replace(/\n/g, "<br/>"),
                huifu: {
                  username:
                    item.beReplied.length == 0
                      ? ""
                      : item.beReplied[0].user.nickname,
                  userneirong:
                    item.beReplied.length == 0
                      ? ""
                      : item.beReplied[0].content == null
                        ? "该评论已删除！"
                        : item.beReplied[0].content.replace(/\n/g, "<br/>"),
                  userimg:
                    item.beReplied.length == 0
                      ? ""
                      : item.beReplied[0].user.avatarUrl
                },
                likedCount: item.likedCount,
                commentId: item.commentId
              });
            });
            this.music_xiangre = [];
            data.hotComments.forEach(item => {
              this.music_xiangre.push({
                userimg: item.user.avatarUrl,
                username: item.user.nickname,
                id: item.user.userId,
                content: item.content.replace(/\n/g, "<br/>"),
                huifu: {
                  username:
                    item.beReplied.length == 0
                      ? ""
                      : item.beReplied[0].user.nickname,
                  userneirong:
                    item.beReplied.length == 0
                      ? ""
                      : item.beReplied[0].content == null
                        ? "该评论已删除！"
                        : item.beReplied[0].content.replace(/\n/g, "<br/>"),
                  userimg:
                    item.beReplied.length == 0
                      ? ""
                      : item.beReplied[0].user.avatarUrl
                },
                likedCount: item.likedCount,
                commentId: item.commentId
              });
            });
          });
      }
    },
    clearlocal(item) {
      if (item == 1) {
        localStorage.removeItem("userid");
        this.deLogin = false;
        util.success("退出成功！请重新登录！");
        return;
      } else if (
        document.hidden == true &&
        (document.visibilityState == "hidden" ||
          document.visibilityState == "prerender")
      ) {
        util.error("您的登录状态已过期，请重新登录！");
        localStorage.removeItem("userid");
        this.deLogin = false;
        return;
      }
    },
    user_onxinxi(data) {
      this.username = data.profile.nickname;
      this.useravatarurl = data.profile.avatarUrl;
      this.userbackgroundurl = data.profile.backgroundUrl;
    },
    on_search(type) {
      this.geshou_danye = false;
      this.geshou_on = true;
      this.onlist = false;
      if (typeof type == "number") {
        util.ajax.get("/artists?id=" + type).then(rep => {
          var data = rep.data;
          this.geshou_xinxi.name = "";
          this.geshou_xinxi.url = "";
          this.geshou_xinxi.miaoshu = "";
          this.geshou_xinxi.name = data.artist.name;
          this.geshou_xinxi.url = data.artist.img1v1Url;
          this.geshou_xinxi.miaoshu = data.artist.briefDesc;
          this.search_data = [];
          data.hotSongs.forEach(item => {
            this.search_data.push({
              name: item.name,
              id: item.id,
              singer:
                item.ar.length == 1
                  ? item.ar[0].name
                  : item.ar[0].name + "-" + item.ar[1].name
            });
            this.onlist = true;
          });
          this.geshou_on = false;
          this.geshou_axinxi = true;
        });
      } else {
        this.onlist = false;
        util.ajax
          .get("/search?keywords=" + type + "?limit=" + this.page_index)
          .then(rep => {
            var data = rep.data.result.songs;
            this.search_data = [];
            for (var i = 0; i < data.length; i++) {
              this.search_data.push({
                name: data[i].name,
                id: data[i].id,
                singer:
                  data[i].artists.length == 1
                    ? data[i].artists[0].name
                    : data[i].artists[0].name + "-" + data[i].artists[1].name
              });
            }
            this.geshou_on = false;
            this.onlist = true;
          });
      }
    },
    music_end() {
      this.f_alpha_img = false;
      if (this.dangqianbofang == "gedan") {
        for (var a = 0; a < this.gedan.length; a++) {
          if (this.gedan[a].id == this.music_id) {
            if (a + 1 < this.gedan.length) {
              this.on_diange(this.gedan[a + 1].id, "gedan");
              return;
            } else {
              this.on_diange(this.gedan[0].id, "gedan");
              return;
            }
          }
        }
      } else {
        for (var a = 0; a < this.search_data.length; a++) {
          if (this.search_data[a].id == this.music_id) {
            if (a + 1 < this.search_data.length) {
              this.on_diange(this.search_data[a + 1].id, "search_data");
              return;
            } else {
              this.on_diange(this.search_data[0].id, "search_data");
              return;
            }
          }
        }
      }
    },
    back(type) {
      if (type == 1) {
        this.onlist = false;
        this.geshou_danye = true;
      }
    }
  }
};
</script>
<style lang='less'>
#text textarea{
  outline:none !important;
  resize:none !important;
  border: 1px solid #cdcdcd !important;
}
#text textarea:hover{
  outline:none !important;
  resize:none !important;
  border: 1px solid #cdcdcd !important;
}
#text textarea:focus{
  border: 1px solid #cdcdcd !important;
}
@import url("./index.less");
</style>
