import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/movie.dto';
import { MovieService } from "./movie.service";

@Controller('movie')
export class MovieController {

    constructor(private movieService: MovieService) {}
    @Post('/create')
        async createPost(@Res() res, @Body() createMovieDto: CreateMovieDto) {
            const movie = await this.movieService.createMovie(createMovieDto);
            return res.status(HttpStatus.OK).json({
                message: 'Pelicula creada exitosamente',
                movie: movie,
            })
        }
    
    @Get ('/')
    async getMovies(@Res() res) {
        const movie = await this.movieService.getMovies();
        return res.status(HttpStatus.OK).json({
            movie
        })
    }
    
    @Get ('/:movieID')
    async getMovie(@Res() res, @Param('movieID') movieID) {
        const movie = await this.movieService.getMovie(movieID);
        if (!movie) throw new NotFoundException('Pelicula no existe');
        return res.status(HttpStatus.OK).json(movie);
    }
    
    @Delete('/delete/:movieID')
    async deleteMovie(@Res() res, @Param('movieID') movieID) {
        const movie = await this.movieService.deleteMovie(movieID);
        if (!movie) throw new NotFoundException('Pelicula no existe');
        return res.status(HttpStatus.OK).json({
            message: 'Pelicula eliminada',
            movie   
        });
    }

    @Put('/update/:movieID')
    async actualizarMovie(@Res() res, @Body() CreateMovieDto: CreateMovieDto, @Param('movieID') movieID) {
        const movie = await this.movieService.actualizarMovie(movieID,CreateMovieDto);
        if (!movie) throw new NotFoundException('Pelicula no existe');
        return res.status(HttpStatus.OK).json({
            message: 'Pelicula actualizada',
            movie
        });
    }
}
