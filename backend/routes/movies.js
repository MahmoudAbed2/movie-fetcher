import { Router } from 'express';
import movieSchema from '../models/movieModel.js';
import generateId from '../utils/utils.js';
import authenticate from '../middlewares/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', (req, res) => {
    const response = {
        success : true,
        status : 200,
        data : movies
    }

    res.send(response);
});

router.get('/:imdbid', (req, res) => {
    const imdbid = req.params.imdbid;
    const movie = movies.find(movie => movie.imdbid === imdbid);

    if (!movie) {
        const response = {
            success : false,
            status : 404,
            error : 'Movie not found'
        }
        return res.status(404).send(response);
    }

    const response = {
        success : true,
        status : 200,
        data : movie
    }

    res.send(response);
});

router.post('/', (req, res) => {
    const body = req.body;
    console.log(body);
    const { error } = movieSchema.validate(body);
    console.log(error);

    if (error) {
        const response = {
            success : false,
            status : 400,
            error : error.details[0].message
        }
        return res.status(400).send(response);
    }

    const newMovie = {
        title: body.title,
        imdbid: 'tt' + generateId(),
        poster: body.poster,
        trailer_link: body.trailer_link,
        is_favorite: false
    }

    movies.push(newMovie);

    const response = {
        success : true,
        status : 201,
        data : newMovie,
        message : 'Movie added successfully'
    }

    res.send(response);
});

router.put('/:imdbid', (req, res) => {
    const imdbid = req.params.imdbid;
    const movie = movies.find(movie => movie.imdbid === imdbid);

    if (!movie) {
        const response = {
            success : false,
            status : 404,
            error : 'Movie not found'
        }
        return res.status(404).send(response);
    }

    movie.is_favorite = !movie.is_favorite;

    const response = {
        success : true,
        status : 200,
        data : movie,
        message : 'Movie updated successfully'
    }
    res.send(response);
});

router.delete('/:imdbid', (req, res) => {
    const imdbid = req.params.imdbid;
    const movieIndex = movies.findIndex(movie => movie.imdbid === imdbid);
    const deletedMovie = movies.splice(movieIndex, 1);

    const response = {
        success : true,
        status : 200,
        data : deletedMovie,
        message : 'Movie deleted successfully'
    }
    res.send(response);
});

const movies = [
    {
        "title": "The Imitation Game",
        "imdbid": "tt2084970",
        "poster": "https://m.media-amazon.com/images/M/MV5BNjI3NjY1Mjg3MV5BMl5BanBnXkFtZTgwMzk5MDQ3MjE@._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/nuPZUUED5uk",
        "is_favorite": false
    },
    {
        "title": "The Social Network",
        "imdbid": "tt1285016",
        "poster": "https://m.media-amazon.com/images/M/MV5BOGUyZDUxZjEtMmIzMC00MzlmLTg4MGItZWJmMzBhZjE0Mjc1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/lB95KLmpLR4",
        "is_favorite": false
    },
    {
        "title": "Offside",
        "imdbid": "tt0774755",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTI1NDM3NTE2M15BMl5BanBnXkFtZTcwMjA1MTc3MQ@@._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/lmarOJeqJgg",
        "is_favorite": false
    },
    {
        "title": "Hacksaw Ridge",
        "imdbid": "tt2119532",
        "poster": "https://m.media-amazon.com/images/M/MV5BMjQ1NjM3MTUxNV5BMl5BanBnXkFtZTgwMDc5MTY5OTE@._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/s2-1hz1juBI",
        "is_favorite": false
    },
    {
        "title": "Moneyball",
        "imdbid": "tt1210166",
        "poster": "https://m.media-amazon.com/images/M/MV5BMjAxOTU3Mzc1M15BMl5BanBnXkFtZTcwMzk1ODUzNg@@._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/-4QPVo0UIzc",
        "is_favorite": false
    },
    {
        "title": "Deadpool",
        "imdbid": "tt1431045",
        "poster": "https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/ONHBaC-pfsk",
        "is_favorite": false
    },
    {
        "title": "American Psycho",
        "imdbid": "tt0144084",
        "poster": "https://m.media-amazon.com/images/M/MV5BZTM2ZGJmNjQtN2UyOS00NjcxLWFjMDktMDE2NzMyNTZlZTBiXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/Q_jaJR_cNFU",
        "is_favorite": false
    },
    {
        "title": "I, Robot",
        "imdbid": "tt0343818",
        "poster": "https://m.media-amazon.com/images/M/MV5BNmE1OWI2ZGItMDUyOS00MmU5LWE0MzUtYTQ0YzA1YTE5MGYxXkEyXkFqcGdeQXVyMDM5ODIyNw@@._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/s0f3JeDVeEo",
        "is_favorite": false
    },
    {
        "title": "Fanboys",
        "imdbid": "tt0489049",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTI2MDM0NTY5OF5BMl5BanBnXkFtZTcwODMxMzIwMg@@._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/OdoJujK7hSs",
        "is_favorite": false
    },
    {
        "title": "Logan",
        "imdbid": "tt3315342",
        "poster": "https://m.media-amazon.com/images/M/MV5BYzc5MTU4N2EtYTkyMi00NjdhLTg3NWEtMTY4OTEyMzJhZTAzXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/Div0iP65aZo",
        "is_favorite": false
    },
    {
        "title": "Green Book",
        "imdbid": "tt6966692",
        "poster": "https://m.media-amazon.com/images/M/MV5BYzIzYmJlYTYtNGNiYy00N2EwLTk4ZjItMGYyZTJiOTVkM2RlXkEyXkFqcGdeQXVyODY1NDk1NjE@._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/QkZxoko_HC0",
        "is_favorite": false
    },
    {
        "title": "Blood Diamond",
        "imdbid": "tt0450259",
        "poster": "https://m.media-amazon.com/images/M/MV5BZDMxOGZhNWYtMzRlYy00Mzk5LWJjMjEtNmQ4NDU4M2QxM2UzXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/yknIZsvQjG4",
        "is_favorite": false
    },
    {
        "title": "The Terminal",
        "imdbid": "tt0362227",
        "poster": "https://m.media-amazon.com/images/M/MV5BYzY3YzNlZjctZTNiNC00MjUzLTlhM2ItNjdkNzAwMDhmYmRmXkEyXkFqcGdeQXVyMjgyNjk3MzE@._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/2X1zH0YfqZY",
        "is_favorite": false
    }, 
    {
        "title": "No Country for Old Men",
        "imdbid": "tt0477348",
        "poster": "https://m.media-amazon.com/images/M/MV5BMjA5Njk3MjM4OV5BMl5BanBnXkFtZTcwMTc5MTE1MQ@@._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/38A__WT3-o0",
        "is_favorite": false
    },
    {
        "title": "EuroTrip",
        "imdbid": "tt0356150",
        "poster": "https://m.media-amazon.com/images/M/MV5BMWRmYjY1NTUtNjNlMC00MDFjLTk0MTYtZWVlMTFhMjllYjUzXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/qbZ4rzWbUdA",
        "is_favorite": false
    },
    {
        "title": "Nobody",
        "imdbid": "tt7888964",
        "poster": "https://m.media-amazon.com/images/M/MV5BMjM5YTRlZmUtZGVmYi00ZjE2LWIyNzAtOWVhMDk1MDdkYzhjXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/wZti8QKBWPo",
        "is_favorite": false
    },
    {
        "title": "Zombieland",
        "imdbid": "tt1156398",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTU5MDg0NTQ1N15BMl5BanBnXkFtZTcwMjA4Mjg3Mg@@._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/8m9EVP8X7N8",
        "is_favorite": false
    }, 
    {
        "title": "I Rymden Finns Inga Känslor",
        "imdbid": "tt1686313",
        "poster": "https://m.media-amazon.com/images/M/MV5BNGNjZDIwMmMtNjgzZC00NGM0LTk2MDQtZGNkOGVlNThlYTljXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/H_6UnkHEy98",
        "is_favorite": false
    }, 
    {
        "title": "Batman Ninja",
        "imdbid": "tt7451284",
        "poster": "https://m.media-amazon.com/images/M/MV5BMjFlMDc2NGMtYjkyMS00MTlhLTgxNWItMmYxZjc5NzVhMGE0XkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/WSW6fQYQi2w",
        "is_favorite": false
    },
    {
        "title": "Järnjätten",
        "imdbid": "tt0129167",
        "poster": "https://m.media-amazon.com/images/M/MV5BYzBjZTNkMzQtZmNkOC00Yzk0LTljMjktZjk3YWVlZjY3NTk2XkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg",
        "trailer_link": "https://www.youtube.com/embed/obLtyj8hfFk",
        "is_favorite": false
    }
]

export default router;

