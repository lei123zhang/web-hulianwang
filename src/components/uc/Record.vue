<template>
    <div class="nav-right">
        <P class='nav-right-tit'><span>{{$t('finance.financeRecord')}}</span></P>
        <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
            <div class="bill_box rightarea padding-right-clear record">
                <div class="col-xs-12 rightarea-con">
                    <div class="form-group"   :model="formValidate" >
                        <span>
                            {{$t('finance.startTime')}} ：
                        </span>
                        <DatePicker type="date" v-model="formValidate.firstDate" style="width:120px"></DatePicker>
                        <span>
                            {{$t('finance.to')}}
                        </span>
                        <DatePicker type="date" v-model="formValidate.lastDate"  style="width:120px"></DatePicker>
                        <span>
                              {{$t('finance.select')}}
                        </span>
                        <Select v-model="formValidate.coins" style="width:130px"  :placeholder="$t('common.pleaseSelect')">
                            <Option v-for="item in coins" :value="item"  :key="item"  >{{ item }}</Option>
                        </Select>  
                        <span>
                            {{$t('finance.operateType')}} ：
                        </span>
                         
                        <Select v-model="formValidate.recordValue" style="width:130px"  :placeholder="$t('common.pleaseSelect')">
                            <Option v-for="item in recordType" :value="item.value" :dataType="item.type" :key="item.value"  >{{ item.label }}</Option>
                        </Select>
                        <Button type="primary" @click="handleSubmit('formValidate')" style="padding: 6px 50px;margin-left:10px;">{{$t('finance.search')}}</Button>
                    </div>
                    <div class="order-table">
                        <Table stripe :columns="tableColumnsRecord" :data="tableRecord" :no-data-text="$t('common.nodata')"></Table>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <Page :total="total" :pageSize="pageSize" :current="1" @on-change="changePage"></Page>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const Qs = require('qs');
const dtime = require('time-formater');

export default {
    components: {
    },
    data() {
        return {
            ordKeyword: '',
            recordType: [
                 {
                    value: 0,
                    label: this.$t('finance.record.charge')
                },
                {
                    value: 1,
                    label: this.$t('finance.record.pickup')
                },
                // {
                //   value:2,
                //   label:this.$t('finance.record.transaccount')
                // },
                // {
                //   value:3,
                //   label:this.$t('finance.record.exchange')
                // },
                {
                  value:4,
                  label:this.$t('finance.record.otcbuy')
                },
                {
                  value:5,
                  label:this.$t('finance.record.otcsell')
                },
                // {
                //   value:6,
                //   label:this.$t('finance.record.activityaward')
                // },
                {
                  value:7,
                  label:this.$t('finance.record.promotionaward')
                },
                // {
                //   value:8,
                //   label:this.$t('finance.record.dividend')
                // },
                // {
                //   value:9,
                //   label:this.$t('finance.record.vote')
                // },
                {
                  value:10,
                  label:this.$t('finance.record.handrecharge')
                },
                // {
                //   value:11,
                //   label:this.$t('finance.record.match')
                // }
            ],
            coins:[],
            formValidate:{
                firstDate:'',
                lastDate:'',
                recordValue:'',
                coins:''
            },
            pageSize:10,
            page:0,
            total:0,
            tableRecord: [],
        }
    },
    created:function(){
        this.getList(this.page);
        this.getCoin();
    },
    methods: {
        changePage(index) {
            this.getList(index-1)
        },
        getList(pageNo) {
         
            //获取tableWithdraw
            let params = {}
            params['pageNo'] = pageNo;
            params['pageSize'] = this.pageSize;
            
            this.$http.post(this.host + '/uc/asset/transaction/all', params).then(response => {
                var resp = response.body;
                if (resp.content) {
                    this.tableRecord = resp.content
                    this.total = resp.totalElements
                    this.loading = false
                    this.page = resp.number;
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        valid() {
            if (this.formValidate.firstDate == '') {
                this.$Message.error(this.$t('finance.info.startTime'));
                return false
            } else if (this.formValidate.lastDate == '') {
                this.$Message.error(this.$t('finance.info.endTime'));
                return false;
            } else if (this.formValidate.recordValue==''&& this.formValidate.recordValue !='0' ) {
                console.log(this.formValidate.recordValue)
                this.$Message.error(this.$t('finance.info.style'));
                return false
            }else if (this.formValidate.coins=='') {
                this.$Message.error(this.$t('finance.info.coinStyle'));
                return false
            }else {
                return true
            }
        },
        handleSubmit(name){
             if (this.valid()) {
                let params = {}
                let mess =this.formValidate.recordValue;
              
                params['pageNo'] = this.page;
                params['pageSize'] = this.pageSize;
                params['symbol'] = this.formValidate.coins;
            //    if(mess=='充值'){
            //        params['type']=0
            //    }else if(mess=='提现'){
            //        params['type']=1
            //     }else if(mess=='法币买入'){
            //        params['type']=4
            //     }else if(mess=='法币卖出'){
            //        params['type']=5
            //     }else if(mess=='人工充值'){
            //        params['type']=10
            //     }

                // if (typeof this.recordValue == "number") params['type'] = this.formValidate.recordValue;
                params['type'] = this.formValidate.recordValue;
                const  datestr=dtime(this.formValidate.firstDate).format('YYYY-MM-DD ');
                const  dateend=dtime(this.formValidate.lastDate).format('YYYY-MM-DD');
              
                params['dateRange']=datestr+'~'+dateend;

                // this.$http.get(this.host + '/uc/asset/transaction/all',Qs.parse(params)).then(response => {
                this.$http.post(this.host + '/uc/asset/transaction/all',params).then(response => {
                    var resp = response.body;
               
                    if (resp.content) {
                        this.tableRecord = resp.content;
                        this.total = resp.totalElements;
                        this.loading = false
                        this.page = resp.number;
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
            }    
        },
        // 币种选择
        getCoin() {
            //币种
            this.$http.post(this.host + '/uc/withdraw/support/coin').then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.coins=resp.data
                    // for (let i = 0; i < resp.data.length; i++) {
                    //     this.coins.push(resp.data[i]);
                    // }
                }else {
                    this.$Message.error(resp.message);
                }
            })
        },
        updateLangData(){
             this.recordType=[
                 {
                    value: 0,
                    label: this.$t('finance.record.charge')
                },
                {
                    value: 1,
                    label: this.$t('finance.record.pickup')
                },
                 // {
                //   value:2,
                //   label:this.$t('finance.record.transaccount')
                // },
                // {
                //   value:3,
                //   label:this.$t('finance.record.exchange')
                // },
                {
                  value:4,
                  label:this.$t('finance.record.otcbuy')
                },
                {
                  value:5,
                  label:this.$t('finance.record.otcsell')
                },
                // {
                //   value:6,
                //   label:this.$t('finance.record.activityaward')
                // },
                {
                  value:7,
                  label:this.$t('finance.record.promotionaward')
                },
                // {
                //   value:8,
                //   label:this.$t('finance.record.dividend')
                // },
                // {
                //   value:9,
                //   label:this.$t('finance.record.vote')
                // },
                {
                  value:10,
                  label:this.$t('finance.record.handrecharge')
                },
                // {
                //   value:11,
                //   label:this.$t('finance.record.match')
                // }
            ]
        }
          
    },
    watch:{
        'lang':function () {
            this.updateLangData();
        }
    },
    computed: {
        tableColumnsRecord() {
            let columns = [];
            let self=this;
            columns.push({
                title: self.$t('finance.tradeTime'),
                key: 'createTime',
            });
            columns.push({
                title: self.$t('common.type'),
                key: 'type',
                render:(h,params)=>{
                    let text='';
                    if(params.row.type == 0){
                        text=self.$t('finance.record.charge');
                    }else if(params.row.type == 1){
                        text=self.$t('finance.record.pickup');
                    // }else if(params.row.type == 2){
                    //     text=self.$t('finance.record.transaccount');
                    // }else if(params.row.type == 3){
                    //     text=self.$t('finance.record.exchange');
                    }else if(params.row.type == 4){
                        text=self.$t('finance.record.otcbuy');
                    }else if(params.row.type == 5){
                        text=self.$t('finance.record.otcsell');
                    // }else if(params.row.type == 6){
                    //     text=self.$t('finance.record.activityaward');
                    }else if(params.row.type == 7){
                        text=self.$t('finance.record.promotionaward');
                    // }else if(params.row.type == 8){
                    //     text=self.$t('finance.record.dividend');
                    // }else if(params.row.type == 9){
                    //     text=self.$t('finance.record.vote');
                    }else if(params.row.type == 10){
                        text=self.$t('finance.record.handrecharge');
                    // }else if(params.row.type == 11){
                    //     text=self.$t('finance.record.match');
                    }
            
                   
                    return h('div', [
                        h('p', text),
                    ]);
                }
            });
            columns.push({
                title: this.$t('common.coin'),
                key: 'symbol',
            });
            columns.push({
                title: self.$t('common.amount'),
                key: 'amount',
            });
            columns.push({
                title: self.$t('common.status'),
                key: 'status',
                render:(h,params)=>{
                    return h('div', [
                        h('p', self.$t('common.completed')),
                    ]);
                }
            });
            return columns;
        },
        'lang': function () {
            return this.$store.state.lang;
        },
    }
}
</script>
<style scoped>

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
