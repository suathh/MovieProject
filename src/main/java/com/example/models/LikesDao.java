package com.example.models;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by suat on 12.03.2016.
 */
@Transactional
public interface LikesDao extends CrudRepository<Likes,Long> {

}
