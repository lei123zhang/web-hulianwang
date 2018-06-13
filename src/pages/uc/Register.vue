<template>
    <div class="login_form register">
        <div class="login_left">
            <p style="padding-top:120px;">{{$t('register.leftTip')}}</p>
            <router-link to="login">
                <Button style="background:transparent;width:130px;margin-top:50px;color:#fff;">{{$t('common.login')}}</Button>
            </router-link>
            <div class="login_right" style="padding:20px 30px;">
                <Form v-if="allowRegister" ref="formInline" :model="formInline" :rules="ruleInline" inline>
                    <FormItem style="text-align:center;">
                        <ButtonGroup>
                            <Button v-for="(list,index) in buttonLists" :key="list.text" :class="{ active:changeActive == index}" @click="actives(index)">{{list.text}}</Button>
                        </ButtonGroup>
                    </FormItem>
                    <FormItem prop="username">
                        {{$t('register.user')}}
                        <Input type="text" v-model="formInline.username" :placeholder="$t('register.user')">

                        </Input>
                    </FormItem>
                    <FormItem prop="country">
                        {{$t('common.country')}}
                        <Select v-model="formInline.country" :placeholder="$t('common.country')" @on-change="onAreaChange">
                            <Option v-for="area in areas" :value="area.zhName" :key="area.zhName">{{area.zhName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="user">
                        {{key}}
                        <Input v-if="changeActive == 0" type="text" v-model="formInline.user" :placeholder="key">
                            <Select v-model="formInline.areaCode" slot="prepend" style="width: 57px">
                                <Option v-for="itemCode in areas" :value="itemCode.areaCode" :key="itemCode.areaCode">{{ itemCode.areaCode }}</Option>
                            </Select>
                        </Input>
                        <Input v-else type="text" v-model="formInline.user" :placeholder="key">
                        </Input>
                    </FormItem>
                    <FormItem prop="code" v-show="showCode">
                        {{$t('register.code')}}
                        <Input type="text" v-model="formInline.code" :placeholder="$t('register.code')">
                            
                        </Input>
                        <input id="sendCode" @click="sendCode()" type="Button" :value="$t('common.sendCode')">
                            
                        </input>
                    </FormItem>
                    <FormItem prop="password">
                        {{$t('common.loginPwd')}}
                        <Input type="password" v-model="formInline.password" :placeholder="$t('common.loginPwd')">
                            
                        </Input>
                    </FormItem>
                    <FormItem prop="repassword">
                        {{$t('common.repassword')}}
                        <Input type="password" v-model="formInline.repassword" :placeholder="$t('common.repassword')">
                            
                        </Input>
                    </FormItem>
                    <FormItem prop="agentcode" >
                        {{$t('register.agentcode')}}
                        <Input type="text" v-model="formInline.agentcode" :placeholder="$t('register.agentcode')">

                        </Input>
                    </FormItem>
                    <div style="color:#979797;display:inline-block;line-height:30px;font-size:12px;cursor:default">
                        <label>
                            <Checkbox v-model="agree">{{$t('register.agree')}}</Checkbox>
                        </label>
                        <a href="#/about-protocol" target="_blank" style="color:#000;">《{{$t('register.userprotocol')}}》</a>    
                    </div>
                    
                    <FormItem>
                        <Button style="width:100%;" type="info" @click="handleSubmit('formInline')" :disabled="registing" >{{$t('common.register')}}</Button>
                    </FormItem>
                </Form>
                <Alert v-else type="warning">
                    Coming soon!
                    <template slot="desc">
                        CEX will open register in Mar 1st
                    </template>
                </Alert>
            </div>
        </div>
        <Modal v-model="modal1" :mask-closable="false">
        <p slot="header" style="text-align:center">{{$t('register.modaltitle')}}</p>
        <div style="text-align:center">
          <div >
            <div id="captcha">
              <p id="wait" class="show">{{$t('register.validatecodeload')}}......</p>
            </div>
          </div>
          <p id="notice" class="hide">{{$t('register.validatemsg')}}</p>
        </div>
        <p slot="footer"></p>
      </Modal> 
    </div>
</template>
<style>
  /* 验证码 */
  #captcha {
    width: 100%;
    display: inline-block;
  }
  .show {
    display: block;
  }
  .hide {
    display: none;
  }
  #notice {
    color: red;
  }
  #wait {
    text-align: left;
    color: #666;
    margin: 0;
  }
</style>

<script>
  import gtInit from '../../assets/js/gt.js';
  import $ from 'jquery';
    export default {
        data () {
            const validateUser = (rule, value, callback) => {
                if(this.changeActive==0){
                    var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                    if(value==''){
                        callback(new Error(this.$t('register.phoneRule1')))
                    }else if(!reg.test(this.formInline.user)){
                        callback(new Error(this.$t('register.phoneRule2')));
                    }else{
                        callback();
                    }
                }else{
                    var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
                    reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
                    if(value==''){
                        callback(new Error(this.$t('common.emailRule1')))
                    }else if(!reg.test(this.formInline.user)){
                        callback(new Error(this.$t('common.emailRule2')));
                    }else{
                        callback();
                    }
                }
            };
            const validateRepassword = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error(this.$t('common.repasswordRule1')));
                    } else if (value !== this.formInline.password) {
                        callback(new Error(this.$t('common.repasswordRule2')));
                    } else {
                        callback();
                    }
            };
            return {
                registing:false,
                captchaObj:null,
                modal1:false,
                _captchaResult:null,
                agree:true,
                allowRegister:true,
                buttonLists:[
                    {
                       "text":this.$t('register.phoneRegister')
                    },
                    {
                        "text":this.$t('register.emailRegister')
                    }
                ],
                areas:[],
                changeActive:0,
                showCode:true,
                countdown:60,
                formInline: {
                    username:'',
                    country:'',
                    user: '',
                    code:'',
                    areaCode:'',
                    password: '',
                    repassword:'',
                    agentcode:((typeof this.$route.query.agent == "undefined") ? '' : this.$route.query.agent),
                },
                ruleInline: {
                    username: [
                        { required: true, message: this.$t('register.userRule1'), trigger: 'blur' },
                        { type: 'string', min: 3, max: 15, message: this.$t('register.userRule2'), trigger: 'blur' }
                    ],
                    country: [
                        { required: true, message: this.$t('common.countryRule'), trigger: 'blur' }
                    ],
                    user: [
                        { validator: validateUser, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: this.$t('register.codeRule'), trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message:this.$t('register.passwordRule'), trigger: 'blur' },
                        { type: 'string', min: 6, message:this.$t('common.passwordRule2'), trigger: 'blur' }
                    ],
                    repassword: [
                        { validator: validateRepassword, trigger: 'blur' }
                    ]
                },
                key:'',
                code:''
            }
        },
        watch:{
            changeActive:function(val){
                this.$refs['formInline'].resetFields();
                // if (val == 0) this.initGtCaptcha();
　　　　　　  },
          'lang':function () {
            this.updateLangData();
          }
        },
        computed: {
          'lang': function () {
            return this.$store.state.lang;
          },
          'isLogin': function() {
            return this.$store.getters.isLogin;
          },
        },
        created:function(){
            this.init();
            this.actives(this.changeActive);
        },
        methods: {
          updateLangData(){
            this.buttonLists = [
              {
                 "text":this.$t('register.phoneRegister')
              },
              {
                "text":this.$t('register.emailRegister')
              }
            ];
            this.ruleInline.username[0].message = this.$t('register.userRule1');
            this.ruleInline.country[0].message = this.$t('common.countryRule')
            this.ruleInline.password[0].message = this.$t('register.passwordRule');

            if(this.changeActive==0){
              this.key=this.$t('common.phone');
            }else{
               this.key=this.$t('common.email');
            }
          },
            init(){
              if (this.isLogin) {
                this.$router.push('/');
              }
                this.getAreas();
                // this.initGtCaptcha();
            },
          initGtCaptcha(){
            var that = this;
            this.$http.get(this.host + this.api.uc.captcha)
              .then(function(res){
                window.initGeetest({
                  // 以下配置参数来自服务端 SDK
                  gt: res.body.gt,
                  challenge: res.body.challenge,
                  offline: !res.body.success,//表示用户后台检测极验服务器是否宕机
                  new_captcha: res.body.new_captcha,//用于宕机时表示是新验证码的宕机

                  product:"popup",
                  width:"100%"
                }, function (captchaObj){
                  captchaObj.onSuccess(function (){
                    that._captchaResult = captchaObj.getValidate();
                    that.afterValidate();
                  })
                  // 将验证码加到id为captcha的元素里，同时会有三个input的值用于表单提交
                  captchaObj.appendTo("#captcha");
                  that.captchaObj = captchaObj;
                  captchaObj.onReady(function () {
                    $("#wait").hide();
                  });
                });
              })
          },
            onAreaChange(value){
                for(var i=0;i<this.areas.length;i++){
                    if(this.areas[i].zhName == value){
                        this.formInline.areaCode = this.areas[i].areaCode;
                    }
                }
            },
            getAreas(){
                this.$http.post(this.host + this.api.common.area).then(response => {
                    var resp = response.body;
                    this.areas = resp.data;
                    this.formInline.country = this.areas[0].zhName;
                    this.formInline.areaCode = this.areas[0].areaCode;
                });
            },
            actives:function(index){
                this.changeActive=index;
                if(this.changeActive==0){
                    this.showCode=true;
                    this.key=this.$t('common.phone');
                    this.ruleInline.code=[{ required: true, message:this.$t('register.codeRule'), trigger: 'blur' }];

                }else{
                    this.showCode=false;
                    this.key=this.$t('common.email');
                    this.ruleInline.code=[];
                }
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.agree==true){
                            if(this.changeActive==1){
                              this.openValidateModal();
                            }else{
                                this.registing = true;
                                var params={};
                                params['phone']=this.formInline.user;
                                params['username']=this.formInline.username;
                                params['password']=this.formInline.password;
                                params['code']=this.formInline.code;
                                params['country']=this.formInline.country;
                                params["promotion"] = this.formInline.agentcode;

                                this.$http.post(this.host+'/uc/register/phone',params).then(response => {
                                    this.registing = false;
                                    var resp=response.body;
                                    if(resp.code==0){
                                        this.$Notice.success({
                                            title: this.$t('common.tips'),
                                            desc: resp.message
                                        });
                                      var that=this;
                                        setTimeout(() => {
                                            that.$router.push('login');
                                        },3000)
                                    }else{
                                        this.$Notice.error({
                                            title: this.$t('common.tips'),
                                            desc: resp.message
                                        });
                                    }
                                })
                            }
                        }else{
                            this.$Notice.error({
                                title: this.$t('common.tips'),
                                desc: this.$t('common.agreeTips')
                            });
                        }

                    } else {

                    }
                })
            },
            settime(){
                var obj=document.getElementById('sendCode');
                if(this.countdown == 0) {
                    obj.removeAttribute("disabled");
                    obj.value = this.$t('common.sendCode');
                    this.countdown = 60;
                    return;
                }else{
                    obj.setAttribute("disabled", true);
                    obj.value = this.countdown;
                    this.countdown--;
                }
                var that=this;
                setTimeout(function() {
                    that.settime()
                }, 1000)
            },
            sendCode(){
                this.settime();
                var mobilePhone=this.formInline.user;
                if(mobilePhone==""){
                    this.countdown=0;
                    this.$Notice.error({
                        title: this.$t('common.tips'),
                        desc: this.$t('register.phoneRule1')
                    });
                    return;
                }
                var country = this.formInline.country;
                if(country==""){
                  this.countdown=0;
                  this.$Notice.error({
                    title: this.$t('common.tips'),
                    desc: this.$t('common.countryRule')
                  });
                  return;
                }
                this.openValidateModal();
            },
          openValidateModal(){
            if (this.captchaObj != null && this.captchaObj.reset) {
              this.captchaObj.reset();
            }else {
              this.initGtCaptcha();
            }
            this.modal1 = true;
          },
          afterValidate(){
            this.modal1 = false;
            if(this.changeActive==1) {
              var params={};
              params['email']=this.formInline.user;
              params['password']=this.formInline.password;
              params['username']=this.formInline.username;
              params['country']=this.formInline.country;
              params['promotion']=this.formInline.agentcode;
              params["geetest_challenge"] = this._captchaResult.geetest_challenge;//极验验证二次验证表单数据 chllenge
              params["geetest_validate"] = this._captchaResult.geetest_validate;//极验验证二次验证表单数据 validate
              params["geetest_seccode"] = this._captchaResult.geetest_seccode;//极验验证二次验证表单数据 seccode

              this.$http.post(this.host+'/uc/register/email',params).then(response => {
                var resp=response.body;
                if(resp.code==0){
                  this.$Notice.success({
                    title: this.$t('common.tips'),
                    desc: resp.message
                  });
                  var that=this;
                  setTimeout(() => {
                    that.$router.push('login');
                  },3000)
                }else{
                  this.$Notice.error({
                    title: this.$t('common.tips'),
                    desc: resp.message
                  });
                }
              });
            }else {
              var params = {};
              params["phone"] = this.formInline.user;
              params["country"] = this.formInline.country;//国家中文名
              params["geetest_challenge"] = this._captchaResult.geetest_challenge;//极验验证二次验证表单数据 chllenge
              params["geetest_validate"] = this._captchaResult.geetest_validate;//极验验证二次验证表单数据 validate
              params["geetest_seccode"] = this._captchaResult.geetest_seccode;//极验验证二次验证表单数据 seccode
              this.$http.post(this.host+'/uc/mobile/code',params).then(response => {
                this.countdown=60;
                var resp=response.body;
                if(resp.code==0){
                  this.$Notice.success({
                    title: this.$t('common.tips'),
                    desc: resp.message
                  });
                }else{
                  // this.countdown=0;
                  this.$Notice.error({
                    title: this.$t('common.tips'),
                    desc: resp.message
                  });
                }
              });
            }
          }
        }
    }
</script>

