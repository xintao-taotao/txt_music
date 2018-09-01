<template>
  <div class="page">
    <affix>
      <div style="text-align:right;">
        <a href='javascript:void(0)' @click='changeLang("zh-CN")'>中文</a> | <a href='javascript:void(0)' @click='changeLang("en-US")'>English</a>
      </div>
      <!-- <Menu mode="horizontal" theme="dark" active-name="1">
        <MenuItem name="1">
          <Icon type="ios-paper" />
          内容管理
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-people"></Icon>
          用户管理
        </MenuItem>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-stats" />
            统计分析
          </template>
            <MenuGroup title="使用">
              <MenuItem name="3-1">新增和启动</MenuItem>
              <MenuItem name="3-2">活跃分析</MenuItem>
              <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
              <MenuItem name="3-4">用户留存</MenuItem>
              <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem name="4">
          <Icon type="ios-construct" />
          综合设置
        </MenuItem>
        导航
      </Menu> -->
    </affix>
    <banner></banner>
    <musicfooter></musicfooter>
    <BackTop></BackTop>
  </div>
</template>

<script>
import musicfooter from '../music_footer/index'
import banner from '../banner/index'
import util from '../../mutu/mutu.js'
export default {
  components: {
    musicfooter,
    banner
  },
  data () {
    return {
      breadItems: [
        {
          name: "home"
        }
      ],
    };
  },
  created(){
    util.title(
      this.$t("projectName") +
        "-" +
        this.$t('home')
    );
  },
  methods:{
    changeLang(lang) {
      this.$store.commit("switchLang", lang);
      util.title(
        this.$t("projectName") +
          "-" +
          this.$t('home')
      );
      window.location.reload();
    }
  }
}

</script>
<style lang='less' scoped>
@import './index.less';
@import '../public/public.less';
</style>