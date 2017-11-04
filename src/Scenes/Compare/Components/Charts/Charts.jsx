import React from 'react';
import Styles from './Charts.scss';
import { formatName } from 'src/utils';
import { Pie } from 'react-chartjs-2';

export default class Charts extends React.Component {
    constructor () {
        super();
        this.colors = [
            '#FCB150',
            '#4FC4F6',
            '#D25B19',
            '#3AB754',
        ];
        this.state = {
            currentStat : 'total',
        };
    }

    handleChartClick = ev => {
        const stats = [
            'hp',
            'attack',
            'defense',
            'special_attack',
            'special_defense',
            'speed',
            'total',
        ];
        const current = this.state.currentStat;
        const ind = stats.indexOf(current);
        const next = (ind + 1) % stats.length;
        this.setState({
            currentStat : stats[next],
        });
    };

    createLabels = pokemons => pokemons.map(p => formatName(p.name));

    createStatsData = pokemons => {
        const data = [];
        pokemons.forEach(p => {
            const stats = {
                name : p.name,
            };
            let total = 0;
            for (let i in p.stats) {
                stats[i] = p.stats[i].base;
                total = total + p.stats[i].base;
            }
            data.push({
                ...stats,
                total,
            });
        });
        return data;
    };

    getChartData = data => {
        const statsData = this.createStatsData(data);
        const labels = this.createLabels(data);
        const stat = this.state.currentStat;
        const chartData = statsData.map(s => s[stat]);
        return {
            labels,
            datasets : [{
                data : chartData,
                backgroundColor : this.colors,
            }],
        };
    };

    render () {
        const chartData = this.getChartData(this.props.data);
        const options = {
            animation : {
                onComplete : pie => {
                    const chart = pie.chart;
                    const tooltips = chart.tooltip._active;
                    if (Array.isArray(tooltips) && tooltips.length) return;
                    const ctx = chart.ctx;
                    ctx.font = '20px ubuntulight';
                    chart.config.data.datasets.forEach(dataset => {
                        dataset.data.forEach((_data, i) => {
                            const _meta = Object.values(dataset._meta).slice().shift();
                            const model = _meta.data[i]._model;
                            const midRad = model.outerRadius / 2;
                            const midAngle = model.startAngle + (model.endAngle - model.startAngle) / 2;
                            const posX = midRad * Math.cos(midAngle) - 10;
                            const posY = midRad * Math.sin(midAngle);
                            ctx.fillStyle = '#fff';
                            ctx.fillText(_data, model.x + posX, model.y + posY);
                        });
                    });
                },
            },
            legend : {
                labels : {
                    fontColor : '#fff',
                    fontSize : 14,
                    fontFamily : 'ubuntulight',
                },
            },
            tooltips : {
                bodyFontSize : 16,
                callbacks : {
                    label : (tooltipItem, data) => {
                        const { index, datasetIndex } = tooltipItem;
                        return `${data.labels[index]} - ${data.datasets[datasetIndex].data[index]}`;
                    },
                },
            },
            onClick : this.handleChartClick,
        };
        return <div className={Styles.wrapper}>
            <h5>Stat: {formatName(this.state.currentStat)}</h5>
            <p>Click on chart to change displayed stat.</p>
            <Pie data={chartData} options={options} />
        </div>;
    }
}
