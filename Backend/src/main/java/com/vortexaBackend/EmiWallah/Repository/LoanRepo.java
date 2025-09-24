package com.vortexaBackend.EmiWallah.Repository;

import com.vortexaBackend.EmiWallah.Model.Loans;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanRepo extends JpaRepository<Loans,Long> {
}
