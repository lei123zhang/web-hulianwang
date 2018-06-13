<template>
  <div class="agreement">
    <img src="../../assets/images/call.png">
    <div class="agreement_tab">
      <div class="static_main">
        <router-link to="/about-rule">{{$t('cms.exchangerule')}}</router-link>
        <router-link to="/about-protocol">{{$t('cms.useprotocol')}}</router-link>
        <!-- <router-link to="/about-fee" class="cur">{{$t('cms.feenote')}}</router-link> -->
      </div>
    </div>
    <div class="content">
      <div class="agreen-cont ">
        <h3 class="tb_50" id="rate_1">交易手续费：</h3>
        <table class="table_s1 align_center">
          <colgroup data-filtered="filtered">
            <col style="width: 10%" data-filtered="filtered">
            <col style="width: 40%" data-filtered="filtered">
            <col style="width: 40%" data-filtered="filtered">
          </colgroup>
          <thead>

          <tr>
            <th class="table_slash">
              <span data-filtered="filtered"></span>
            </th>
            <th>吃单</th>
            <th>挂单</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>BTC</td>
            <td>0.20%</td>
            <td>0.20%</td>
          </tr>
          <tr>
            <td>LTC</td>
            <td>0.20%</td>
            <td>0.20%</td>
          </tr>
          <tr>
            <td>BCC</td>
            <td>0.20%</td>
            <td>0.20%</td>
          </tr>
          <tr>
            <td>ETH</td>
            <td>0.20%</td>
            <td>0.20%</td>
          </tr>
          <tr>
            <td>ETC</td>
            <td>0.20%</td>
            <td>0.20%</td>
          </tr>
          </tbody>
        </table>

        <div class="fees_tips">
          <b>提醒：</b>
          <p>
            1.挂单是你所下的限价单并未与当前挂单成交，并被放在买卖盘中等待成交的摆单，它增加了买卖盘的流动性。<br data-filtered="filtered">2.当其他人的摆单主动与你所下的摆单成交，你将支付挂单交易手续费（请注意当其他人的限价单与你的限价单成交，而下单时间又早于你时，你将支付吃单费）。<br
            data-filtered="filtered">3.吃单是你所下的限价单或市价单与当前的挂单直接成交。<br data-filtered="filtered">4.当你所下的摆单主动与其他人的摆单成交，你将支付吃单交易手续费。<br
            data-filtered="filtered">5.交易手续费将从您的成交总额中扣除。若成交后获得人民币资产，则支付人民币交易手续费；反之，若成交后获得数字资产，则支付数字资产交易手续费。 </p>
          <p>
            例如：您以6300元卖出1BTC，会扣除12.6元手续费，获得6287.4元。<br data-filtered="filtered">您以6300元买入1BTC，会扣除0.002BTC手续费，获得0.998BTC。
          </p>

        </div>
        <h3 class="tb_50" id="rate_2">提现费率：</h3>
        <table class="table_s1">
          <thead>
          <tr>
            <th>等级</th>
            <th>积分(<a href="/account/account.php?a=score" target="__blank">如何查看积分</a>)</th>
            <!--<th>普通充值</th>-->
            <!--<th>BTC/LTC/ETH/ETC普通提现</th>-->
            <th>人民币提现（24小时到账）</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>VIP0</td>
            <td>0</td>
            <!--<td rowspan="7">0%</td>-->
            <!--<td  rowspan="7">0.0001BTC/0.001LTC/0.01ETH/0.01ETC</td>-->
            <td>0.50%</td>
          </tr>
          <tr>
            <td>VIP1</td>
            <td>10000</td>
            <td>0.45%</td>
          </tr>
          <tr>
            <td>VIP2</td>
            <td>100000</td>
            <td>0.40%</td>
          </tr>
          <tr>
            <td>VIP3</td>
            <td>300000</td>
            <td>0.38%</td>
          </tr>
          <tr>
            <td>VIP4</td>
            <td>500000</td>
            <td>0.35%</td>
          </tr>
          <tr>
            <td>VIP5</td>
            <td>1000000</td>
            <td>0.30%</td>
          </tr>
          <tr>
            <td>VIP6</td>
            <td>付费服务</td>
            <td>0.30%</td>
          </tr>
          </tbody>
        </table>

        <h3 class="tb_50" id="rate_3">美元充值提现渠道：</h3>

        <table class="table_s1">
          <thead>
          <tr>
            <th></th>
            <th colspan="2" class="align_center">未认证用户</th>
            <th colspan="2" class="align_center">认证用户</th>
          </tr>
          <tr>
            <th>渠道</th>
            <th>充值费率</th>
            <th>提现费率</th>
            <th>充值费率</th>
            <th>提现费率</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>国际电汇</td>
            <td colspan="2" rowspan="2" class="align_center">不支持</td>
            <td>1%（每笔最多$150,000）</td>
            <td>1%（每笔手续费最少$33）</td>
          </tr>
          <tr>
            <td>OKPAY</td>
            <td>1.5%</td>
            <td>0.5%</td>
          </tr>
          </tbody>
        </table>

        <h3 class="tb_50" id="rate_4">BTC美元交易费率：</h3>

        <table class="table_s1">
          <thead>
          <tr>
            <th colspan="3" class="align_center">BTC 交易手续费</th>
          </tr>
          <tr>
            <th>30天内交易量</th>
            <th>吃单</th>
            <th>挂单</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>0 BTC</td>
            <td rowspan="7"><span class="usd_btc_maker">0.20%</span></td>
            <td rowspan="7"><span class="usd_btc_taker">0.20%</span></td>
          </tr>
          <tr>
            <td>50 BTC</td>
          </tr>
          <tr>
            <td>200 BTC</td>
          </tr>
          <tr>
            <td>600 BTC</td>
          </tr>
          <tr>
            <td>1500 BTC</td>
          </tr>
          <tr>
            <td>5000 BTC</td>
          </tr>
          <tr>
            <td>10000 BTC</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .agreement {
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
    font-size:12px;
  }
  .content h3{
    font-size: 16px;
    padding-top: 10px;
  }
  .content table{
    margin: 10px 0;
    width: 100%;
    border: 1px solid #e6e6e6;
    border-spacing: 0;
    border-collapse: collapse;
  }
  .content table th,
  .content table td{
    border: 1px solid #e6e6e6;
    font-weight: normal;
    padding: 0 24px;
    line-height: 36px;
    text-align: center;
  }
</style>
