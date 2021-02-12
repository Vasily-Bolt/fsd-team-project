function ChartLegendItem(startColor, endColor, itemName, voiceCount) {
  this.start = startColor;
  this.end = endColor;
  this.name = itemName;
  this.voiceCount = voiceCount;
  this.colorGradient = function(){
    let canvas = ctx.createLinearGradient(0,0,0,420);
    canvas.addColorStop(0, this.start);
    canvas.addColorStop(1, this.end);
    return canvas;
  };
};


$(()=> {
  const ctx = $('#myChart')[0].getContext('2d');

  const legendArray = {
    awesome : new ChartLegendItem('#FFE39C', '#FFBA9C', 'Великолепно', 130),
    good : new ChartLegendItem('#6FCF97', '#66D2EA', 'Хорошо', 65),
    soso : new ChartLegendItem('#BC9CFF', '#8BA4F9', 'Удовлетворительно', 65),
    disgusting : new ChartLegendItem('#919191', '#3D4975', 'Разочарован', 0),
  };

  const voicesCount = legendArray.awesome.voiceCount+
            legendArray.good.voiceCount+
            legendArray.soso.voiceCount+
            legendArray.disgusting.voiceCount;
  const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [legendArray.awesome, legendArray.good, legendArray.soso, legendArray.disgusting],
      datasets: [{
          data: [
            legendArray.awesome.voiceCount,
            legendArray.good.voiceCount,
            legendArray.soso.voiceCount,
            legendArray.disgusting.voiceCount
          ],
          backgroundColor: [
              legendArray.awesome.colorGradient(),
              legendArray.good.colorGradient(),
              legendArray.soso.colorGradient(),
              legendArray.disgusting.colorGradient()
          ],
          borderColor: 'white',
          borderWidth: 2,
      }]
    },
    options: {
      cutoutPercentage: 90,
      rotation: 3.14*.5,
      legend: false,
      legendCallback: function(chart) {
        var text = [];
        text.push('<ul class="legend">');
        for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
          text.push(`<li class="legend__list-item"><div class="legend__list-marker" style="background-color:${chart.data.labels[i].start}"></div><span>`);
          if (chart.data.labels[i].name) {
            text.push(chart.data.labels[i].name);
          }
          text.push('</span></li>');
        }
        text.push('</ul>');
        return text.join("");
      },
    }
  });

  $('.donut-chart__inner-text').prepend(voicesCount);
  $('#myChart-legend').html(myChart.generateLegend());

});