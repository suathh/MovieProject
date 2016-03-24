package com.example.models;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Array;
import java.util.List;

/**
 * Created by suat on 12.03.2016.
 */
@Transactional
public interface MoviesDao extends CrudRepository<Movies,Long> {
    public Movies findByName(String name);

    public Movies findById(Long id);

    @Query(value="select count(type) from likes where type='up' AND movie_id= :id",nativeQuery = true)
    String findByMovieId(@Param("id") String id);

    @Query(value="SELECT m.id,m.name,m.type,m.year FROM likes l,movies m WHERE l.movie_id=m.id GROUP BY movie_id ORDER BY count(value) DESC LIMIT 10",nativeQuery = true)
    Iterable<Movies> getTopTen();
}
