<template>
  <div>
    <header>
      <div class="header-wrap">
        <ul>
          <router-link to="/index/drive">老板驾驶舱</router-link>
          <router-link to="/index/factoryCar">在厂车辆</router-link>
          <router-link to="/index/work">我的工作台</router-link>
          <router-link to="/index/manage">管理秘籍</router-link>
          <router-link to="/index/marketing">营销方案</router-link>
          <router-link to="/index/set">设置</router-link>
        </ul>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>
<script></script>
<style lang="scss" type="text/scss">
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  body{
    a{
      text-decoration: none;
    }
  }
  header{
    .header-wrap{
      width: 100%;
      height: 70px;
      font-size: 16px;
      -webkit-box-shadow: 0px 1px #BBD7EE;
      ul{
        line-height: 70px;
        text-align: center;
        a{
          text-decoration: none;
          color: #568BB9;
        }
      }
    }
  }
</style>

