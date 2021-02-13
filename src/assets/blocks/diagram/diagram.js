function ChartLegendItem(canvasRenderedContext2d, startColor, endColor, itemName, voiceCount) {
	this.start = startColor;
	this.end = endColor;
	this.name = itemName;
	this.voiceCount = voiceCount;
	this.colorGradient = function(){
		let canvas = canvasRenderedContext2d.createLinearGradient(0,0,0,420);
		canvas.addColorStop(0, this.start);
		canvas.addColorStop(1, this.end);
		return canvas;
	};
};


$(()=> {
	//селектор блока диаграммы
	const canvasWrapper = $('.diagram__canvas');
	
	//Высота родительского для диаграммы. По его высоте будет строиться диаграмма (чтобы не вылезала за пределы блока). 
	//Выставляется равной 100% высоты блока в котором будет находится диаграмма+легенда
	const parentHeight = canvasWrapper.css('height');
	
	//Устанавливаем ширину родительского блока диаграммы равной его высоте
	canvasWrapper.css('width',parentHeight);

	const ctx = $('#room-impression-chart')[0].getContext('2d');

	const legendArray = {
		awesome : new ChartLegendItem(ctx,'#FFE39C', '#FFBA9C', 'Великолепно', 130),
		good : new ChartLegendItem(ctx,'#6FCF97', '#66D2EA', 'Хорошо', 65),
		soso : new ChartLegendItem(ctx,'#BC9CFF', '#8BA4F9', 'Удовлетворительно', 65),
		disgusting : new ChartLegendItem(ctx,'#919191', '#3D4975', 'Разочарован', 0),
	};

	const voicesCount = legendArray.awesome.voiceCount+legendArray.good.voiceCount+legendArray.soso.voiceCount+legendArray.disgusting.voiceCount;
	
	const myChart = new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: [legendArray.disgusting, legendArray.soso, legendArray.good, legendArray.awesome],
			datasets: [{
					data: [
						legendArray.disgusting.voiceCount,
						legendArray.soso.voiceCount,
						legendArray.good.voiceCount,
						legendArray.awesome.voiceCount
					],
					backgroundColor: [
							legendArray.disgusting.colorGradient(),
							legendArray.soso.colorGradient(),
							legendArray.good.colorGradient(),
							legendArray.awesome.colorGradient()
					],
					borderColor: 'white',
					borderWidth: 2,
			}]
		},
		options: {
			tooltips: false,
			cutoutPercentage: 90,
			legend: false,
			legendCallback: function(chart) {
				var text = [];
				text.push('<ul class="diagram__legend-list">');
				for (let index = chart.data.datasets[0].data.length; index > 0 ; index--) {
					text.push(`<li class="diagram__legend-list-item"><div class="diagram__legend-list-marker" style="background:
						linear-gradient(${chart.data.labels[index-1].start},${chart.data.labels[index-1].end})"></div><span>`);
					if (chart.data.labels[index-1].name) {
						text.push(chart.data.labels[index-1].name);
					}
					text.push('</span></li>');
				}
				text.push('</ul>');
				return text.join("");
			},
		}
	});

	$('.diagram__inner-text').prepend(`<span class='header1'>${voicesCount}</span> `);
	$('#room-impression-chart-legend').html(myChart.generateLegend());

});