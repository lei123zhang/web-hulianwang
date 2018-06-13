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

                            <p class=MsoNormal align=left style='text-align:left'><span lang=EN-US >HULIANWANG </span><span >is founded by a team of blockchain professions graduating from Nanyang Technological University in end 2017. It is located in Singapore and provides services in crypto currency trading, OTC deposit and withdraw, blockchain research and quant trading. </span></p>

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
           if(lange=='简体中文'){
             this.$router.push('/about-us');
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
.container-artical .leftmenu li.cur a {
    color: #2d8cf0 !important;
  }
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

  .leftmenu li.cur a {
    color: #2d8cf0;
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
  .WordSection1 span{ color:black;    font-family: 宋体;}

</style>
