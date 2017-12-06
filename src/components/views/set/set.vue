<template>
<div class="set_wrap">
  <div class="set_wrap_left">

  <ul>
    <h3>企业设置</h3>
    <li><router-link to="/index/set/price">车价区间</router-link></li>
    <li><router-link to="/index/set/projects">项目管理</router-link></li>
    <li><router-link to="/index/set/check">检查项目管理</router-link></li>
    <li><router-link to="/index/set/time">预约时间设定</router-link></li>
    <li><router-link to="/index/set/theClient"                              >客户端项目编辑</router-link></li>
    <li><router-link to="/index/set/source">客户来源管理</router-link></li>
    <li><router-link to="/index/set/WeChat">微信设置</router-link></li>
    <li><router-link to="/index/set/data">期初数据导入</router-link></li>
  </ul>
  <ul>
    <h3>企业设置</h3>
    <li><router-link to="/index/set/area">区域管理</router-link></li>
    <li><router-link to="/index/set/stores">门店管理</router-link></li>
    <li><router-link to="/index/set/department">部门管理</router-link></li>
    <li><router-link to="/index/set/personnel">人员管理</router-link></li>
    <li><router-link to="/index/set/allotment">极限分配</router-link></li>
  </ul>

  </div>
  <div class="set_wrap_right">
    <router-view></router-view>

  </div>
</div>
</template>

<script>

</script>

<style lang="scss" type="text/scss">
  .set_wrap{
    display: flex;
    .set_wrap_left{
      width: 160px;
      height: 100%;
      background: #0e66a1;
      text-align: left;
      color: white;
      padding-left: 30px;
      ul{
        li{
          line-height: 45px;
          a{
            display: inline-block;
            color: white;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
