package com.example.models;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by suat on 12.03.2016.
 */
@Transactional
public interface MoviesDao extends CrudRepository<Movies,Long> {
    public Movies findByName(String name);
    public Movies findById(List<Long> ids);
}
