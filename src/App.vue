
<template>
    
    <div class="page-view">
        <div class="page-content">
            <div class="layout">
                <!-- <div class="topnav">
                    <div v-for="item in advList" class='topAd' >
                        <div @click="noticedeail(item.id)">{{item.title}}
                        </div>
                    </div>
                </div> -->
                <div class="layout-ceiling">
                    
                    <div class="layout-ceiling-main">
                        <div class='layout-left'>
                            <router-link to="/" class='layout-left-logo'>
                                <div class="layout-logo"></div>
                                <div>
                                    <h3>互链网</h3>
                                    <h4>HULIANWANG</h4>
                                </div>
                            </router-link>
                            <div class="header_nav">
                                <Menu :active-name="activeNav" theme="light" width="auto" :open-names="['1']">
                                    <Submenu name="1">
                                        <router-link to="/">
                                            <MenuItem name="nav-index">{{$t("header.index")}}</MenuItem>
                                        </router-link>
                                        <router-link to="/otc/trade/BTC">
                                            <MenuItem name="nav-otc">{{$t("header.otc")}}</MenuItem>
                                        </router-link>
                                        <!-- <router-link to="/exchange">
                                            <MenuItem name="nav-exchange">{{$t("header.exchange")}}</MenuItem>
                                        </router-link> -->
                                        <router-link to="/finance">
                                            <MenuItem name="nav-asset">{{$t("header.asset")}}</MenuItem>
                                        </router-link>
                                        <!-- <router-link to="/identbusiness">
                                            <MenuItem name="nav-identbusiness">{{$t("header.identbusiness")}}</MenuItem>
                                        </router-link> -->
                                        <router-link to="/uc/safe">
                                            <MenuItem name="nav-uc">{{$t("header.ucenter")}}</MenuItem>
                                        </router-link>
                                        <router-link to="/help">
                                            <MenuItem name="nav-service">{{$t("header.service")}}</MenuItem>
                                        </router-link>
                                    </Submenu>
                                </Menu>
                            </div>
                        </div>
                        
                        <div class="right_nav">
                            <div class="login_register" v-if="isLogin">
                                <Dropdown>
                                    <a href="javascript:void(0)">
                                        <img style="vertical-align:middle;width:15px;" src="./assets/images/user.png">
                                        <span>{{member.username}}</span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </a>
                                    <DropdownMenu slot="list">
                                        <div @click="logout">
                                            <DropdownItem>
                                                <img src="./assets/images/logout.png"> {{$t("common.logout")}}
                                            </DropdownItem>
                                        </div>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            <div class="login_register" v-else>
                                <Menu active-name="1-1" theme="light" width="auto" :open-names="['2']">
                                    <Submenu name="2">
                                        <router-link to="/login" id="login">
                                            <MenuItem name="1-1">{{$t("common.login")}}</MenuItem>
                                        </router-link>
                                        <router-link to="/register" id="register">
                                            <MenuItem name="1-2">{{$t("common.register")}}</MenuItem>
                                        </router-link>
                                    </Submenu>
                                </Menu>
                            </div>
                            <Dropdown @on-click="changelanguage">
                                <a style="width:94px;height:20px;line-height:20px;border:1px solid;border-radius:20px;padding:0 12px;" href="javascript:void(0)">
                                    {{languageValue}}
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem v-if="languageValue=='简体中文'" name="en">English</DropdownItem>
                                    <DropdownItem v-else name="cn">简体中文</DropdownItem>
                                    <!--<DropdownItem name="hk">繁体中文</DropdownItem>-->
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <router-view></router-view>
            <div class="footer">
                <div class="footer_content ">
                    <div class="footer_left">
                        <img src="./assets/images/footer_logo.png"></img>
                        <div>
                            <h3>互链网</h3>
                            <h4>HULIANWANG</h4>
                        </div>
                    </div>
                    <div class="footer_right">
                        <ul>
                            <!-- <li class="footer_title">
                                <a>{{$t("footer.gy")}}</a>
                            </li>
                            <li>
                                <router-link to="/about-us">{{$t("footer.gywm")}}</router-link>
                            </li> -->
                            <li>
                                <router-link to="/newhelp/index?id=2">{{$t("cms.faq")}}</router-link>
                            </li>
                        </ul>
                        <ul>
                            <!-- <li class="footer_title">
                                <a>{{$t("footer.bzzx")}}</a>
                            </li>
                            <li>
                              <router-link to="/newhelp/index?id=0">{{$t("footer.xsrm")}}</router-link>
                            </li>
                            <li>
                              <router-link to="/newhelp/index?id=2">{{$t("footer.czzn")}}</router-link>
                            </li> -->
                            <li>
                              <router-link to="/about-protocol">{{$t("footer.fwtk")}}</router-link>
                            </li>
                        </ul>
                        <ul>
                            <!-- <li class="footer_title">
                                <a>{{$t("footer.ptsm")}}</a>
                            </li> -->
                            <li>
                                <router-link to="/rate">{{$t("footer.feilv")}}</router-link>
                            </li>
                            <!-- <li>
                                <router-link to="/about-protocol">{{$t("footer.fwtk")}}</router-link>
                            </li> -->
                            <!-- <li>
                                <router-link to="/about-fee">{{$t("footer.fltk")}}</router-link>
                            </li> -->
                        </ul>
                        <ul>
                            <li>
                                 <router-link to="/about-us">{{$t("footer.gywm")}}</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="footer_content ">
                     <p>Copyright © 2011 - 2018 {{$t('common.footerContent')}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'app',
    data() {
        return {
            pageNo:1,
            pageSize:1,
            advList:[]
            // languageValue: '简体中文'
        }
    },
    computed: {
        'activeNav': function() {
            return this.$store.state.activeNav;
        },
        'isLogin': function() {
            return this.$store.getters.isLogin;
        },
        'member':function(){
            return this.$store.getters.member;
        },
        'languageValue':function () {
            var curlang = this.$store.getters.lang;
            if(curlang == "English") this.$i18n.locale = 'en';
            return curlang;
        }
    },
    created: function() {
        this.initialize();
        this.loadDataPage(this.pageNo);

    },
    methods: {
        initialize() {
            this.$store.commit('recoveryMember');
            this.$store.commit('initLang');
            this.checkLogin();
            
        },
        logout() {
            this.$http.post(this.host + '/uc/logout', {}).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(resp.message);
                    this.$store.commit('setMember',null);
                    location.href = "/";
                } else {
                    // this.$Message.error(resp.message);
                }
            })
        },
        checkLogin() {
            this.$http.post(this.host + '/uc/check/login', {}).then(response => {
                var result = response.body;
                if(result.code == 0 && result.data == false){
                   this.$store.commit('setMember',null);
                }
            });
        },
        changelanguage: function(name) {
            if (name == 'en') {
                // this.languageValue = 'English';
                this.$store.commit('setlang','English');
                this.$i18n.locale = 'en';
            }
            if (name == 'cn') {
                // this.languageValue = '简体中文';
                this.$store.commit('setlang','简体中文');
                this.$i18n.locale = 'zh';
            }
            // if (name == 'hk') {
            //     this.languageValue = '繁体中文';
            // }
        }, 
        loadDataPage(pageIndex){
            var param = {};
            param["pageNo"] = pageIndex,
            param["pageSize"] = this.pageSize,
            this.$http.post(this.host + this.api.uc.announcement, param).then(response => {
                var resp = response.body.data.content;
           
                this.advList=resp;
           
            })
        },
        noticedeail(x){
            this.$router.push({ path:'/agreement', query:{id:x}});
        }
        
    }
}
</script>

<style>
/* 导航 */
.header_nav .ivu-menu-submenu .ivu-menu a{
    margin-left:27px;
}
.nav-right-tit{
    border-bottom:1px solid #ddd;
    height:40px;
    line-height:40px;
    text-align:left;
    margin:0 25px;
}
.nav-right-tit span{
    display:inline-block;
    color:#DE9717;
    border-bottom:2px solid #DE9717;
    font-size:16px;
    padding:0 25px;
}
.nav-right-tit i{
    font-style:normal;
    float:right;

}
ul{
    list-style-type: none;
}

.payMode-margin{
    margin-right:5px;    
}

.ivu-table td, .ivu-table th{
    text-align: center;
}

html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.topnav {
    text-align: center;
    line-height: 25px;
    background: #1b262d;
}

.topnav a {
    color: #fff;
    font-size: 14px;
}
.topAd {
    font-size:16px;
    padding:10px 0;
    color:#fff;
}
.topAd div{
    display:inline-block;
}
.topAd div:hover{
    cursor: pointer;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    color: #fff;
    border-right-color:transparent;
}
.ivu-col-span-4 .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    color: #DE9717;
}
.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover{
    color: #DE9717;
    background-color:transparent;
}
.ivu-menu-vertical.ivu-menu-light:after{
    display: none;
}

/*自定义滚动条样式*/

::-webkit-scrollbar {
    width: 10px;
    background: #0b0d1b;
}

::-webkit-scrollbar-thumb {
    background: #1f1b2a;
    border-radius: 25px;
}

.hide {
    display: none;
}

.blue {
    color: #6BF !important;
}

.red {
    color: #AE4E54 !important;
}

.ivu-btn-info,.ivu-btn-info:hover{
    background:#DE9717;
    border-color:#DE9717;
}

.ivu-btn-primary,.ivu-btn-primary:hover {
    background:#DE9717;
    border-color:#DE9717;
}

.ivu-btn.active,
.ivu-btn:active {
    color: #fff;
    background:#DE9717;
    border-color:#DE9717;
}

.ivu-btn-text.active,
.ivu-btn-text:active {
    color: #DE9717;
    background-color: transparent;
    border-color: transparent;
}

.ivu-btn.disabled,
.ivu-btn.disabled.active,
.ivu-btn.disabled:active,
.ivu-btn.disabled:focus,
.ivu-btn.disabled:hover,
.ivu-btn[disabled],
.ivu-btn[disabled].active,
.ivu-btn[disabled]:active,
.ivu-btn[disabled]:focus,
.ivu-btn[disabled]:hover,
fieldset[disabled] .ivu-btn,
fieldset[disabled] .ivu-btn.active,
fieldset[disabled] .ivu-btn:active,
fieldset[disabled] .ivu-btn:focus,
fieldset[disabled] .ivu-btn:hover {
    color: #fff;
    background: #54677F;
}

.ivu-carousel-dots li button {
    width: 30px;
    height: 10px;
    border-radius: 14px;
}

.ivu-menu-dark,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
    background: #18202A;
}

#checkbox {
    width: 10px;
}

#sendCode {
    position: absolute;
    border: 0;
    top: 0;
    right: 0;
    width: 30%;
    color: #DE9717;
    cursor: pointer;
}

.login_form {
    background: url(./assets/images/login_bg.jpg) no-repeat center;
    height: 760px;
    background-size: cover;
    position: relative;
    overflow: hidden;
}
.layout-left-logo div{
    display:inline-block;
    vertical-align:middle;
}
.login_left {
    width:1042px;
    margin:0 auto;
    height: 400px;
    margin: 0 auto;
    margin-top: 215px;
    background:transparent;
    position: relative;
    padding: 0 50px;
    color: #fff;
    font-size: 20px;
}

.login_right {
    position: absolute;
    color: #000;
    background: #fff;
    width: 550px;
    height: 560px;
    top: -90px;
    right: 50px;
}
.register .ivu-input-wrapper,.register .ivu-select{
    width:347px;
    float: right;
}
.register .ivu-form-item-error-tip{
    left: 37%;
}
.login_title {
    color: #000;
    text-align: center;
    height: 80px;
    font-size: 25px;
}



/* .login_right .ivu-select-selection{
        background:#EAEDEE;
} */

.login_right .ivu-select-dropdown {
    background: #fff;
}

.ivu-form-inline .ivu-form-item {
    display: block;
    margin-right: 0;
}

.modify .ivu-input-wrapper {
    width: 40%;
}

.ivu-btn-ghost {
    /* color:#fff; */
}

.layout {
    position: relative;
    background-color:#070721;
}
.layout-left{
    width:870px;
}
.layout-left div h3,.layout-left div h4{
    color:#fff;
    line-height:1.5;
    /* margin-left:2px; */
}
.layout-left div h3{
    font-size:20px;
    letter-spacing:11px;
    /* margin-left:10px; */
}
.layout-left div h4{
    font-size:12px;
    margin-left:-6px;
}
.layout-logo {
    width: 48px;
    height: 48px;
    background: url(./assets/images/logo.png) no-repeat;
    background-size: contain;
    position: relative;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-ceiling {
    width:100%;
    max-width:1310px;
    min-width:1200px;
    padding: 0 10px;
    margin:0 auto;
    overflow: hidden;
}

.layout-ceiling-main {
    height: 80px;
    line-height: 80px;
    display: flex;
    justify-content: space-between;
}

.layout-ceiling-main .ivu-menu-vertical .ivu-menu-item,
.ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 0;
}

.layout-ceiling-main .ivu-menu-item {
    font-size: 14px;
}

.layout-ceiling-main a {
    color: #fff;
    display: inline-block;
    text-align: center;
    margin-right:15px;
}

.header_nav {
    float: right;
}

.right_nav{
    float: right;
}
.header_nav .ivu-menu-light,.login_register .ivu-menu-light{
    background-color:transparent;
}

.login_register .ivu-menu-light.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
.login_register .ivu-menu-light.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
    background: #DE9717;
    color: #fff;
    border-radius: 4px;
}

.login_register {
    float: left;
    margin-right:23px;
}

#login,
#register {
    color: #DE9717;
    border:1px solid #DE9717;
    display: inline-block;
    line-height: 35px;
    width: 80px;
    height: 35px;
    text-align: center;
    margin: 0;
    border-radius:4px;
}
#login .ivu-menu-item,#register .ivu-menu-item{
    color: #DE9717;
}
#login .ivu-menu-item.ivu-menu-item-active,#register .ivu-menu-item.ivu-menu-item-active{
    color:#fff;
}
.login_register a {
    margin-left: 0;
}
.right_nav .ivu-select-dropdown{
    margin-top:-20px;
}
.ivu-dropdown-rel a {
    width: 100%;
    margin-left: 0;
}

.ivu-dropdown-menu {
    width: 100px;
}

.layout-ceiling-main .ivu-select-dropdown {
    background: #0b0d1b;
}

.ivu-select-dropdown a {
    width: 100%;
    text-align: left;
    margin: 0;
}

.ivu-dropdown-item:hover {
    background: #aaa;
}

.ivu-dropdown-item {
    color: #fff;
}

.ivu-dropdown-item img {
    vertical-align: middle;
}

.ivu-radio-inner:after {
    background: #18202A;
}



/*安全中心*/

.user_center {
    height: 900px;
}

.ivu-menu-submenu-title {
    display: none;
}

.ivu-menu-item {
    text-align: center;
}

.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
    padding-left: 0 !important;
    padding-right: 0;
    color: #A4A5A7;
    font-size:16px;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
    background: #1855fd !important;
}

.layout_menu_right {
    margin-left: 3%;
    background: #18202A;
    color: #fff;
    padding-bottom: 130px;
}

.menu_right_title {
    font-size: 16px;
    line-height: 45px;
    margin: 0 10px;
    padding-left: 20px;
    border-bottom: 1px solid #263142;
}



/* .ivu-form .ivu-form-item-label{
        color:#fff;
    }
    .ivu-form-item-required .ivu-form-item-label:before{
        display:none;
    } */

.category .ivu-radio-group.ivu-radio-group-button {
    width: 100%;
}

.category .ivu-radio-group label {
    font-size: 14px;
}

.category .ivu-radio-group-button .ivu-radio-wrapper {
    background: #28313E;
    color: #979797;
    border: 0;
    padding: 0 25px;
}

.category .ivu-radio-group-button .ivu-radio-wrapper-checked {
    color: #fff;
    background: #2F3D52;
    box-shadow: none;
}

.category .ivu-radio-wrapper span {
    padding-left: 0;
}

.purse_address_left {
    float: left;
    width: 86%;
}

.purse_address p {
    font-size: 10px;
    line-height: 25px;
    color: #979797;
}

.purse_address_left_icon {
    line-height: 40px;
    height: 40px;
    width: 100%;
}

.purse_address_left_icon img {
    vertical-align: middle;
    margin-right: 10px;
}

.purse_address span {
    font-size: 14px;
    float: left;
    color: #fff;
    padding: 0 20px;
    background: #28313E;
    width: 21%;
}

.purse_address_left_icon label {
    float: left;
    width: 72%;
    height: 40px;
    border: 2px solid #28313E;
    padding-left: 20px;
}

#qrcode canvas {
    width: 120px;
}

#qrcode img {
    width: 100%;
}

.ivu-select-item:hover {
    background: #aaa;
}

.ivu-select-item-selected,
.ivu-select-item-selected:hover {
    background: #aaa
}

.chart_container #chart_updated_time {
    float: left;
}

.footer {
    width: 100%;
    background: #05060A;
}

.footer_content {
    width:100%;
    max-width:1310px;
    min-width:1180px;
    padding:20px 10px;
    margin:0 auto;
    /* height: 200px;
    padding: 50px 4%; */
    color: #53575c;
}
.footer:not(:last-child) .footer_content {
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding:30px 10px;
}
.footer:last-child{
    border-top:1px solid #313135;
}
.footer_content p{
    text-align:center;
    font-size:16px;
}

.footer_left {
    font-size: 14px;
}
.footer_left img,.footer_left div{
    display:inline-block;
    vertical-align:middle;
    margin-right:2px;
}
.footer_left  div h3{
    color:#fff;
    font-size:20px;
    letter-spacing:11px;
    margin-right:10px;
}
.footer_left  div h4{
    color:#fff;
    font-size:12px;

}
.footer_right {
  
}

.footer_right ul {
    float: left;
    margin: 0 30px;
}

.footer_right ul li a {
    color: #53575c;
    font-size:16px;
}

.footer_title {
    font-size: 15px;
    height: 30px;
}

.ivu-select-selected-value {
    color: #bbbec4
}
/* .ivu-tabs{
    color:#BCD7E6
} */
.ivu-tabs-bar{
    border-bottom:0;
}



/*法币交易*/

.ww {
    width: 100%;
    max-width:1310px;
    min-width:1180px;
    padding:0 10px;
    margin: 0 auto;
}

.ivu-col {
    text-align: center;
}

.ivu-btn-group:not(.ivu-btn-group-vertical) .ivu-btn-primary+.ivu-btn, .ivu-btn-group:not(.ivu-btn-group-vertical) .ivu-btn-primary:last-child:not(:first-child){
    border-left-color:#DE9717
}
.ivu-btn-group:not(.ivu-btn-group-vertical) .ivu-btn-primary:first-child:not(:last-child){
    border-right-color:#DE9717
}
.ivu-tabs-nav .ivu-tabs-tab-active{
    color: #DE9717
}
.ivu-tabs-ink-bar{
    background-color:#DE9717;
}
.ivu-tabs-nav .ivu-tabs-tab:hover{
    color: #DE9717 
}
a,a:hover{
    color: #DE9717;
}

/* 轮播图 */
.ivu-carousel-dots-inside{
    bottom:12px;
}

/* 上传图片成功后，图片名称 */
.ivu-upload-list .ivu-upload-list-file-finish{
    display:none;
}
</style>