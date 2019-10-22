<template>
  <div class="singer-details">
    <div class="singer-header" ref="header">
      <div class="singer-back" @click="back()">
        <img src="../../images/Buttons-Random@2x.png" />
      </div>
      <div class="singer-header-ctn">
        <div class="singer-info">
          <div class="singer-avatar">
            <img v-lazy="singeravatar" />
          </div>
          <div class="singer-name">
            <h5>{{singername}}</h5>
            <template v-if="singeralias && singeralias.length > 0">
              <span v-for="(item,index) in singeralias" :key="index">{{item}}</span>
            </template>
          </div>
        </div>
        <div class="singer-btn-list">
          <img src="../../images/random-btn.png" @click="randomplayer" />
          <img src="../../images/play-btn.png" @click="playerall" />
        </div>
      </div>
    </div>
    <div class="singer-album" ref="albums">
      <scroll :scrollX="true" :mouseWheel="true">
        <ul class="album" ref="album">
          <li v-for="(item,index) in singeralbum" :key="index" ref="songerli">
            <img v-lazy="item.picUrl" @load="initalbumwidth" />
            <div class="songer-info">
              <p>{{item.name}}</p>
              <p v-for="(its,idx) in item.alias" :key="idx">{{its}}</p>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
    <div class="singer-list" ref="detailbottom">
      <div class="singer-popularlist">
        <div class="singer-div-header">歌手歌曲</div>
        <div class="singer-div-list">
          <scroll :scrollX="true" :mouseWheel="true">
            <ul ref="singerlist" class="singerul">
              <li
                v-for="(item,index) in singerlist"
                :key="index"
                ref="singerlistli"
                @click="player(item)"
              >
                <div class="songer-avatar">
                  <img v-lazy="item.picUrl" @load="initsingerlistheight" />
                </div>
                <div class="songers-info">
                  <div class="songer-nameSinger">
                    <h5>{{item.name}}</h5>
                    <template v-if="item.ar && item.ar.length > 0">
                      <p v-for="(data,idx) in item.ar" :key="idx">{{data.name}}</p>
                    </template>
                  </div>
                  <div class="songer-time">{{item.flag}}</div>
                </div>
              </li>
            </ul>
          </scroll>
        </div>
      </div>
      <div class="singer-songlist">
        <div class="singer-div-header">歌手MV</div>
        <div class="singer-div-list">
          <scroll :mouseWheel="true">
            <ul class="singermvul" ref="singermvul">
              <li
                v-for="(item,index) in singermvlist"
                :key="index"
                ref="singermvli"
                @click="watchmv(item)"
              >
                <img v-lazy="item.imgurl" @load="initsingermvheight" />
                <font>{{item.name}}</font>
              </li>
            </ul>
          </scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  singerdetails,
  singeralbum,
  singerlist,
  singermvlist
} from "api/songs";
import scroll from "../Components/scroll";
import { timeconversion, goPageByPath, playerrandom } from "utils/utils";
import { mapMutations, mapGetters } from "vuex";
import bus from "utils/bus";
export default {
  data() {
    return {
      /** 歌手id */
      singerid: 0,
      /** 歌手头像 */
      singeravatar: null,
      /** 歌手名字 */
      singername: "",
      /** 歌手 */
      singeralias: [],
      /** 歌手歌曲列表 */
      singerlist: [],
      /** 歌手专辑 */
      singeralbum: [],
      /** 歌手mv列表 */
      singermvlist: []
    };
  },
  computed: {
    ...mapGetters(["songinfo", "currentsongId", "prevsongerid", "playerlist"])
  },
  methods: {
    ...mapMutations({
      /** 修改当前歌曲信息 */
      setsonginfo: "SET_SONGINFO",
      /** 修改当前歌曲id */
      setcurrentsongId: "SET_CURRENTSONGID",
      /** 修改当前播放器播放列表 */
      setplayerlist: "SET_PLAYERLIST",
      /** 修改当前播放器播放模式 */
      setplayermode: "SET_PLAYERMODE"
    }),
    /** 查询歌手详情信息和部分歌曲信息 */
    selectsingdetails() {
      this.singerid = this.$route.query.songerid;
      singerdetails(this.singerid).then(res => {
        if (res.data.code === 200) {
          let data = res.data;
          this.singeravatar = data.artist.img1v1Url;
          this.singername = data.artist.name;
          this.singeralias = data.artist.alias;
        }
      });
    },
    /** 查看mv */
    watchmv(item) {
      goPageByPath("/mv-details", { mv: item.id });
    },
    /** 获取歌曲准备播放 */
    player(item) {
      if (item.id === this.currentsongId) {
        bus.$emit("initcurrent", 0);
      } else {
        /** 深拷贝当前歌曲列表--开始 */
        let date = [];
        for (let i = 0; i < this.singerlist.length; i++) {
          date.push(this.singerlist[i]);
        }
        /** 深拷贝当前歌曲列表--结束 */
        this.setplayerlist(date);
        let data = {};
        data["flag"] = item.flag;
        data["name"] = item.name;
        data["picUrl"] = item.picUrl;
        data["musicurl"] = "";
        let songer = [];
        if (item.ar && item.ar.length && item.ar.length > 0) {
          item.ar.forEach((items, index) => {
            songer.push(items);
          });
        }
        data["songer"] = songer;
        this.setsonginfo(data);
        if (item.id !== this.currentsongId) {
          this.setcurrentsongId(item.id);
        }
      }
    },
    /** 处理播放按钮事件 */
    playerall() {
      this.setplayermode(0);
      /** 深拷贝当前歌曲列表--开始 */
      let date = [];
      for (let i = 0; i < this.singerlist.length; i++) {
        date.push(this.singerlist[i]);
      }
      /** 深拷贝当前歌曲列表--结束 */
      this.setplayerlist(date);
      let data = {};
      data["flag"] = this.singerlist[0].flag;
      data["name"] = this.singerlist[0].name;
      data["picUrl"] = this.singerlist[0].picUrl;
      data["musicurl"] = "";
      let songer = [];
      if (
        this.singerlist[0].ar &&
        this.singerlist[0].ar.length &&
        this.singerlist[0].ar.length > 0
      ) {
        this.singerlist[0].ar.forEach((item, index) => {
          songer.push(item);
        });
      }
      data["songer"] = songer;
      this.setsonginfo(data);
      if (this.singerlist[0].id !== this.currentsongId) {
        this.setcurrentsongId(this.singerlist[0].id);
      }
    },
    /** 处理随机播放按钮事件 */
    randomplayer() {
      /** 深拷贝当前歌曲列表--开始 */
      let date = [];
      for (let i = 0; i < this.singerlist.length; i++) {
        date.push(this.singerlist[i]);
      }
      /** 深拷贝当前歌曲列表--结束 */
      this.setplayermode(1);
      this.setplayerlist(playerrandom(date));
      /** 传入当前播放列表的长度 */
      this.setcurrentsongId(this.playerlist[0].id);
      if (this.playerlist.length > 0) {
        let data = {};
        this.playerlist.forEach((item, index) => {
          if (this.currentsongId === item.id) {
            data["flag"] = this.playerlist[0].flag;
            data["name"] = this.playerlist[0].name;
            data["picUrl"] = this.playerlist[0].picUrl;
            data["songer"] = this.playerlist[0].ar;
          }
        });
        data["musicurl"] = "";
        this.setsonginfo(data);
      }
    },
    /** 查询歌手专辑 */
    selectsingeralbum() {
      singeralbum(this.singerid).then(res => {
        if (res.data.code === 200) {
          let data = res.data.hotAlbums;
          if (data && data.length && data.length > 0) {
            this.singeralbum = [];
            data.forEach((item, index) => {
              this.singeralbum.push(item);
            });
          }
        }
        /** 初始化歌手专辑横向滚动宽度 */
        this.initalbumwidth();
      });
    },
    /** 初始化歌手专辑横向滚动宽度 */
    initalbumwidth() {
      setTimeout(() => {
        if (this.$refs.songerli && this.$refs.album) {
          let songerli = this.$refs.songerli;
          let width = 0;
          if (songerli && songerli.length > 0) {
            songerli.forEach((item, index) => {
              width = width + item.offsetWidth + 70;
            });
          }
          this.$refs.album.style.width = width + "px";
        }
      }, 60);
    },
    /** 返回上一级路由 */
    back() {
      goPageByPath("/singerlist");
    },
    /** 查询歌手单曲 */
    selectsingerlist() {
      singerlist(this.singerid).then(res => {
        if (res.data.code === 200) {
          let data = res.data.hotSongs;
          if (data && data.length && data.length > 0) {
            this.singerlist = [];
            data.forEach((item, index) => {
              this.singerlist.push({
                name: item.name,
                ar: item.ar,
                id: item.id,
                flag: timeconversion(item.privilege.flag),
                picUrl: item.al.picUrl
              });
            });
          }
        }
        /** 初始化滚动高度 */
        this.initsingerlistheight();
      });
    },
    /** 初始化歌曲列表滚动高度 */
    initsingerlistheight() {
      setTimeout(() => {
        if (this.$refs.singerlist && this.$refs.singerlistli) {
          if (this.singerlist.length > 0) {
            let height = 0;
            this.$refs.singerlistli.forEach((item, index) => {
              height = height + item.offsetHeight;
            });
            this.$refs.singerlist.style.height = height + "px";
          }
        }
      }, 60);
    },
    /** 查询歌手mv列表 */
    selectsingermvlist() {
      singermvlist(this.singerid).then(res => {
        if (res.data.code === 200) {
          let data = res.data.mvs;
          if (data && data.length && data.length > 0) {
            this.singermvlist = [];
            data.forEach(item => {
              this.singermvlist.push(item);
            });
          }
        }
        /** 初始化歌手mv列表滚动高度 */
        this.initsingermvheight();
      });
    },
    /** 初始化歌手mv列表滚动高度 */
    initsingermvheight() {
      setTimeout(() => {
        if (this.$refs.singermvul && this.$refs.singermvli) {
          let height = 0;
          if (this.$refs.singermvli.length > 0) {
            this.$refs.singermvli.forEach((item, index) => {
              if (index % 2 === 0) {
                height = height + item.scrollHeight + 14;
              }
            });
          }
          this.$refs.singermvul.style.height = height + "px";
        }
      }, 60);
    }
  },
  created() {
    if (this.$route.query.songerid) {
      /** 查询歌手 */
      this.selectsingdetails();
      /** 查询歌手的专辑 */
      this.selectsingeralbum();
      /** 查询歌手单曲 */
      this.selectsingerlist();
      /** 查询歌手mv */
      this.selectsingermvlist();
    }
    this.$nextTick(() => {
      /** 初始化歌曲列表滚动高度 */
      this.initsingerlistheight();
      /** 初始化歌手mv列表滚动高度 */
      this.initsingermvheight();
      /** 初始化歌手专辑横向滚动宽度 */
      this.initalbumwidth();
    });
  },
  components: {
    scroll
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>