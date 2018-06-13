<template>
    <div class="exchange">
        <div class="sidebar">
            <div class="sc_filter">
                <span class="active">CNY</span>
            </div>
            <Table @on-current-change="gohref" highlight-row id="CNY" v-show="true" :columns="coins.columns" :data="coins.USDT" :no-data-text="$t('common.nodata')"></Table>
        </div>
        <div class="kline">
            <div class="mod_hd">
                <dl>
                    <dt>
                        {{currentCoin.symbol.split('/')[0]}}
                    </dt>
                    <dd>
                        <span>{{currentCoin.close}} CNY</span>
                    </dd>
                    <dd>
                        <span>{{$t('exchange.rose')}} <label :class="{buy:currentCoin.change>0,sell:currentCoin.change<0}">{{currentCoin.rose}}</label></span>
                    </dd>
                    <dd>
                        <span>{{$t('exchange.high')}} {{currentCoin.high}}</span>
                    </dd>
                    <dd>
                        <span>{{$t('exchange.low')}} {{currentCoin.low}}</span>
                    </dd>
                    <dd>
                        <span>24H {{$t('exchange.vol')}} {{currentCoin.volume}} {{currentCoin.coin}}</span>
                    </dd>
                </dl>
            </div>
            <div id="kline_container">
            
            </div>
            
        </div>
    </div>
</template>
<style>
   @import url(../../assets/css/exchange.css);
</style>
<script>
import Datafeeds from '@js/charting_library/datafeed/bitrade.js';
var Stomp = require('stompjs');
var SockJS = require('sockjs-client');
var moment = require('moment');
//var $ = require('jquery');

require.ensure([],function(require){
  require('jquery');
});

export default {
    data () {
        let self = this;
        return {
            datafeed:null,
            defaultPath:'btc_usdt',
            currentCoin:{
                symbol:''
            },
            //当前市场上的交易币种，按交易对分
            coins:{
                _map:[],
                
                USDT:[],
                
                columns: [
                    {
                        title: self.$t('common.coin'),
                        key: 'coin',
                        sortable:false
                    },
                    {
                        title: self.$t('exchange.lastPrice'),
                        key: 'close',
                        sortable:true,
                        sortMethod:function(a,b,type){
                            let a1=parseFloat(a);
                            let b1=parseFloat(b);
                            if(type=='asc'){
                                return a1-b1
                            }else{
                                return b1-a1
                            }
                        }
                    },
                    {
                        title: self.$t('exchange.rose'),
                        key: 'rose',
                        sortable:true,
                        sortMethod:function(a,b,type){
                            let a1=a.replace(/[^\d|.|-]/g, '') - 0
                            let b1=b.replace(/[^\d|.|-]/g, '') - 0
                            if(type=='asc'){
                                return a1-b1
                            }else{
                                return b1-a1
                            }
                        },
                        render: (h,params) => {
                            const row=params.row;
                            const className=parseFloat(row.rose)<0?'sell':'buy';
                            return h('span',{   
                                attrs:{
                                class:className
                                }
                            },row.rose)  
                        }
                    }
                ]
            }
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
    created:function(){
        this.init();
    },
    mounted:function(){
        this.getSymbol();
    },
    methods:{
        updateLangData(){
          this.coins.columns[0].title = this.$t("common.coin");
          this.coins.columns[1].title = this.$t("exchange.lastPrice");
          this.coins.columns[2].title = this.$t("exchange.rose");
          this.coins.columns[3].title = this.$t("exchange.collect");

      },
        init(){
            this.$store.commit('navigate','nav-exchange');
            
            var params=this.$route.params[0];
            if(params==undefined){
                this.$router.push('/exchange/'+this.defaultPath);
                params = this.defaultPath;
            }
            var coin = params.toUpperCase().split('_')[0];
            var base = params.toUpperCase().split('_')[1];
            this.currentCoin.symbol = coin+'/'+base;
            this.currentCoin.coin = coin;
            this.currentCoin.base = base;
        },
        getCoin(symbol){
            return this.coins._map[symbol];
        },
        getKline(){
            var that = this;
            require(["@js/charting_library/charting_library.min.js"],function(tv){
                var widget = window.tvWidget = new TradingView.widget({
                        fullscreen: true,
                        symbol: that.symbol,
                        interval: '1',
                        timezone: 'Asia/Shanghai',
                        toolbar_bg: '#18202a',
                        container_id: "kline_container",
                        // datafeed: new Datafeeds.WebsockFeed(that.host+'/market',that.currentCoin),
                        datafeed:that.datafeed,
                        library_path: process.env.NODE_ENV === 'production'?"/assets/charting_library/":'src/assets/js/charting_library/',
                        locale: "zh", 
                        debug: false,
                        drawings_access: { type: 'black', tools: [ { name: "Regression Trend" } ] },
                        disabled_features: ["header_resolutions","header_symbol_search","header_chart_type","header_compare","header_undo_redo","header_screenshot","header_saveload","use_localstorage_for_settings","left_toolbar","volume_force_overlay"],
                        enabled_features: ["move_logo_to_main_pane"],
                        supported_resolutions: ["1","5","15","30","60","240","1D","1W","1M"],
                        charts_storage_url: 'http://saveload.tradingview.com',
                        charts_storage_api_version: "1.1",
                        client_id: 'tradingview.com',
                        user_id: 'public_user_id',
                        overrides: {
                            "paneProperties.background": "#1B1E2E",
                            "paneProperties.vertGridProperties.color": "#454545",
                            "paneProperties.horzGridProperties.color": "#454545",
                            "scalesProperties.textColor" : "#AAA", 
                            "mainSeriesProperties.candleStyle.upColor": "#589065",
                            "mainSeriesProperties.candleStyle.downColor": "#AE4E54",
                            "mainSeriesProperties.candleStyle.drawBorder": false,
                            "mainSeriesProperties.candleStyle.wickUpColor": "#589065",
                            "mainSeriesProperties.candleStyle.wickDownColor": "#AE4E54",
                            "paneProperties.legendProperties.showLegend": false
                        
                        },
                        time_frames: [
                            { text: "1y", resolution: "1M", description: "realtime",title:'分时' },
                            { text: "1min", resolution: "1", description: "1min" },
                            { text: "5min", resolution: "5", description: "5min" },
                            { text: "15min", resolution: "15", description: "15min" },
                            { text: "30min", resolution: "30", description: "30min" },
                            { text: "1hour", resolution: "60", description: "1hour",title: "1hour" },
                            { text: "4hour", resolution: "240", description: "4hour",title: "4hour" },
                            { text: "1day", resolution: "1D", description: "1day",title: "1day" },
                            { text: "1week", resolution: "1W", description: "1week",title: "1week" },
                            { text: "1mon", resolution: "1M", description: "1mon" }
                        ] 
                });
                widget.onChartReady(function() {
                    widget.chart().createStudy("Moving Average", false, false, [5], null, { "plot.color": "#965FC4" });
                    widget.chart().createStudy("Moving Average", false, false, [10], null, { "plot.color": "#84AAD5" });
                })
            });
        },
        getSymbol(){
            this.$http.post(this.host+this.api.market.thumb,{}).then(response => {
                var resp=response.body;
                console.log(resp)
                for(var i=0;i<resp.length;i++){
                    var coin=resp[i];
                
                    coin.close=(resp[i].close*6.5).toFixed(2);
                    coin.rose=resp[i].chg>0 ? ('+'+(resp[i].chg*100).toFixed(2)+'%') : ((resp[i].chg*100).toFixed(2)+'%');
                    coin.coin=(resp[i].symbol).split('/')[0];
                    coin.base=(resp[i].symbol).split('/')[1];
                    coin.href=(coin.coin+'_'+coin.base).toLowerCase();
                    
                    coin.high=(resp[i].high*6.5).toFixed(2);
                    coin.low=(resp[i].low*6.5).toFixed(2);
                    
                    this.coins._map[coin.symbol] = coin;
                    if(coin.coin=='BTC'||coin.coin=='ETH'||coin.coin=='LTC'){
                        this.coins[coin.base].push(coin);
                    }
                    
                    if(coin.symbol==this.currentCoin.symbol){
                        this.currentCoin = coin;
                    }
                }
                require(["../../assets/js/exchange.js"],function(e){
                    e.clickScTab();
                });
                this.startWebsock();
            })
        },
        startWebsock(){
            var stompClient  = null;
            var that=this;
            var socket = new SockJS(that.host+that.api.market.ws);
            stompClient = Stomp.over(socket);
            stompClient.debug=false;
            this.datafeed = new Datafeeds.WebsockFeed(that.host+'/market',this.currentCoin,stompClient);
            this.getKline();
            stompClient.connect({}, function(frame) {
                //订阅价格变化消息
                stompClient.subscribe('/topic/market/thumb', function(msg) {
                    var resp = JSON.parse(msg.body);
                    var coin = that.getCoin(resp.symbol);
                    if(coin != null){
                        coin.close=(resp.close*6.5).toFixed(2);
                        coin.rose=resp.chg>0 ? ('+'+(resp.chg*100).toFixed(2)+'%') : ((resp.chg*100).toFixed(2)+'%');
                        coin.high=(resp.high*6.5).toFixed(2);
                        coin.low=(resp.low*6.5).toFixed(2);
                        coin.volume=parseInt(resp.volume);
                    }
                })
            });
        },
        gohref(currentRow,oldCurrentRow){
            location.href='/#exchange/'+currentRow.href;
            location.reload();
        },
        timeFormat:function(tick){
            return moment(tick).format("HH:mm:ss");
        },
        dateFormat:function(tick){
            return moment(tick).format("YYYY-MM-DD HH:mm:ss");
        }
    }
}
</script>