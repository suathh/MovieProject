package com.example.models;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by suat on 12.03.2016.
 */
@Transactional
public interface LikesDao extends CrudRepository<Likes,Long> {

    @Query(value="select count(type) from likes where type='up' AND movie_id= :id",nativeQuery = true)
    String findByMovieId(@Param("id") String id);

}
