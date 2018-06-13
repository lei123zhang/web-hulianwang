<template>
    <div class="login_form">
        <div class="login_left">
            <p style="padding-top:120px;">{{$t('login.leftTip')}}</p>
            <router-link to="register">
                <Button style="background:transparent;width:130px;margin-top:50px;color:#fff;">{{$t('common.register')}}</Button>
            </router-link>
            <div class="login_right" style="padding:80px 30px;">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                    <div class="login_title">{{$t('login.rightTip')}}</div>
                    <FormItem prop="user">
                        <Input type="text" v-model="formInline.user" :placeholder="$t('login.user')">

                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" :placeholder="$t('common.password')">

                        </Input>
                    </FormItem>
                    <div>
                        <div id="captcha">
                            <p id="wait" class="show">{{$t('login.captchaShow')}}</p>
                        </div>
                    </div>
                    <br>
                    <p id="notice" class="hide">{{$t('login.captchaHide')}}</p>
                    <p style="height:25px;">
                        <router-link to="/findPwd" style="color:#979797;float:right;padding-right:10px;font-size:12px;">
                            {{$t('login.findPwd')}}
                        </router-link>
                    </p>
                    <FormItem>
                        <Button style="width:100%;" type="info" @click="handleSubmit('formInline')">{{$t('common.login')}}</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
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

    /*  */
</style>
<script>
import gtInit from '../../assets/js/gt.js';
import $ from 'jquery';
export default {
    data() {
        return {
            _captchaResult:null,
            _captchaReset:null,
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: this.$t('login.userRule'), trigger: 'blur' }
                ],
                password: [
                    { required: true, message: this.$t('common.passwordRule1'), trigger: 'blur' },
                    { type: 'string', min: 6, message: this.$t('common.passwordRule2'), trigger: 'blur' }
                ]
            }
        }
    },
    created: function() {
        this.init();
    },
    methods: {
        init() {
            this.initGtCaptcha();
        },
        initGtCaptcha(){
            var that = this;
            this.$http.get(this.host + this.api.uc.captcha)
            .then(function(res){
                window. initGeetest({
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
                    })
                    that._captchaReset=captchaObj;
                });
            })
        },
        logout() {
            this.$http.post(this.host + '/uc/logout', {}).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    localStorage.setItem('MEMBER', JSON.stringify(null));
                    localStorage.setItem('TOKEN', null);
                } else {
                    // this.$Message.error(resp.message);
                }
            })
        },
        handleSubmit(name) {
            var result = this._captchaResult;
            if (!result) {
                $("#notice").show();
                setTimeout(function () {
                    $("#notice").hide();
                }, 2000);
            }else{
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var params = {};
                        params['username'] = this.formInline.user;
                        params['password'] = this.formInline.password;
                        params["geetest_challenge"] = this._captchaResult.geetest_challenge;//极验验证二次验证表单数据 chllenge
                        params["geetest_validate"] = this._captchaResult.geetest_validate;//极验验证二次验证表单数据 validate
                        params["geetest_seccode"] = this._captchaResult.geetest_seccode;//极验验证二次验证表单数据 seccode
                        this.$http.post(this.host + this.api.uc.login, params).then(response => {
                            var resp = response.body;
                            if (resp.code == 0) {
                                this.$Message.success(this.$t('login.success'));
                                this.$store.commit('setMember',response.body.data);
                                var that = this;
                                this.$router.push('/');
                                } else {
                                    this.$Message.error(resp.message);
                                    this._captchaReset.reset();
                                }
                            })
                        } else {

                        }
                    })
                }
            }
        }
}
</script>
