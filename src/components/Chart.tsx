import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IRouteParams {
  coinId: string;
}
interface IHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Loader = styled.h1`
  text-align: center;
  font-size: 20px;
`;

function Chart() {
  const { coinId } = useParams<IRouteParams>();
  const { isLoading, data } = useQuery<IHistory[]>(["chart", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "sales",
              data:
                data?.map(
                  (price) =>
                    [
                      price.time_close,
                      price.open,
                      price.high,
                      price.low,
                      price.close,
                    ] as number[]
                ) ?? [],
            },
          ]}
          options={{
            noData: {
              text: "No data text",
              align: "center",
              verticalAlign: "middle",
            },
            chart: {
              type: "candlestick",
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            dataLabels: {
              style: {
                colors: ["#999"],
              },
            },
            grid: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) => price.time_close) ?? [],
              labels: {
                style: {
                  colors: "white",
                },
              },
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
              labels: {
                style: {
                  colors: "white",
                },
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
              theme: "dark",
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#fb5e46",
                  downward: "#27a0f0",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
