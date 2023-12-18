import { UsePosts } from "../contexts/CitiesContext";
import { Spinner, CityItem, Message } from "./index";

import styles from "./CityList.module.css";
export default function CityList() {
  const { cities, isLoading } = UsePosts();
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
