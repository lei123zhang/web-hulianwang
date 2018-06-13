<template>
    <div class="content-wrap">
        <div class="ww">
            <div class="container">
                <Row>
                    <Col span="4">
                    <div class="leftmenu">

                        <ul class="nav nav-pills nav-stacked">
                            <li style="font-size:21px; margin: 0 8px;   border-bottom: 1px solid rgba(187, 179, 179, 0.17);">新手帮助</li>
                            <li class="pill-item" v-for="item,index in newlist" :class="{'active':ind === index}" @click="changeBgc(index)">
                                <div @click="onlistdetails(index)">{{item.title}}</div>
                            </li>
                            
                        </ul>
                    </div>
                    </Col>
                    <Col span="18" style="background: #fff; margin-left: 17px;padding:10px 30px">
                    <!-- <keep-alive> -->
                    <router-view></router-view>
                    <!-- </keep-alive> -->
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
        ind:0,
        newlist: []
    };
  },
  computed:{
    // "ind":function () {
    //   let id = this.$route.query.id;
      
    //   if (typeof id != "undefined" && id != "") {
    //     return id;
    //   }else {
    //     return 0;
    //   }
    // }
  },
  methods: {
    init() {
      this.loadHelpItem();
      
    },
    onlistdetails(index){
        window.localStorage.setItem('id', String(index))
        this.$router.push({ path: '/newhelp/index',query:{id: window.localStorage.getItem('id')}})
        this.ind=index
    },
    changeBgc: function (index) {
        this.$router.push({ path: '/newhelp/index',query:{id:index}})
        this.ind=index
    },
    loadHelpItem(){
      this.$http.get(this.host + '/uc/ancillary/system/help').then(response => {
        var result = response.body;
        this.newlist=result.data;
    
      });
    }
  },
  created: function() {
    // alert(window.localStorage.getItem('id'))
    this.onlistdetails(window.localStorage.getItem('id'));
    this.init();
  }
};
</script>
<style scoped>
.leftmenu a.router-link-active {
     background: #F9F6EF;
    color: #FF8B1A !important;
}
.active{
     background: #F9F6EF;
    color: #FF8B1A !important;
    font-size: 16px;
}
.icon4 {
  background: url("../../assets/img/moneyicon1.png") no-repeat 0 0;
  background-size: 100% 100%;
}

.icon5 {
  background: url("../../assets/img/moneyicon2.png") no-repeat 0 0;
  background-size: 100% 100%;
}

.order-table {
  margin-top: 20px;
}

.content-wrap {
  /* background: #eee; */
  min-height: 750px;
}

.container {
 
  margin: 0 auto;
  width:100%;
  max-width:1310px;
  min-width:1180px;
  padding:0 10px;
  padding-top: 30px;
}

/* left */

.leftmenu {
  margin-bottom: 60px;
  background: #fff;
  position: relative;
  min-height: 1px;
  padding: 20px 0px;
}

.nav {
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
}

.nav > li {
  line-height: 50px;
}

.leftmenu .nav-stacked {
  background: #fff;
}

.leftmenu .leftmenu-title {
  line-height: 55px;
  font-size: 20px;
  background: 0 0;
  color: #0b0d1b;
  /* padding-left: 20px; */
  /*border-top: #f1f1f1 solid 1px;
	border-bottom: #f1f1f1 solid 1px;*/
  display: block;
  /* cursor: pointer; */
}

.leftmenu .nav > li > a {
  display: block;
  color: #000;
  font-size: 14px;
}

.leftmenu .nav-pills > li.active > a,
.leftmenu .nav > li > a:hover,
.nav-pills > li.active > a:focus,
.nav-pills > li.active > a:hover {

  font-size: 16px;
}
.leftmenu .nav > li > div:hover,
.nav-pills > li.active > div:focus,
.nav-pills > li.active > div:hover,.leftmenu .nav > li.active > div {
     background: #6fa9ff;
    color: #ffffff !important;
    font-size: 16px;
}
.leftmenu .nav > li > div,
.nav-pills > li.active > div,
.nav-pills > li.active > div {
 
    font-size: 16px;
}
.leftmenu .leftmenu-title.top {
  border-top: 0;
}

.leftmenu .lefticon {
  width: 26px;
  height: 26px;
  margin-right: 5px;
  display: inline-block;
  vertical-align: middle;
}
</style>

