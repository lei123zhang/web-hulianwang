<template>
    <div class="login_form">
        <div class="login_left">
            <p style="padding-top:120px;">{{$t('register.leftTip')}}</p>
            <router-link to="login">
                <Button style="background:transparent;width:130px;margin-top:50px;color:#fff;">{{$t('common.login')}}</Button>
            </router-link>
            <div class="login_right" style="padding:70px 30px;">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                    <FormItem style="text-align:center;">
                        <ButtonGroup>
                            <Button v-for="(list,index) in buttonLists" :key="list.text" :class="{ active:changeActive == index}" @click="actives(index)">{{list.text}}</Button>
                        </ButtonGroup>
                    </FormItem>
                    <FormItem prop="user">
                        <Input type="text" v-model="formInline.user" :placeholder="key">

                        </Input>
                    </FormItem>
                    <FormItem prop="code">
                        <Input style="width:68%" type="text" v-model="formInline.code" :placeholder="code">

                        </Input>
                        <input id="sendCode" @click="sendCode()" type="Button" :value="$t('common.sendCode')">

                        </input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" :placeholder="$t('register.newPasswordRule')">

                        </Input>
                    </FormItem>
                    <FormItem prop="repassword">
                        <Input type="password" v-model="formInline.repassword" :placeholder="$t('common.repasswordRule1')">

                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button style="width:100%;" type="info" @click="handleSubmit('formInline')">{{$t('common.save')}}</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
        <Modal v-model="modal1" :mask-closable="false">
            <p slot="header" style="text-align:center">{{$t('register.modaltitle')}}</p>
            <div style="text-align:center">
                <div>
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
<style scoped>
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
    export default {
        data () {
            const validateUser = (rule, value, callback) => {
                if(this.changeActive==0){
                    var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
                    if(value==''){
                        callback(new Error(this.$t('register.phoneRule1')))
                    }else if(!reg.test(this.formInline.user)){
                        callback(new Error(this.$t('register.phoneRule2')));
                    }else{
                        callback();
                    }
                }else{
                    var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
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
                modal1:false,
                _captchaResult:null,
                _captchaReset:null,
                buttonLists:[
                    {
                        "text":this.$t('register.resetPhonePassword')
                    },
                    {
                        "text":this.$t('register.resetEmailPassword')
                    }
                ],
                changeActive:0,
                countdown:60,
                formInline: {
                    user: '',
                    code:'',
                    password: '',
                    repassword:''
                },
                ruleInline: {
                    user: [
                        { validator: validateUser, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: this.$t('register.newPasswordRule'), trigger: 'blur' },
                        { type: 'string', min: 6, message: this.$t('common.passwordRule2'), trigger: 'blur' }
                    ],
                    repassword: [
                        { validator: validateRepassword, trigger: 'blur' },
                        { type: 'string', min: 6, message: this.$t('common.passwordRule2'), trigger: 'blur' }
                    ]
                },
                key:'',
                code:''
            }
        },
        watch:{
            changeActive:function(val){
                this.$refs['formInline'].resetFields();
                if (val == 0) this.initGtCaptcha();
　　　　　　 },
            'lang':function () {
                this.updateLangData();
            }
        },
        computed: {
          'lang': function () {
            return this.$store.state.lang;
          }
        },
        created:function(){
            this.init();
            this.actives(this.changeActive);
        },
        methods: {
            updateLangData(){
                this.buttonLists = [
                    {
                        "text":this.$t('register.resetPhonePassword')
                    },
                    {
                        "text":this.$t('register.resetEmailPassword')
                    }
                ];
                this.ruleInline.password[0].message =  this.$t('register.newPasswordRule');

                if(this.changeActive==0){
                    this.key=this.$t('common.phone');
                    this.code=this.$t('register.code');
                    this.ruleInline.code[0].message=this.$t('register.codeRule');
                }else{
                    this.key=this.$t('common.email');
                    this.code=this.$t('common.emailCode');
                    this.ruleInline.code[0].message=this.$t('register.emailRule');
                }
            },
            init(){
                // this.$store.state.HeaderActiveName='1-4';
                this.initGtCaptcha();
            },
            actives:function(index){
                this.changeActive=index;
                if(this.changeActive==0){
                    this.key=this.$t('common.phone');
                    this.code=this.$t('register.code');
                    this.ruleInline.code[0].message=this.$t('register.codeRule');
                }else{
                    this.key=this.$t('common.email');
                    this.code=this.$t('common.emailCode');
                    this.ruleInline.code[0].message=this.$t('register.emailRule');
                }
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
                    // 将验证码加到id为captcha的元素里，同时会有三个input的值用于表单提交
                    captchaObj.appendTo("#captcha");
                    captchaObj.onReady(function () {
                      $("#wait").hide();
                    });
                    captchaObj.onSuccess(function (){
                      that._captchaResult = captchaObj.getValidate();
                      that.afterValidate();
                    })
                    that._captchaReset=captchaObj;
                  });
                })
            },
            afterValidate(){
                this.settime();
                this.modal1 = false;
                var params = {};
                var resetCode;
                params["account"] = this.formInline.user;
                params["geetest_challenge"] = this._captchaResult.geetest_challenge;//极验验证二次验证表单数据 chllenge
                params["geetest_validate"] = this._captchaResult.geetest_validate;//极验验证二次验证表单数据 validate
                params["geetest_seccode"] = this._captchaResult.geetest_seccode;//极验验证二次验证表单数据 seccode
                
                if(this.changeActive==1){
                    resetCode='/uc/reset/email/code'
                }else{
                    resetCode='/uc/mobile/reset/code'
                }
                this.$http.post(this.host+resetCode,params).then(response => {
                var resp=response.body;
                if(resp.code==0){
                    this.$Notice.success({
                    title: this.$t('common.tips'),
                    desc: resp.message
                    });
                }else{
                    this.countdown=0;
                    this.$Notice.error({
                    title: this.$t('common.tips'),
                    desc: resp.message
                    });
                    this._captchaReset.reset();
                }
                });
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var params={};
                        if(this.changeActive==1){
                            params['account']=this.formInline.user;
                            params['code']=this.formInline.code;
                            params['mode']=1;
                            params['password']=this.formInline.repassword;
                        }else{
                            params['account']=this.formInline.user;
                            params['code']=this.formInline.code;
                            params['mode']=0;
                            params['password']=this.formInline.repassword;
                        }                
                            this.$http.post(this.host+'/uc/reset/login/password',params).then(response => {
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
                var user=this.formInline.user;
                if(this.changeActive==0){
                    if(user==''){
                        this.$Notice.error({
                            title: this.$t('common.tips'),
                            desc: this.$t('register.phoneRule1')
                        });
                        return;
                    } 
                }else{
                    if(user==''){
                        this.$Notice.error({
                            title: this.$t('common.tips'),
                            desc: this.$t('common.emailRule1')
                        });
                        return;
                    }
                }     
                // this.settime();
                this.modal1 = true;
                // this.$http.post(this.host+resetCode,{account:user}).then(response => {
                //         var resp=response.body;
                //         if(resp.code==0){   
                //             this.$Notice.success({
                //                 title: this.$t('common.tips'),
                //                 desc: resp.message
                //             });
                //         }else{
                //             this.countdown=0;
                //             this.$Notice.error({
                //                 title: this.$t('common.tips'),
                //                 desc: resp.message
                //             });
                //         }
                // })
            }
        }
    }
</script>
