const { MovieModel } = require("../models/index");

class MovieRepository {
  constructor() {
    this.model = MovieModel;
  }

  async createMovie(movie) {
    try {
      const newMovie = new this.model(movie);
      return await newMovie.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMovies(filter, sort, pageNum, pageSize) {
    try {
      let movies = await this.model
        .find(filter)
        .sort(sort)
        .skip(pageNum * pageSize)
        .limit(pageSize);
      return movies;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMovieById(id) {
    try {
      const movie = await this.model.findById(id);
      return movie;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMovieByTitle(title) {
    try {
      const movie = await this.model.findOne({ title });
      return movie;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateMovie(id, newMovie) {
    try {
      const updatedMovie = await this.model.findByIdAndUpdate(id, newMovie, {
        new: true,
      });
      return updatedMovie;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteMovie(id) {
    try {
      const deletedMovie = await this.model.findByIdAndDelete(id);
      return deletedMovie;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = MovieRepository;
