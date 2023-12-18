// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Button, BackButton, Message, Spinner } from "./index";
import { useUrlPostion } from "../hooks/useUrlPostion";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { UsePosts } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const KEY = "bdc_c81c02b3104e41e186bd1e82ed18ba3b";

function Form() {
  const [lat, lng] = useUrlPostion();
  const { CreateCity, isLoading } = UsePosts();
  const navigate = useNavigate();

  const [isLoadingGecoding, setIsLoadingGecoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetCityData() {
        try {
          setIsLoadingGecoding(true);
          setGeocodingError("");
          const res = await fetch(`${BASE_URL}?&latitude=${lat}&longitude=${lng}&key=${KEY}`);
          const data = await res.json();
          console.log(data);
          if (!data.countryCode) {
            throw new Error("That doesn't seem to be city. Click somewhere else 😉");
          }
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGecoding(false);
        }
      }
      fetCityData();
    },
    [lat, lng]
  );

  async function HandleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await CreateCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGecoding) return <Spinner />;
  if (!lat && !lng) return <Message message="Start by clicking somewhere on the map" />;
  if (geocodingError) return <Message message={geocodingError} />;
  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={HandleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName} />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" onChange={(date) => setDate(date)} selected={date} dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
