package com.vortexaBackend.EmiWallah.Service;

import com.vortexaBackend.EmiWallah.Model.EMISchedules;
import com.vortexaBackend.EmiWallah.Model.Loans;
//import com.vortexaBackend.EmiWallah.Repository.EMISchedulesRepository;
import com.vortexaBackend.EmiWallah.Repository.EmiRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class Emi {

    @Autowired
    private EmiRepo emiSchedulesRepository;

    // Generate EMI schedules for a loan
    public List<EMISchedules> generateEMISchedule(Loans loan) {
        List<EMISchedules> emiList = new ArrayList<>();

        double principal = loan.getPrincipalAmount();
        double annualRate = loan.getInterestRate();
        int months = loan.getTenureMonths();

        double monthlyRate = annualRate / 12 / 100;

        double emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months))
                / (Math.pow(1 + monthlyRate, months) - 1);

        double remainingPrincipal = principal;
        LocalDate dueDate = loan.getStartDate().plusMonths(1);

        for (int i = 1; i <= months; i++) {
            double interest = remainingPrincipal * monthlyRate;
            double principalComponent = emi - interest;
            remainingPrincipal -= principalComponent;

            EMISchedules emiSchedule = new EMISchedules();
            emiSchedule.setLoan(loan);
            emiSchedule.setDueDate(dueDate);
            emiSchedule.setEmiAmount(Math.round(emi * 100.0) / 100.0);
            emiSchedule.setPrincipalComponent(Math.round(principalComponent * 100.0) / 100.0);
            emiSchedule.setInterestComponent(Math.round(interest * 100.0) / 100.0);
            emiSchedule.setOutstandingBalance(Math.round(Math.max(remainingPrincipal, 0) * 100.0) / 100.0);
            emiSchedule.setStatus("Pending");

            emiList.add(emiSchedule);
            dueDate = dueDate.plusMonths(1);
        }

        // Optionally save all at once
        emiSchedulesRepository.saveAll(emiList);

        return emiList;
    }
}
