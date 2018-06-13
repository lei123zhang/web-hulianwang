<template>
    <div class="content-wrap">
            <div class="container finnace" id="List">
                <Row>
                    <Col span="4">
                        <div class="leftmenu">
                            <ul class="nav nav-pills nav-stacked">
                                <span class="leftmenu-title leftmenu-folding top" data-folding="trademenu1">
                                    <!-- <i class="lefticon icon4"></i> -->
                                    {{$t('finance.finance')}}
                                </span>
                                <li class="">
                                    <router-link to="/finance/index">{{$t('finance.financeIndex')}}</router-link>
                                </li>
                                <li class="">
                                    <router-link to="/finance/record">{{$t('finance.financeRecord')}}</router-link>
                                </li>
                                <!-- <span class="leftmenu-title leftmenu-folding " data-folding="trademenu2">
                                    <i class="lefticon icon5"></i>
                                    充值提现
                                </span> -->
                                <li class="">
                                    <router-link to="/finance/recharge">{{$t('common.deposit')}}</router-link>
                                </li>
                                <li class="">
                                    <router-link to="/finance/withdraw">{{$t('common.extract')}}</router-link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col span="20">
                    <!-- <keep-alive> -->
                    <router-view></router-view>
                    <!-- </keep-alive> -->
                    </Col>
                </Row>
            </div>
    </div>
</template>
<script>
export default {
    computed:{
        'isLogin':function(){
            return this.$store.getters.isLogin;
        },
        'lang': function () {
             return this.$store.state.lang;
        },
        user: function() {
            return JSON.parse(localStorage.getItem("MEMBER"))
        },
    },
    data() {
        return {

        }
    },
    methods: {
        
        init() {
            this.$store.commit('navigate','nav-asset');
            if (!localStorage.TOKEN || !localStorage.MEMBER) {
                this.$Message.error(this.$t("common.tipLogin"));
                this.$router.push('/login');
            };
            if (!this.isLogin) {
                this.$Message.error(this.$t("common.tipLogin"));
                this.$router.push('/login');
            }
        },
     
        
    },
    created: function() {
        this.init();
    },
}
</script>
<style>
.leftmenu a.router-link-active {
    background: #F9F6EF;
    color: #FF8B1A !important;
}

.icon4 {
    background: url('../../assets/img/moneyicon1.png') no-repeat 0 0;
    background-size: 100% 100%;
}

.icon5 {
    background: url('../../assets/img/moneyicon2.png') no-repeat 0 0;
    background-size: 100% 100%;
}

.order-table {
    margin-top: 20px;
}

.content-wrap {
    /* background: #eee; */
    min-height: 750px;
    padding-top:20px;
}

.container {
    margin: 0 auto;
    width:100%;
    max-width:1310px;
    min-width:1180px;
    padding:0 10px;
    background:white;
}
#List.container{
    background-color:transparent;
}
.finnace .nav-right{
    
}

/* left */

.leftmenu {
    margin-bottom: 60px;
    background: #fff;
    position: relative;
    min-height: 1px;
    padding: 20px 0;
}

.nav {
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
}

.nav>li {
    line-height: 50px;
}

.leftmenu .nav-stacked {
    background: #fff;
}

.leftmenu .leftmenu-title {
    line-height: 55px;
    font-size: 20px;
    background: 0 0;
    color: #0B0D1B;
    /* padding-left: 20px; */
    /*border-top: #f1f1f1 solid 1px;
	border-bottom: #f1f1f1 solid 1px;*/
    display: block;
    /* cursor: pointer; */
}

.leftmenu .nav>li>a {
    display: block;
    color: #000;
    font-size: 14px;
}

.leftmenu .nav-pills>li.active>a,
.leftmenu .nav>li>a:hover,
.nav-pills>li.active>a:focus,
.nav-pills>li.active>a:hover {
    background: #ebeff5;
    color: #FF8B1A;
}

.leftmenu .leftmenu-title.top {
    border-top: 0;
}

.leftmenu .lefticon {
    width: 26px;
    height: 26px;
    margin-right: 5px;
    display: inline-block;
    vertical-align: middle;
}
</style>

