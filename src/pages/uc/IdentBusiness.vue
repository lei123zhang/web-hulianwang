<template>
<div style=" background: #ececec;padding: 81px;padding-top: 20px;">
    <div class="content">
        <!---->
        <!--<div class="tit">{{$t('uc.identity.apply')}}</div>-->
        <!--<div class="plancon">-->
        <!--<span></span>-->

        <!--<div class="plan">-->
        <!--<div v-for="(step,i) in steps" :key="step" :class="{action:activeStepIndex>=i}">-->
        <!--{{activeStepIndex>=i?'':i+1}}-->
        <!--</div>-->
        <!--</div>-->

        <!--<div class="plans">-->
        <!--<div v-for="step in steps" :key="step">-->
        <!--{{step}}-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <div style="width: 80%;margin: 0 auto;margin-bottom: 60px;">
            <div class="ident-title" v-if="certStatus === 0">
                <h3>{{$t('otc.identBusiness.apply')}}</h3>
                <p style="font-size: 14px;margin-top: 10px">{{$t('otc.identBusiness.advantage')}}</p>
            </div>
            <div class="ident-title" v-else-if="certStatus == 1">
                <h3>{{$t('otc.identBusiness.state1')}}</h3>
            </div>
            <div class="ident-title" v-else-if="certStatus == 2">
                <h3>{{$t('otc.identBusiness.state2')}}</h3>
            </div>
            <div class="ident-title" v-else-if="certStatus == 3">
                <h3>{{$t('otc.identBusiness.state3')}}</h3>
            </div>
            <div class="ident-title" v-else-if="certStatus == 5">
                <h3>{{$t('otc.identBusiness.state4')}}</h3>
            </div>
            <div class="ident-title" v-else-if="certStatus == 6">
                <h3>{{$t('otc.identBusiness.state5')}}</h3>
            </div>
            <div class="ident-title" v-else-if="certStatus == 7">
                <h3>{{$t('otc.identBusiness.state6')}}</h3>
            </div>

            <Steps class="apply-step" :current="certStatus == 2 ? 3 : certStatus == 3 ? 2 : certStatus" :status="certStatus == 3 ? 'error' :'finish'" v-if="certStatus != 0 && certStatus != 5 && certStatus != 6 && certStatus != 7">
                <Step :title="$t('otc.identBusiness.step1')"></Step>
                <Step :title="$t('otc.identBusiness.step2')"></Step>
                <Step :title="certStatus == 1 || certStatus == 0  ? $t('otc.identBusiness.result') : certStatus == 2 ? $t('otc.identBusiness.result1') : $t('otc.identBusiness.result2') "></Step>
            </Steps>

            <Steps class="apply-step" :current="certStatus == 5 ? 1 : certStatus == 6 ? 2 : 3" :status="certStatus == 6 ? 'error':'finish'" v-if="certStatus == 5 || certStatus == 6 || certStatus == 7">
                <Step :title="$t('otc.identBusiness.step3')"></Step>
                <Step :title="$t('otc.identBusiness.step4')"></Step>
                <Step :title="certStatus == 5 ? $t('otc.identBusiness.result') : certStatus == 6 ? $t('otc.identBusiness.result2') :  $t('otc.identBusiness.result3')"></Step>
            </Steps>

            <div v-if="certStatus == 6" style="width: 500px;margin: 0 auto;text-align: center;">
                <Button type="info" style="width: 120px;background:#313654;border-color:#313654" @click="modal_return=true" long size="large">{{$t('otc.identBusiness.step5')}}</Button>
                <div class="fail-reason" style="margin-top: 50px;font-size: 16px;">
                    <Icon type="alert" color="red" size="16" /><span style="margin-left: 10px;">{{$t('otc.identBusiness.reason')}}：{{refuseReason}}</span>
                </div>
            </div>

            <div v-if="certStatus == 7" style="width: 500px;margin: 0 auto;text-align: center;">
                <Button type="info" style="width: 120px;background:#313654;border-color:#313654" @click="modal_read=true" long size="large">{{$t('otc.identBusiness.step6')}}</Button>
            </div>

            <div v-if="certStatus == 3" style="width: 500px;margin: 0 auto;text-align: center;">
                <Button type="info" style="width: 120px;background:#313654;border-color:#313654" @click="modal_read=true" long size="large">{{$t('otc.identBusiness.step5')}}</Button>
                <div class="fail-reason" style="margin-top: 50px;font-size: 16px;">
                    <Icon type="alert" color="red" size="16" /><span style="margin-left: 10px;">{{$t('otc.identBusiness.reason')}}：{{certReason}}</span>
                </div>
            </div>

            <div v-else-if="certStatus == 2" style="width: 500px;margin: 0 auto;text-align: center;">
                <Button type="info" style="width: 120px;background:#313654;border-color:#313654" @click="publishAd" long size="large">{{$t('otc.identBusiness.advpush')}}</Button>
                <div style="margin-top: 30px;font-size: 16px;text-align: center;">
                    <a @click="returnAdit" style="color: #aaa;">{{$t('otc.identBusiness.step7')}}</a>
                </div>
            </div>
        </div>
        <!--<div class="xian"></div>-->
        <!-- 认证商家 -->
        <!-- <div class="ipshang" :class="certStatus != 0 ? 'applying' : ''"> -->
        <div class="ipshang" :class="certStatus != 0 ? 'applying' : ''">
            <div class="ident-title" v-if="certStatus == 3">
                <h3 style="font-size: 20px">{{$t('otc.identBusiness.apply')}}</h3>
                <p style="font-size: 14px;margin-top: 10px">{{$t('otc.identBusiness.content1')}}</p>
            </div>
            <div class="ident-title" v-else-if="certStatus == 2">
                <h3>{{$t('otc.identBusiness.authority')}}</h3>
            </div>
            <Row style="margin-top:40px;">
                <Col span="8">
                <div class="business-function">
                    <img alt="" src="../../assets/images/business_show.png" width="300px">
                    <p style="padding: 20px 0;font-weight: 600;font-size: 18px">{{$t('uc.identity.seat')}}</p>
                    <span style="font-size: 14px;">{{$t('otc.identBusiness.authority1')}}</span>
                </div>
                </Col>
                <Col span="8">
                <div class="business-function">
                    <img alt="" src="../../assets/images/business_service.png" width="300px">
                    <p style="padding: 20px 0;font-weight: 600;font-size: 18px">{{$t('uc.identity.service')}}</p>
                    <span style="font-size: 14px;">{{$t('otc.identBusiness.authority2')}}</span>
                </div>
                </Col>
                <Col span="8">
                <div class="business-function">
                    <img alt="" src="../../assets/images/business_fee.png" width="300px">
                    <p style="padding: 20px 0;font-weight: 600;font-size: 18px">{{$t('uc.identity.lowfee')}}</p>
                    <span style="font-size: 14px;">{{$t('otc.identBusiness.authority3')}}</span>
                </div>
                </Col>
            </Row>

            <div v-show="certStatus === 0" style="    text-align: center;font-size: 16px;margin-top:50px">
                <Checkbox v-model="single"></Checkbox> <span>{{$t('otc.identBusiness.authority4')}}</span>
                <router-link target="_blank" to="/about-merchant" class="cur">{{$t('uc.identity.agreement')}}</router-link>
            </div>
            <div v-show="certStatus === 0" class="sq">
                <Button type="info" @click="apply">{{$t('otc.identBusiness.step8')}}</Button>
            </div>
        </div>

        <!-- 商家end -->
        <!-- 发送邮件 -->
        <div class="mail" v-show="isShowMailt">
            <Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input><br/>
            <Input v-model="value" placeholder="Enter something..." style="width:202px"></Input>
            <Button type="info">{{$t('uc.identity.sendcode')}}</Button><br/>
            <Button type="info" style="margin-top: 25px; width: 297px;">{{$t('uc.identity.confirm')}}</Button>
        </div>
        <!-- 邮件end -->
    </div>
    <!-- 提交审核中 -->
    <div class="submittedAudit" v-show="activeStepIndex === 1">
        <img src="../../assets/img/accomplish.png" alt="">
    </div>
    <!-- end -->
    <!-- 审核成功 -->
    <div class="auditSuccess" v-show="activeStepIndex === 2">
        <img src="../../assets/img/accomplish.png" alt="">
    </div>

    <Modal v-model="modal_read">
        <p slot="header">
            <span class="tit">{{$t('otc.identBusiness.operate1')}}</span>
        </p>
        <div class="apply-note">
            <h3 style="padding-top: 10px;">{{$t('otc.identBusiness.operate11')}}</h3>
            <p>{{$t('otc.identBusiness.operate12')}}<br>{{$t('otc.identBusiness.operate13')}}</p>
            <h3>{{$t('otc.identBusiness.operate14')}}</h3>
            <p>{{$t('otc.identBusiness.operate15')}}</p>
            <h3>{{$t('otc.identBusiness.operate16')}}</h3>
            <p>{{$t('otc.identBusiness.operate17')}}</p>
            <div style="text-align: left;padding: 30px 0;">
                <Checkbox v-model="agreeFrozen"></Checkbox> <span>{{$t('otc.identBusiness.operate18')}}<font color="#2AABFE">{{auditText}}</font>{{$t('otc.identBusiness.operate19')}}</span>
            </div>
            <Button type="info" @click="apply2" long style="font-size: 16px;">{{$t('otc.identBusiness.operate20')}}</Button>
        </div>
        <p slot="footer">
            <!--<span style="text-align: left">-->
            <!--<Checkbox v-model="agreeFrozen" ></Checkbox> <span>同意冻结{{auditText}}作为商家保证金</span>-->
            <!--</span>-->
            <!--<Button type="info" @click="apply2">申请成为商家</Button>-->
        </p>
    </Modal>

    <Modal v-model="modal_apply">
        <p slot="header"></p>
        <div class="apply-content">
            <div class="apply-title">
                <h3>{{$t('otc.identBusiness.operate2')}}</h3>
                <p>{{$t('otc.identBusiness.operate21')}}</p>
            </div>
            <Form class="apply-form" :model="apply_form" label-position="top">
                <FormItem :label="$t('common.phone')">
                    <Input v-model="apply_form.telno"></Input>
                </FormItem>
                <FormItem :label="$t('otc.identBusiness.weixin')">
                    <Input v-model="apply_form.wechat"></Input>
                </FormItem>
                <FormItem label="QQ">
                    <Input v-model="apply_form.qq"></Input>
                </FormItem>
                <Row>
                    <Col span="8">
                    <FormItem :label="$t('otc.identBusiness.tit1')">
                        <Select v-model="apply_form.coinSymbol" :placeholder="$t('otc.identBusiness.tit2')" @on-change="onCoinChange">
                            <Option v-for="(item,index) in auditCurrency" :value="item.coin.unit"></Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="8"><span>&nbsp;</span></Col>
                    <Col span="8">
                        <FormItem :label="$t('otc.identBusiness.tit3')">
                            <Label v-model="apply_form.amount">{{apply_form.amount}}</Label>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Upload type="drag" ref="upload" :on-success="assetHandleSuccess" :headers="uploadHeaders" :action="uploadUrl" :on-remove="assetRemove">
                            
                            <img  v-if='isAssetHandImg' :src="assetHandImg" alt="" style='height:100px;width:100px;'>
                            <span  v-else style="line-height: 100px;font-size: 50px" >+</span>
                        </Upload>
                        
                        <span>{{$t('otc.identBusiness.operate22')}}</span>
                    </Col>
                    <Col span="8"><span>&nbsp;</span></Col>
                    <Col span="8">
                        <Upload type="drag" ref="upload" :on-success="tradeHandleSuccess" :headers="uploadHeaders" :action="uploadUrl" :on-remove="tradeRemove">
                            <img  v-if='isTradeHandImg' :src="tradeHandImg" alt="" style='height:100px;width:100px;'> 
                            <span  v-else style="line-height: 100px;font-size: 50px" >+</span>
                        </Upload>
                        <span>{{$t('otc.identBusiness.operate23')}}</span>
                    </Col>
                </Row>
                <FormItem style="margin-top: 20px;">
                    <Button style="width:100%;" type="info" @click="apply3('apply_form')" :disabled="applyBtn">{{$t('otc.identBusiness.step8')}}</Button>
                </FormItem>
            </Form>
        </div>
        <p slot="footer"></p>
    </Modal>

    <Modal v-model="modal_return" @on-ok="returnAudit">
        <p slot="header" style="text-align: center;">{{$t('common.tip')}}</p>
        <p style="text-align: center;font-size: 14px;">{{$t('otc.identBusiness.operate3')}}</p>
        <p style="text-align: center;font-size: 14px;">{{$t('otc.identBusiness.operate31')}}</p>
        <Input v-model="returnReason" type="textarea" :placeholder="$t('otc.identBusiness.operate32')" :rows="4"></Input>
    </Modal>
</div>


</template>
<script>
export default {
    data(){
        return {
            loginmsg:this.$t('common.logintip'),
            single: false,
            value:'',
            isShowShang:true,
            isShowMailt:false,
            isShowSubmitted:false,
            isShowSuccess:false,
            activeStepIndex:0,
            emailAdress:'kefu@caymanex.pro',
            steps:[this.$t('uc.identity.prepare'),this.$t('uc.identity.review'),this.$t('uc.identity.passed')],
            certStatus:0,  //认证申请状态，0:未申请，1：审核中，2：已认证，3：认证失败
            certReason:'',
            auditCurrency:'',
            auditText:'',
            modal_read:false,
            modal_return:false,
            agreeFrozen:false,
            modal_apply:false,
            applyBtn:false,
            apply_form:{
                telno:"",
                wechat:"",
                qq:"",
                coinSymbol:"",
                amount:"",
                assetData:"",
                tradeData:"",
            },
            uploadHeaders:{'x-auth-token':localStorage.getItem('TOKEN')},
            uploadUrl:this.host+'/uc/upload/local/image',
            returnReason:'',
            refuseReason:'',
            assetHandImg:'',
            tradeHandImg:'',
            isAssetHandImg:false,
            isTradeHandImg:false,
        }
    },
    methods: {
    islogin(){
        let self = this
        this.$http.post(this.host + '/uc/approve/security/setting').then(response => {
            var resp = response.body;
            if (resp.code == 0) {
                if (resp.data.realName == null || resp.data.realName == "") {
                this.$Modal.confirm({
                    content:this.$t('otc.warnings.submittip1'),
                    okText:this.$t('otc.warnings.okText'),
                    // cancelText:this.$t('otc.warnings.cancelText'),
                    onOk:()=>{
                        this.$router.push('/uc/safe');
                    }
                    });
                } else if (resp.data.phoneVerified == 0) {
                this.$Modal.confirm({
                    content:this.$t('otc.warnings.submittip2'),
                    okText:this.$t('otc.warnings.okText1'),
                    cancelText:this.$t('otc.warnings.cancelText'),
                    onOk:()=>{
                        this.$router.push('/uc/safe');
                    }
                    });
                } else if (resp.data.fundsVerified == 0) {
                this.$Modal.confirm({
                    content:this.$t('otc.warnings.submittip3'),
                    okText:this.$t('otc.warnings.okText2'),
                    cancelText:this.$t('otc.warnings.cancelText'),
                    onOk:()=>{
                        this.$router.push('/uc/safe');
                    }
                    });
                }
            } else {
                this.$Message.error(resp.message);
            }
        })
    },
    timer() {
            setInterval(()=>{
                this.getSetting();
            },10000)
        },
        publishAd(){
        this.$router.push('/otc/ad/create');
    },
    returnAdit(){
        this.modal_return = true;
    },
    returnAudit(){
        var params = {};
        params["detail"] = this.returnReason;
        this.$http.post(this.host + '/uc/approve/cancel/business',params).then(res =>{
            let resp = res.body;
            if (resp.code == 0) {
                this.$Message.success(this.$t('otc.identBusiness.step9'));
                this.modal_return = false;
                this.getSetting();
            }else {
                this.$Message.error(resp.message);
            }
        });
    },
    getAudiCoin(symbol) {
        var coin = null;
        for (var i=0;i<this.auditCurrency.length;i++) {
            if (symbol == this.auditCurrency[i].coin.unit) {
                coin = this.auditCurrency[i];
                break;
            }
        }
        return coin;
    },
    onCoinChange(value){
        var coin = this.getAudiCoin(value);
        if (coin != null) {
            this.apply_form.amount = coin.amount;
        }
    },
    getSetting() {
        this.$http.get(this.host + this.api.uc.identification)
            .then(res =>{
                let certifiedBusinessStatus = res.body.data.certifiedBusinessStatus;
                this.activeStepIndex = certifiedBusinessStatus;
                this.certStatus = certifiedBusinessStatus;
                this.certReason = res.body.data.detail;
                this.refuseReason = res.body.data.reason;
            })
            .catch(function (error) {

            });
    },
    assetHandleSuccess(res,file){
        this.apply_form.assetData =this.assetHandImg= this.url+res.data;
        this.isAssetHandImg=true;
    },
    tradeHandleSuccess(res,file){
        this.apply_form.tradeData =this.tradeHandImg= this.url+res.data;
        this.isTradeHandImg=true;
    },
    assetRemove(file,fileList){
        this.apply_form.assetData = "";
    },
    tradeRemove(file,fileList){
        this.apply_form.tradeData = "";
    },
    getAuthFound(){
        this.$http.get(this.host + "/uc/approve/business-auth-deposit/list").then(res =>{
            var resp = res.body;
            if (resp.code == 0) {
            this.auditCurrency = resp.data;
            var tempText = "";
            for (var i=0;i<resp.data.length;i++) {
                if (i == 0) {
                this.apply_form.coinSymbol = resp.data[i].coin.unit;
                this.apply_form.amount = resp.data[i].amount;
                }
                tempText += resp.data[i].amount + this.$t('otc.identBusiness.num')+resp.data[i].coin.unit;
                if (i < resp.data.length - 1) tempText += this.$t('otc.identBusiness.or');
            }
            this.auditText = tempText;
            }
        })
    },
    apply(){
        let stasingle =  this.single
        if(stasingle == false){
            this.$Message.warning(this.$t('uc.identity.approve'));
            return;
        }
        this.modal_read=true;
        return;

        this.$http.get(this.host + this.api.uc.apply).then(res =>{
            var resp = res.body;
            if (resp.code == 0) {
                this.$Message.success(resp.message);
                this.activeStepIndex = 1;
            }else {
                this.$Message.warning(resp.message);
            }
            }).catch(function (error) {
                this.$Message.error(error);
            });
    },
    apply2(){
        let agreeFrozen =  this.agreeFrozen;
        if(agreeFrozen == false){
            this.$Message.warning(this.$t('otc.identBusiness.warning1'));
            
            return;
        }
        this.modal_read=false;
        this.modal_apply=true;
    },
    apply3(form){
        if (this.apply_form.telno == "") {
            this.$Message.error(this.$t('otc.identBusiness.required1'));
            return;
        }
        if (this.apply_form.wechat == "") {
            this.$Message.error(this.$t('otc.identBusiness.required2'));
            return;
        }
        if (this.apply_form.qq == "") {
            this.$Message.error(this.$t('otc.identBusiness.required3'));
            return;
        }
        if (this.apply_form.assetData == "") {
            this.$Message.error(this.$t('otc.identBusiness.required4'));
            return;
        }
        if (this.apply_form.tradeData == "") {
            this.$Message.error(this.$t('otc.identBusiness.required5'));
            return;
        }
        var params = {};
            params["businessAuthDepositId"] = this.getAudiCoin(this.apply_form.coinSymbol).id;
            params["json"] = JSON.stringify(this.apply_form);
            this.$http.post(this.host + "/uc/approve/certified/business/apply",params).then(res =>{
            var resp = res.body;
            if (resp.code == 0) {
                this.$Message.success(this.$t('otc.identBusiness.step9'));
                this.modal_apply = false;
                this.certStatus = 1;
            }else {
                this.$Message.error(resp.message);
            }
        })
    }

    },
    created(){
    //this.timer();
        this.islogin();
        this.getSetting();
        this.getAuthFound();
    }

};
</script>

<style scoped>
.content {
  width: 1200px;
  margin: 0 auto;
  padding-top: 30px;
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
.ipshang.applying {
  background: #f5f5f5;
  padding: 40px 0;
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
  border-top: 1px #ececec dotted;
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
  background: url("../../assets/img/1.png") center no-repeat !important;
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
  display: none;
}
.submittedAudit {
  width: 1000px;
  margin: 87px auto;
  text-align: center;
  display: none;
}
.auditSuccess {
  width: 1000px;
  margin: 87px auto;
  text-align: center;
  display: none;
}
.apply-note{
  font-size: 14px;
}
  .apply-note h3{
    padding: 20px 0;font-size: 16px;
  }
.apply-note ul{
  list-style: initial;
  padding-left: 20px;
}
.apply-content{
  width: 80%;
  margin: 0 auto;
}
.apply-title{
  text-align: center;
}
.apply-title h3{
  font-size: 20px;
}
.apply-title p{
  font-size: 14px;
  padding: 10px 0;
}
.ident-title{
  text-align: center;
  font-size: 20px;
}
  .apply-step{
    padding: 50px 0;
    margin-left: 150px;
  }
  .apply-step .ivu-steps-title{
    display: block;
  }
  .business-function{
    width: 300px;
    margin: 0 auto;
    border: 1px solid #d4d4d4;
    padding-bottom: 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

</style>
<style>
  .ivu-form-item{
    margin-bottom: 15px;
  }
  .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner {
    background-color: #313654 !important;
    border-color: #313654 !important;
  }
  .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner>.ivu-steps-icon, .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner span {
    color: #fff !important;
  }
  .ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner {
    border-color: #313654 !important;
    background-color: #313654 !important;
  }
  .ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail>i:after {
    background: #313654 !important;
  }
</style>

