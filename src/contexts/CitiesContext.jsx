import { createContext, useEffect, useContext, useReducer, useCallback } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "isLoading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "Error fetching cities" });
      }
    }
    fetchCities();
  }, []);

  const GetCity = useCallback(
    async function GetCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "isLoading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "The was an error fetching data..." });
      }
    },
    [currentCity.id]
  );

  async function CreateCity(newCity) {
    dispatch({ type: "isLoading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "The was an error creating the city." });
    }
  }

  async function DeleteCity(id) {
    dispatch({ type: "isLoading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({ type: "rejected", payload: "The was an error deleting the city." });
    }
  }

  return <CitiesContext.Provider value={{ cities, isLoading, currentCity, GetCity, CreateCity, DeleteCity, error }}>{children}</CitiesContext.Provider>;
}
function UsePosts() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("PostContext was used outside of PostProvider");
  return context;
}

export { UsePosts, CitiesProvider };
