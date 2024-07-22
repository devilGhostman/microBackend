const { MovieRepository } = require("../repositories/index");
const { HttpError } = require("../utils/index");

const movieRepository = new MovieRepository();

async function createMovie(movie, filePath) {
  try {
    const existingMovie = await movieRepository.getMovieByTitle(movie.title);
    if (existingMovie) {
      throw new HttpError("Movie already exists");
    }

    const newMovie = await movieRepository.createMovie({
      ...movie,
      moviePath: filePath,
    });
    return newMovie;
  } catch (error) {
    throw new Error(error);
  }
}

async function getMovies(query) {
  try {
    const pageNum = query?.pageNum ? +query?.pageNum : 0;
    const pageSize = query?.pageSize ? +query?.pageSize : 10;

    const filter = {};
    const sort = {};

    if (query.popular == "true") {
      sort.popularity = -1;
    }

    if (query.rating == "true") {
      sort.imdb_Rating = -1;
    }

    if (query.new == "true") {
      sort.release_date = 1;
    }

    if (query.adult == "true") {
      filter.adult = true;
    }

    if (query.genre && query.genre.length > 0) {
      filter.genre = {
        $in: [query.genre],
      };
    }

    if (query.search) {
      const regex = new RegExp(query.search, "i");
      filter.title = regex;
    }

    const movies = await movieRepository.getMovies(
      filter,
      sort,
      pageNum,
      pageSize
    );
    return movies;
  } catch (error) {
    throw new Error(error);
  }
}

async function getMovieById(id) {
  try {
    const movie = await movieRepository.getMovieById(id);
    return movie;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateMovie(id, newMovie) {
  try {
    const updatedMovie = await movieRepository.updateMovie(id, newMovie);
    return updatedMovie;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteMovie(id) {
  try {
    const deletedMovie = await movieRepository.deleteMovie(id);
    return deletedMovie;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
