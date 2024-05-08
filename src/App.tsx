// state management
import { useState, useEffect } from "react";

// import dependencies
import axios from "axios";
import { z, ZodError } from "zod";

import "./App.css";

// import components
import { Header } from "./components/Header";

const MovieModel = z.object({
  id: z.string(),
  poster: z.string(),
  overview: z.string(),
  title: z.string(),
});
const MovieArrayModel = z.array(MovieModel);

// type MovieData = z.infer<typeof MovieModel>;
type MovieArray = z.infer<typeof MovieArrayModel>;

function App(): JSX.Element {
  const [data, setData] = useState<MovieArray | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4005/movies");
        // console.log(response.data);

        const parsedResponse = MovieArrayModel.parse(response.data);
        setData(parsedResponse);
        console.log(data);

        setIsLoading(false);
      } catch (error) {
        if (error instanceof ZodError) {
          setError(new Error("Erreur de Validation zod !"));
        } else {
          setError(new Error("Erreur Global survenue !"));
        }
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <>
      <Header></Header>
      <h1>hello</h1>
      {/* {} */}
    </>
  );
}

export default App;
