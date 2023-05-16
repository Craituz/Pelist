import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './interfaces/movie.interfaces'
import { CreateMovieDto } from './dto/movie.dto'
import { MovieModule } from './movie.module';

@Injectable()
export class MovieService {

    constructor(@InjectModel('Movie') private readonly MovieModel: Model<Movie>) {}

    async getMovies(): Promise<Movie[]> {
        const movies = await this.MovieModel.find();
        return movies;
    }

    async getMovie(movieID: string): Promise<Movie> {
        const movie = await this.MovieModel.findById(movieID);
        return movie;
    }

    async createMovie ( createMovieDTO: CreateMovieDto ): Promise<Movie> {
        const movie = new this.MovieModel(createMovieDTO);
        return await movie.save();

    }

    async deleteMovie(movieID: string): Promise<Movie> {
        const deleteMovie = await this.MovieModel.findByIdAndDelete(movieID);
        return deleteMovie;
    }

    async actualizarMovie(movieID: string, createMovieDTO: CreateMovieDto): Promise<Movie> {
        const updatedMovie = await this.MovieModel.findByIdAndUpdate(movieID, createMovieDTO, { new: true });
        return updatedMovie;
    }


}
