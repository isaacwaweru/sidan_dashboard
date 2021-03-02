<template>
  <v-card class="pa-md-4 mx-lg-auto text-center">
    <chart
      element-loading-text="Loading..."
      class="charts"
      :autoresize="true"
      :options="chartOptionsLine"
    ></chart>
  </v-card>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => ({
    chartOptionsLine: {
      xAxis: {
        data: ["1 Jun", "2 Jun", "3 Jun", "4 Jun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          type: "line",
          data: [63, 75, 24, 92],
          smooth: true
        }
      ],
      title: {
        text: "Quarterly Sales Results",
        x: "center",
        textStyle: {
          fontSize: 12
        }
      },
      legend: {
        show: true,
        top: 10
        // data: [],
      },
      tooltip: {
        // show: true,
        showContent: true,
        // alwaysShowContent: true,
        triggerOn: "mousemove",
        trigger: "item",
        axisPointer: {
          label: {
            show: true
          }
        }
      },
      color: ["#127ac2"]
    }
  })
};
</script>
<style scoped>
.charts {
  width: 100%;
}
.charts {
  border-radius: 6px;
}
</style>
