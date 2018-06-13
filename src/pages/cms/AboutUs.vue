<template>
    <div class="container-artical">
        <img src="../../assets/images/call.png">
        <div class="content-wrap ">
            <Row>
                <Col span="4">
                    <div class="leftmenu">
                        <ul class="nav">
                            <li class="divider">{{$t('cms.about')}}</li>
                            <li class="cur">
                              <router-link to="/about-us">{{$t('footer.gywm')}}</router-link>
                            </li>
                            <!-- <li>
                              <router-link to="/join-us">{{$t('cms.joinus')}}</router-link>
                            </li> -->
                        </ul>
                    </div>
                </Col>
                <Col span="20" class="content">
                    <div class=WordSection1 style='layout-grid:15.6pt'>

                   

                        <p class=MsoNormal align=left style='text-align:left'><span lang=EN-US style='font-family:宋体'>互链网 </span><span style='font-family:宋体'>数字货币交易所由毕业于新加坡南洋理工大学的团队创建于2017年底，总部设立在新加坡，是一家集数字货币交易，OTC出入金，区块链项目研究开发，高频量化交易为一体的区块链公司。主要创始人是最早一批比特币玩家。</span></p>
                  </div>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
  export default {
    components: {
    },

    computed: {
        'lang': function () {
           var lange=this.$store.state.lang;
           if(lange=='English'){
             this.$router.push('about-usEN');
           }
            // return this.$store.state.lang;
        },
       
    },
    watch:{
        'lang':function () {
           console.log(this.$store.state.lang)
        }
    },
}
</script>
<style scoped>

  .container-artical .leftmenu{
      padding:0;
      margin-bottom:0;
  }
  .container-artical  .leftmenu .nav>li>a{
      padding:0;
      text-align:center;
  }
  .leftmenu .nav a.router-link-active{
      background-color:transparent;
  }
  .leftmenu .nav a.router-link-active:hover,.leftmenu .nav a:hover{
      background-color:transparent;
      color:#519BF6 !important;
  }
  .container {
    background: #fff;
    overflow-x: hidden;
  }

  .content-wrap {
    /* padding-top: 20px; */
    position: relative;
    min-width: 1180px;
    max-width:1310px;
    width:100%;
    padding:20px 10px;
    margin: 0 auto;
    background: #fff;
    min-height: 750px;
  }

  .leftmenu {
    border: 1px solid #efefef;
  }

  .leftmenu .divider {
    font-size: 20px;
    padding: 5px;
    background: #efefef;
  }

  .leftmenu li {
    font-size: 14px;
    line-height: 30px;
    padding: 5px;
  }

  .leftmenu li a {
    color: #444;
  }

  .leftmenu li a:hover {
    color: #2d8cf0;
  }

  .container-artical .leftmenu li.cur a {
    color: #2d8cf0 !important;
  }
  .content{
    padding-left: 20px;
  }
  .content > div{
    padding: 10px 0;
  }
 .content p{
    text-indent: 2em;
    margin-bottom: 10px;
    font-size: 14px;
  }
  .content h3{
    font-size: 22px;
    font-weight: normal;
    margin-bottom: 20px;
  }
  .content h5 {
    font-size: 14px;
  }
  .WordSection1 span{ color:black; font-family: 宋体;}

</style>
