<template>
  <div id="login">
    <div class="header">
      <div class="wrap1000">
        <h1 class="fl">新动源</h1>
        <div class="nav fr clearFix">
          <a class="fl border_none" href="javascript:">首页</a>
        </div>
      </div>
    </div>
    <div class="banner">
      <div class="wrap1000">
        <ul class="banner_left clearFix fl clearFix">
          <li>
            <div class="banner_left_left fl">
              <p>新动源-汽修企业互联网</p>
              <p>转型服务提供商</p>
            </div>
            <div class="banner_left_right fl">
              <img src="../../assets/login_phone.png" alt=""/>
            </div>
          </li>
          <li class="banner_button_box clearFix">
            <div class="banner_button fl active"></div>
            <div class="banner_button fl"></div>
          </li>
        </ul>
        <div class="banner_right fl">
          <div class="banner_right_top clearFix">
            <img class="fr" src="../../assets/login_right.png" alt=""/>
          </div>
          <div class="banner_right_center">
            <div class="banner_right_center_top">
              <div>欢迎登录汽修掌上通</div>
              <p>营销管理系统</p>
            </div>
            <form class="banner_right_center_center" name="loginForm" role="form">
              <div class="login_number">
                <input type="text" v-model="mobile" @keyup.enter="login" placeholder="请输入手机号" required>
                <div class="login_number_img">
                </div>
              </div>
              <div class="login_password">
                <input type="password" v-model="password" @keyup.enter="login" placeholder="请输入密码" required>
                <div class="login_password_img">
                </div>
              </div>
              <input class="submit" type="button" value="登录" @click="login"/>
            </form>
          </div>
          <div class="banner_right_bottom"><a href="http://qxgs.net:18080/qxzst-sp-apis/html/taste.html">快速体验</a></div>
        </div>
      </div>
    </div>
    <div class="information wrap1000 clearFix">
      <div class="information_left fl">
        <ul class="information_left_top clearFix">
          <li class="clearFix fl" style="width: 220px;">
            <img class="fl" src="../../assets/login_icon.png" alt=""/>
            <p class="fl">扫一扫下载软件</p>
          </li>
          <li class="clearFix fl" style="background: transparent;border: none;margin-top: -40px;">
            <img src="http://xlc.qxgs.net/api/mobile/image/wechat/addr"/>
          </li>
        </ul>
        <ol class="information_left_bottom">
          <li>客服电话：400-0031-885</li>
          <li>客服QQ：3103460132&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3417006962</li>
          <li class="clearFix">
            <a class="fl padding_none" href="javascript:">使用协议</a>
            <a class="fl" href="javascript:">隐私保护</a>
            <a class="fl" href="javascript:">更新日志</a>
            <a class="fl" href="javascript:">帮助中心</a>
            <a class="fl" href="javascript:">问题反馈</a>
          </li>
          <li>Copyright&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2014-2015新动源（北京）信息科技有限公司版权所有|京ICP备14061695号-1</li>
        </ol>
      </div>
      <div class="information_right fr">
        <div class="information_right_top clearFix">
          <img class="fl" src="../../assets/login_qyh.jpg" alt=""/>
          <p class="fl">手机扫描维修企业管理内参</p>
        </div>
        <div class="information_right_bottom clearFix">
          <div class="fl">
            <img src="../../assets/login_weixin.png" alt=""/>
          </div>
          <div class="fl">
            <img class="img" src="../../assets/login_weibo.png" alt=""/>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="选择门店登陆"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <ul class="login_choice_store_bottom" style="max-height:450px;overflow-y: auto ">
        <li class="clearFix" v-for="shop in sps" :cc="shop" @click="auth(shop)">
          <div class="login_choice_store_bottom_left fl">
            <img src=""/>
          </div>
          <div class="login_choice_store_bottom_center fl">
            <div class="login_choice_store_bottom_center_top" :cc="shop">
              {{ shop.spName }}
            </div>
            <div class="login_choice_store_bottom_center_bottom" :cc="shop">
              {{ shop.shopName }}
            </div>
          </div>
          <div class="login_choice_store_bottom_right fr">
          </div>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
  /* eslint-disable indent */
  import {delCookie} from '../../util/util.js'
  export default {
  name: 'login',
  data () {
    return {
      mobile: '15101665396',
      password: '111111',
      msg: 'Welcome to Your Vue.js App',
      centerDialogVisible: false,
      sps: []
    }
  },
  /* 事件方法 */
  methods: {
    deletecookie () {
      delCookie('sid')
    },
    /* 普通方法 */
    login () {
      this.deletecookie()
      this.$ajax({
        method: 'post',
        url: '/pc/sp/auth',
        data: {
          'mobile': this.mobile,
          'password': this.password
        }
      })
      .then(function (response) {
        console.log(response)
        if (response.data.status === 200) {
          if (response.data.data.length === 1) {
            this.shop = response.data.data[0]
            this.auth(this.shop)
          } else {
            this.centerDialogVisible = true
            this.sps = response.data.data
          }
        } else {
          this.$message.error(response.data.message)
        }
      }.bind(this))
      .catch(function (error) {
          console.log(error)
      })
      /* this.$http.post(this.HOST + '/pc/sp/auth', {'mobile': this.mobile, 'password': this.password}).then(response => {
        if (response.body.status === 200) {
          if (response.body.data.length === 1) {
            this.shop = response.body.data[0]
            this.auth(this.shop)
          } else {
            this.centerDialogVisible = true
            this.sps = response.body.data
          }
        } else {
          this.$message.error(response.body.message)
        }
        // get body data
      }, response => {
        // error callback
        this.$message(response.body.message)
      }) */
    },
    /* 函数式方法 */
    dothis: function (...a) {
      console.log(a)
    },
    /* 选择门店进行跳转 */
    auth (shop) {
      this.shop = shop
      this.$ajax({
        method: 'get',
        url: '/pc/sp/auth/' + this.shop.spEmpId
      })
      .then(function (response) {
        localStorage.setItem('currentEmp', {
          'shop': this.shop.shopName,
          'avatarId': this.shop.avatarId,
          'name': this.shop.empName,
          'deptType': this.shop.deptType,
          'operAuth': response.data.data[0].auths
        })
        this.$router.push({name: 'index'})
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  computed: {
  },
    /* 监听属性 */
  watch: {
    'mobile': function (val, oldVal) {
      console.log(val, oldVal)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* CSS Document */
  /*不同版本的积分*/
  .alert{font-size:30px;height:100px;line-height:100px;text-align:center;}
  .integration{margin-left:240px;margin-top:100px;}
  /* 功能完成后要删除的 */
  body,h1,h2,h3,h4,h5,h6,p,i,em,b,strong,img,a,ul,ol,li,dl,dt,dd,input,th,td{margin:0;padding:0;}
  body{font-family:'Microsoft YaHei';position:relative;background:#f4fbfb;}
  a{text-decoration:none;color:#333;}
  li,dl,dt{list-style:none;}
  input,textarea,select{background:none;border:none;outline:none;cursor: pointer}
  textarea{outline:none;resize:none;font-family:'Microsoft YaHei';cursor: pointer}
  img,input,select{vertical-align:top;}
  img{display:block;}
  img{border:none;}
  .clearFix:after{content:'';clear:both;display:block;}
  /*.clearFix{zoom:1;}*/
  .fl{float:left;}
  .fr{float:right;}
  #loading_bg{position:absolute;top:0;left:0;width:100%;height:100%;background:#fff;opacity:0.3;filter:alpha(opacity=80);z-index:300;}
  #loading_bg img{position:fixed;top:50%;left:50%;margin-top:-150px;margin-left:-250px;z-index:301;}
  .disabled {pointer-events: none;}
  .relative{position:relative;}
  .hidden{overflow:hidden;}
  .font_weight{font-weight:bold;}

  .wrap1200{width:1200px;margin:0 auto;}
  .wrap630{width:630px;margin:0 auto;}
  .wrap800{width:800px;margin:0 auto;}
  .wrap400{width:400px;margin:0 auto;}
  .wrap900{width:900px;margin:0 auto;}
  .wrap1000{width:1000px;margin:0 auto;}
  .wrap1100{width:1100px;margin:0 auto;}
  .list_wrap800{width:800px;margin:0 auto;margin-top:20px;color:#fff;}
  .list_wrap900{width:900px;margin:0 auto;margin-top:20px;color:#fff;}
  .list_wrap1000{width:1000px;margin:0 auto;margin-top:20px;color:#fff;}
  .list_wrap1100{width:1100px;margin:0 auto;margin-top:20px;color:#fff;}
  .margin_300{margin-right:300px;}
  .margin_140{margin-left:140px;}
  .margin_6{margin-top:6px;}
  .margin_11{margin-top:11px;}
  .margin_20{margin-top:20px;}
  .margin_24{margin-left:24px;}
  .margin_30{margin-right:30px;}
  .margin_bottom_20{margin-bottom:20px;}
  .margin_bottom_5{margin-bottom:5px;}
  .margin_bottom_10{margin-bottom:10px;}
  .margin_10{margin-left:10px;}
  .margintop_10{margin-top:10px;}
  .margin_40{margin-bottom:40px;}
  .margina20{margin:20px;}
  .margin_top_40{margin-top:40px;}
  .margin_top_35{margin-top:35px;}
  .margin_top_70{margin-top:70px;}
  .text_right{text-align:right;}
  .text_left{text-align:left;}
  .min_height{min-height:600px;margin-top:-14px;}
  .padding20{padding-top:20px;}
  .paddingl20{padding-left:20px;}
  .margin16{margin-left: 16%;}
  .margin10{margin-left: 10%;}
  .margin20{margin-left: 20%;}
  .paddinglr3{padding:0 3px;}
  .marginl60{margin-left: 60px;}
  .marginl20{margin-left: 20px;}
  .marginr35{margin-right: 35px;}
  .marginr15{margin-right: 15px;}
  .marginl50{margin-left: 50px;}
  .nowrap{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .marginl40 {
    margin-left: 40px;
  }
  .bgwhite{
    background: white;
  }
  /*宽度*/
  .w5{width: 5px}
  .w10{width: 10px}
  .w15{width: 15px}
  .w20{width: 20px}
  .w25{width: 25px}
  .w30{width: 30px}
  .w35{width: 35px}
  .w40{width: 40px}
  .w45{width: 45px}
  .w50{width: 50px}
  .w55{width: 55px}
  .w60{width: 60px}
  .w65{width: 65px}
  .w70{width: 70px}
  .w75{width: 75px}
  .w80{width: 80px}
  .w85{width: 85px}
  .w90{width: 90px}
  .w95{width: 95px}
  .w100{width: 100px}



  textarea[readonly]{background-color:#f1f1f1;cursor:not-allowed;}

  input[readonly]{background-color:#f1f1f1;cursor:not-allowed;}
  input[disabled]{background-color:#cccccc;cursor:not-allowed;}
  .tab_query input[type="text"]:hover , .tab_query input[type="number"]:hover { border:solid 1px #0088ff;}
  .tab_query input[type="text"]:focus , .tab_query input[type="number"]:focus { border:solid 1px #0088ff;}
  select:hover{border:solid 1px #0088ff;}
  select:focus{border:solid 1px #0088ff;}


  input[date-picker][readonly]{background-color:#fff;cursor:pointer;}
  input[date-picker][disabled]{background-color:#f1f1f1;cursor:not-allowed;}
  /*分页的相关样式*/
  a{ text-decoration:none;}
  a:hover{ text-decoration:none;}
  .tcdPageCode{padding: 15px 20px;text-align: left;color: #ccc;}
  .tcdPageCode a{display: inline-block;color: #428bca;display: inline-block;height: 25px;	line-height: 25px;	padding: 0 10px;border: 1px solid #ddd;	margin: 0 2px;border-radius: 4px;vertical-align: middle;}
  .tcdPageCode a:hover{text-decoration: none;border: 1px solid #428bca;}
  .tcdPageCode span.current{display: inline-block;height: 25px;line-height: 25px;padding: 0 10px;margin: 0 2px;color: #fff;background-color: #428bca;	border: 1px solid #428bca;border-radius: 4px;vertical-align: middle;}
  .tcdPageCode span.disabled{	display: inline-block;height: 25px;line-height: 25px;padding: 0 10px;margin: 0 2px;	color: #bfbfbf;background: #f2f2f2;border: 1px solid #bfbfbf;border-radius: 4px;vertical-align: middle;}

  /*一些小按钮*/
  .waring_common{width:12px;height:11px;background:url(../../assets/waring.png);}
  .waring_common_margin{margin-left:150px;}
  .bt{
    margin-left: 4px;
    margin-top: 18px;
    margin-right: 4px;
  }
  /*设置相关表格的样式*/
  .bigtable{text-align:center;width:100%;}
  .bigtable .thead{width:100%;border-radius:4px;overflow:hidden;background:#1b97db;overflow:hidden;}
  .bigtable .bigthead{width:100%;}
  .bigtable .tbody{width:100%;}
  .bigtable .bigtbody{width:100%;position:relative;border:1px solid #ddd;margin-top:-1px;background:#fff;border-radius:4px;}
  .bigtable .th p{border-right:1px solid #7adcff;height:18px;font-size:16px;color:#fff;margin-top:10px;}
  .bigtable .th{height:36px;float:left;}
  .bigtable .td p{border-right:1px solid #d4d4d4;height:18px;font-size:16px;color:#3b3b3b;margin-top:10px;}
  .bigtable .td{height:36px;float:left;}
  .bigtable .posleft{position:absolute;left:2px;top:36px;width:22px;height:14px;background:url(../../assets/smallicons.png) no-repeat -30px -58px;}
  .bigtable .posright{position:absolute;right:2px;top:36px;width:22px;height:14px;background:url(../../assets/smallicons.png) no-repeat -58px -57px;}
  .bigtable .button_add{margin-left:30px;margin-right:12px;margin-top:9px;}
  .bigtable .button_delete{margin-top:9px;}
  .bigtable .margin20{margin-right:20px;}
  .smalltable{text-align:center;margin:0 auto;font-size:15px;width:1136px;margin-top:5px;margin-bottom:5px;}
  .smalltable .smallthead{background:#9e9e9e;height:26px;color:#020202;border-radius:4px;}
  .smalltable p{border-right:1px solid #cdcdcd;margin-top:7px;height:15px;line-height:15px;}
  .smalltable .smalltbody{width:1134px;background:#fff;height:26px;border-radius:4px;color:#ff0000;border:1px solid #d5d7d6;margin-top:-1px;}
  .line_through{text-decoration:line-through;}
  .smalltable .delete{ border-right:none;color:#1b97db;cursor:pointer;}

  /*公共添加*/
  .button_add{width:20px;height:20px;line-height:19px;text-align:center;border:1px solid #1b97db;color:#1b97db;border-radius:50%;font-size:18px;cursor:pointer;}
  /*公共删除*/
  .button_delete{width:20px;height:20px;line-height:19px;padding-left:2px;border:1px solid #8f8f8f;color:#8f8f8f;border-radius:50%;cursor:pointer;}
  /*公共搜索*/
  .search_common{position:relative;}
  .search_common .text{padding-left:10px;height:46px;border:1px solid #ededed;border-radius:46px;}
  .search_common .button{background:url(../../assets/smallicons.png) no-repeat -177px -11px;width:20px;height:24px;position:absolute;cursor:pointer;}
  /*业务类型的下拉框*/
  .border_select_box{position:relative;}
  .border_select{border:1px solid #ededed;background:#fff;color:#999;position:relative;cursor: pointer;}
  .border_select_txt{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#515151;}
  .space{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .border_select_img{width:8px;height:5px;background:url(../../assets/smallicons.png) no-repeat -171px -67px;position:absolute;right:19px;top:20px;}
  .border_selectlist{display:none;position:absolute;top:90px;left:24px;width:332px;background:#fff;border-radius:5px;box-shadow:0px 0px 6px #e0e1e1;color:#757476;padding-top:10px;padding-bottom:10px;max-height:200px;overflow-y:auto;z-index:10;}
  .border_selectlist li{padding-left:20px;height:38px;height:38px;line-height:38px;border-radius:20px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#515151;cursor: pointer;}
  .border_selectlist li.active{background:#30c7ff;color:#fff;}


  /*表格中的下拉框*/
  .table_select_box{position:relative;}
  .table_select{color:#000;cursor:pointer;}
  .table_select_img{width:12px;height:8px;background:url(../../assets/smallicons.png) no-repeat -155px -64px;}
  .table_selectlist{display:none;position:absolute;left:0;top:26px;width:100%;border:1px solid #e5e5e6;background:#fff;padding-top:10px;padding-bottom:10px;}
  .table_selectlist li{height:27px;line-height:27px;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .table_selectlist li.active{background:#30c7ff;color:#efefef;width:98%;border-radius:2px;margin:0 auto;}
  /*选项卡要进行的设置*/
  .tab .tab_content{display:none;}
  .tab .tab_content.active{display:block;}
  .tab_button_box{overflow:hidden;}
  .erpDialog_tab .tab_button{cursor:pointer;padding:0 10px;height:29px;background:#fff;margin-right:2px;text-align:center;line-height:29px;font-size:14px;color:#28b0ea;}
  .erpDialog_tab .tab_button.active{background:#10b6f0;color:#fff;}
  /*采购选项卡样式的设置*/
  .tab_button_box_cg{border-bottom:2px solid #1b97db;}
  .tab_cg_button{height:35px;line-height:35px;color:#6b6b6b;cursor:pointer;position:relative;padding:0 27px;}
  .tab_cg_button div{height:23px;margin-left:-1px;margin-top:7px;}
  .tab_cg_button .tab_position{width:100%;height:35px;height:100%;position:absolute;left:-1px;top:0;font-size:16px;line-height:36px;text-align:center;}
  .tab_cg_button.active{color:#fff;background:#1b97db;}
  .tab_cg_button.active .tab_position{background:#1ea6e4;z-index:1;}
  .tab_query{color:#565656;padding:14px 0px;width:1100px;position:relative;}
  .tab_query_list{margin:5px 10px;height:37px;line-height:37px;}
  .tab_query span{margin-right:6px;}
  .tab_query .input{padding-left:10px;width:170px;height:35px;border:1px solid #c6c6c6;border-radius:20px;color:#515151;}
  .tab_query .border_select{border:none;background:none;}
  .tab_query .border_select_txt{font-size:13px;padding-left:10px;width:198px;height:35px;border:1px solid #c6c6c6;border-radius:20px;cursor:pointer;}
  .tab_query .border_select_txt.border_select_txt_date{width:140px;}
  .tab_query .border_select_img{top:17px;}
  .tab_query .by{margin-right:12px;margin-left:4px;}
  .tab_query .tab_query_button{position:absolute;top:50%;right:-40px;margin-top:-14px;}
  .tab_table_top{background:#3c3d3f;height:36px;color:#fff;line-height:36px;}
  .tab_table_title{padding:0 20px;float:left;height:36px;line-height:36px;text-align:center;background:#2d2e30;color:#fff;font-size:16px;}
  .tab_table .export{cursor:pointer;}
  .tab_table .export_icon{width:20px;height:17px;background:url(../../assets/smallicons.png) no-repeat -151px -75px;margin:9px 12px 0px 9px;}
  /*二级选项卡样式的设置*/
  .tab_query_next_tab_top{margin-top:30px;}
  .tab_query_next_tab_top{width:1200px;border-bottom:2px solid #2d2e30;}
  .tab_query_next_tab_top .tab_next_button{padding:0 20px;height:36px;line-height:36px;text-align:center;cursor:pointer;}
  .tab_query_next_tab_top .tab_next_button.active{background:#2d2e30;color:#fff;}
  .tab_next_content{width:1200px;display:none;}
  .tab_next_content.active{display:block;}
  /*下面带有三角的选项卡的设置*/
  .nav_right_center{border-bottom:1px solid #dcdcdc;}
  .tab_button_triangle{line-height:50px;color:#333;position:relative;font-size:15px;cursor:pointer;padding-left:30px;padding-right:20px;}
  .tab_button_triangle.active{background:#1a96da;color:#fff;}
  .tab_button_triangle .pos{display:none;position:absolute;left:50%;bottom:-20px;margin-left:-5px;}
  .tab_button_triangle.active .pos{display:block;border:10px solid #1a96da;border-bottom-color:#fff;border-left-color:#fff;border-right-color:#fff;}
  /*采购下拉框样式的设置*/
  .tab_query .border_selectlist{top:40px;width:190px;left:10px;z-index:10;}

  .text_center{text-align:center}
  .inline_block{display: inline-block}
  /*公共按钮*/
  .common_btn{padding:0 10px;height:27px;line-height:27px;border-radius:2px;color:#fff;cursor:pointer;font-size: 13px;display: inline-block;}
  .btn_margin_left{margin-left:20px;}
  .common_btn_blue{background:#1b97db;}
  .common_btn_blue:hover{opacity: .7;}
  .common_btn_blue:active{opacity: .7;}
  .common_btn_red{background:#e51c24;}
  .common_btn_red:hover{opacity: .7;}
  .common_btn_red:active{opacity: .7;}
  .common_btn_green{background:#80c569;}
  .common_btn_green:hover{opacity: .7;}
  .common_btn_green:active{bopacity: .7;}
  .common_btn_orange{background:#ffaa3f;}
  .common_btn_orange:hover{opacity: .7;}
  .common_btn_orange:active{opacity: .7;}
  .common_btn_yellow{background:#ffc107;}
  .common_btn_yellow:hover{opacity: .7;}
  .common_btn_yellow:active{opacity: .7;}
  .common_btn_red2{background:#df4232;}
  .common_btn_red2:hover{opacity: .7;}
  .common_btn_red2:active{opacity: .7;}
  .common_btn_grey{background:#cbcdd3;}
  /*王丽设计公共按钮*/
  .common_btn_red3{background:#d31a2d;}
  .common_btn_red3:hover{opacity: .7;}
  .common_btn_red3:active{opacity: .7;}
  .common_btn_red4{background:#ee6378;}
  .common_btn_red4:hover{opacity: .7;}
  .common_btn_red4:active{opacity: .7;}
  .common_btn_orange2{background:#e66024;}
  .common_btn_orange2:hover{opacity: .7;}
  .common_btn_orange2:active{opacity: .7;}
  .common_btn_yellow2{background:#f2b93f;}
  .common_btn_yellow2:hover{opacity: .7;}
  .common_btn_yellow2:active{opacity: .7;}
  .common_btn_yellow3{background:#ffbb11;}
  .common_btn_yellow3:hover{opacity: .7;}
  .common_btn_yellow3:active{opacity: .7;}
  .common_btn_green2{background:#83ba40;}
  .common_btn_green2:hover{opacity: .7;}
  .common_btn_green2:active{opacity: .7;}
  .common_btn_blue{background:#3775be;}
  .common_btn_grey2{background:#c9c9c9;}
  .common_btn_blue2{background:#1a96da;}
  .common_btn_blue2:hover{opacity: .7;}
  .common_btn_blue2:active{opacity: .7;}
  .common_btn_pink{background:#ee6378;}
  .common_btn_pink:hover{opacity: .7;}
  .common_btn_pink:active{opacity: .7;}
  .bluegradient{border-radius: 13.5px; background:-webkit-gradient(linear, 0 0,100% 0, from(#0060ff), to(#188df0));}

  /*比之前变大后的公共按钮*/
  .common_big_btn{padding:0 28px;height:30px;line-height:30px;border-radius:3px;color:#fff;cursor:pointer;font-size: 14px;display: inline-block;}
  .common_big_btn_orange{background:#ff914a;}
  .common_big_btn_orange:hover{opacity: .7;}
  .common_big_btn_orange:active{opacity: .7;}
  .common_big_btn_gray{background:#c9c9c9;}
  .common_big_btn_blue{background:#00a0e9;}
  .common_big_btn_blue:hover{opacity: .7;}
  .common_big_btn_blue:active{opacity: .7;}
  /*王丽设计公共按钮*/
  .common_button{color:#333;height:30px;line-height:30px;font-size:14px;cursor:pointer;margin-right:6px;margin-top:9px;}
  .common_button_detail{padding-left:30px;background:url(../../assets/common_button_detail.png) no-repeat 0px 9px;}
  .common_button_change{padding-left:24px;background:url(../../assets/common_button_change.png) no-repeat 0px 6px;}
  .common_button_stock{padding-left:24px;background:url(../../assets/common_button_stock.png) no-repeat 0px 6px;}
  .common_button_modify{padding-left:24px;background:url(../../assets/common_button_modify.png) no-repeat 0px 6px;}
  .common_button_stock{padding-left:24px;background:url(../../assets/common_button_stock.png) no-repeat 0px 6px;}
  .common_button_scrap{padding-left:24px;background:url(../../assets/common_button_scrap.png) no-repeat 0px 6px;}
  /*列表表格和有边框表格的样式*/
  .list_table{border-collapse:collapse;width:100%;text-align:center;}
  .list_table.list_small_table{}
  .list_table th{padding-right:10px;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  /* .list_table th{padding-left:10px;padding-right:10px;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;} */
  .list_table td{max-width:160px;text-align:center;font-size:12px;color:#515151;margin:0;border:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .list_table th{height:48px;}
  .list_table td{height:38px;}

  .list_table tbody tr:nth-of-type(odd){background-color:#f1f1f1;}
  .list_table tbody tr:nth-of-type(even){background-color:#ffffff;}
  .list_table input[type="checkbox"]{margin-top:4px;}
  .list_table .like_th{font-weight:bold;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;padding-top:8px;}
  .list_table .like_td{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;height:35px;line-height:35px;padding-bottom:0px;}
  .list_table .like_td input[type="text"],.list_table .like_td input[type="number"]{width:90%;height:80%;background:#fff;margin-top:3px;border:1px solid #dedede;}
  .list_table .like_td input[type="checkbox"]{width:13px;height:13px;margin-top:12px;margin-right:2px;}
  .list_table.list_table_odd{height:260px;overflow-y:auto;}
  .list_table.list_table_odd li{height:35px;line-height:35px;}
  .list_table.list_table_odd li:nth-of-type(odd){background-color:#f1f1f1;}
  .list_table a{padding: 0px 12px;}
  .border_table{border-collapse:collapse;}
  .border_table tr{height:39px;line-height:39px;text-align:center;font-size:12px;}
  .border_table tbody tr:nth-of-type(odd){background-color:#f1f1f1;}
  .border_table th,td{}
  /*打印表格的样式*/
  .print_table table{border-collapse:collapse;color:#000;}
  .print_table tr{height:35px;line-height:35px;text-align:center;}
  .print_table h3{color:#000;font-size:18px;text-align:center;height:43px;line-height:43px;font-size:12px;}
  .print_table th{border:1px solid #000;text-align:center;}

  .print_table td{border:1px solid #000;text-align:center;}
  /*模态框的样式*/
  .erpDialog_bg{display:none;position:absolute;top:0;left:0;z-index:10;background:#000;opacity:0.8;filter:alpha(opacity=80);width:100%;height:100%;}

  .erpDialog{height:490px;background:#eee;position:fixed;left:50%; top:15%; z-index:11;margin-left:-450px;border-radius: 5px;}
  .erpDialog_height300{height:300px;background:#eee;position:fixed;left:50%;top:100px; top:20%; z-index:11;margin-left:-200px;font-size:12px;color:#515151;}
  .erpDialog_height300_top{height:40px;background:#1b97db;font-size:16px;color:#fff;font-weight:bold;padding:0 24px;line-height:40px;}
  .erpDialog_height300_top_right{cursor:pointer;}
  .erpDialog_height300_center{padding-top:20px;height:160px;width:360px;margin:0 auto;background:#fff;margin-top:20px;}
  .erpDialog_height300_center_left{padding-left:40px;width:80px;line-height:40px;}
  .erpDialog_height300_center_right input[type="text"]{margin-top:10px;width:166px;height:24px;background:#fff;border:1px solid #dedede;border-radius:2px;}
  .erpDialog_height300_center_right textarea{width:166px;height:92px;background:#fff;border:1px solid #dedede;border-radius:2px;margin-top:10px;}
  .erpDialog_height300_bottom{text-align:center;padding-top:20px;}
  .erpDialog_1100{width:1100px;margin-left:-550px;}
  .erpDialog table{overflow-y:auto;}
  .erpDialog_top{height:40px;background:#1b97db;font-size:16px;color:#fff;font-weight:bold;padding:0 24px;line-height:40px;border-top-left-radius: 5px 5px;border-top-right-radius: 5px 5px;}
  .erpDialog_top_right{font-size:18px;width:24px;height:30px;cursor:pointer;text-align:center;}

  .erpDialog_max_height{background:#eee;position:fixed;left:50%;top:60px; top:20%; z-index:11;margin-left:-200px;max-height:600px;}
  .erpDialog_max_height_top{height:40px;background:#1b97db;font-size:16px;color:#fff;font-weight:bold;padding:0 24px;line-height:40px;}
  .erpDialog_max_height_top_right{cursor:pointer;}
  /*--start--关闭窗口是加了一个路由 设置路由a标签颜色为白色*/
  .erpDialog_top_right>a{color:#fff;}
  /*--end--关闭窗口是加了一个路由 设置路由a标签颜色为白色*/
  .erpDialog_bottom{max-height:340px;padding-bottom:20px;padding-top:20px;padding-left:24px;}
  .erpDialog_bottom_top_common{height:40px;background:#1b97db;padding:0 12px;line-height:40px;}
  .erpDialog_bottom_top input[type="button"]{margin-top:6px;}
  .erpDialog_bottom_bottom_table{border:1px solid #dfdfdf;background:#fff;border-top:none;overflow-y:auto;max-height:380px;}
  .erpDialog_bottom.no_padding_left{padding-left:0px;}
  .erpDialog_input{width:166px;height:24px;background:#fff;}
  input{padding-left:4px;}
  .erpDialog_bottom_top_box{max-height:340px;overflow-y:auto;}
  .erpDialog_bottom_top_part{width:800px;margin:0 auto;background:#1b97db;}
  .erpDialog_bottom_top_bottom{border:1px solid #dfdfdf;border-top:none;margin-left:-1px;background:#fff;color:#515153;font-size:12px;}
  .erpDialog_bottom_top_bottom li{width:360px;height:46px;margin-left:16px;}
  .erpDialog_bottom_top_bottom.erpDialog_bottom_top_bottom_three{width:740px;margin-left:20px;margin-bottom:20px;margin-right:20px;}
  .erpDialog_bottom_top_bottom.erpDialog_bottom_top_bottom_three li{width:160px;margin-left:40px;line-height:46px;height:46px;}
  .erpDialog_bottom_top_bottom.erpDialog_bottom_top_bottom_three li span{text-align:right;}
  .erpDialog_bottom_top_bottom_three .list_table{width:100%;}
  .erpDialog_bottom_top_bottom_three_select{width:90%;height:28px;background:#fff;border:1px solid #e0e0e0;border-radius:2px;margin-top:0px;}
  .erpDialog_bottom_top_bottom_three_input{width:90%;height:24px;background:#fff;border:1px solid #e0e0e0;border-radius:2px;}
  .erpDialog_bottom_top_bottom li.date{width:500px;}
  .erpDialog_bottom_top_bottom li.date i{width:20px;height:46px;line-height:46px;text-align:center;}
  .erpDialog_bottom_top_bottom li.big_part{width:800px;}
  .erpDialog_bottom_top_bottom li .small_part{width:20px;text-align:center;}
  .erpDialog_bottom_top_bottom li.remark_big{width:600px;}
  .erpDialog_bottom_top_bottom li span{width:80px;line-height:46px;}
  .erpDialog_bottom_top_bottom li input:not([type="button"]), select{width:140px;height:24px;border:1px solid #e0e0e0;border-radius:2px;margin-top:10px;color:#515153;}
  .erpDialog_bottom_top_bottom li select{width:140px;height:24px;border:1px solid #e0e0e0;border-radius:2px;margin-top:10px;color:#515153;}
  .erpDialog_bottom_top_bottom li input.remark{width:500px;}
  .erpDialog_bottom_top_bottom li input[disabled = 'true']{background:#ededed;}
  .erpDialog .erpDialog_bottom_top_bottom li select{height:30px;font-size:12px;width:140px;}
  .erpDialog_bottom_top_bottom li option{height:28px;font-size:12px;}
  .erpDialog_bottom_top_bottom table{width:780px;margin:0 auto;}
  .erpDialog_bottom_bottom_common{text-align:center;margin-top:26px;}
  .erpDialog_text{width:98px;height:24px;background:#fff;border:1px solid #e0e0e0;border-radius:2px;}
  .erpDialog .print_table_box{height:430px;background:#fff;margin-top:-20px;padding-top:24px;overflow-y:auto;}
  .erpDialog .print_table{color:#505153;}
  .nav_right_part_title{height:60px;line-height:60px;border-left:5px solid #3497da;background:#f7f7f7;padding-left:28px;font-size:19px;color:#565656;font-weight:bold;}
  /*财务大部分打印表格的样式*/
  .print_style{font-size:12px;background:#fff;width:860px;margin:0 auto;}
  .print_list_style li{width:280px;height:30px;line-height:30px;}
  .print_list_style li span{width:80px;text-align:right;}

  /*弹框中表单的样式*/
  .erpDialog_input{border:1px solid #e0e0e0;border-radius:2px;bacground:#fff;}
  .erpDialog_input[disabled = 'true']{background:#ededed;}

  /*弹框中可以加减的输入框的样式*/
  .erpDialog_position{position:relative;}
  .upanddown .up{cursor:pointer;position:absolute;left:200px;top:16px;width:15px;height:7px;background-color:#f1f1f1;background:url(../../assets/up.png) no-repeat;}
  .upanddown .up.active{background:url(../../assets/up_active.png) no-repeat;}
  .upanddown .down{cursor:pointer;position:absolute;left:200px;top:23px;width:15px;height:7px;background-color:#f1f1f1;background:url(../../assets/down.png) no-repeat;}
  .upanddown .down.active{background:url(../../assets/down_active.png) no-repeat;}


  /*显示的页面路径*/
  .address{font-size:14px;color:#5e5e5e;margin:30px auto;}

  /*老板驾驶舱*/
  .tab_query_top{height:27px;line-height:27px;padding-top:30px;margin-bottom:19px;color:#2d2d2d;font-size:14px;}
  .tab_query_top_left{margin-right:70px;}
  .tab_query_top_right li{width:46px;height:27px;line-height:27px;text-align:center;border-radius:2px;margin-right:10px;cursor:pointer;background:#ff9149;}
  .tab_query_top_right li:hover{background:#f3b76c}
  .tab_query_top_right li.active{background:#1b97db;color:#fff;}
  .owned_company{font-size:14px;color:#2c2c2c;}

  /* 打印页样式 */
  .print-page-father{width:96%;margin-left:2%;}
  .print-page {font-size: 16px;line-height: 30px;background: #fff;}
  .print-page .bold {font-weight: bold;}
  .print-page .title div {text-align: center;font-size: 18px;font-weight: bold;}
  .print-page .title div.title-big {font-size: 22px;}
  .print-page .print-header {}
  .print-page .data-line {width: 90%;margin: 0 auto;}
  .print-page .data-line div {display: inline-block;width: 49.5%;}
  .print-page .data-line div.full {width: 100%;}
  .print-page .data-line div lable {}
  .print-page .data-line div span.seq {display: inline-block;width: 15px;height: 15px;border: 1px solid #000;border-radius: 7.5px;text-align: center;line-height: 15px;margin-right: 5px;font-size: 13px;}
  .print-page .body > div {margin-top: 10px;padding-top: 10px;border-top: 2px dashed #969696;}
  .print-page .data-line img {width: 33%;height:210px;margin: 0.15%;padding: 0;}
  .print-page .print-footer {margin-top: 20px;padding-top: 10px;border-top: 2px dashed #969696;}
  .print-page .print-footer img {padding: 0;margin: 0;}
  .print-page table, .print-page tr, .print-page td {border-collapse:collapse;}
  .print-page table {width: 100%;font-size: 13.3px;text-align: center;}
  /* .print-page table td {border:1px solid #000;padding: 5px 0;height: 28px;} */
  .print-page table td {border:1px solid #000;line-height: 24px;}
  .print-page table td.align-left {text-align: left;}
  .print-page table td.align-right {text-align: right;}
  .print-page table td label {display: inline-block;width: 100px;text-align: right;}
  .print-page table td p {font-size: 12px;line-height: 18px;}
  .print-page table td span.switch_btn {position: absolute;left: 5px;cursor: pointer;width: 16px;background: url(../../assets/switch_ico.png) no-repeat center;background-size: 100%;}


  /* 优惠券的相关设置 */
  .vip_card.vip{padding-top:20px;}
  .vip_card.vip li{width:260px;height:114px;position:relative;margin-right:20px;margin-bottom:20px;cursor:pointer;}
  .vip_card.vip li .vip_top{position:absolute;right:130px;top:18px;font-size:24px;color:#fff;max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .vip_card.vip li .vip_center{position:absolute;left:22px;top:50px;width:160px;text-align:center;font-size:19px;color:#fff;}
  .vip_card.vip li .vip_bottom{position:absolute;left:6px;top:84px;font-size:18px;}
  .vip_card.vip li .vip_bottom span{color:#666168;}
  .vip_card.vip li .vip_position{width:56px;height:53px;background:url(../../assets/vip_txt.png) no-repeat;position:absolute;right:0px;top:-2px;text-align:center;font-size:12px;color:#fff;}
  .vip_card.vip li .vip_position_bottom{width:56px;height:53px;margin-top:-10px;margin-left:10px;transform:rotate(45deg);-ms-transform:rotate(45deg);-webkit-transform:rotate(45deg);line-height:53px;text-align:center;}
  .change_card_button .type{width:260px;height:114px;}
  .change_card_create .type{background:url(../../assets/vip_create_taocanka.png) no-repeat;}
  .change_card_create.active .type{background:url(../../assets/vip_create_taocanka_hover.png) no-repeat;}
  .change_card_store .type{background:url(../../assets/vip_chuzhika.png) no-repeat;}
  .change_card_store.active .type{background:url(../../assets/vip_chuzhika_hover.png) no-repeat;}
  .change_card_package .type{background:url(../../assets/vip_taocanka.png) no-repeat;}
  .change_card_package.active .type{background:url(../../assets/vip_taocanka_hover.png) no-repeat;}
  .change_card_create_vip .type{background:url(../../assets/vip_create_youhuiquan.png) no-repeat;}
  .change_card_create_vip.active .type{background:url(../../assets/vip_create_youhuiquan_hover.png) no-repeat;}
  .change_card_vip .type{background:url(../../assets/vip_youhuiquan.png) no-repeat;}
  .change_card_vip.active .type{background:url(../../assets/vip_youhuiquan_hover.png) no-repeat;}
  /*分页的样式*/
  .pagination_father{height:40px;padding-top:10px;}
  /*pagination*/
  .pagination {float: right;margin-top:20px;}
  .pagination li {display: inline;margin:0;}
  .pagination li.first > a, .pagination li.previous > a {position: relative;padding-left: 16px;}
  .pagination > li:first-child > a, .pagination > li:first-child > span {border-bottom-left-radius:2px;border-top-left-radius:2px;}
  .pagination > .disabled > span, .pagination > .disabled > span:hover, .pagination > .disabled > span:focus, .pagination > .disabled > a, .pagination > .disabled > a:hover, .pagination > .disabled > a:focus {color:#bdbdbd;background-color:white;border-color:#dddddd;}
  .pagination > li > a, .pagination > li > span {position: relative;float: left;padding: 5px 10px;line-height: 1.45;text-decoration: none;color: #03a9f4;background-color: #ffffff;border: 1px solid #e0e0e0;margin-left: -1px;font-size: 12px;}
  .pagination > .active > a, .pagination > .active > span, .pagination > .active > a:hover, .pagination > .active > span:hover, .pagination > .active > a:focus, .pagination > .active > span:focus {z-index: 1;color: white; background-color: #03a9f4; border-color: #03a9f4;}
  .pagination > li > a:hover, .pagination > li span:hover {background-color: #eeeeee;cursor: pointer;}
  .pagination > li.page-size > select {display: inline;width: 50px;float: left;margin-right: 8px;}

  /*菜单在左边的情况(又改了一版，以后可能会删)*/
  .content_left .tab_button_title{font-size:16px;padding-left:18px;line-height:40px;font-weight:bold;color:#333;}
  .content_left .tab_button{border-left:2px solid #fff;padding-left:14px;cursor:pointer;}
  .content_left .tab_button.active{border-left:2px solid #1b97db;background:#ededed;}
  .content_left .tab_button:hover{border-left:2px solid #1b97db;background:#ededed;}

  /*菜单在左边的情况(又改了一版，以后可能会删*/
  .nav_left{background:#fff;font-size:14px;color:#393939;width:202px;margin-top:14px;padding-top:0px;padding-bottom:18px;}
  .nav_left dd,dt{height:44px;line-height:44px;}
  .nav_left .nav_button{height:60px;line-height:60px;}
  .nav_left .nav_content{display:none;}
  .nav_left .nav_content.active{display:block;}
  .nav_left .nav_content .nav_content_icon{width:80px;height:44px;}
  .nav_left .nav_content .part{height:44px;line-height:44px;font-size:14px;border-radius:0px;margin:0px;}
  .nav_left .nav_button{font-size:16px;padding-left:47px;cursor:pointer;}
  .nav_left .nav_button2{height:60px;line-height:60px;font-size:16px;padding-left:47px;cursor:pointer;background:#fff;}
  .nav_left .nav_button2 .khfx_icon{width:30px;height:30px;background:url(../../assets/yxfa_icon1_2.png) no-repeat center center;}
  .nav_left .nav_button2.active .khfx_icon{background:url(../../assets/yxfa_icon1_1.png) no-repeat center center;}
  .nav_left .nav_button2 .khwh_icon{width:30px;height:30px;background:url(../../assets/yxfa_icon2_2.png) no-repeat center center;}
  .nav_left .nav_button2.active .khwh_icon{background:url(../../assets/yxfa_icon2_1.png) no-repeat center center;}
  .nav_left .nav_button2 .hygl_icon{width:30px;height:30px;background:url(../../assets/yxfa_icon3_2.png) no-repeat center center;}
  .nav_left .nav_button2.active .hygl_icon{background:url(../../assets/yxfa_icon3_1.png) no-repeat center center;}
  .nav_left .nav_button2 .jsyx_icon{width:30px;height:30px;background:url(../../assets/yxfa_icon4_2.png) no-repeat center center;}
  .nav_left .nav_button2.active .jsyx_icon{background:url(../../assets/yxfa_icon4_1.png) no-repeat center center;}
  .nav_left .nav_button2 .hdgl_icon{width:30px;height:30px;background:url(../../assets/yxfa_icon5_2.png) no-repeat center center;}
  .nav_left .nav_button2.active .hdgl_icon{background:url(../../assets/yxfa_icon5_1.png) no-repeat center center;}
  .nav_left .nav_button2.active{color:#fff;background:#1a96da}
  .nav_left .nav_content .part a{width:122px;height:100%;display:block;}
  .nav_left .nav_content .part.active .nav_content_icon{background:url(../../assets/nav_left_icon.png) no-repeat 60px center;}

  /*菜单在左边的情况(管理秘籍版本)*/
  .nav_left2{overflow:hidden;}
  .nav_left2_box{width:130px;}
  .nav_left2_box.active{background:#005599;}
  .nav_left2 .nav_content{display:none;}
  .nav_left2 .nav_content.active{display:block;}
  .nav_left2{width:130px;background:#1f6db2;overflow-y:auto;}
  .nav_left2_push{height:44px;background:#1f6db2;position:relative;padding-bottom:16px;}
  .nav_left2_push_img{width:26px;height:26px;position:absolute;top:14px;right:18px;background:url(../../assets/nav_left2_pull.png);cursor:pointer;}
  .nav_left2.active .nav_left2_push_img{background:url(../../assets/nav_left2_push.png);}
  .nav_left2 img{display:inline-block;}
  .nav_left2_first{font-size:14px;color:#fff;line-height:48px;height:48px;overflow:hidden;cursor:pointer;}
  .nav_left2_first_icon{width:48px;}
  .nav_left2_second{color:#fff;display:block;padding-left:30px;line-height:40px;height:40px;overflow:hidden;font-size:12px;}
  .nav_left2_box.active .nav_left2_second.active{background-image:url(../../assets/nav_arrow.png);background-repeat:no-repeat;background-position:right center;background-color:#004488; }
  .nav_left2_second.active{background-image:url(../../assets/nav_arrow.png);background-repeat:no-repeat;background-position:right center;background-color:#004488; }
  .sz_content{width: 95%; margin: 30px auto; background-color: white;}
  .sz_content .next_button{width: 132px;height: 45px;background: #1a96da;border-radius: 8px;font-size: 16px;color: #fff;line-height: 45px;text-align: center;  margin: 32px 0px 32px 60px;  cursor: pointer;}

  .nav_right{width:984px;background:#fff;margin-top:14px;padding-bottom:30px;}
  .nav_right_bottom_center{padding:20px 0px;}
  .common_btn_blue2{margin-top:6px;margin-left:10px;}
  .list_table2{border-collapse:collapse;width:100%;font-size:14px;text-align:center;}
  .list_table2 thead{height:50px;line-height:50px;background:#f4f8fd;font-size:15px;color:#4a4a4a;font-weight:normal;}
  .list_table2 thead .add_button{color:#ffc67c;cursor:pointer;}
  .list_table2 thead .add_button div{width:40px;height:24px;line-height:24px;border-bottom:2px solid #ffc67c;}
  .list_table2 tbody{width:958px;height:48px;line-height:48px;color:#333;border:1px solid #f0f0f0;border-top:none;}
  .list_table2 tbody tr{border-top:1px solid #f0f0f0;cursor:pointer;border-left:5px solid #fff;}
  .list_table2 tbody tr.active td{box-shadow:0px 5px 5px #cedae8;position:relative;overflow:hidden;}
  .list_table2 tbody tr:nth-of-type(odd){border-top:1px solid #f0f0f0;cursor:pointer;border-left:5px solid #fff;background:#fff;}
  .list_table2 tbody tr:nth-of-type(even){background:#f4f8fd;border-left:5px solid #f4f8fd;}
  .list_table2 tbody tr.active{border-left:5px solid #00adeb;}
  .list_table2 tbody td{max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .nav_right .next_button{width:132px;height:45px;background:#1a96da;border-radius:8px;font-size:16px;color:#fff;line-height:45px;text-align:center;margin:32px 0px 32px 60px;cursor:pointer;}
  .list_table2 input[type="checkbox"]{width:17px;height:17px;margin-top:19px;background:#fff;}
  .list_table2 th img{margin-top:20px;}
  .list_table2 .common_btn{margin-top:11px;}
  /*菜单在左边的情况(管理秘籍版本)*/
  .nav_left2{overflow:hidden;}
  .nav_left2_box{width:130px;}
  .nav_left2_box.active{background:#005599;}
  .nav_left2 .nav_content{display:none;}
  .nav_left2 .nav_content.active{display:block;}
  .nav_left2{width:130px;background:#1f6db2;overflow-y:auto;}
  .nav_left2_push{height:44px;background:#1f6db2;position:relative;padding-bottom:16px;}
  .nav_left2_push_img{width:26px;height:26px;position:absolute;top:14px;right:18px;background:url(../../assets/nav_left2_pull.png);cursor:pointer;}
  .nav_left2.active .nav_left2_push_img{background:url(../../assets/nav_left2_push.png);}
  .nav_left2 img{display:inline-block;}
  .nav_left2_first{font-size:14px;color:#fff;line-height:48px;height:48px;overflow:hidden;cursor:pointer;}
  .nav_left2_first_icon{width:48px;}
  .nav_left2_second{color:#fff;display:block;padding-left:30px;line-height:40px;height:40px;overflow:hidden;font-size:12px;}
  .nav_left2_box.active .nav_left2_second.active{background-image:url(../../assets/nav_arrow.png);background-repeat:no-repeat;background-position:right center;background-color:#004488; }
  /*第三版表格*/
  .list_table3{border-collapse:collapse;width:100%;text-align:center;font-size:14px;}
  .list_table3 thead{height:50px;line-height:50px;background:url(../../assets/list_table3_head.png) repeat-x;}
  .list_table3 tbody{line-height:60px;}
  .list_table3 th{border:1px solid #bfbfbf;}
  .list_table3 td{border:1px solid #bfbfbf;overflow:hidden;}
  .list_table3 img{display:inline-block;margin-top:19px;margin-right:6px;}
  .list_table3
    /*内容部分的通用*/
  .nav_right_part_title{height:49px;line-height:49px;border-left:5px solid #3497da;background:#f7f7f7;padding-left:28px;font-size:17px;color:#565656;font-weight:bold;}

  /*圆角按钮的公共样式*/
  .nav_right_bottom_center .left{height:35px;line-height:35px;color:#999;padding-left:36px;margin-right:26px;}
  .gray_left{height:35px;line-height:35px;color:#999;padding-left:36px;margin-right:26px;}
  .common_only_button{padding-left:18px;padding-right:18px;height:35px;line-height:35px;border-radius:20px;cursor:pointer;}
  .common_only_button.active{background:#1a96da;color:#fff;}

  /*开始结束时间的公共样式*/
  .common_calendar{margin-left:30px;}
  .common_calendar .txt{color:#999;height:38px;line-height:38px;margin-right:12px;}
  .common_calendar input{width:117px;height:38px;border:1px solid #dcdcdc;background:url(../../assets/sendCanlenter.png) no-repeat 10px 8px;padding-left:50px;color:#999;}
  .common_calendar .reach{width:8px;height:2px;background:#d0d0d0;margin-top:21px;margin-left:14px;margin-right:14px;}

  /*改版后公共的下拉框*/
  .common_select2{margin-right:50px;position:relative;width:140px;}
  .common_select2_current{border:1px solid #dedede;height:29px;line-height:28px;font-size:13px;color:#3e3e3e;margin-top:2px;cursor:pointer;}
  .common_select2_txt{padding-left:10px;width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .common_select2_icon{width:28px;height:28px;background:url(../../assets/common_select2_img.png) no-repeat;}
  .common_select2_list{width:140px;display:none;border:1px solid #ebebeb;position:absolute;left:0px;top:30px;background:#fff;z-index:9;max-height:240px;overflow-y:auto;}
  .common_select2_list li{padding-left:10px;width:110px;line-height:30px;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;}
  .common_select2_list li.active{background:#3299d6;color:#fff;}
  .txt_select_search{margin-top:20px;margin-bottom:20px;}
  /*改版后公共的文本框*/
  .common_title2{line-height:36px;padding-right:10px;color:#3e3e3e;font-size:13px;}
  .common_txt2 input{border:1px solid #c9c9c9;width:142px;height:33px;border-radius:20px;padding-left:20px;color:#999;margin-right:50px;}
  .common_txt3{font-size:14px;color:#3e3e3e;}
  .common_txt3 input{border:1px solid #c9c9c9;width:60px;height:28px;padding-left:10px;color:#999;margin-top:4px;}
  /*改版后公共的搜索*/
  .common_search2{cursor:pointer;}

  /*跟图表对应的表格*/
  .charts_table table{border-collapse:collapse;width:100%;}
  .charts_table thead{background:#1baeca;color:#fff;font-size:16px;height:64px;text-align:center;border-collapse:collapse;}
  .charts_table th{height:64px;border-right:1px solid #fff;}
  .charts_table td{background:#f0f0f0;height:60px;color:#333;text-align:center;border-right:1px solid #fff;border-bottom:1px solid #fff;}
  .charts_table tr{border-left:5px solid #f0f0f0;cursor:pointer;}
  .charts_table thead tr{border-left:5px solid #1baeca;}
  .charts_table tbody tr.active{border-left:5px solid #00adeb;}
  .charts_table tr.active td{box-shadow:0px 5px 5px #cedae8;position:relative;overflow:hidden;}
  /*月切换的公共样式（目前用在活动业绩分析里面）*/
  .nav_right .date_change .left{width:25px;height:25px;background:url(../../assets/date_change_left.png) no-repeat;margin-left:385px;}
  .nav_right .date_change .center{width:160px;font-size:20px;text-align:center;color:#565656;}
  .nav_right .date_change .right{width:25px;height:25px;background:url(../../assets/date_change_right.png) no-repeat;}

  /*改版后的tab切换*/
  .tab_button_box2{background:#1baeca;height:38px;padding-top:4px;}
  .tab_button2{width:182px;height:38px;cursor:pointer;color:#fff;text-align:center;line-height:38px;}
  .tab_button2.active{background:url(../../assets/yxfa_hdyjfx6.png) no-repeat;color:#e7852e;}

  .add_button input[type="button"]{margin-top:4px;margin-right:10px;}

  /*王丽写的分页的样式*/
  .paging_father{height:40px;padding-top:20px;position:relative;}
  .paging_father .pos{position:absolute;right:30px;top:14px;color:#1a82d1;font-size:14px;line-height:34px;cursor:pointer;}
  .paging_father img{margin-left:8px;}

  /*王丽修改后的弹框*/
  .erpDialog2_wrap{width:470px;position:fixed;left:50%;margin-left:-235px;top:80px;}
  .erpDialog2_wrap400{width:400px;position:fixed;left:50%;margin-left:-200px;top:120px;}
  .erpDialog2_wrap600{width:600px;position:fixed;left:50%;margin-left:-300px;top:120px;}
  .erpDialog2_wrap900{width:900px;position:fixed;left:50%;margin-left:-450px;top:120px;}
  .erpDialog2{z-index:11;color:#333;}
  .erpDialog2_top{height:42px;line-height:42px;background:#1a96da;border-radius:5px 5px 0px 0px;color:#fff;font-size:14px;}
  .erpDialog2_top_left{padding-left:20px;}
  .erpDialog2_top_right{width:20px;height:42px;cursor:pointer;font-size:18px;padding-right:10px;}
  .erpDialog2_center{background:#fff;font-size:12px;max-height:300px;overflow-y:auto;}
  .erpDialog2_center input[type="text"].active{border:1px solid #ffbb11;}
  .erpDialog2_bottom{text-align:center;background:#fff;}
  .erpDialog2_checkbox{width:11px;height:11px;border:1px solid #d2d2d2;cursor:pointer;margin-right:8px;color:#333;margin-top:10px;}
  .erpDialog2_checkbox_txt{margin-right:10px;}
  .erpDialog2_checkbox.active{width:13px;height:13px;background:url(../../assets/checkbox_yes2.png) no-repeat;border:none;background-size:13px 13px;}
  .erpDialog2_canlendar{margin-top:5px;margin-left:8px;}
  .erpDialog2 .only_button_tab .radio{margin-top:3px;}
  .erpDialog2 .only_button_tab .radio_text{margin-top:-12px;margin-right:40px;}
  .erpDialog2_bottom{padding-bottom:20px;}

  /*王丽修改后的弹框list*/
  .erpDialog2_list{width:410px;margin:0 auto;border-top:1px solid #f0f0f0;border-left:1px solid #f0f0f0;margin-top:12px;}
  .erpDialog2_list_top{height:27px;line-height:27px;background:#1a96da;padding-left:20px;color:#fff;font-size:12px;}
  .erpDialog2_list_list{text-align:center;line-height:29px;}
  .erpDialog2_list_list li{border-bottom:1px solid #f0f0f0;border-right:1px solid #f0f0f0;}
  .erpDialog2_list_list li:nth-of-type(odd){background:#f4f8fd;}
  .erpDialog2_list_list .left{width:33%;}
  .erpDialog2_list_list .center{width:34%;}
  .erpDialog2_list_list .right{width:33%;}
  .erpDialog2_list_search input{width:316px;height:28px;border:1px solid #d2d2d2;margin:9px 20px 0px 20px;}
  .erpDialog2_list .erpDialog2_list_tab{margin-top:10px;margin-bottom:10px;}
  .erpDialog2_list .erpDialog2_list_tab_button{padding:6px 12px;font-size:12px;border-radius:16px;color:#5a5a5a;cursor:pointer;}
  .erpDialog2_list .erpDialog2_list_tab_button.active{background:#ffbb11;color:#fff;}
  .erpDialog2_list_list input[type="checkbox"]{width:16px;height:16px;margin-top:8px;}

  .ui-paging-container{color:#666;font-size: 12px;}
  .ui-paging-container ul{overflow: hidden;text-align: center;}
  .ui-paging-container ul,.ui-paging-container li{list-style: none;}
  .ui-paging-container li{display: inline-block;padding:3px 6px;margin-left: 5px;color:#666;}
  .ui-paging-container li.ui-pager{cursor: pointer; border:1px solid #ddd;border-radius: 2px;}
  .ui-paging-container li.ui-pager:hover,.ui-paging-container li.focus{background-color: #288df0;color:#FFFFFF;}
  .ui-paging-container li.ui-paging-ellipse{border:none;}
  .ui-paging-container li.ui-paging-toolbar{padding:0;}
  .ui-paging-container li.ui-paging-toolbar select{height:22px;width:100px;border:1px solid #ddd;color: #666;margin-top:-2px;}
  .ui-paging-container li.ui-paging-toolbar input{line-height: 20px; height:20px;padding:0;border:1px solid #ddd;text-align: center;width: 30px;margin:0 0 0 5px;vertical-align: middle;}
  .ui-paging-container li.ui-paging-toolbar a{vertical-align: middle; text-decoration: none;display: inline-block;height:20px;border:1px solid #ddd;vertical-align: top;border-radius: 2px;line-height: 20px;padding:0 3px;cursor: pointer;margin-left: 5px;color: #666;}
  .ui-paging-container li.ui-pager-disabled,.ui-paging-container li.ui-pager-disabled:hover{background-color: #f6f6f6;;cursor: default;border:none;color:#ddd;}
  /*王丽写的radio样式*/
  .only_button_tab .radio{width:20px;height:20px;border:1px solid #1a96da;border-radius:50%;margin-top:18px;margin-right:8px;cursor:pointer;}
  .only_button_tab .radio i{width:12px;height:12px;background:#fff;display:block;margin-top:4px;margin-left:4px;border-radius:50%;}
  .only_button_tab .radio.active i{background:#1a96da;}
  .only_button_tab .radio_text{line-height:56px;}
  /*蓝色标题*/
  .nav_right_title{height:48px;line-height:48px;background:#2b83d1;padding-left:18px;color:#fff;font-size:16px;}
  .nav_right_title img{margin-top:12px;margin-right:26px;margin-left:12px;cursor:pointer;}

  /*管理秘籍再一次改版后所有的公共样式*/
  .iframe_content{min-width:600px;}
  .tab_button_box3{height:60px;background:url(../../assets/glmj_tab1.png);padding-left:42px;}
  .tab_button_box3 .tab_button{padding:0px 24px;color:#656461;line-height:45px;margin-top:15px;cursor:pointer;font-size:14px;}
  .tab_button_box3 .tab_button.active{padding:0px 24px;color:#656461;background:#f4fbfb;border-radius:4px 4px 0px 0px;}
  .tab_content_box3_form{height:59px;padding-top:15px;}

  .common_select3{margin-right:50px;position:relative;width:140px;}
  .common_select3_current{border:1px solid #1f6db2;border-radius:3px;height:29px;line-height:28px;font-size:13px;color:#1f6db2;background:#fff;margin-top:2px;cursor:pointer;}
  .common_select3_txt{padding-left:10px;width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .common_select3_icon{margin-top:11px;width:11px;height:6px;background:url(../../assets/glmj_form1.png) no-repeat;}
  .common_select3_list{width:140px;display:none;border:1px solid #ebebeb;position:absolute;left:0px;top:33px;background:#fff;z-index:9;max-height:240px;overflow-y:auto;}
  .common_select3_list li{padding-left:10px;width:110px;line-height:30px;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;}
  .common_select3_list li.active{background:#3299d6;color:#fff;}

  .common_checkbox3{width:13px;height:13px;border:1px solid #3ca6e9;background-color:#fff;}
  .common_checkbox3.active{background-position:center center;background-repeat:no-repeat;}

  .common_search3{padding-left:30px;margin-top:4px;cursor:pointer;}

  .common_text3{width:170px;padding-left:24px;height:28px;border:1px solid #2f6fb2;border-radius:3px;background:#fff;margin-top:2px;color:#333;}
  .common_text3.common_text3_time{background-position:center center;background-repeat:no-repeat;}

  .glmj_form_button{height:40px;line-height:40px;padding:0 16px;color:#fff;border-radius:3px;cursor:pointer;letter-spacing:1px;}
  .glmj_form_button .add{font-size:22px;line-height:22px;padding-top:8px;margin-right:10px;}
  .glmj_form_button_yellow{background:#ffb134;font-size:14px;}
  .glmj_form_button_box{padding:30px 0px 0px 40px;}
  td input[type='button']:last-child{border-right:none;}
  .glmj_table_button{padding:0 6px;line-height:18px;margin-top:9px;cursor:pointer;color:#3399ee;border-right:1px solid #3399ee;}
  .glmj_form_button_shadow{height:32px;line-height:32px;font-size:14px;padding:0 12px;color:#fff;border-radius:3px;margin-right:14px;cursor:pointer;}
  .glmj_form_button_blue_shadow{border:1px solid #58a7d9;}
  .glmj_form_button_yellow_shadow{border:1px solid #efb859;}


  .list_table4_box{width:98%;margin:0 auto;overflow-x:auto;}
  /*.list_table4_box.list_table4_box_scroll{overflow-x:auto;}*/
  .list_table4_box_margin{margin-top:16px;}
  .list_table4{border-collapse:collapse;width:99%;margin:0 auto;text-align:center;font-size:13px;background:#fff;}
  /*.list_table4.list_table4_scroll thead th{white-space:nowrap}*/
  /*.list_table4.list_table4_scroll thead td{white-space:nowrap}*/
  .list_table4 thead{background:#707ea2;color:#fff;}
  .list_table4 thead th{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .list_table4 thead th div{;padding-left:8px;padding-right:8px;}
  .list_table4 thead .border_right{line-height:19px;margin:7px 0px;border-right:1px solid #fff;}
  .list_table4 thead .border_left{line-height:19px;margin:7px 0px;border-left:1px solid #fff;}
  .list_table4 thead .border_none{line-height:19px;margin:7px 0px;}
  .list_table4 tbody tr:hover{border:1px solid #bed3ce;}
  .list_table4 tbody tr:hover td{background:#e3f3f1;}
  .list_table4 tbody tr:hover td.bg{background:#e3f3f1;}
  .list_table4 tbody td.bg{background:#f4fdff;}
  .list_table4 tbody td{position:relative;}
  .list_table4 tbody td .list_table4_txt{position:absolute;left:0px;top:0px;width:100%;height:100%;}
  .list_table4 tbody tr .list_table4_bg{position:absolute;left:0px;top:0px;width:100%;height:100%;}
  .list_table4 tbody td{max-width:300px;line-height:34px;border:1px solid #f2f2f2;color:#333;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .list_table4 tbody td div{padding-left:8px;padding-right:8px;}
  .list_table4 tbody .dotted_left{border-left:1px dotted #27c2f3;}
  .list_table4 tbody .dotted_right{border-right:1px dotted #27c2f3;}
  .list_table4 tbody.border_top_bottom tr:nth-of-type(1) .bg div{border-top:1px dotted #27c2f3;}
  .list_table4 tbody.border_top_bottom tr:last-child .bg div{border-bottom:1px dotted #27c2f3;}
  .list_table4_total{line-height:60px;font-size:16px;color:#f40000;margin-left:40px;}
  /*多维表头*/
  .list_table5{border-collapse:collapse;width:99%;margin:0 auto;text-align:center;font-size:13px;background:#fff;}
  /*.list_table4.list_table4_scroll thead th{white-space:nowrap}*/
  /*.list_table4.list_table4_scroll thead td{white-space:nowrap}*/
  .list_table5 thead{}
  .list_table5 thead th{height:25px;padding-right:10px;padding-left:10px;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border: 1px solid #cccccc;background-color: #00B0F0;text-align: center}
  .list_table5 thead th div{;padding-left:8px;padding-right:8px;}
  .list_table5 thead .border_right{line-height:19px;margin:7px 0px;border-right:1px solid #fff;}
  .list_table5 thead .border_left{line-height:19px;margin:7px 0px;border-left:1px solid #fff;}
  .list_table5 thead .border_none{line-height:19px;margin:7px 0px;}
  .list_table5 tbody tr:hover{border:1px solid #bed3ce;}
  .list_table5 tbody tr:hover td{background:#e3f3f1;}
  .list_table5 tbody tr:hover td.bg{background:#e3f3f1;}
  .list_table5 tbody td.bg{background:#f4fdff;}
  .list_table5 tbody td{position:relative;}
  .list_table5 tbody td .list_table4_txt{position:absolute;left:0px;top:0px;width:100%;height:100%;}
  .list_table5 tbody tr .list_table4_bg{position:absolute;left:0px;top:0px;width:100%;height:100%;}
  .list_table5 tbody td{max-width:300px;padding:0 5px;line-height:34px;border:1px solid #f2f2f2;color:#333;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .list_table5 tbody td div{padding-left:8px;padding-right:8px;}
  .list_table5 tbody .dotted_left{border-left:1px dotted #27c2f3;}
  .list_table5 tbody .dotted_right{border-right:1px dotted #27c2f3;}
  .list_table5 tbody.border_top_bottom tr:nth-of-type(1) .bg div{border-top:1px dotted #27c2f3;}
  .list_table5 tbody.border_top_bottom tr:last-child .bg div{border-bottom:1px dotted #27c2f3;}
  .list_table5_total{line-height:60px;font-size:16px;color:#f40000;margin-left:40px;}

  .creatTabButton{display:none;position:relative;}
  .creatTabContent{display:none;font-size:12px;}
  .creatTabButtonClose{position:absolute;right:10px;top:20px;width:7px;height:7px;}
  .creatTabButtonClose:hover{right:8px;top:18px;width:11px;height:11px;}

  .erpDialog3_table_box{margin:0 auto;}
  .erpDialog3_table{width:100%;text-align:center;border-collapse:collapse;border:1px solid #e3ebf0;}
  .erpDialog3_table thead{background:#cadcec;color:#4881bb;line-height:30px;}
  .erpDialog3_table tbody{line-height:28px;}
  .erpDialog3_table thead th{border:1px solid #e3ebf0;}
  .erpDialog3_table tbody td{border:1px solid #e3ebf0;}


  .common_select4{margin-right:50px;position:relative;width:140px;}
  .common_select4_current{border:1px solid #e3ebf0;height:30px;line-height:30px;font-size:12px;color:#333;background:#fff;margin-top:2px;cursor:pointer;}
  .common_select4_txt{padding-left:10px;width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .common_select4_icon{margin-top:11px;width:11px;height:6px;}
  .common_select4_list{width:140px;display:none;border:1px solid #ebebeb;position:absolute;left:0px;top:30px;background:#fff;z-index:9;max-height:240px;overflow-y:auto;}
  .common_select4_list li{padding-left:10px;width:110px;line-height:30px;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;}
  .common_select4_list li.active{background:#3299d6;color:#fff;}

  .common_radio3{width:83px;height:23px;text-align:center;line-height:23px;margin-top:3px;border:1px solid #e6e6e6;border-radius:3px;cursor:pointer;margin-right:4px;}
  .common_radio3.active{width:85px;height:25px;line-height:25px;}

  .erpDialog3_table_creat_tab_button_red{color:#ff3d3d;cursor:pointer;}
  .erpDialog3_table_creat_tab_button_blue{color:#4a99ff;cursor:pointer;}
  /*切换按钮*/

  .choose {
    display: inline-block;
    width: 50px;
    height: 20px;
    margin: 10px 0 0 5px;
    line-height: 20px;
    border-right: 1px solid black;
    text-align: center
  }

  .btnleft {
    border-radius: 10px 0 0 10px
  }
  .margina{margin: 0 auto}
  .btnright {
    border-radius: 0 10px 10px 0
  }
  .blue{background: #1B97DB;color: white}
  .font12{font-size: 12px}
  .font14{font-size: 14px}
  .font16{font-size: 16px}
  .font18{font-size: 18px}
  .font20{font-size: 20px}
  .font22{font-size: 22px}
  .auto{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  .next_tab_wdgzt_nav dd a{margin:0px 20px;}
  .gouout{
    position: absolute;
    bottom: -25px;
    right: -2px;
    border: 1px solid #ededed;
    height: 38px;
    background: white;
    display: none;
  }
  #icon_goout{
    margin-left: 34px;
    width: 14px;
    height: 14px;
    display: inline-block;
    vertical-align: middle;
    /*background-image: url("images/gouout.png");*/
    background: url(../../assets/gouout.png);
    background-size: 14px 14px;
  }
  .gouout>span{
    margin-left: 18px;
    font-size: 14px;
    color: #00a0e8;
    line-height: 38px;
  }
  /*大图模态框*/
  .showBigImg{
    background:#eee;
    position:fixed;
    left:50%;
    top:50%;
    z-index:11;
    transform: translate(-50%,-50%);
  }
  /*视频标签固定大小*/
  video{
    width: 400px;
    height: 300px;
    margin-bottom: 5px;
  }

  .pointer {
    cursor: pointer
  }
  /*跳转文字颜色*/
  .colorb{
    color: #38ACFF;
  }
  /*配件显示图片大小*/
  .pjimg{
    width: 75px;
    height: 75px;
    vertical-align: top;
  }
  #list span{
    margin-left: 15px;
    font-size:12px;
  }
  .w50{
    width: 50px;
  }
  .w60{
    width: 60px;
  }
  .w100{width: 100px;}
  .w200{width: 190px;}
  .h48{height: 48px;line-height: 48px;}
  .h38{height: 38px;line-height: 38px;}
  .h70{height: 70px;line-height: 70px;}
  .h30{height: 30px;line-height: 30px;}
  .h25{height: 25px;line-height: 25px;}
  .fc{color:#6b6b6b;}
  .white{color: white;}
  .p10{padding: 10px;}
  .bbt{border-bottom:2px solid #f0f0f0;}
  .inline-block{display: inline-block}
  .position_r{position: relative}
  .position_a{position: absolute}
  .c{left:50%;top:50%;transform: translate(-50%,-50%);}
  .bgblue{background: #0F89FD;}
  .bgblue1{background: #0F89FD !important;}
  .cblue{color: #0F89FD;}
  .bgno{background-color: #eee;}
  .line_h30{line-height: 30px;}
  .hauto{height: auto;}
  .wauto{width: auto;}
  .btnbottom{position: absolute;bottom: 10px;left: 45%;}
  .margin6{margin-left: 6%;}
  .margin8{margin-right: 8px;}
  .marginl10{margin-left: 10px;}
  .bgactive{border: 1px solid #d60000 ;background-color: rgba(214, 0, 0,0.6); color: white}
  /*车型库样式*/
  .cxline{width: 30px;height: 30px;border-radius: 15px;background-color: #0F89FD;color: white}
  .cxline p{margin-left: 10px;height: 30px;line-height: 30px;}
  .cx{width: 32%;height: 5px;background: #eee;}
  .cx>p{bottom: -35px;left: 50%;transform: translateX(-50%);}
  .letter>li{width: 23px;height: 23px;text-align: center;margin-right: 5px;}
  .cx_content input[type='text']{width: 60%;height: 30px; border: 1px solid #ccc;border-radius: 15px;background-color: #f0f0f0;margin-left:10px;padding-left: 50px;}
  .carpp{margin-top: 20px;height: 260px;margin-left: 20px;}
  .carpp .c_list{padding-top: 40px;height: 220px;}
  .carpp .c_list ul{width: 785px;height: 220px;overflow: auto;}
  .carpp .c_list ul li{width: 23%;height: 30px;margin-right:6px;margin-top:6px;border: 1px solid #ccc; cursor: pointer;}
  .carpp .c_list ul li img{width: 30px;height: 30px;}
  .carpp ul li span{margin-left:10px;}
  .bbt>div{width: 49%;height: 35px;line-height:35px;display: inline-block;}
  .headerbbt{border-bottom: 3px solid #0F89FD;}
  .cx_content input:hover{border: 1px solid #0F89FD}
  .cx_content input:focus{border: 1px solid #0F89FD}
  /*颜色*/
  .red{color: red}
  .bgred{background: red}
  .textblue{color: #0088ff;cursor: pointer}
  .textred{color: #ff4455;cursor: pointer}
  .textorange{color: #F39800;cursor: pointer}
  .textblack{color: #333;cursor: pointer}
  .bgblue{background: #1B97DB}
  .border_none{border:none}
  .bgnone{background: none}
  /*3d位移居中*/
  .auto_center{margin-left: 50%;margin-top: 50%;transform: translate(-50%,-50%)}
  /*固定定位居中*/
  .Absolute-Center {margin: auto;position: absolute;top: 0; left: 0; bottom: 0; right: 0;}
  /*去除百度地图的标志*/
  .anchorBL{display:none;}
  /*select2*/
  .select2-results .select2-no-results, .select2-results .select2-searching, .select2-results .select2-ajax-error, .select2-results .select2-selection-limit{font-size: 12px;}
  /*checkbox样式*/
  input[type="checkbox"]:hover {
    border-color: #0987FC;
  }

  .equal {
    display:table;
    border-collapse:separate;
    width: 400px;
  }
  .row{
    display:table-row;
    width: 400px;
    font-size: 12px;
    color: #515151;
    padding: 5px 0;
  }

  .row div {
    display:table-cell;
    width: 100px;
    height: 38px;
    line-height: 38px;
    text-align: center;
  }
  .cursor{cursor: pointer}

  /* CSS Document */
  body{background:none;}
  .header{height:54px;background:#36a2fc;}
  .header h1{width: 125px;height:54px;background:url(../../assets/logo_red.png) no-repeat 0 7px;background-size: inherit;text-indent:-9999em;}
  .header h1.qw{background:url(../../assets/qiaowei/qw-logo.png) no-repeat 0 0;background-size: cover;}
  .header h1.icdc{background:url(../../assets/icdc/icdc-logo.png) no-repeat 0 0;background-size: cover;}
  .header h1.tylb{background:url(../../assets/tylb/tylb-logo.png) no-repeat 0;background-size: contain;}
  .header h1.cheyin{background:url(../../assets/cheyin/cheyin-logo.png) no-repeat 0;background-size: contain;}
  .header .nav{margin-right:20px;padding-top:18px;}
  .header a{color:#fff;font-size:16px;padding:0 24px;border-right:1px solid #fff;}
  .header a.border_none{border:none;}

  .banner{height:426px;background:#36a2fc;}
  .banner_left{position:relative;}
  .banner_left_left{font-size:30px;color:#fff;line-height:50px;padding-top:138px;}
  .banner_left_right{padding-top:51px;}
  .banner_button_box{position:absolute;left:240px;bottom:22px;}
  .banner_button{width:10px;height:10px;background:#8ac3fa;border-radius:50%;margin-right:12px;cursor:pointer;}
  .banner_button.active{background:#fff;}
  .banner_right{width:287px;height:335px;background:#fff;margin-top:48px;margin-left:30px;}
  .banner_right_top{padding:6px 6px 0px 0px;}
  .banner_right_center_top{font-size:20px;color:#35a3ff;line-height:28px;padding-left:30px;}
  .banner_right_center_top p{font-size:15px;line-height:23px;}
  .banner_right_center_center{padding-top:13px;}
  .banner_right_center_center input[type="text"]{width:216px;padding-left:10px;height:34px;border:1px solid #c7c7c7;margin-bottom:16px;}
  .banner_right_center_center input[type="password"]{width:216px;padding-left:10px;height:34px;border:1px solid #c7c7c7;margin-bottom:16px;}
  .banner_right_center .login_record{color:#2e2e2e;margin-bottom:10px;}
  .banner_right_center .login_record input{margin-top:6px;margin-right:6px;}
  .banner_right_center_center input[type="button"]{cursor:pointer;width:226px;height:42px;background:#65c33b;border:1px solid #4bac21;color:#fff;line-height:42px;text-align:center;font-size:16px;}
  .banner_right_bottom{height:40px;line-height:40px;text-align:center;border-top:1px solid #e8ecef;background:#f2f7fa;margin-top:30px;}
  .banner_right_bottom a {color:#007ed1;font-size:14px;text-decoration: underline;}

  .information_left_top{padding-top:50px;}
  .information_left_top li{width:174px;height:65px;margin-right:27px;cursor:pointer;color:#fff;font-size:18px;}
  .information_left_top li:nth-of-type(1){background:#0e73b7;border:1px solid #0061a2;}
  .information_left_top li:nth-of-type(1) p{border-left:1px solid #0e66a1;}
  .information_left_top li:nth-of-type(2){background:#2ccab3;border:1px solid #009f8d;}
  .information_left_top li:nth-of-type(2) p{border-left:1px solid #009f89;}
  .information_left_top li:nth-of-type(3){background:#f75b5c;border:1px solid #bc2e2d;}
  .information_left_top li:nth-of-type(3) p{border-left:1px solid #bc2e2d;}
  .information_left_top img{margin-top:12px;margin-left:18px;}
  .information_left_top p{height:40px;line-height:40px;margin-top:13px;margin-left:14px;padding-left:10px;}
  .information_left_bottom{font-size:12px;color:#8d8d8d;margin-top:50px;line-height:26px;padding-bottom:40px;}
  .information_left_bottom a{color:#8d8d8d;padding:0 10px;border-left:1px solid #d7d7d7;height:14px;line-height:14px;margin:6px 0px;}
  .information_left_bottom a.padding_none{padding-left:0px;border:none;}
  .information_right{width:250px;}
  .information_right_top{padding-top:35px;}
  .information_right_top p{width:75px;color:#4e4e4e;font-size:17px;height:35px;line-height:35px;margin-top:16px;}
  .information_right_top img{padding-left:30px;border-left:1px solid #e5e5e5;}
  .information_right_bottom img{margin-top:60px;margin-left:66px;}
  .information_right_bottom .img{margin-left:24px;}

  /*弹框的相关操作*/
  .loginDialog{width:850px;margin:0 auto;height:370px;background:#fff;position:absolute;left:50%;top:50%;margin-left:-425px;margin-top:-185px;z-index:10;}
  .loginDialog_top{height:59px;line-height:59px;position:relative;font-size:18px;color:#31343b;border-bottom:1px solid #e5e5e5;}
  .loginDialog_top_left{margin-left:278px;}
  .loginDialog_top_right{position:absolute;right:24px;top:-4px;font-size:34px;color:#a5a0a6;cursor:pointer;}
  .loginDialog_bottom li{border-right:1px solid #e5e5e5;width:282px;height:262px;padding-top:29px;}
  .loginDialog_bottom li.border_none{border:none;}
  #loginCzdDialog li:nth-of-type(1) .img{margin-left:122px;}
  #loginCzdDialog li:nth-of-type(1){margin-left:141px;border-left:1px solid #e5e5e5;}
  #loginCzdDialog li:nth-of-type(2){border-right:1px solid #e5e5e5;}
  #loginCzdDialog li:nth-of-type(2) .img{margin-left:116px;padding-top:5px;}
  #loginShdDialog li:nth-of-type(1) .img{margin-left:122px;}
  #loginShdDialog li:nth-of-type(2) .img{width:127px;height:60px;margin-left:68px;}
  #loginShdDialog li:nth-of-type(3) .img{margin-left:116px;padding-top:5px;}
  #loginJsdDialog li:nth-of-type(1) .img{width:127px;height:60px;margin-left:116px;padding-top:5px;}
  #loginJsdDialog li:nth-of-type(1){margin-left:282px;border-left:1px solid #e5e5e5;}
  .loginDialog_bottom li:nth-of-type(1) .img{margin-left:122px;}
  .loginDialog_bottom_top p{height:34px;line-height:34px;text-align:center;font-size:18px;margin-bottom:22px;}
  .loginDialog_bottom_center{cursor:pointer;width:218px;height:48px;background:#5bb732;font-size:16px;line-height:48px;text-align:center;color:#fff;margin-left:34px;}
  .loginDialog_bottom_bottom{font-size:12px;color:#adadad;line-height:22px;padding-left:39px;padding-top:10px;position:relative;}
  .tobig_button{position:relative;}
  .tobig_img{position:absolute;right:0px;top:58px;width:44px;height:44px;}
  .tobig_img.active{box-shadow:5px 5px 5px #d1d1d1;}

  #xzmdDialog{margin-left:-325px;z-index:10;}
  #xzmdDialog .choice{width:560px;height:80px;margin:0 auto;background:#fff;}
  #xzmdDialog .choice_left{margin-right:20px;line-height:44px;margin-left:10px;}
  #xzmdDialog select{width:130px;height:28px;}
  #xzmdDialog .erpDialog_bottom_bottom{text-align:center;}
  #xzmdDialog .erpDialog_bottom_bottom{padding-top:64px;}

  /*修改后的选择门店*/
  .login_choice_store{width:470px;max-height:600px;padding-bottom:10px;background:#fff;border:1px solid #dedede;border-radius:6px;box-shadow:0px 0px 4px #dedede;position:fixed;left:50%;top:60px; z-index:11;margin-left:-235px;}
  .login_choice_store_top{position:relative;}
  .login_choice_store .login_choice_store_top_title{height:92px;padding-top:8px;text-align:center;line-height:92px;color:#000;font-size:19px;}
  .login_choice_store .login_choice_store_top_close{width:33px;height:33px;background:url(../../assets/smallicons.png) no-repeat -144px -115px;text-align:center;line-height:92px;position:absolute;right:36px;top:38px;cursor:pointer;overflow:hidden;}
  .login_choice_store_bottom{max-height:500px;overflow-y:auto;}
  .login_choice_store_bottom li{width:398px;height:124px;border:1px solid #eeedf2;background:#f0eff4;margin:0 auto;border-radius:8px;margin-bottom:34px;cursor:pointer;}
  .login_choice_store_bottom_left{width:92px;height:92px;border-radius:50%;overflow:hidden;margin-left:14px;margin-top:16px;margin-right:14px;}
  .login_choice_store_bottom_left img{width:100%;height:100%;}
  .login_choice_store_bottom_right{width:8px;height:12px;background:url(../../assets/smallicons.png) no-repeat -186px -115px;}
  .login_choice_store_bottom_center_top{font-size:20px;line-height:39px;padding-top:26px;color:#000;width: 245px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
  .login_choice_store_bottom_center_bottom{font-size:14px;line-height:28px;color:#2a292e;}
  .login_choice_store_bottom_right{margin-top:55px;margin-right:20px;}

</style>
