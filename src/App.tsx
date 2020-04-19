import * as React from "react";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component<PropType, StateType> {
  state = {
    covidRecords: [],
    loading: true
  };

  getCovidTrackingData = async () => {
    const res = await axios.get(
      "https://covidtracking.com/api/v1/states/daily.json"
    );
    this.setState({ covidRecords: res.data, loading: false });
  };

  componentDidMount() {
    this.getCovidTrackingData();
  }

  render() {
    if (this.state.loading) {
      return <div>loading</div>;
    } else {
      const vaRecords = this.state.covidRecords.filter(
        (covidRecord: CovidRecord) =>
          covidRecord.state === "VA" && covidRecord.positiveIncrease !== null
      );
      const data = {
        labels: vaRecords.map((cr: CovidRecord) => moment(cr.date, 'YYYYMMDD').format('MMM Do')),
        datasets: [
          {
            label: "New Positives",
            data: vaRecords.map((cr: CovidRecord) => cr.positiveIncrease),
            backgroundColor: "#3d9970",
            borderWidth: 1,
            borderColor: "#777",
            hoverBorderWidth: 3,
            hoverBorderColor: "#000"
          }
        ]
      };

      const options = {
        title: {
          display: true,
          text: "VA Daily Positive Covid Tests",
          fontSize: 25
        },
        legend: {
          display: false,
        }
      };
      return (
        <div>
          <Bar data={data} options={options} />
        </div>
      );
    }
  }
}

type PropType = {};
type StateType = {
  loading: boolean;
  covidRecords: CovidRecord[];
};
type CovidRecord = {
  date: number;
  state: string;
  positive: number;
  negative: number;
  pending: number;
  hospitalizedCurrently: number;
  hospitalizedCumulative: number;
  inIcuCurrently: number;
  inIcuCumulative: number;
  onVentilatorCurrently: number;
  onVentilatorCumulative: number;
  recovered: number;
  hash: string;
  dateChecked: string;
  death: number;
  hospitalized: number;
  total: number;
  totalTestResults: number;
  posNeg: number;
  fips: string;
  deathIncrease: number;
  hospitalizedIncrease: number;
  negativeIncrease: number;
  positiveIncrease: number;
  totalTestResultsIncrease: number;
};

export default App;
