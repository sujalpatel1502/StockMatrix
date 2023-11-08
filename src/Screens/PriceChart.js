import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from "react-native-axios"

const PriceChart = (props) => {
  const name = props.name
  console.log(name);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchdata();
  }, [])
  const options = {
    method: 'GET',
    url: 'https://real-time-quotes1.p.rapidapi.com/api/v1/historical/stock',
    params: {
      interval: '4hour',
      symbol: `${name}`
    },
    headers: {
      'X-RapidAPI-Key': '1d4b4262d2mshc44d7816a8ca6bfp19ab11jsn295846e886b2',
      'X-RapidAPI-Host': 'real-time-quotes1.p.rapidapi.com'
    }
   
  };

  const formatChartData = (data) => {
    const labels = data.map((item) => (item.date));
    const closeData = data.map((item) => parseFloat(item.close));
    return {
      labels: labels,
      datasets: [{
        label: 'price',
        data: closeData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };
  };
  const fetchdata = async () => {
    try {
      const response = await axios.request(options).then((res) => {
        setData(res.data.reverse())
      })

    }
    catch (error) {
      console.error(error);
    }
  }
  const chartFormattedData = formatChartData(data);
  // console.log("dataaaaaaaaaaaaaaaaaa",data);

  const htmlContent = `
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
          canvas {
            width: 100% !important;
            height: auto !important;
          }
        </style>
      </head>
      <body>
        <canvas id="myChart"></canvas>
        <script>
          var ctx = document.getElementById('myChart').getContext('2d');
          var chart = new Chart(ctx, {
            type: 'line',
            data: ${JSON.stringify(chartFormattedData)},
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        </script>
      </body>
    </html>
  `;
  return (
    <View style={styles.container}>
      <WebView
        style={styles.chart}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    flex: 1,
  },
});
export default PriceChart;
