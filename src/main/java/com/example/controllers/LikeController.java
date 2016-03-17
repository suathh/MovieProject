package com.example.controllers;

import com.example.models.Likes;
import com.example.models.LikesDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by suat on 12.03.2016.
 */
@Controller
public class LikeController {
    @RequestMapping("/likes/add")
    @ResponseBody
    public String create(String type,String value,String movieId,String userId){
        String userid="";
        try{
            Likes like = new Likes(type,value,movieId,userId);
            likesDao.save(like);
            userid = String.valueOf(like.getId());
        }
        catch(Exception ex){
            return "Like didn't count because of : "+ex.toString();
        }
        return "Your like collected succesfully !";
    }
    @Autowired
    private LikesDao likesDao;
}
