package com.vortexaBackend.EmiWallah.Service;

import com.vortexaBackend.EmiWallah.Model.Loans;
import com.vortexaBackend.EmiWallah.Model.EMISchedules;
import com.vortexaBackend.EmiWallah.Model.Temp.ConsolidationRequest;
import com.vortexaBackend.EmiWallah.Model.Temp.ConsolidationResponse;
import com.vortexaBackend.EmiWallah.Repository.LoanRepo;
import com.vortexaBackend.EmiWallah.Repository.EmiRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ConService {

    @Autowired
    private LoanRepo loanRepo;

    @Autowired
    private EmiRepo emiRepo;

    @Autowired
    private Emi emiCalculatorService;   // EMI calculator utility

    public ConsolidationResponse consolidateLoans(ConsolidationRequest request) {
        // 1. Fetch loans
        List<Loans> loans = loanRepo.findAllById(request.getLoanIds());

        if (loans.isEmpty()) {
            throw new RuntimeException("No valid loans found for consolidation");
        }

        // 2. Total outstanding principal (before consolidation)
        double totalPrincipalBefore = loans.stream()
                .mapToDouble(Loans::getPrincipalAmount)
                .sum();

        // 3. Total interest (before consolidation) → by checking their EMIs
        double totalInterestBefore = emiRepo.findAll().stream()
                .filter(emi -> request.getLoanIds().contains(emi.getLoan().getLoanId()))
                .mapToDouble(EMISchedules::getInterestComponent)
                .sum();

        double totalPayableBefore = totalPrincipalBefore + totalInterestBefore;

        // 4. Create consolidated loan
        Loans consolidatedLoan = new Loans();
        consolidatedLoan.setUser(loans.get(0).getUser()); // assuming same user
        consolidatedLoan.setPrincipalAmount(totalPrincipalBefore);
        consolidatedLoan.setInterestRate(request.getNewInterestRate());
        consolidatedLoan.setTenureMonths(request.getTenureMonths());
        consolidatedLoan.setStartDate(LocalDate.now());
        consolidatedLoan.setLoanType("Consolidated");
        consolidatedLoan.setStatus("Active");
        consolidatedLoan.setLenderName(request.getLenderName());

        loanRepo.save(consolidatedLoan);

        // 5. Generate new EMI schedule
        List<EMISchedules> newEmiSchedules =
                emiCalculatorService.generateEMISchedule(consolidatedLoan);

        newEmiSchedules.forEach(emi -> emi.setLoan(consolidatedLoan));
        emiRepo.saveAll(newEmiSchedules);

        // 6. Compute totals after consolidation
        double totalInterestAfter = newEmiSchedules.stream()
                .mapToDouble(EMISchedules::getInterestComponent)
                .sum();

        double totalPayableAfter = consolidatedLoan.getPrincipalAmount() + totalInterestAfter;

        // 7. Mark old loans as closed
        loans.forEach(l -> l.setStatus("Closed_Consolidated"));
        loanRepo.saveAll(loans);

        // 8. Return comparison in response
        return new ConsolidationResponse(
                consolidatedLoan.getLoanId(),
                totalPrincipalBefore,
                request.getTenureMonths(),
                request.getNewInterestRate(),
                totalInterestBefore,
                totalPayableBefore,
                totalInterestAfter,
                totalPayableAfter
        );
    }
}
