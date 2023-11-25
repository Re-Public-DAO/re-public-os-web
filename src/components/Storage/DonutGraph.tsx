import React                                              from 'react'
import { Doughnut, }                                      from 'react-chartjs-2'
import { useStorageData, }                                from '@/utils/storage'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from 'chart.js'
import ChartDataLabels                                    from 'chartjs-plugin-datalabels'
import { convertBytesToGB, }                              from '@/utils'


ChartJS.register(ArcElement, Tooltip, ChartDataLabels,)


const DonutGraph = () => {

  const { storageData, } = useStorageData()

  const data = {
    labels   : [ 'Used', 'Free', 'Media', 'Re-Public', ],
    datasets : [
      {
        label : 'Disk Usage',
        data  : [
          convertBytesToGB(storageData?.usedDiskSpace,),
          convertBytesToGB(storageData?.freeDiskSpace,),
          convertBytesToGB(storageData?.mediaSpaceUsed,),
          convertBytesToGB(storageData?.republicAppSpaceUsed,),
        ],
        backgroundColor : [ '#f87171', '#d6d3d1', '#06b6d4', '#fb923c', ],
        borderWidth     : 2,
        borderColor     : [ '#f87171', '#d6d3d1', '#06b6d4', 'orange', ],
        hoverOffset     : 4,
      },
    ],
  }

  const options = {
    plugins : {
      datalabels : {
        color     : '#fff',
        textAlign : 'center',
        font      : {
          size   : 12,
          weight : 'bold',
        },
        formatter : (value, context,) => {
          return `${value} GB`
        },
      },
      legend : {
        display : false,
      },
    },

  }

  return <Doughnut data={data} options={options} plugins={[ ChartDataLabels, ]} />
}

export default DonutGraph
