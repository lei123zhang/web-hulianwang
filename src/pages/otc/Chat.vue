<template>
    <div class="content-wrap">
        <div class="ww">
            <div class="container chat-in-box" id="List">
                <Row class="chat-in">
                    <Col span="4">
                    <div class="leftmenu left-box chat-right">
                        <div class="chat-right-in">
                            <h6>
                                <span v-if="tradeType==0">{{$t('otc.seller')}}:</span>
                                <span v-else>{{$t('otc.buyer')}}:</span>
                                <router-link :to="{ path:'/checkuser', query: { 'id': msg.otherSide }}">{{msg.otherSide}}</router-link>
                            </h6>
                            <h6>
                                <span>{{$t('otc.tradeMoney')}}:</span>
                                <span>{{msg.money}}&nbsp;CNY</span>
                            </h6>


                            <div class="mt20" v-if="tradeType==0">
                                <h5 class='tit'>{{$t('otc.operationTips')}}:</h5>
                                <div>
                                    <p>1、{{$t('otc.operationTipBuy1_1')}}
                                        <em>{{$t('otc.paymentCompleted')}}</em>”。{{$t('otc.operationTipBuy1_2')}}</p>
                                    <p>2、{{$t('otc.operationTipBuy2')}}</p>
                                </div>
                                <span class='tit'>
                                        <b>{{$t('otc.notice')}}：</b>
                                    </span><br>
                                <span>{{$t('otc.noticeTip')}}</span><br>
                            </div>
                            <div class="mt20" v-else>
                                <h5 class='tit'>{{$t('otc.operationTips')}}:</h5>
                                <div>
                                    <p>1、{{$t('otc.operationTipSell1_1')}}
                                        <em>{{$t('otc.confirmRelease')}}</em>”{{$t('otc.operationTipSell1_2')}}</p>
                                    <p>2、{{$t('otc.operationTipSell2')}}</p>
                                    <p>3、{{$t('otc.operationTipSell3')}}</p>
                                </div>
                                <span class='tit'>
                                        <b>{{$t('otc.notice')}}：</b>
                                    </span><br>
                                <span>{{$t('otc.noticeTip')}}</span><br>
                            </div>
                            <!-- <div class="bottom-btn">
                                    <div style="padding-top:20px;">
                                        <h6 style="font-weight: 600">{{$t('otc.orderStatus')}}:
                                            <span>{{statusText}}</span>
                                        </h6>
                                    </div>
                                </div> -->
                        </div>
                    </div>
                    </Col>
                    <Col span="20">
                    <div class="rightbox">
                        <Row class="chat-top" type="flex" justify="space-between">
                            <Col span="3" class="order-time">
                            <h5>{{statusText}}</h5>
                            <div v-show="statusBtn==1" class="reserve-time">{{reserveTime}}</div>
                            </Col>
                            <Col span="8" class="order-info">
                            <h5>
                                <label class="order-name">{{$t('otc.order')}}</label>
                                <span>{{msg.orderSn}}</span>
                            </h5>
                            <p>
                                {{$t('otc.and')}}
                                <router-link :to="{ path: '/checkuser', query: { 'id': msg.otherSide }}">{{msg.otherSide}}</router-link>
                                {{$t('otc.sTrade')}}
                            </p>
                            </Col>
                            <Col span="13">
                            <ButtonGroup v-show="statusBtn==1&&tradeType==0">
                                <Button type="primary" @click="modal1 = true">{{$t('otc.paymentCompleted')}}</Button>
                                <Button @click="modal2 = true">{{$t('otc.cancelTrade')}}</Button>
                            </ButtonGroup>
                            <ButtonGroup v-show="statusBtn==2&&tradeType==0">
                                <Button type="primary" @click="modal4 = true">{{$t('otc.orderAppeal')}}</Button>
                                <Button @click="modal2 = true">{{$t('otc.cancelTrade')}}</Button>
                            </ButtonGroup>
                            <ButtonGroup v-show="statusBtn==2&&tradeType==1">
                                <Button type="primary" @click="modal5 = true">{{$t('otc.confirmRelease')}}</Button>
                                <Button @click="modal4 = true">{{$t('otc.orderAppeal')}}</Button>
                            </ButtonGroup>
                            </col>
                        </Row>
                        <Row class="chat-top" type="flex" justify="space-between" v-show="statusBtn!=0">
                            <Col span="12" class="order-info">
                                <span>{{$t('otc.tradePrice')}}(CNY)</span>
                                <h5>{{msg.price}}</h5>
                            </Col>
                            <Col span="12" class="order-info" v-if="bankInfo&&bankInfo!=null">
                                <i class="icons bankfor"></i>
                                <div style="float:left">
                                    <!-- <span>{{payInfo.realName}}</span> -->
                                    <span style="margin-left:5px;">{{bankInfo.branch}}</span>
                                    <p>{{bankInfo.cardNo}}</p>
                                </div>
                            </Col>
                            <Col span="12" class="order-info" v-else>
                                <i class="icons bankfor"></i>
                                <pre></pre>
                                <p style="color:rgb(145, 143, 143)">{{$t('otc.noBankCardTip')}}</p>
                            </Col>

                            <Col span="12" class="order-info">
                                <span>{{$t('otc.tradeAmount')}}({{msg.unit}})</span>
                                <h5>{{msg.amount}}</h5>
                            </Col>
                            <Col span="12" class="order-info" v-if="alipay&&alipay!=null">
                                <i class="icons alipay"></i>
                                <div class='payBlock'>
                                    <span>{{$t('common.alipay')}}</span>
                                    <p>{{alipay.aliNo}}</p>
                                </div>
                                <div v-if="alipay.qrCodeUrl!='' && alipay.qrCodeUrl!=null" class='payInlineBlock' @click="showEwmA">
                                   
                                    <img :src="alipay.qrCodeUrl" alt="" style='width:60px;height:60px;'>
                                </div>

                                <div v-show="isShowEwmA" class="show-qrcode">
                                    <img :src="alipay.qrCodeUrl" style='width:200px;height:200px;' />
                                </div>

                            </Col>
                            <Col span="12" class="order-info" v-else>
                                <i class="icons alipay"></i>
                                <pre></pre>
                                <p style="color:rgb(145, 143, 143)">{{$t('otc.noAlipayTip')}}</p>
                            </Col>

                            <Col span="12" class="order-info">
                                <span>{{$t('otc.tradeMoney')}}(CNY)</span>
                                <h5>{{msg.money}}</h5>
                            </Col>
                            <Col span="12" class="order-info" v-if="wechatPay&&wechatPay!=null">
                                <i class="icons wechat"></i>
                                <div class='payBlock'>
                                    <span>{{$t('common.wechat')}}</span>
                                    <p>{{wechatPay.wechat}}</p>
                                </div>
                                <div v-if="wechatPay.qrWeCodeUrl!='' &&wechatPay.qrWeCodeUrl!=null " class='payInlineBlock' @click="showEwmW">
                                    
                                    <img :src="wechatPay.qrWeCodeUrl" alt="" style='width:60px;height:60px;'>
                                </div>

                                <div v-show="isShowEwmW" class="show-qrcode">
                                    <img :src="wechatPay.qrWeCodeUrl" style='width:200px;height:200px;' />
                                </div>


                            </Col>
                            <Col span="12" class="order-info" v-else>
                                <i class="icons wechat"></i>
                                <pre></pre>
                                <p style="color:rgb(145, 143, 143)">{{$t('otc.noWechatTip')}}</p>
                            </Col>

                        </Row>
                        <chatline :msg="msg"></chatline>
                    </div>
                    </Col>
                </Row>
            </div>
        </div>
        <Modal v-model="modal1" :title="$t('common.tips')" @on-ok="ok1">
            <p style="color:red;font-weight: bold;">{{$t('otc.confirmPaidTip')}}</p>
        </Modal>
        <Modal v-model="modal2" :title="$t('common.tips')" @on-ok="ok2" :loading="isloading">
            <p style="color:red;font-weight: bold;">{{$t('otc.confirmCancelTip1')}}</p>
        </Modal>
        <Modal v-model="modal3" :title="$t('common.tips')" @on-ok="ok3">
            <p style="color:red;font-weight: bold;">{{$t('otc.confirmCancelTip2')}}</p>
        </Modal>
        <Modal v-model="modal4" :title="$t('common.tips')" @on-ok="ok4">
            <Form :model="formItem" :label-width="80">
                <FormItem :label="$t('otc.complaintType')">
                    <Select v-model="formItem.select" :placeholder="$t('common.pleaseSelect')">
                            <Option value="1">{{$t('otc.paidMonenyNoReceived')}}</Option>
                            <Option value="2">{{$t('otc.paidCoinNoReceived')}}</Option>
                        </Select>
                </FormItem>
                <FormItem :label="$t('otc.complaintNote')">
                    <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('otc.iWantComplain')"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="modal5" :title="$t('common.tips')" @on-ok="ok5">
            <p style="color:red;font-weight: bold;">{{$t('otc.whetherConfirmRelease')}}</p>
            <Input v-model="jyPassword" type="password"></Input>
        </Modal>
        <Modal v-model="modal6">
            <p slot="header">
            </p>
            <div style="text-align:center">
                <img style="width: 200px;" :src="payCodeUrl">
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
const dtime = require('time-formater');
var Stomp = require('stompjs');
var SockJS = require('sockjs-client');
import chatline from '../../components/otc/Chatline'
export default {
    components: {
        chatline
    },
    data() {
        return {
            watching:false,
            stompClient:null,
            reserveTime:'00',
            reserveInteval:null,
            fundpwd:'',
            statusBtn: 0,
            tradeType: 0,
            isloading: true,
            payTime: '',
            statusText: '',
            modal1: false,
            modal2: false,
            modal3: false,
            modal4: false,
            modal5: false,
            modal6:false,
            formItem: {
                select: '',
                remark: ''
            },
            msg: {},
            payInfo: {},
            bankInfo: {},
            alipay: {},
            wechatPay: {},
            jyPassword:'',
            payCodeUrl:'',
            isShowEwmA: false,
            isShowEwmW: false,
             qrcode: {
                src: '',
                size: 200,
            },

        }
    },
    created() {
        this.init();
        this.getDetail();
        this.initScok();
    },
    computed: {
        
    },
    methods: {
        init(){
            this.$store.commit('navigate','nav-otc');
        },
        //让浏览器滚动条保持在最低部
        scrollToBottom: function() {
            // window.scrollTo(0, 900000);
        },
        initScok:function(){
          var socket = new SockJS(this.host+'/chat/chat-webSocket');

          this.stompClient = Stomp.over(socket);
          this.stompClient.debug = false;
        //   socket.onclose = function () {
        //       console.log('断开了')
        //   }
         
        },
        // 二维码
        showEwmW() {
            this.isShowEwmA=false;
            this.isShowEwmW = !this.isShowEwmW;
        },
        showEwmA() {
            this.isShowEwmW=false;
            this.isShowEwmA = !this.isShowEwmA;
        },
        watchOrderStutusNotice:function () {
          var self = this;
           
          this.stompClient.connect({}, function(frame) {

            self.stompClient.subscribe('/user/' + self.msg.myId + '/order-notice/' + self.$route.query.tradeId, function (response) {
              var confirmPayMsg =  JSON.parse(response.body);
                self.$Message.success(confirmPayMsg.content);
                self.statusBtn = confirmPayMsg.status;
             
                if (confirmPayMsg.status == 1) {
                  self.statusText = self.$t('otc.chat.result_1');
                  self.msg.status=confirmPayMsg.status;
                  self.setReserveTime();
                }
                 else if (confirmPayMsg.status == 2) {
                 self.statusText = self.$t('otc.chat.result_2');
                  self.msg.status=confirmPayMsg.status;
                } else if (confirmPayMsg.status == 3) {
                 self.statusText = self.$t('otc.chat.result_3');
                  self.msg.status=confirmPayMsg.status;
                 
                } else if (confirmPayMsg.status == 4) {
                  self.statusText = self.$t('otc.chat.result_4');
                  self.msg.status=confirmPayMsg.status;
                  
                } else if (confirmPayMsg.status == 0) {
                  self.statusText = self.$t('otc.chat.result_5');
                  self.msg.status=confirmPayMsg.status;
                }
               
            });
          })
        },
        sendOrderStatusNotice:function(type){
            // this.watchOrderStutusNotice();
            var content = "";
            if(type == 1) content = this.$t('otc.orderStatus1_1');
            else if (type == 3) content =  this.$t('otc.orderStatus1_2');
            else if(type == 4) content =  this.$t('otc.orderStatus1_3');
            else if(type == 5) content =  this.$t('otc.orderStatus1_4');
            var jsonParam = {
              'uidTo': this.msg.hisId,
              'uidFrom': this.msg.myId,
              'orderId': this.$route.query.tradeId,
              'content': content,
              'messageType':0,
            };
            this.stompClient.send("/app/message/chat", {}, JSON.stringify(jsonParam));
        },
        showQRCode:function(type){
          if (type == 1) {
            this.payCodeUrl = this.alipay.qrCodeUrl;
          }else {
            this.payCodeUrl = this.wechatPay.qrWeCodeUrl;
          }
          this.modal6 = true;
        },
        setReserveTime:function () {
            this.getReserveTime();
            this.reserveInteval = setInterval(()=>{
              this.getReserveTime();
            },1000);
        },
        getReserveTime:function () {
            var d1 = new Date();
            var d2 = new Date(this.msg.createTime); 
            var throughSeconds = parseInt(parseInt(d1 - d2) / 1000);
            
            var reserveSeconds = parseInt(this.msg.timeLimit)*60 - throughSeconds-20;
            this.reserveTime = parseInt(reserveSeconds/60) + ":" + (parseInt(reserveSeconds%60) >= 10 ? parseInt(reserveSeconds%60) : "0"+parseInt(reserveSeconds%60));

            console.log(d1,d2,throughSeconds,this.reserveTime)
            if (reserveSeconds <= 0) {
                this.resetStatus();
            }
        },
        resetStatus:function () {//计时时间已到，重置状态
          clearInterval(this.reserveInteval);
          this.statusBtn = 5;
          this.statusText = this.$t('otc.chat.result_6');
          this.ok3();
        },
        appearOrder:function() {
          var nowTime = new Date().getTime();
          var payTime = new Date(this.msg.payTime).getTime();
          if(parseInt((nowTime-payTime)/1000) < 1800){ //付款时间小于30分钟不允许申诉
            this.$Message.info("付款完成30分钟后才允许申诉!");
            return;
          }else {
            this.modal4 = true
          }
        },
        ok1() {
            this.$http.post(this.host + '/otc/order/pay', { orderSn: this.$route.query.tradeId }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(resp.message);
                    this.sendOrderStatusNotice(1);
                    this.getDetail()
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        ok2() {
            setTimeout(() => {
                this.isloading = false
                this.modal2 = false
                this.modal3 = true
            }, 10000)
        },
        ok3() {
            this.$http.post(this.host + '/otc/order/cancel', { orderSn: this.$route.query.tradeId }).then(response => {
                var resp = response.body;
                console.log(resp)
                if (resp.code == 0) {
                    this.$Message.success(resp.message);
                    this.sendOrderStatusNotice(3);
                    this.getDetail()
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        ok4() {
            //时间
            // if (1 == 1) {
                var params = {};
                params['orderSn'] = this.$route.query.tradeId
                params['remark'] = this.formItem.remark

                this.$http.post(this.host + '/otc/order/appeal', params).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success(resp.message);
                        this.sendOrderStatusNotice(4);
                        this.getDetail()
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
            // }
        },
        ok5() {
            this.$http.post(this.host + '/otc/order/release', { orderSn: this.$route.query.tradeId ,jyPassword:this.jyPassword}).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(resp.message);
                    this.sendOrderStatusNotice(5);
                    this.getDetail();
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        getDetail() {
            let self=this;
            //获取个人广告
            this.$http.post(this.host + '/otc/order/detail', { orderSn: this.$route.query.tradeId }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.msg = resp.data
                    this.payInfo = this.msg.payInfo
                    console.log(this.payInfo);
                    if (this.payInfo == null) {
                        this.bankInfo = this.alipay = this.wechatPay == null
                    } else {
                        this.bankInfo = this.msg.payInfo.bankInfo
                        this.alipay = this.msg.payInfo.alipay
                        this.wechatPay = this.msg.payInfo.wechatPay
                    }
                    if(!this.watching) {
                      this.watchOrderStutusNotice();
                      this.watching = true;
                    }

                    this.statusBtn = resp.data.status
                    this.tradeType = resp.data.type
                    
                    if (resp.data.status == 1) {
                        this.statusText = this.$t('otc.waitPaid');
                        this.setReserveTime();
                    } else if (resp.data.status == 2) {
                        this.statusText = this.$t('otc.waitRelease')
                    } else if (resp.data.status == 3) {
                        this.statusText = this.$t('common.completed')
                    } else if (resp.data.status == 4) {
                        this.statusText = this.$t('otc.appealing')
                    } else if (resp.data.status == 0) {
                        this.statusText = this.$t('common.cancelled')
                    }

                } else {
                    this.$Message.error(resp.message);
                }

              
            })
        }
      
    }
}
</script>
<style scoped>
/* right */
.order-info{
    text-align: left;
    padding-left: 8%;
    height: 60px;  
    position:relative;
    margin:15px 0;  
}

.rightbox {
    background: #fff;
    margin-left: 20px;
    padding-bottom: 20px;
    margin-bottom: 40px;
}

.chat-top {
    padding: 30px 0;
    font-size: 14px;
}

.order-time h5 {
    font-size: 16px;
    line-height: 40px;
}

.order-info h5 {
    font-weight: 600;
    font-size: 14px;
}

.icons.alipay {
    background-image: url(../../assets/img/alipay.png);
}

.icons.wechat {
    background-image: url(../../assets/img/wechat.png);
}

.icons {
    height: 17px;
    width: 17px;
    float: left;
    margin: 12px 15px 0 0;
    background-size: 100% 100%;
    vertical-align: middle;
}

.bankfor {
    background-image: url(../../assets/img/bankcard.png);
}

/* chat */


/* left */

.mt20 {
    margin-top: 20px;
}

.leftmenu {
    margin-bottom: 60px;
    background: #fff;
    position: relative;
    min-height: 1px;
    padding: 50px 15px 50px 15px;
    text-align: left;
}

.chat-in-box .chat-in .chat-right .chat-right-in {
    background-color: white;
}

.chat-in-box .chat-in .chat-right .chat-right-in h6 {
    font-size: 15px;
    font-weight: 100;
    color: #23294c;
    min-width: 195px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 8px;
}
.chat-in-box .chat-in .chat-right .chat-right-in .mt20 .tit{
    font-size: 14px;
}

.chat-in-box .chat-in .chat-right .chat-right-in .seller {
    margin-left: 6px;
}

.chat-in-box .chat-in .chat-right .chat-right-in h6 span {
    margin-right: 1px;
}

.chat-in-box .chat-in .chat-right .chat-right-in p {
    color: #333;
    font-size: 12px;
    margin-bottom: 8px;
    line-height: 1.5;
}

.chat-in-box .chat-in .chat-right .chat-right-in p em {
    color: #f40a0a;
    font-style: normal;
}



/* -- */

.content-wrap {
    /* background: #eee; */
    min-height: 515px;
}

.container {

    padding-top: 30px;
    margin: 0 auto;
}
.payBlock{
    display:inline-block;
    width:140px;
    vertical-align: top;
}
.payInlineBlock{
    display:inline-block;
}
.show-qrcode{
    display: inline-block;
    width: 200px;
    position: absolute;
   
    top: -79px;
    z-index: 1;
    left: 378px;

}
</style>

