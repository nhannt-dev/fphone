import React, { memo, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import { getDaysInMonth, getMonthInYear } from '../ultils/fn'

const ProductChart = ({ data, isMonth }) => {
    const [chartData, setChartData] = useState([])
    useEffect(() => {
        const daysInMonth = getDaysInMonth(new Date().getDate())
        const monthsInYear = getMonthInYear(new Date().getMonth() + 1)
        const rawData = isMonth ? monthsInYear : daysInMonth
        const editedData = rawData.map(el => {
            return ({
                soldProducts: data?.some(i => i.shoppingDate === el) ? data.find(i => i.shoppingDate === el)?.soldProducts : 0,
                shoppingDate: el
            })
        })
        setChartData(editedData)
    }, [data])
    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: true },
                grid: { color: 'rgba(0,0,0,0.1)', drawTicks: false },
                min: Math.min(...chartData?.map(el => +el.soldProducts)) - 5 < 0 ? 0 : Math.min(...chartData?.map(el => +el.soldProducts)) - 5,
                max: Math.max(...chartData?.map(el => +el.soldProducts)) + 5,
                border: { dash: [20, 0] }
            },
            x: {
                ticks: { color: 'black' },
                grid: { color: 'transparent' }
            }
        },
        plugins: {
            legend: false,
        },
        hover: {
            mode: 'dataset',
            intersect: false
        }
    }
    return (
        <div className='py-4 w-full h-full'>
            <Line
                options={options}
                data={{
                    labels: chartData?.map(el => el.shoppingDate),
                    datasets: [
                        {
                            data: chartData?.map(el => +el.soldProducts),
                            borderColor: '#e35050',
                            tension: 0.2,
                            borderWidth: 2,
                            pointBackgroundColor: 'white',
                            pointHoverRadius: 4,
                            pointBorderColor: '#e35050',
                            pointHoverBorderWidth: 4,
                        }
                    ]
                }}
            />
        </div>
    )
}

export default memo(ProductChart)