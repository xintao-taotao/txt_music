<template>
  <div class="player-list-div">
    <img src="../../../images/big_playerlist.png" @click.stop="showlist" />
    <div class="player-list" v-if="playerliststatus" @click.stop>
      <div class="player-list-header">
        <h5>播放列表</h5>
        <i title="关闭"></i>
      </div>
      <div class="player-list-ctn">
        <scroll ref="playerlistscroll" :scrollX="true" :mouseWheel="true">
          <ul>
            <li v-for="(item,index) in playerlist" :key="index" :class="currentsongId === item.id ? 'active-player-songer' : null">
              <div class="list-item-div">
                <div class="list-item-left">
                  <div class="list-item-img">
                    <img v-lazy="item.picUrl">
                  </div>
                  <div class="list-songer-info">
                    <h5>{{item.name}}</h5>
                    <span v-for="(data,idx) in item.ar" :key="idx">{{data.name}}</span>
                  </div>
                </div>
                <div class="list-item-right">
                  操作
                </div>
              </div>
            </li>
          </ul>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import scroll from "../scroll/index";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
    };
  },
  mounted() {
    this.$nextTick(() => {
      /** 监听addEventListene事件 */
      document.addEventListener("click", this.closevolume);
    });
  },
  methods: {
    ...mapMutations({
      /** 修改播放列表显示状态 */
      setplayerliststatus: "SET_PLAYERLISTSTATUS",
      /** 修改音量调节显示状态 */
      setplayervolumestatus: "SET_PLAYERVOLUMESTATUS"
    }),
    /** 展示播放列表 */
    showlist() {
      if(this.playervolumestatus){
        this.setplayervolumestatus(false);
      }
      this.setplayerliststatus(!this.playerliststatus);
    },
    /** 监听addEventListene事件 */
    closevolume() {
      this.setplayerliststatus(false);
    }
  },
  computed: {
    ...mapGetters(["playerlist", "currentsongId", "playerliststatus", "playervolumestatus"])
  },
  components: {
    scroll
  }
};
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>