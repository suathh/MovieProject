package com.example.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by suat on 12.03.2016.
 */
@Entity
@Table(name = "likes")
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private String type;

    @NotNull
    private String value;

    @NotNull
    private String movieId;

    @NotNull
    private String userId;


    public Likes() { }

    public Likes(long id) {
        this.id = id;
    }

    public Likes(String type, String value,String movieId,String userId) {
        this.type = type;
        this.value = value;
        this.movieId=movieId;
        this.userId=userId;
    }


    public long getId() {
        return id;
    }
    public String getType() {
        return type;
    }
    public String getValue() {
        return value;
    }
    public String getMovieId() {
        return movieId;
    }
    public String getUserId(){
        return userId;
    }


}
