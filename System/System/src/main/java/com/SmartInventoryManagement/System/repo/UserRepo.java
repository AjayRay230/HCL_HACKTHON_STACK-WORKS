package com.SmartInventoryManagement.System.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import com.SmartInventoryManagement.System.model.User;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Long>{

Optional<User> findByEmail(String email);
}
