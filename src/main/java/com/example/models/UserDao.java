package com.example.models;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by suat on 12.03.2016.
 */
@Transactional
public interface UserDao extends CrudRepository<User,Long>{

    public User findByEmail(String email);
}
