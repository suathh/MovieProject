package com.example.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by suat on 12.03.2016.
 */
@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    @NotNull
    private String email;

    @NotNull
    private String name;

    @NotNull
    private String password;

    public User(){}

    public User(long id){
        this.id=id;
    }

    public User(String email,String name,String password){
        this.email=email;
        this.name=name;
        this.password=password;
    }

    public long getId() {
        return id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }
}
