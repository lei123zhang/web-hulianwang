<template>
    <div class="nav-right">
        <P class='nav-right-tit'><span>{{$t('finance.financeIndex')}}</span></P>
        <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
            <div class="bill_box rightarea padding-right-clear" style='padding-bottom:20px;'> 
                <div class="order-table">
                    <Table stripe :columns="tableColumnsMoney" :data="tableMoney" :loading="loading" :no-data-text="$t('common.nodata')"></Table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {
            loading: true,
            ordKeyword: '',
            tableMoney: [],
        }
    },
    methods: {
        getMoney() {
            //获取
            this.$http.post(this.host + '/uc/asset/wallet').then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.tableMoney = resp.data;
                    for (let i = 0; i < this.tableMoney.length; i++) {
                        this.tableMoney[i]['coinType'] = this.tableMoney[i].coin.unit
                        // console.log(this.tableMoney[i]['coinType'])
                    }
                    this.loading = false
                } else {
                    // this.$Message.error(resp.message);
                }
            })
        },
        getGCCMatchAmount() {
            //获取
            this.$http.post(this.host + '/uc/asset/wallet/match-check').then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                this.canMatch = true;
                this.GCCMatchAmount = resp.data;
              } else {
                this.canMatch = false;
                this.match_msg = resp.message;
                // this.$Message.error(this.loginmsg);
              }
              this.showMatchDailog();
            })
        },
        showMatchDailog() {
          if (this.canMatch)
            this.modal = true;
          else
            this.modal_msg = true;
        },
        matchGCC(){
            if (this.matchAmount <= 0) {
              this.$Message.warning(this.$t('common.matcherr1'));
            }else if(this.matchAmount > this.GCCMatchAmount) {
              this.$Message.warning(this.$t('common.matcherr2'));
            }else {
              //配对
              let params = {};
              params["amount"] = this.matchAmount;
              this.$http.post(this.host + '/uc/asset/wallet/match',params).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Message.success(this.$t('common.matchsuccess'));
                  this.GCCMatchAmount = this.GCCMatchAmount - this.matchAmount;
                } else {
                  this.$Message.error(resp.message);
                }
              })
            }
        },
        resetAddress(unit){
         
            let params = {};
            params["unit"] = unit;
            this.$http.post(this.host + '/uc/asset/wallet/reset-address',params).then(response => {
              var resp = response.body;
              if (resp.code == 0) {
            
                this.$Message.success(this.$t('common.resetsuccess'));
                setTimeout(function () {
                  window.location.reload();
                },3000);
              } else {
                this.$Message.error(resp.message);
              }
            })
        }

    },
    created() {
        this.getMoney()
    },
    computed: {
        tableColumnsMoney() {
            let self = this;
            let columns = [];
            columns.push({
                title: this.$t('finance.coinType'),
                key: 'coinType',
            });
            columns.push({
                title: this.$t('finance.balance'),
                key: 'balance',
            });
            columns.push({
                title: this.$t('finance.frozenBalance'),
                key: 'frozenBalance',
            });
            columns.push({
                title: this.$t('common.operate'),
                key: 'price1',
                // render: function(h, params) {
                //     var actions = [];
                //     if(params.row.coin.canRecharge == 1){
                //         actions.push(h('Button', {
                //                 props: {
                //                     type: 'primary',
                //                     size: 'small',
                //                 },
                //                 on: {
                //                     click: function() {
                //                         self.$router.push('/finance/recharge?name=' + params.row.coin.unit);
                //                     }
                //                 },
                //                 style: {
                //                     marginRight: '8px',
                //                     backgroundColor:'#6060FE',
                //                     borderColor:'#6060FE',
                //                     padding:'3px 14px',
                //                     borderRadius:'5px'
                //                 },
                //             }, self.$t('common.recharge')));
                //     }
                //     if(params.row.coin.canWithdraw == 1){
                //         actions.push(h('Button', {
                //                 props: {
                //                     type: 'primary',
                //                     size: 'small'
                //                 },
                //                 on: {
                //                     click: function() {
                //                         self.$router.push('/finance/withdraw?name=' + params.row.coin.unit);
                //                     }
                //                 },
                //                 style: {
                //                     marginRight: '8px',
                //                     backgroundColor:'#DE9717',
                //                     borderColor:'#DE9717',
                //                     padding:'3px 14px',
                //                      borderRadius:'5px'
                //                 },
                //             }, self.$t('common.withdraw')));
                //     }
                //     return h('p',actions);
                // },
                render: function(h, params) {
                    var actions = [];
                    if(params.row.coin.canRecharge == 1){
                      if (params.row.address != null && params.row.address != "") {
                        actions.push(h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: function() {
                                        self.$router.push('/finance/recharge?name=' + params.row.coin.unit);
                                    }
                                },
                                style: {
                                    marginRight: '8px',
                                    backgroundColor:'#6060FE',
                                    borderColor:'#6060FE',
                                    padding:'3px 14px',
                                    borderRadius:'5px'
                                },
                            }, self.$t('common.recharge')));
                      }else {
                        actions.push(h('Button', {
                          props: {
                            type: 'warning',
                            size: 'small'
                          },
                          on: {
                            click: function() {
                              self.resetAddress(params.row.coin.unit)
                            }
                          },
                          style: {
                                marginRight: '8px',
                                backgroundColor:'#6060FE',
                                borderColor:'#6060FE',
                                padding:'3px 14px',
                                borderRadius:'5px'
                            },
                        }, self.$t('common.getaddress')));
                      }
                    }
                    if(params.row.coin.canWithdraw == 1){
                        actions.push(h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: function() {
                                        self.$router.push('/finance/withdraw?name=' + params.row.coin.unit);
                                    }
                                },
                                 style: {
                                    marginRight: '8px',
                                    backgroundColor:'#DE9717',
                                    borderColor:'#DE9717',
                                    padding:'3px 14px',
                                     borderRadius:'5px'
                                },
                            }, self.$t('common.withdraw')));
                    }
                    if (params.row.coin.unit.toUpperCase() == "GCC") {
                        actions.push(h('Button', {
                          props: {
                            type: 'success',
                            size: 'small'
                          },
                          on: {
                            click: function() {
                              // self.showMatchDailog(params.row);
                              self.getGCCMatchAmount();
                              // self.$router.push('/finance/recharge?name=' + params.row.coin.unit);
                            }
                          },
                          style: {
                            marginRight: '8px',
                          },
                        }, self.$t('common.match')));
                    }
                    return h('p',actions);
                }
            });
            return columns;
        }
    }
}
</script>
<style scoped>
.nav-right {
    height: auto;
    overflow: hidden;
    padding: 0 15px;
}

.rightarea {
    background: #fff;
    padding-left: 15px !important;
    padding-right: 15px !important;
    margin-bottom: 60px !important;
}

.bill_box {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.rightarea {
    background: #fff;
    padding-left: 15px !important;
    padding-right: 15px !important;
    margin-bottom: 60px !important;
}

.rightarea .rightarea-top {
    line-height: 75px;
    border-bottom: #f1f1f1 solid 1px;
}

.rightarea .rightarea-con {
    padding-top: 30px;
    padding-bottom: 125px;
}

.rightarea .trade-process {
    line-height: 30px;
    padding: 0 15px;
    background: #f1f1f1;
    display: inline-block;
    position: relative;
    margin-right: 20px;
}

.rightarea .trade-process.active {
    color: #eb6f6c;
    background: #f9f5eb;
}

.rightarea .trade-process .icon {
    background: #fff;
    border-radius: 20px;
    height: 20px;
    width: 20px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    margin-right: 10px;
}

.rightarea .trade-process .arrow {
    position: absolute;
    top: 10px;
    right: -5px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #f1f1f1;
}

.rightarea .trade-process.active .arrow {
    border-left: 5px solid #f9f5eb;
}

.rightarea .rightarea-tabs {
    border: none;
}

.rightarea .rightarea-tabs li>a {
    width: 100%;
    height: 100%;
    padding: 0;
    margin-right: 0;
    font-size: 14px;
    color: #646464;
    border-radius: 0;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.rightarea .rightarea-tabs li>a:hover {
    background-color: #fcfbfb;
}

.rightarea .rightarea-tabs li {
    width: 125px;
    height: 40px;
    position: relative;
    margin: -1px 0 0 -1px;
    border: 1px solid #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.rightarea .rightarea-tabs li.active {
    background-color: #fcfbfb;
}

.rightarea .rightarea-tabs li:last-child {
    border-right: 1px solid #f1f1f1;
}

.rightarea .rightarea-tabs li.active>a,
.rightarea .rightarea-tabs li:hover>a {
    color: #da2e22;
    border: none;
}

.rightarea .panel-tips {
    border: 3px solid #fdfaf3;
    color: #9e9e9e;
    font-size: 12px;
}

.rightarea .panel-tips .panel-header {
    background: #fdfaf3;
    line-height: 40px;
    margin-bottom: 15px;
}

.rightarea .panel-tips .panel-title {
    font-size: 16px;
}

.rightarea .recordtitle {
    cursor: pointer;
}

.nav-right {
    height: auto;
    overflow: hidden;
    padding: 0 15px;
}

.order_box {
    width: 100%;
    background: #fff;
    height: 56px;
    line-height: 56px;
    margin-bottom: 20px;
    border-bottom: 2px solid #ccf2ff;
    position: relative;
    text-align: left;
}

.order_box a {
    color: #8994A3;
    font-size: 16px;
    padding: 0 30px;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    line-height: 54px;
    display: inline-block;
}

.order_box .active {
    border-bottom: 2px solid #FF8B1A;
}

.order_box .search {
    position: absolute;
    width: 300px;
    height: 32px;
    top: 12px;
    right: 0;
    display: flex;
    /* border: #c5cdd7 solid 1px; */
}
</style>
