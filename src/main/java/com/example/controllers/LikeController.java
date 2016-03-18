package com.example.controllers;

import com.example.models.Likes;
import com.example.models.LikesDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by suat on 12.03.2016.
 */
@CrossOrigin(origins = "http://localhost:63342", maxAge = 36000)
@Controller
public class LikeController {

    @RequestMapping("/likes/add")
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
    @RequestMapping("/likes/get-likes")
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
    private LikesDao likesDao;
}
