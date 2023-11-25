import React, { useEffect, useState, } from 'react'
import { Bar, }                        from 'react-chartjs-2'
import { useStorageData, }             from '@/utils/storage'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { convertBytesToGB, } from '@/utils'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,)

const BarChart = () => {

  const [ totalDiskSpace, setTotalDiskSpace, ] = useState<number>(0,)

  const { storageData, } = useStorageData()

  useEffect(() => {
    if (!storageData || !storageData.usedDiskSpace || !storageData.freeDiskSpace) {
      return
    }

    const total = storageData.usedDiskSpace + storageData.freeDiskSpace

    setTotalDiskSpace(total,)
  }, [ storageData, ],)

  const data = {
    labels   : [ 'Disk Space', ],
    datasets : [
      {
        label           : 'Used',
        data            : [ convertBytesToGB(storageData?.usedDiskSpace,), ],
        backgroundColor : '#f87171',
      },
      {
        label           : 'Free',
        data            : [ convertBytesToGB(storageData?.freeDiskSpace,), ],
        backgroundColor : '#d6d3d1',
      },
      {
        label           : 'Media',
        data            : [ convertBytesToGB(storageData?.mediaSpaceUsed,), ],
        backgroundColor : 'blue',
      },
      {
        label           : 'Re-Public',
        data            : [ convertBytesToGB(storageData?.republicAppSpaceUsed,), ],
        backgroundColor : 'orange',
      },
    ],
  }

  const options = {
    indexAxis : 'y', // Horizontal bar chart
    scales    : {
      x : { // Note that it's 'x', not 'xAxes'
        stacked : true, // Stacked bar chart
        grid    : {
          display : false, // Hides gridlines on the X-axis
        },
        display : false,
      },
      y : { // Note that it's 'y', not 'yAxes'
        stacked : true, // Stacked bar chart
        grid    : {
          display : false, // Hides gridlines on the Y-axis
        },
        display : false,
      },
    },
    plugins : {
      legend : {
        display : false,
      },
      formatter : (value, context,) => {
        return `${value} GB`
      },
    },
  }

  return <Bar data={data} options={options} />
}

export default BarChart
