import PropTypes from "prop-types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import s from "./statistics.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = ({ data, balance }) => {
  return (
    <div className={s.container}>
      <Doughnut data={data} className={s.doughnut} />
      <p className={s.text}> ₴ {balance}.00</p>
    </div>
  );
};

Charts.defaultProps = {
  data: {
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [],
        borderWidth: 1,
      },
    ],
  },
};

Charts.propTypes = {
  data: PropTypes.shape({
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.array,
        data: PropTypes.array,
        backgroundColor: PropTypes.array,
        borderWidth: PropTypes.number,
      })
    ),
  }).isRequired,
  balance: PropTypes.number,
};

export default Charts;
