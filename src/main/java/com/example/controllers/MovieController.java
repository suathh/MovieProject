package com.example.controllers;

import com.example.models.Likes;
import com.example.models.LikesDao;
import com.example.models.Movies;
import com.example.models.MoviesDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by suat on 12.03.2016.
 */
@CrossOrigin(origins = "http://localhost:63342", maxAge = 3600)
@Controller
public class MovieController {
    @RequestMapping("/movies/create")
    @ResponseBody
    public String create(String name,String type,String year){
        String movieId="";
        try{
            Movies movie = new Movies(name,type,year);
            moviesDao.save(movie);
            movieId=String.valueOf(movie.getId());
        }
        catch(Exception ex){
            return "Error creating the movie: "+ex.toString();
        }
        return "Movie created succesfully with id="+movieId;
    }

    @RequestMapping("/movies/delete")
    @ResponseBody
    public String delete(long id){
        try{
            Movies movie = new Movies(id);
            moviesDao.delete(movie);
        }
        catch(Exception ex){
            return "Error deleting the movie:"+ex.toString();
        }
        return "Movie succesfully deleted!";
    }

    @RequestMapping("/movies/get-by-name")
    @ResponseBody
    public String getByName(String name){
        String movieId="";
        try{
            Movies movie = moviesDao.findByName(name);
            movieId=String.valueOf(movie.getId());
        }
        catch(Exception ex){
            return "Movie not found";
        }
        return movieId;
    }

    /*@RequestMapping("/movies/get-by-id")
    @ResponseBody
    public String getById(String id){
        String movieName="";
        try{
            Movies movie = moviesDao.findById(id);
            movieName=String.valueOf(movie.getName());
        }
        catch(Exception ex){
            return "Movie not found";
        }
        return "The movie name is: "+movieName;
    }*/

    @RequestMapping("/movies/getAll")
    @ResponseBody
    private Iterable getAll(){
        Iterable<Movies> movie;
        try{
            movie = moviesDao.findAll();

        }
        catch(Exception ex){
            return null;
        }
        return movie;
    }

    @RequestMapping("/movies/getLikes-by-id")
    @ResponseBody
    private Iterable getAllLikes(){
        Iterable<Movies> movie;
        try{
            movie = moviesDao.findAll();

        }
        catch(Exception ex){
            return null;
        }
        return movie;
    }

    @RequestMapping("/movies/addLikes")
    @ResponseBody
    private String addLikes(String type,String value,String movieId,String userId){
        Likes like;
        try{
            like = new Likes(type,value,movieId,userId);
            likesDao.save(like);
        }
        catch(Exception ex){
            return "Hata eklenemedi."+ex.toString();
        }
        return "Başarı ile eklendi";
    }


    @RequestMapping("/movies/update")
    @ResponseBody
    public String updateMovie(long id,String name,String type,String year){
        try{
            Movies movie = moviesDao.findOne(id);
            movie.setName(name);
            movie.setType(type);
            movie.setYear(year);
        }
        catch(Exception ex){
            return "Error updating the movie: "+ex.toString();
        }
        return "Movie succesfully updated";
    }
    @RequestMapping("/movies/get-likes")
    @ResponseBody
    private String getLikes(String movieId){
        String likes="";
        try{
            likes = likesDao.findByMovieId(movieId);
        }
        catch(Exception ex){
            return "Hata eklenemedi."+ex.toString();
        }
        return likes;
    }
    @Autowired
    private MoviesDao moviesDao;
    @Autowired
    private LikesDao likesDao;
}
