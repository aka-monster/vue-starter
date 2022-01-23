var cryptoComponent = Vue.component("Crypto", {
  template: `<div>
  <div class="row gy-2">
  <h4>Using an external service to track dogecoin</h4>
  <p>
  The demo uses a free, external API (Application Programming Interface = interface to get/transfer data between applications), 
  see <a href="https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md">Github</a> for more details<br>
  The code converts that information into a chart
  </p>
</div>
        <canvas id="chart"></canvas>
    </div>`,
  mounted() {
    const symbol = this.$route.params.id;
    /* 
        [
            1499040000000,      // Open time
            "0.01634790",       // Open
            "0.80000000",       // High
            "0.01575800",       // Low
            "0.01577100",       // Close
            "148976.11427815",  // Volume
            1499644799999,      // Close time
            "2434.19055334",    // Quote asset volume
            308,                // Number of trades
            "1756.87402397",    // Taker buy base asset volume
            "28.46694368",      // Taker buy quote asset volume
            "17928899.62484339" // Ignore.
        ]
        */
    const api =
      "https://api.binance.com/api/v3/klines?interval=1d&limit=100&symbol=" +
      symbol;
    axios.get(api).then((response) => {
      var data = [];
      var labels = [];
      for (var i = 0; i < response.data.length; i++) {
        var d = new Date(0);
        d.setUTCMilliseconds(response.data[i][0]);
        labels.push(d.toDateString());
        data.push(parseFloat(response.data[i][4]));
      }
      const config = {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: symbol + " Closing Price",
              data: data,
              backgroundColor: "#2a9d8f",
              borderColor: "#2a9d8f",
              borderWidth: 3,
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: false,
            },
          },
        },
      };

      _ = new Chart(document.getElementById("chart"), config);
    });
  },
});
