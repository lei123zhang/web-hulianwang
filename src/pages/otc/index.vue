<template>
  <div class="index-wrap">
      <carousel-show></carousel-show>
      <div id="cont">
            <div id="adv">
                <!-- <h1 class="advH">{{$t('index.goodAdvRecommendation')}}</h1> -->
                <!-- <div class="morebox">
                    {{$t('index.goodAdvRecommendationTip')}}
                    <span @click="isLog()">{{$t('index.seeMore')}}</span>
                </div> -->
                <div class="advBtn">
                    <button-group>
                        <i-button v-for="(item,index) in btnList"  :key='index' @click="addClass(index)" :class="{'ivu-btn-primary':index==choseBtn,'ivu-btn-ghost':index!=choseBtn}">{{item.text}}</i-button>
                    </button-group>
                </div>
                <div class="item1" v-show="isitem1">
                    <Row class="code-row-bg adv_box">
                        <Table highlight-row :columns="columns" :data="cardListBuy0" :no-data-text="$t('common.nodata')"></Table>
                    </Row>
                </div>
                <div class="item2" v-show="!isitem1">
                    <Row class="code-row-bg adv_box">
                        <Table highlight-row :columns="columns" :data="cardListBuy1" :no-data-text="$t('common.nodata')"></Table>
                    </Row>
                </div>
                <!-- adv -->
                <div class="index-bot">
                    <div class="ww">
                        <Row type="flex" justify="space-around" class="code-row-bg">
                            <Col span="8" class="bot_item">
                                <img src="../../assets/img/index_bot1.png" alt="">
                                <h5>{{$t('index.safe')}}</h5>
                                <p>{{$t('index.safeTip')}}</p>
                            </Col>
                            <Col span="8" class="bot_item">
                                <img src="../../assets/img/index_bot2.png" alt="">
                                <h5>{{$t('index.fast')}}</h5>
                                <p>{{$t('index.fastTip')}}</p>
                            </Col>
                            <Col span="8" class="bot_item">
                                <img src="../../assets/img/index_bot3.png" alt="">
                                <h5>{{$t('index.instant')}}</h5>
                                <p>{{$t('index.instantTip')}}</p>
                            </Col>
                        </Row>
                    </div>
                </div>
                <!-- 3box -->
            </div>
            <div class="section" id="page5">
                <div class="mainPage5">
                    
                        <div class=" page5Left">
                            <h3><b></b>{{$t("common.description.tit1")}}</h3>
                            <h1>{{$t("common.description.content1")}}</h1>
                            <!-- <h3>{{$t("description.message5")}}</h3> -->
                            <ul>
                                <li>
                                    <a @click="donwload(0)"><img src="../../assets/img/iphone.png" alt="">{{$t("common.description.tit2")}}</a>
                                </li>
                                <li>
                                    <a @click="donwload(1)"><img src="../../assets/img/andriod.png" alt="">{{$t("common.description.tit3")}}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="page5Right">
                            <img src="../../assets/img/iphoneSingel.png" alt="" style='margin-bottom:-3px;'>
                            <!-- <img src="../../assets/images/iosdown.png" alt=""> -->
                        </div>
                </div>
                
            </div>
      </div>
  </div>
</template>
<script>
import carouselShow from '../../components/otc/carousel'
export default {
  components: {
      carouselShow
  },
  data() {
    var self = this;
    return {
        choseBtn: 0,
        isitem1: true,
        btnList: [
          {
            text: this.$t('common.ibuy')
          },
          {
            text: this.$t('common.isell')
          },
      ],
      cardListBuy0: [],
      cardListBuy1: [],
      x:localStorage.TOKEN,
      columns:[
            {
                title: self.$t('common.memberName'),
                key: 'memberName',
                width: 250,
                ellipsis: true,
                render: function(h, params) {
                    return h('div', [
                        h('div', {
                            attrs: {
                                class: 'user-face user-avatar-public'
                            },

                        }, [
                                h('span', {
                                    attrs: {
                                        class: 'user-avatar-in'
                                    },
                                }, params.row.memberName.replace(/^\s+|\s+$/g, "").slice(0, 1)),
                            ]),
                        h('p', [
                            h('a', {
                                style: {
                                    marginRight: '8px',
                                    cursor: 'pointer',
                                    paddingTop: '5px'
                                },
                                class: {
                                    // renzhengA: params.row.renzheng
                                },
                                on: {
                                    click: function() {
                                      
                                    
                                        if (self.isLogin) {
                                            self.$router.push('/checkuser?id=' + params.row.memberName);
                                        } else {
                                            self.$router.push('/login');
                                        }
                                    }
                                }
                            }, params.row.memberName),
                            h('div', {
                                class: {
                                    // renzheng: params.row.renzheng
                                }
                            }, ''),
                        ])
                    ]);
                },
            },
            {
                title:self.$t('index.transactions'),
                key:'transactions'
            },
            {
                title: self.$t('index.payMode'),
                key: 'payMode',
                render (h, params) {
                  const row = params.row;
                  let payMode = row.payMode.split(',');
                  let payBeChoose=[];
                  payMode.map((s,index)=>{
                    if(s=="支付宝"){
                      payBeChoose.push(h('Avatar', {
                        attrs: {
                            src: require('../../assets/img/alipay.png'),
                            class:'payMode-margin'
                        },
                      }))
                    };
                    if(s=="微信"){
                      payBeChoose.push(h('img', {
                        attrs: {
                            src: require('../../assets/img/wechat.png'),
                            class:'payMode-margin'
                        },
                      }))
                    };
                    if(s=="银联"){
                      payBeChoose.push(h('img', {
                        attrs: {
                            src: require('../../assets/img/bankcard.png'),
                            class:'payMode-margin'
                        },
                      }))
                    }
                  });
                  return payBeChoose;
              } 
            },
            {
                title: self.$t('common.amount'),
                key: 'remainAmount',
            },
            {
                title: self.$t('common.price'),
                key: 'price',
                width: 170,
                render: function(h, params) {
                    return h('div', [
                        h('p', {
                            attrs: {
                                class: 'price'
                            },
                        }, params.row.price + 'CNY/'+params.row.unit),
                        h('p', {
                            attrs: {
                                class: 'price2'
                            },
                        }, params.row.minLimit + '-' + params.row.maxLimit + 'CNY'),
                    ]);
                },
            },
            {
                title: self.$t('common.operate'),
                key: 'buyBtn',
                render: function(h, params) {
                  
                    return h('p', [
                        h('a', {
                            style: {
                                color: '#fff'
                            },
                            on: {
                                click:()=>{
                                    if (self.isLogin) {
                                        self.$router.push('/otc/tradeInfo?tradeId='+params.row.advertiseId);
                                    } else {
                                      self.$Message.error(this.$t("common.tipLogin"));
                                      // self.$Message.success('请先登录');
                                      self.$router.push('/login');
                                    }
                                  
                                }
                            }
                        }, [
                                h('Button', {
                                    props: {
                                        type:  self.choseBtn == 0 ? 'error':'success',
                                        long: true,
                                    },
                                    style: {
                                        marginRight: '8px',
                                        width: '80%'
                                    },
                                }, self.choseBtn == 0 ?self.$t('common.buy'):self.$t('common.sell'))
                            ]),
                    ]);
                }
            }
      ],
    }
  },
  mounted() {

  },
  computed:{
    'isLogin':function(){
            return this.$store.getters.isLogin;
        },
    'lang': function () {
      return this.$store.state.lang;
    }
  },
  watch:{
        'lang':function () {
          this.updateLangData();
        }
  },
  methods: {
    updateLangData(){
        this.btnList=[
            {
              text: this.$t('common.ibuy')
            },
            {
              text: this.$t('common.isell')
            },
        ],
        this.columns[0].title = this.$t('common.memberName');
        this.columns[1].title = this.$t('index.transactions');
        this.columns[2].title = this.$t('index.payMode');
        this.columns[3].title = this.$t('common.amount');
        this.columns[4].title = this.$t('common.price');
        this.columns[5].title = this.$t('common.operate');

    },
    donwload(type){
        const title = this.$t('common.tip');
        const content = '<p>'+this.$t('common.expect')+'</p>';
        this.$Modal.info({
            title: title,
            content: content,
            okText:this.$t('common.confirm'),
            closable: true
        });
    },
    addClass(index) {

      this.choseBtn = index;
      if (index == 0) {
          this.isitem1 = true;
      } else {
          this.isitem1 = false;
      }
      this.getAd(index)
    },
    init() {
      this.$store.commit('navigate','nav-index');
      this.getAd(0)
      this.getAd(1)
     
    },
    getAd(index) {
        if (index == 0) {
            this.$http.post(this.host + '/otc/advertise/excellent', { 'advertiseType': 1 }).then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                  this.cardListBuy0 = resp.data.slice(0, 4);
              } else {
                  this.$Message.error(resp.message);
              }
            })
        } else if (index == 1) {
            this.$http.post(this.host + '/otc/advertise/excellent', { 'advertiseType': 0}).then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                  this.cardListBuy1 = resp.data.slice(0, 4);
              } else {
                  this.$Message.error(resp.message);
              }
            })
        }

    },
    isLog(){
      //  this.$store.commit('navigate','nav-asset');
     
      if (!localStorage.TOKEN || !localStorage.MEMBER) {
      
          // this.$Message.success('请先登录');
          this.$Message.error(this.$t("common.tipLogin"));
          this.$router.push('/login');
      }else{
        this.$router.push('/otc/trade/BTC');
      }
  
    }
  },
  created: function() {
    this.init();
  },
}
</script>
<style>
#page5{
  position:relative;
  background:url(../../assets/img/iphoneBig.jpg);
  background-size: cover;
  width:100%;
  min-height:300px;
}
.mainPage5{
  max-width:1310px;
  min-width:1180px;
  width:100%;
  padding:0 10px;
  margin:0 auto;
  display: flex;
  justify-content: space-between;
  align-items:center;

}
.page5Right,.page5Left{
  display:inline-block;
}
.page5Right{
  vertical-align:bottom;
}
.page5Left{
  vertical-align:middle;
}
.page5Left ul li{
    background-color:#EC9F0A;
    float: left;
    margin-right: 28px;
    border-radius: 7px
}
.page5Left ul li a{
  display:block;
  padding: 15px 16px 13px;
  letter-spacing:1px;
}
.page5Left ul li img{
  vertical-align:middle;
  margin-right:5px;
  margin-top:-6px;
}
.page5Left ul li a{
  font-size:16px;
  color:#fff;
}
.page5Left h3{
  color:#fff;
  font-size:28px;
}
.page5Left h3 b{
  display:block;
  width:200px;
  border-top:10px solid #EC9F0A;
  margin-bottom:20px;
}
.page5Left h1{
   color:#808292;
   font-size:22px;
   margin:20px 0;
}
.morebox {
  text-align: center;
  padding: 10px 0;
  font-size: 16px;
}

.morebox a {
  line-height: 40px;
  font-size: 16px;
  color: #FF8B1A;
  text-decoration: underline;
}

.index-bot {
  background: #fff;
  padding: 80px 0;
}

.adv_box .ivu-card,
.adv_box .ivu-card-body {
  height: 405px;
}

.bot_item{
  padding: 0 4%;
}

.bot_item h5 {
  font-size: 20px;
  color: #0B0D1B;
  line-height: 50px;
  margin-top: 40px;
}

.bot_item p {
    font-size: 14px;
    color: #949494;
    width:220px;
    margin:0 auto;
}

.tradeBtn {
  padding: 15px 0;
}

.trade-body {
  transform: translateY(-100px);
}

.adv_box .ivu-card-body {
  height: 405px;
}

.ivu-table-cell .user-avatar-public {
    width: 20%;
    display: inline-block;
    margin: 10px 10px 10px 0;
    vertical-align: middle;
}

.ivu-table-cell .user-avatar-public>.user-avatar-in {
    transform: translate(4px, 5px);
}

.ivu-table-cell .user-avatar-public~p {
    width: 60%;
    display: inline-block;
}

.card-item:hover .user-avatar-public {
  box-shadow: 0 1px 5px 0 #F55F45;
}

.user-avatar-public {
    background: #fff;
    border-radius: 50%;
    height: 45px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 5px 0 rgba(71, 78, 114, 0.24);
    position: relative;
}

.user-avatar-public>.user-avatar-in {
    background: #FF8B1A;
    border-radius: 50%;
    height: 35px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.card-item:hover .user-avatar-public>.user-avatar-in {
  background: #F55F45;
}

.user-avatar-public>.user-states {
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  bottom: 3px;
  right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-avatar-public>.user-states>.circles {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: #00c481;
}

.user-avatar-public>.user-states.not-online>.circles {
  background-color: #b6bab9;
}

.trade-item .trade-body {
  padding: 0 10%;
  font-size: 16px;
}

.trade-item .trade-body .title {
  line-height: 70px;
  color: #fff;
  text-align: center;
}

.trade-item .trade-body .user-info {
  background: rgba(255, 255, 255, .16);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
  margin-bottom: 30px;
  border-bottom: #e7e9ed dotted 1px;
}

.trade-item .trade-body .user-name {
  display: flex;
  flex-direction: column;
  font-size: 16px;
  padding: 35px 0 10px;
}

.trade-item .trade-body .online-status-box {
  color: #18b111;
  font-size: 12px;
}

.trade-item {
  color: #0D214D;
  text-align: left;
}

.trade-item .trade-body .user-name p:last-child {
  font-size: 12px;
}

.merchant {
  background: url(../../assets/img/renzheng.png) no-repeat;
  background-size: 100% 100%;
  height: 17px;
  width: 67px;
  display: inline-block;
}

.trade-item .trade-body .trade-info {
  padding-bottom: 8px;
  font-size: 16px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.trade-item .trade-body .trade-info span:first-child {
  color: #9094a7;
  font-size: 14px;
}

.trade-item .trade-btn {
  width: 80%;
  line-height: 45px;
  text-align: center;
  color: #00aeef;
  text-decoration: none;
  font-size: 16px;
  display: block;
  border: 1px solid #96e1fb;
  margin: 15px 10% 30px 10%;
}

.trade-item:hover .trade-btn {
  color: #fff;
  background: #FF8B1A;
}

.trade-item .trade-btn .icon {
  width: 16px;
  height: 17px;
  /* background: url("../../images/index/comm_icon.png") no-repeat; */
  background: black;
  display: inline-block;
  vertical-align: middle;
}

.trade-item .trade-btn .icon.buy {
  background-position: 0 -30px;
}

.trade-item:hover .trade-btn .icon.buy {
  background-position: 0 0;
}

.trade-item .trade-btn .icon.sell {
  background-position: -27px -30px;
}

.trade-item:hover .trade-btn .icon.sell {
  background-position: -27px 0;
}

.trade-bottom a {
  color: #444f71;
  font-size: 14px;
  text-decoration: underline;
  padding: 10px 0;
  display: inline-block;
}

#cont {}

.advBtn {
  text-align: center;
  padding: 20px 0 30px;
}

.advBtn button {
  padding: 10px 80px;
  font-size: 14px;
}

#adv {
  padding-top:30px;
  background: #FCFBF9;
}
.item1,.item2{
  padding-bottom:60px;
}

h1.advH {
  text-align: center;
  font-size: 24px;
  color: #0D214D;
  font-weight: normal;
}

.adv_box {
  max-width:1310px;
  width:100%;
  min-width:1180px;
  padding:0 10px;
  margin: 0 auto;
  /* padding-top: 100px; */
}

.adv_box .ivu-col {
  padding: 0 20px;
}

.ivu-row{
  margin: 0 auto !important;
}

.price {
    font-size: 16px;
    font-weight: bolder;
    color: #444f71;
}

.price2 {
    font-size: 12px;
    color: #8994a3;
    margin-top: 0;
}
</style>


