import '../styles/globals.css'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import channels from '../components/channels';
import messageCountList from '../components/messageCountList';
import moment from 'moment';
import { useEffect, useState } from 'react';

function App() {

  const [list1, setList1] = useState([])
  const [render, setRender] = useState(false)

  useEffect(() => {
    checkSimilar()
    console.log('abc')
  }, [])

  useEffect(() => {
    if (list1.length !== 0) {
      setRender(true)
    }
  }, [list1])

  const checkSimilar = () => {
    const a3 = messageCountList.map(t1 => ({ ...t1, ...channels.find(t2 => t2.value === t1.channelId) }))
    getUniques(a3)
  }

  const getUniques = (list) => {
    list.map((item) => {
      if (item.guild !== undefined) {
        list1.push(item)
      }
    })
  }

  const options = {
    chart: {
      type: 'spline',
      backgroundColor:'#22222d'

    },
    title: {
      text: ''
    },
    xAxis: {
      
      categories: list1?.map((item) => moment(item.timeBucket).format('MMM Do YY')),
      accessibility: {
        description: 'Dates'
      }
      
    },
    yAxis: {
      gridLineColor: 'transparent',
      title: {
        text: 'Count'
      },
      labels: {
        formatter: function () {
          return this.value;
        }
      }
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      formatter: function () {
        return this.y + ' messages on ' + this.x
      }
    },
    series: [
      {
        showInLegend: false,
        color:'#087f7f',
        data: list1?.map((item) => Number(item.count))
      }
    ]
  };
  return (
    <div>
      <div className='mt-44 px-44'>
        {render ? <HighchartsReact highcharts={Highcharts} options={options} /> : null}
      </div>
    </div>
  )
}

export default App
