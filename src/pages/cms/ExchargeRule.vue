<template>
  <div class="agreement">
    <img src="../../assets/images/call.png">
    <div class="agreement_tab">
      <div class="static_main">
        <router-link to="/about-rule" class="cur">{{$t('cms.exchangerule')}}</router-link>
        <router-link to="/about-protocol">{{$t('cms.useprotocol')}}</router-link>
        <!-- <router-link to="/about-fee">{{$t('cms.feenote')}}</router-link> -->
      </div>
    </div>
    <div class="content">
          <p>1. 策略交易（含计划交易，下同）指的是bid-buy交易所平台（指www.bid-buy.pro网站及其手机客户端等，以下简称“bid-buy”）为客户提供的自动委托系统，该系统可以根据客户事先设定的参数自动委托交易，所有策略交易的逻辑均为固定逻辑并在说明文档中详细说明，在客户设定参数并委托后自动执行，bid-buy在客户设定的策略执行过程中不会对该策略的实际执行进行任何人工干预。</p>
          <p>2. 客户使用策略交易，即视作客户已经充分理解策略的使用方法和潜在风险，并无条件的接受策略执行的最终结果。</p>
          <p>3. 客户在使用策略交易时，应当认真阅读策略交易的说明文档，充分理解策略的执行逻辑及各个参数的作用，以正确的设置策略的执行参数。如客户对策略交易的逻辑、参数、设置等有任何疑问或者异议，则客户不应使用策略交易。因客户对策略的理解不足或参数设置错误导致策略的最终执行结果与客户预期不同，bid-buy不承担任何责任。</p>
          <p>4. 在市场出现极端情况的时候，可能导致策略交易的成交结果与客户的预期出现较大偏差，客户应当充分理解该风险，并谨慎设置策略参数以规避该风险。对于市场极端情况导致的策略执行结果与客户预期出现误差，bid-buy不承担任何责任。</p>
          <p>5. 由于网络延迟，计算机系统故障及其他可能的不可抗拒因素，可能导致策略交易的执行迟缓，暂停，中止或偏差，bid-buy将采取必要措施维持但不承诺策略交易执行系统运行的稳定和有效，但由于上述因素导致的策略的最终执行结果与客户预期不同，bid-buy不承担任何责任。客户应充分知悉并认可本风险是受限于目前技术水平所难以完全避免的，如客户不愿或不能承担本风险，则客户不应使用策略交易。</p>
          <p>6. 使用策略交易可能收取费用，具体收费标准以bid-buy的公告、页面说明为准。客户使用策略交易即视作认可bid-buy对策略交易收取相应费用，同意并授权bid-buy在策略交易成交后将相关费用直接划扣。</p>
          <p>7. 根据实际情况和需要，bid-buy可以随时对策略的算法进行必要的调整，增加新的交易算法或暂停某些交易策略。上述改动将在bid-buy公告后执行，如客户不同意上述改动，则应立即停止使用策略交易，继续使用策略交易将被视为客户已经充分知悉并无条件同意上述改动。</p>
          <p>8. 客户在使用策略交易前请务必认真阅读本使用协议，一旦客户点击“同意协议并开始交易”并开始使用策略交易，则视为客户已经充分知悉本协议内容并自愿受本协议约束。</p>
    </div>
  </div>
</template>

<style scoped>
  .agreement {
    min-height: 750px;
    background: #fff;
    padding-bottom: 20px;
  }
  .agreement_tab {
    height: 49px;
    text-align: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
  .agreement_tab a {
    padding: 0 4px 16px;
    margin: 0 32px;
    color: #666;
    font-size: 14px;
    line-height: 48px;
  }
  .agreement_tab a.cur {
    color: #27abe2;
    font-weight: bold;
    border-bottom: 2px solid #27abe2;
  }
  .content {
    width: 1200px;
    margin: 0 auto;
    font-size:14px;
  }
  .content p {
    line-height: 1.5;
    margin-bottom: 10px;
  }
</style>
