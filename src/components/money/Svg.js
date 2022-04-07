import s from './Money.module.css';
import { ReactComponent as Wolna } from '../../assets/images/icons/wolna.svg';
export default function Svg() {
  return (
    <div className={s.wolna}>
      {/* <Wolna className={s.wolna} /> */}
      <svg
        width="393"
        height="134"
        viewBox="0 0 393 134"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M31.44 47.8127L0 76.719V114C0 125.046 8.9543 134 20 134H363C379.569 134 393 120.569 393 104V25.0151C391.568 24.2279 389.483 23.9649 388.598 23.9033C381.707 23.4236 377.754 28 372.25 32.2417L372.181 32.2944C370.554 33.5494 366.484 36.6888 359.045 36.6888C351.499 36.6888 346.259 33.7241 344.582 32.2417L319.43 8.89426C316.077 5.92951 308.741 0 300.566 0C292.392 0 285.894 5.92951 282.96 8.89426L166.632 108.405C164.746 110.258 158.961 113.964 150.912 113.964C142.863 113.964 137.078 110.258 135.192 108.405L67.9104 45.0332C65.6048 42.8097 58.8557 38.3625 50.304 38.3625C41.7523 38.3625 34.1648 44.6626 31.44 47.8127Z"
          fill="red"
          fill-opacity="0.2"
        />
        <defs>
          <linearGradient
            id="paint0_linear_13963_517"
            x1="196.5"
            y1="-10"
            x2="196.5"
            y2="134"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}