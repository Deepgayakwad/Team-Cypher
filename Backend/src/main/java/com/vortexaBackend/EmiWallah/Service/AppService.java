package com.vortexaBackend.EmiWallah.Service;

import com.vortexaBackend.EmiWallah.Model.Loans;
import com.vortexaBackend.EmiWallah.Model.Temp.LoanRequest;
import com.vortexaBackend.EmiWallah.Model.Users;
import com.vortexaBackend.EmiWallah.Repository.LoanRepo;
import com.vortexaBackend.EmiWallah.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppService {

    @Autowired
    LoanRepo lrepo;

    @Autowired
    UserRepo urepo;

    @Autowired
    Emi emiSer;
    public List<Loans> getLoans(){
        return lrepo.findAll();
    }

    public void addLoan(LoanRequest request, Long userId){

        Users user ;

        if (urepo.findById(userId).isEmpty()) {
            user = new Users();
            user.setName("Dummy User");
            user.setEmail("dummy@example.com");
            user.setPasswordHash("12345"); // plain text for hackathon
            user.setCreatedAt(LocalDateTime.now());

            urepo.save(user);
        }
        else{
            user = urepo.findById(userId).orElse(new Users());
        }
        Loans  loan = new Loans();
        loan.setUser(user);
        loan.setLenderName(request.getLenderName());
        loan.setPrincipalAmount(request.getPrincipalAmount());
        loan.setInterestRate(request.getInterestRate());
        loan.setTenureMonths(request.getTenureMonths());
        loan.setLoanType(request.getLoanType());
        loan.setStartDate(LocalDate.now());
        loan.setStatus("Active");
        lrepo.save(loan);

        emiSer.generateEMISchedule(loan);
    }

    public void deleteAllLoans(){
        lrepo.deleteAll();
    }

    public void deleteLoans(Long id) {
        lrepo.deleteById(id);
    }
}
