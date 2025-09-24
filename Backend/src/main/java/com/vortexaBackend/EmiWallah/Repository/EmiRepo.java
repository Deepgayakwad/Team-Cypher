package com.vortexaBackend.EmiWallah.Repository;

import com.vortexaBackend.EmiWallah.Model.EMISchedules;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmiRepo extends JpaRepository<EMISchedules,Integer> {

}
