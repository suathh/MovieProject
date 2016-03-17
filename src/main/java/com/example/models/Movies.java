package com.example.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by suat on 12.03.2016.
 */
@Entity
@Table(name="movies")
public class Movies {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    @NotNull
    private String name;

    @NotNull
    private String type;

    @NotNull
    private String year;

    public Movies(){}

    public Movies(long id){
        this.id=id;
    }

    public Movies(String name,String type,String year){
        this.name=name;
        this.type=type;
        this.year=year;
    }

    public long getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getName() {
        return name;
    }
    public String getType() {
        return type;
    }
    public String getYear() {
        return year;
    }
}
