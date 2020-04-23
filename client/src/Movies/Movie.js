import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateForm from "./UpdateForm";

function Movie({ addToSavedList }, props) {
  const { push } = useHistory();
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteItem = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then((res) => {
        console.log("DELETE RES", res);
        // res.data
        // props.setItems(res.data);

        // // res.data ==> just the id
        const newItems = props.items.filter((v) => `${v.id}` !== res.data);
        props.setItems(newItems);
        push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <button
        className="edit-button"
        onClick={() => push(`/update-movie/${movie.id}`)}
      >
        Edit
      </button>
      <button className="md-button" onClick={deleteItem}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
