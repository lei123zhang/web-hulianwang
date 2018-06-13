<template>
  <div class="container">
    <img src="../../assets/images/call.png">
    <div class="content-wrap">
      <div class="leftmenu">
        <ul class="nav">
          <li class="divider">{{$t('cms.about')}}</li>
          <li><router-link to="/about-us">{{$t('cms.aboutus')}}</router-link></li>
          <li class="cur"><router-link to="/join-us">{{$t('cms.joinus')}}</router-link></li>
        </ul>
      </div>
      <div class="content">
          <p>在bid-buy，我们不是在工作，而是选择一种生活方式！没有人会要求你必须加班，或检查你早上是否迟到，这种工作模式在币安并不存在。因为在币安，我们会尽全力把该做的事情做好，我们没有传统的上班下班概念，也就意味着我们随时随地都在工作。如果你已经撸起袖子准备没日没夜的工作，并下定决心一起去重新定义未来的金融世界，一起去创造历史，请继续阅读；如果你觉得这听起来太天马行空、太操劳，那你可以省点力气，不用读下去了。</p>
          <p>bid-buy的原则是：用人所长。你应该发挥自己的专长，做自己喜欢，也能做好事情。我们的公开招聘不一定有适合你的岗位，但如果你在所擅长的领域天赋异禀，请联系我们，我们应该还能留出位置。</p>
          <div class="postlist">
            <ul>
              <li class="header">工作岗位</li>
              <li>
                <h3>产品经理</h3>
                <p>如果你逻辑清晰并有设计产品的天赋，擅长站在用户的角度考虑问题，会像照料宝宝一样照料你的产品，请加入我们的产品团队；你要做好准备为产品设计激烈的辩论，比如哪一款紫色更适合深度图；同时也请大展身手设计出加密数字资产行业大家都喜欢的产品。我们现在有很多个宝宝需要你去照料成长，宝宝们分别是：网页端、电脑端和移动端等等。</p>
              </li>
              <li>
                <h3>项目经理</h3>
                <p>如果你可以并行处理和跟踪198个任务；同时可以区分任务的优先级，能够准确判断这些任务的先后顺序，并知道什么人适合什么任务？当被问及某个任务的进度时，你可以在0.1秒内回复“会在今天晚上9点59分完成”。如果这是你，相信在全球最领先的数字资产交易平台会有你的一席之地，主导交易所应该上哪些币种的感觉应该不错吧？</p>
              </li>
              <li>
                <h3>测试工程师</h3>
                <p>如果找“茬”是你的专长，那么我们就有适合你的工作。你是否总能考虑到没有人能想到的问题?或者你是不是那个可以找到系统中最后一个bug的人?来开启“大家一起来找茬”时代。</p>
              </li>
              <li>
                <h3>客服</h3>
                <p>如果照顾别人，帮助别人解决问题是你的使命，那么欢迎你来币安“拯救世界”，因为我们有来自世界各地的人需要你的帮助。如果你还擅长英语之外的其他语言，我们会优先考虑。</p>
              </li>
            </ul>
          </div>
        <div class="workaddress">
          <ul>
            <li class="header">工作地点</li>
              <p>我们正在以下地点招兵买马，优先顺序依次如下：东京、香港、新加坡、欧洲、南美及其它国家。</p>
          </ul>
        </div>
        <div class="contact">
          <ul>
            <li class="header">联系我们</li>
            <p>若要申请上述职位，请将您的简历和求职信发送至hr@bid-buy.com。请在邮件主题中注明希望的职位和工作地点。申请全球运营岗，请通过在线申请的方式递交简历。期待可以很快在团队中见到你</p>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .postlist li{
    float: left;
    width: 50%;
  }
  li.header{
    width: 100%;
    text-align: center;
    font-size: 16px;
    padding: 10px;
    background: #ccc;
  }
  .postlist ul:after{
    content: ' ';
    clear: both;
    display: block;
  }
  .container{
    background: #fff;
  }
  .content-wrap{
    padding-top: 20px;
    position: relative;
    width: 1200px;
    margin: 0 auto;
    background: #fff;
  }
  .leftmenu{
    position: absolute;
    width: 180px;
    text-align: center;
    border: 1px solid #efefef;
  }
  .leftmenu .divider{
    font-size: 20px;
    padding: 5px;
    background: #efefef;
  }
  .leftmenu li {
    font-size: 14px;
    line-height: 30px;
    padding: 5px;
  }
  .leftmenu li a{
    color: #444;
  }
  .leftmenu li a:hover{
    color: #2d8cf0;
  }
  .leftmenu li.cur a {
    color: #2d8cf0;
  }
  .content {
    padding-top: 20px;
    padding-left: 200px;
    padding-bottom: 20px;
  }
  .content p{
    text-indent: 2em;
    margin-bottom: 10px;
    font-size: 14px;
  }
  .content>div{
    padding-bottom: 20px;
  }
  .content h3{
    font-size: 22px;
    font-weight: normal;
    margin-bottom: 20px;
  }
  .content h5 {
    font-size: 14px;
  }
</style>
