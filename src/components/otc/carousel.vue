<template>
  <div>
    <Carousel  v-model="value2" loop  id="carousel">
      <CarouselItem v-for="(item,index) in imgList"  :key="index">
            <div class="demo-carousel">
              <a >
                  <img  :src=item.url>
              </a>
            </div>
        </CarouselItem>
        <!-- <CarouselItem>
            <div class="demo-carousel"><img src="../../assets/img/b1.png" alt=""></div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><img src="../../assets/img/b2.png" alt=""></div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><img src="../../assets/img/b3.png" alt=""></div>
        </CarouselItem> -->
    </Carousel>
  </div>
</template>
<script>
export default {
  data () {
      return {
        value2: 0,
        imgList:[] 
      }
  },
  created:function(){
     this.getImg();
  },
  methods:{
      getImg(){
      
        this.$http.post(this.host+this.api.uc.banner,{sysAdvertiseLocation:1}).then(response => {
          var resp=response.body.data;
          this.imgList=resp;
        })
      }
   }
}
</script>
<style scoped>
#carousel img{
  width: 100%;
  height: 480px;
}
</style>


