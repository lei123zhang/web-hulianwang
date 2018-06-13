<template>
    <div class="content-wrap">
        <div class="ww">
            <div class="container" id="List">
                <Row>
                    <Col span="4">
                    <Menu ref="navMenu" mode="vertical" width="auto" theme="light" :active-name="activeMenuName" @on-select="menuSelected">
                        <MenuGroup :title="$t('otc.buySellTrade')">
                            <template v-for="(coin,index) in coins">
                            <MenuItem :name="'coin-'+index">
                            <!-- <MenuItem :name="coin.unit"> -->
                                {{coin.unit}}
                            </MenuItem>
                            </template>
                        </MenuGroup>
                        <MenuItem name="ad">{{$t('otc.myAd')}}</MenuItem>
                        <MenuItem name="order">{{$t('otc.myOrder')}}</MenuItem>
                    </Menu>
                    </Col>
                    <Col span="20">
                    <!-- <keep-alive> -->
                    <router-view></router-view>
                    <!-- </keep-alive> -->
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>
<style>
.ivu-menu-vertical .ivu-menu-item-group-title{
    padding-left: 0px;
    font-size:16px;
    color: #0B0D1B;
}
</style>

<style scoped>
.content-wrap {
    /* background: #eee; */
    min-height: 750px;
}

.container#List {
    padding-top: 30px;
    margin: 0 auto;
    background: transparent;
    width: 100%;
}


</style>
<script>
export default {
    data() {
        return {
            coins:[]
        }
    },
    computed: {
        'activeMenuName': function() {
            return this.$store.state.activeMenuName;
        }
    },
    methods: {
        init() {
            this.$store.commit('navigate','nav-otc');
            this.$http.post(this.host+this.api.otc.coin).then(response=>{
                if(response.body.code == 0){
                    this.coins = response.body.data;
                }
            });
            if((/[A-Z]/.test(this.$route.params[0]))==true){
             
                this.$store.commit('leftmenu','coin-1');
            };
           
        },
        menuSelected(menuName){
            // console.log(menuName);
            if(menuName.startsWith('coin')){
                var coin = this.coins[menuName.split('-')[1]];
                // console.log(coin);
                this.$router.push('/otc/trade/'+coin.unit);
            }
            else{
                this.$router.push('/otc/'+menuName);
            }
        }
    },
    created: function() {
        this.init();
    },
    mounted:function(){
        this.$nextTick(()=>{
            this.$refs.navMenu.updateActiveName('ad');
        });
    }
}
</script>