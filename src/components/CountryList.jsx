import { UsePosts } from "../contexts/CitiesContext";
import { Spinner, CountryItem, Message } from "./index";
import styles from "./CountryList.module.css";
export default function CountryList() {
  const { cities, isLoading } = UsePosts();
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />;
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) return [...arr, { country: city.country, emoji: city.emoji }];
    else {
      return arr;
    }
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
