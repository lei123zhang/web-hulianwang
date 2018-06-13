<template>
    <div class="article">
      <!--<img src="../../assets/images/wechats.png">-->
        <div class="content-wrap">
            <!-- <div v-for="notice in noticeList">
              <div class="header">
                <h2>{{notice.title}}</h2>
                <span>{{notice.time}}</span>
              </div>
              <div class="content" style="text-align:left;font-size:15px;">
                <span v-html="notice.content"></span>
              </div>
            </div> -->
              <div>
                  <h2>{{obj.title}}</h2>
                  <span>{{obj.time}}</span>
              </div>
              <div class="content" style="text-align:left;font-size:15px;">
                <span v-html="obj.content"></span>
              </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "Details",
  data() {
    return {
      key:0,
      noticeList:[],
      obj:{}
    };
  },
  computed:{
    "helpindex":function () {
      let id = this.$route.query.id;
      if (typeof id != "undefined" && id != "") {
        return id;
      }else {
        return 0;
      }
    }
  },
  watch:{
    'helpindex':function () {
      this.loadHelpByIndex()
    }
  },
   created() {
      this.init();
  },
  methods: {
    init(){
        this.loadHelpByIndex();
     },
    loadHelpByIndex(){
      let sysHelpClassification = this.helpindex;
      // if (sysHelpClassification == 1) sysHelpClassification=0;
      this.$http.get(this.host + '/uc/ancillary/system/help').then(response => {
       
        var result = response.body;
        if (result.code == 0) {
            this.ind=sysHelpClassification;
            if(result.data!=''){
                this.obj=result.data[sysHelpClassification]
            }else{
                 this.obj={
                     title:'',
                     time:'',
                     content:''
                 }
            }
            
        }
      });
    }
  }
}
</script>

<style scoped>
.agreement {
    background-color: #f7f7fa;
}
.content-wrap{
  /* background: #fff; */
}
.agreement .agreen-cont{
    padding: 30px 0;
    padding-bottom: 30px;
}
.agreement .agreen-cont h2{
    text-align: center;
    font-size: 24px;
    font-weight: 100;
    margin: 10px 0;
}
.agreement .agreen-cont .h4{
    line-height: 1.6;
}
.agreement .agreen-cont h4{
    margin: 10px 0;
    font-size: 14px;
    font-weight: 100;
}
.agreement .agreen-cont p{
    line-height: 2;
}


</style>
