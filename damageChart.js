var series = [];
var data = data508;
var ID = [];
var damage = [];
var keyName = [];
var name = '';
for (let i = 0; i < 7; i++) {
    series.unshift({ 
        name: '',
        type: 'bar',
        stack: '总量',
        data: []
    });
    
}
for (let i = 0; i < data.length; i++) {
    var id = data[i]['ID'];
    ID.unshift(id);
    damage = [];

    for(key in data[i]){
        if('ID' != key){
            if(key.indexOf('当日积分') > -1) {
                damage.unshift(data[i][key]);
                keyName.unshift(key);
            }
        }
    }
    for (let a = 0; a < damage.length; a++) {
        series[a].data.unshift(damage[a]);
        series[a].name = keyName[a];
    }
}

var option = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: keyName
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis:  {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ID
    },
    series: series
};

var option2 = {
    title : {
        text: '工会战积分统计',
        subtext: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: []
    },
    series : [
        {
            name: '工会战积分统计',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};


var stand = new Vue({
    el: '#app',
    data: {
      select: 'all',
      myChart: {},
      chartPie: '',
      option: ID,
      rbq: ['祈愿','雨落音','DIO','量子蜜柑','卡兹de兜裆裤','哒哒哒赛','天暮','仮初',],
      pieData:[],
      pieItem:{},
      pieKey:[],
      totle:0,
      name:''
    },
    mounted : function(){
        this.$nextTick(function () {
            chart = this.$refs['mycharts'];
            this.myChart = echarts.init(chart);
            this.myChart.setOption(option);
          })
    },
    methods: {
        selectVal: function(ele) {
            this.pieData = [];
            if('all' != ele.target.value){
                for (let i = 0; i < data.length; i++) {
                    this.pieKey = [];
                    if(data[i]['ID'] == ele.target.value){
                        for(key in data[i]){
                            this.pieItem = {};
                            if('ID' != key){
                                if(key.indexOf('当日积分') > -1) {
                                    this.pieItem['value'] = data[i][key];
                                    this.pieItem['name'] = key;
                                    this.pieData.push(this.pieItem);
                                    this.pieKey.push(key);
                                }
                            }
                        }
                        break;
                    }
                }
                this.name = ele.target.value;
                this.echartsPieInit(this.pieData,ele.target.value,this.pieKey);
            }else {
                this.damageInit();
            }
        },
        echartsPieInit:function(data,name,pieKey){
            console.log(data)
            this.totle = 0;
            for (let i = 0; i < data.length; i++) {
                const element = data[i]['value'];
                this.totle += Number(element);
            }
            option2.series[0]['data'] = data;
            option2['title']['subtext'] = name;
            option2['legend']['data'] = pieKey;
            var pie = this.$refs['myPieCharts'];
            var _this = this;
            setTimeout(function(){
                _this.chartPie = echarts.init(pie);
                _this.chartPie.setOption(option2);
            },300)
        },
        damageInit: function(){
            chart = this.$refs['mycharts'];
            this.myChart = echarts.init(chart);
            this.myChart.setOption(option);
        }
    }
})