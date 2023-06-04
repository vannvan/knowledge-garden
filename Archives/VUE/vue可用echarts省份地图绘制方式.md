```vue
<style lang="less">
    .o-echarts {
        min-width: 30px;
        min-height: 30px;
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div :id="id" class="o-echarts"></div>
</template>

<script>

import echarts from 'echarts';
import JSON from './chongqing.json';

export default {
    name: 'echart-map',
    data() {
        return {
            id: 'echarts_' + new Date().getTime() + Math.floor(Math.random() * 1000),
            echartObj: null,
            radioList: {
                A: '年度总项目数据查询',
                B: '军转干部在岗培训项目',
                C: '专技人员公需科目项目',
                D: '专技人员新取得中级职称岗前培训项目',
                E: '事业单位新进人员岗前培训项目'
            },
            radioActive: 'A',
            option: {
                title: {
                    text: '选择所要查询的数据维度',
                    top: '3%',
                    left: '5%',
                    textStyle: {
                        fontSize: 18,
                        fontWeight: 300,
                        color: '#b6d7ff'
                    }
                },
                tooltip: {
                    padding: 0,
                    backgroundColor: 'transparent',
                    formatter: params => {
                        // params.data
                        return `<table class="map__tooltip o_font20">
                                    <thead>
                                       <tr>
                                           <th>总购买人数</th>
                                           <th>本年度总购买人数</th>
                                           <th>本月度总购买人数</th>
                                           <th>总完成人数</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>${params.data.obj.a}</th>
                                            <th>${params.data.obj.b}</th>
                                            <th>${params.data.obj.c}</th>
                                            <th>${params.data.obj.d}</th>
                                         </tr>
                                    </tbody>
                                </table>`;
                    }
                },
                legend: {
                    orient: 'vertical',
                    top: '9%',
                    left: '5%',
                    icon: 'circle',
                    data: [],
                    selectedMode: 'single',
                    selected: {},
                    itemWidth: 12,
                    itemHeight: 12,
                    itemGap: 30,
                    inactiveColor: '#b6d7ff',
                    textStyle: {
                        color: '#ec808d',
                        fontSize: 14,
                        fontWeight: 300,
                        padding: [0, 0, 0, 15]
                    }
                },
                visualMap: {
                    min: 0,
                    max: 500,
                    show: false,
                    splitNumber: 5,
                    inRange: {
                        color: ['#FACD91', '#74DFB2', '#81D3F8', '#768FDE', '#e9969f'].reverse()
                    },
                    textStyle: {
                        color: '#fff'
                    }
                },
                geo: {
                    map: '重庆',
                    label: {
                        normal: {
                            show: true,
                            color: '#000'
                        },
                        emphasis: {
                            show: true,
                            color: '#fff'
                        }
                    },
                    roam: false,
                    itemStyle: {
                        normal: {
                            areaColor: '#8db200',
                            borderColor: '#6367ad',
                            borderWidth: 1
                        },
                        emphasis: {
                            areaColor: '#feb6aa' // hover效果
                        }
                    },
                    left: '5%',
                    right: '5%',
                    top: '5%',
                    bottom: '5%'
                },
                series: [{
                    name: '年度总项目数据查询',
                    type: 'map',
                    geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
                    data: []
                }]
            }
        };
    },
    mounted() {
        this.echartObj = echarts.init(document.getElementById(this.id));
        echarts.registerMap('重庆', JSON);
        this.echartObj.setOption(this.getOptions(), true);
        this.echartObj.on('legendselectchanged', params => {
            this.radioActive = Object.keys(this.radioList).filter(item => this.radioList[item] === params.name)[0];
            this.echartObj.clear();
            this.echartObj.setOption(this.getOptions());
        });
        window.addEventListener('resize', () => {
            if (this.echartObj && this.echartObj.resize) {
                this.echartObj.resize();
            }
        });
    },
    methods: {
        getOptions() {
            this.setOptions('legend', {
                data: Object.values(this.radioList),
                selected: (list => {
                    const obj = {};
                    Object.keys(list).map((item, index) => {
                        obj[list[item]] = item === this.radioActive;
                    });
                    return obj;
                })(this.radioList)
            });
            this.setOptions('series', (() => {
                const arr = [];
                Object.values(this.radioList)
                    .map((item, index) => {
                        arr[this.radioList[this.radioActive] === item ? 'unshift' : 'push']({
                            name: item,
                            type: 'map',
                            geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
                            data: this.getSeriesData(item)
                        });
                    });
                return arr;
            })());
            return this.option;
        },
        getSeriesData(item) {
            return this.radioList[this.radioActive] === item ? JSON.features.map(item => {
                return {
                    name: item.properties.name,
                    value: Math.ceil(Math.random() * 500),
                    obj: {
                        a: Math.ceil(Math.random() * 500),
                        b: Math.ceil(Math.random() * 500),
                        c: Math.ceil(Math.random() * 500),
                        d: Math.ceil(Math.random() * 500)
                    }
                };
            }) : [];
        },
        setOptions(objKey, objVal) {
            if (this.option[objKey] && typeof this.option[objKey] === 'object' && !Array.isArray(this.option[objKey])) {
                this.option[objKey] = Object.assign(this.option[objKey], objVal);
            } else {
                this.option[objKey] = objVal;
            }
            this.$set(this.option, objKey, this.option[objKey]);
        }
    }
};
</script>

```

