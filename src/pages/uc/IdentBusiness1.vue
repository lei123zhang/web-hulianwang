<template>
<div style=" background: #ececec;padding: 81px;min-height:750px;">
    <div class="content">
        <div class="tit">{{$t('uc.identity.apply')}}</div>
        <div class="plancon">
            <span></span>

            <div class="plan">
              <!-- //这里如果activestepindex等于i就是当前的步骤 如果是第三步 那么0 1 2 是有图标的6666草-->
              <div v-for="(step,i) in steps" :key="step" :class="{action:activeStepIndex>=i}">
                {{activeStepIndex>=i?'':i+1}}
                </div>
            </div>

            <!--  -->
            <div class="plans">
                <div v-for="step in steps" :key="step">
                {{step}}
                </div>
            </div>
        </div>
        <div class="xian">

        </div>
      </div>
      <!-- 提交审核中 -->
      <div class="submittedAudit" v-show="activeStepIndex === 1">
          <img src="../../assets/img/audit.png" alt="">
          <h5>{{$t('uc.identity.content1')}}</h5>
      </div>
      <!-- end -->
      <!-- 审核成功 -->
      <div class="auditSuccess" v-show="activeStepIndex === 2">
          <img src="../../assets/img/verified.png" alt="">
          <h5>{{$t('uc.identity.content2')}}</h5>
      </div>
        <!-- 认证商家 -->
        <div class="ipshang content">
            <Row style="margin-top:43px;">
                <Col span="8">
                    <div>
                        <img src="../../assets/img/Exclusive booth.jpg" alt="">
                        <p>{{$t('uc.identity.seat')}}</p>
                    </div>
                </Col>
                <Col span="8">
                    <div>
                      <img src="../../assets/img/One-to-one.jpg" alt="">
                      <p>{{$t('uc.identity.service')}}</p>
                    </div>
                </Col>
                <Col span="8">
                    <div>
                      <img src="../../assets/img/lowest.jpg" alt="">
                      <p>{{$t('uc.identity.lowfee')}}</p>
                    </div>
                </Col>
            </Row>
            <div class="peakfire">
              <!-- {{$t("peakfire.mailboxleft")}}<span>{{$t("peakfire.mailboxcenter")}}</span>{{$t("peakfire.mailboxright")}} -->
              
              {{$t("peakfire.content")}}<span><a style='cursor:default;'>{{$t("peakfire.mailboxcenter")}}</a></span>{{$t("peakfire.end")}}
            </div>
             <p   v-show="activeStepIndex === 0" class="quanyi_title">{{$t('uc.identity.benefits')}}</p>
          
            <Row style="margin-top:50px;line-height: 33px;" class="ip">
                <Col span="8">
                <img src="../../assets/img/accomplish.png" alt="">{{$t('uc.identity.phone')}}
                </Col>
                <Col span="8">
                <img src="../../assets/img/accomplish.png" alt="">{{$t('uc.identity.balance')}}
                </Col>
                <Col span="8">
                <img src="../../assets/img/accomplish.png" alt="">{{$t('uc.identity.cardphoto')}}
                </Col>
                <Col span="8">
                <img src="../../assets/img/accomplish.png" alt="">{{$t('uc.identity.wx')}}
                </Col>
                <Col span="8">
                <img src="../../assets/img/accomplish.png" alt="">{{$t('uc.identity.exchange')}}
                </Col>
                <Col span="8">
                <img src="../../assets/img/accomplish.png" alt="">{{$t('uc.identity.handphoto')}}
                </Col>
                <Col span="8">
                <img src="../../assets/img/accomplish.png" alt="">{{$t('uc.identity.qq')}}
                </Col>
                <Col span="8">
                <img src="../../assets/img/accomplish.png" alt="">{{$t('uc.identity.ploy')}}
                </Col>
            </Row>
        </div>
        <div class="ipshang content" v-show="activeStepIndex === 0">
           
            <div style="text-align: center;font-size: 16px;margin-top:50px">
              <Checkbox v-model="single" ></Checkbox> <router-link to="about-protocol">	{{$t('uc.identity.agreement')}}</router-link>
            </div>
            <div class="sq">
                <Button type="info"  @click="apply">{{$t('uc.identity.applyfor')}}</Button>
            </div>
        </div>

        <!-- 商家end -->
        <!-- 发送邮件 -->
        <div class="mail" v-show="isShowMailt">
            <Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input><br/>
            <Input v-model="value" placeholder="Enter something..." style="width:202px"></Input>
            <Button type="info" >{{$t('uc.identity.sendcode')}}</Button><br/>
            <Button type="info" style="margin-top: 25px; width: 297px;">{{$t('uc.identity.confirm')}}</Button>
        </div>
        <!-- 邮件end -->
    
</div>


</template>
<script>
export default {
    data(){
        return {
            single: false,
            value:'',
            isShowShang:true,
            isShowMailt:false,
            isShowSubmitted:false,
            isShowSuccess:false,
            activeStepIndex:0,
            steps:[this.$t('uc.identity.prepare'),this.$t('uc.identity.review'),this.$t('uc.identity.passed')]
        }
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
          this.steps= [this.$t('uc.identity.prepare'),this.$t('uc.identity.review'),this.$t('uc.identity.passed')];
        },
      init(){
        this.$store.commit('navigate','nav-identbusiness');
      },
      timer() {
          setInterval(()=>{
              this.getSetting();
          },10000)
      },
      getSetting() {
          this.$http.get(this.host + this.api.uc.identification)
          .then(res =>{
              let certifiedBusinessStatus = res.data.data.certifiedBusinessStatus;
              this.activeStepIndex =certifiedBusinessStatus;
          })
          .catch(function (error) {
                console.log(error,999);
          });
      },
      apply(){
        let stasingle =  this.single
        if(stasingle == false){
            this.$Message.success(this.$t('uc.identity.approve'));
            return;
        }
        this.$http.get(this.host + this.api.uc.apply+"?businessAuthDepositId="+''+"&json="+'')
          .then(res =>{
                let suc = res.body.message;
                // console.log(res.body)
                // return false;
                if(res.body.code==0){
                  this.$Message.success(suc);
                }else{
                  this.$Message.error(suc);
                }
                if(suc=='请先完成实名认证'){
                  var that=this;
                  setTimeout(function() {
                    that.$router.push('uc/safe');
                  },1000)
                } 
          })
          .catch(function (error) {
              this.$Message.success(error);
          });
      },

    },
    created(){
        this.init();
        this.getSetting();
        if(this.isLogin){
          this.timer();
        }
    }

};
</script>

<style scoped>
.quanyi_title {
  margin-left: 110px;
  font-size: 18px;
  color: #ff8b1a;
  border-bottom: 1px #ececec dotted;
}
.ip {
  font-size: 16px;
}

.content {
  margin-top: 25px;
  width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  height: 100%;
  background: #fff;
}
.ip .ivu-col {
  line-height: 37px;
  text-align: left;
  padding-left: 139px;
}
.ipshang {
}
.sq {
  width: 1200px;
  margin-top: 50px;
  text-align: center;
  margin-bottom: 50px;
}
.xian {
  width: 100%;
  height: 1px;
  margin-top: 105px;
  /* border-top: 1px #ececec dotted; */
}
.sq button {
  height: 50px;
  font-size: 18px;
  width: 450px;
}
.tit {
  font-size: 16px;
  line-height: 25px;
  border-left: 5px solid #3faef5;
  padding-left: 15px;
}
.plancon {
  width: 64%;
  margin: 49px auto;
  position: relative;
}
.plan {
  position: absolute;
  height: 36px;
  width: 100%;
  top: -13px;
}
.plans {
  position: absolute;
  height: 36px;
  width: 100%;
  top: 13px;
}
.plan div {
  z-index: 99;
  float: left;
  width: 33.33%;
  color: white;
  height: 31px;
  line-height: 31px;
  text-align: center;
  background: url("../../assets/img/2.png") center no-repeat;
  background-size: contain;
}
.action {
  z-index: 99999 !important;
  float: left;
  width: 25%;
  height: 31px;
  line-height: 31px;
  text-align: center;
  background-size: contain;
  background: url("../../assets/img/1.jpg") center no-repeat !important;
}
.plans div {
  z-index: 99;
  float: left;
  width: 33.333%;
  height: 53px;
  line-height: 53px;
  font-size: 14px;
  text-align: center;
  background-size: contain;
}
.plancon span {
  background: #ececec;
  height: 1px;
  width: 65%;
  display: inherit;
  margin: 0 auto;
}
.ivu-col-span-8 p {
  font-size: 19px;
}
.peakfire {
  width: 1000px;
  margin: 0 auto;
  height: 80px;
  line-height: 80px;
  border: 1px solid #eaeaea;
  margin-top: 43px;
  padding-left: 25px;
}
.peakfire span {
  color: #3faef5;
}
.mail {
  width: 1000px;
  margin: 87px auto;
  text-align: center;
  line-height: 50px;
  /* display: none; */
}
.submittedAudit {
  width: 1200px;
  margin: 0 auto;
  padding:0px 0;
  text-align: center;
  background-color:#fff;
  /* display: none; */
}
.auditSuccess {
  width: 1200px;
  margin: 0 auto;
  padding:8px 0;
  text-align: center;
  background-color:#fff;
  /* display: none; */
}
</style>


