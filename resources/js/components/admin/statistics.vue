<script setup lang="ts">
import { computed, reactive, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Bar } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';

const statisticFilter = reactive({
    filterType: 'week'
})

const statisticsOption = reactive([
    {
        name: 'Week',
        value: 'week'
    },
    {
        name: 'Month',
        value: 'month'
    },
    {
        name: 'Year',
        value: 'year'
    },
    {
        name: 'All Time',
        value: 'all_time'
    },
])

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const store = useStore<any>();

// Example chart data (replace with real stats if needed)
const chartData = ref({
    labels: [],
    datasets: [
        {
            label: 'Visitors',
            backgroundColor: '#a8e767',
            data: [],
            borderColor: '#a8e767',
            borderWidth: 1
        },
        {
            label: 'Double Visits',
            backgroundColor: '#67b2e7',
            data: [],
            borderColor: '#67b2e7',
            borderWidth: 1
        }
    ]
});

const chartOptions = ref({
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Monthly Signups',
            font: {
                size: 18,
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            min: 0,
            suggestedMax: 100,
            ticks: {
                stepSize: 1,
            },
        }
    }
});

const visitors = computed(() => store.getters['statistics/visitorsGetter'])
const visitorsCount = computed(() => store.getters['statistics/visitorsCountGetter'])
const pageReloads = computed(() => store.getters['statistics/pageReloadsGetter'])
const pageReloadsCount = computed(() => store.getters['statistics/pageReloadsCountGetter'])

const getStatistics = () => {
    store.dispatch('statistics/getStatistics', statisticFilter).then(res => {
        if(res.data.success) {

            chartData.value.labels = visitors.value.x
            chartData.value.datasets[0].data = visitors.value.y
            chartData.value.datasets[1].data = pageReloads.value.y
        }
    })
}

onMounted(() => {
    getStatistics();
})

</script>

<template>
     <div class="statistics-panel-container">
        <div class="header">
            <h2>Statistics Overview</h2>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Visitors Count</h3>
                <span>{{ visitorsCount }}</span>
            </div>
            <div class="stat-card">
                <h3>Double Visitors Count</h3>
                <span>{{ pageReloadsCount }}</span>
            </div>
        </div>
        <div class="chart-section">
            <Bar  :key="chartData.labels?.join(',')" :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>
