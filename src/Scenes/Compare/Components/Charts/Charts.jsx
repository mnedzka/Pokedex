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

    handleClick = ev => {
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
            legend : {
                labels : {
                    fontColor : '#fff',
                    fontSize : 14,
                    fontFamily : 'ubuntulight',
                    generateLabels: chart => {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map((label, i) => {
                                const meta = chart.getDatasetMeta(0);
                                const ds = data.datasets[0];
                                const arc = meta.data[i];
                                const arcOpts = chart.options.elements.arc;
                                const fill = data.datasets[arc._datasetIndex].backgroundColor[arc._index];
                                const value = data.datasets[arc._datasetIndex].data[arc._index];
                                return {
                                    text: `${label} ${value}`,
                                    fillStyle: fill,
                                    index: i
                                };
                            });
                        }
                        return [];
                    },
                },
            },
            tooltips : {
                bodyFontSize : 16,
            },
        };
        return <div className={Styles.wrapper}>
            <h5>Stat: {formatName(this.state.currentStat)}</h5>
            <Pie data={chartData} options={options} />
            <button onClick={this.handleClick} className={Styles.change}>
                Change Stat
            </button>
        </div>;
    }
}
