package com.vortexaBackend.EmiWallah.Repository;

import com.vortexaBackend.EmiWallah.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepo extends JpaRepository<Users,Long> {
    public List<Users> findByUserId(long user_id);
}
