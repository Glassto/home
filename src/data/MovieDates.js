import dayjs from "dayjs";

const MovieDates = ({ release_date }) => {
  const date = dayjs(release_date);

  return date.format("D MMMM, YYYY");
};

export default MovieDates;
