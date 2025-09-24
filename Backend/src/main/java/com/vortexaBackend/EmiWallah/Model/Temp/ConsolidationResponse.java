package com.vortexaBackend.EmiWallah.Model.Temp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConsolidationResponse {

    private Long consolidatedLoanId;

    // Consolidated loan details
    private double consolidatedPrincipal;
    private int tenureMonths;
    private double newInterestRate;

    // Before consolidation
    private double totalInterestBefore;
    private double totalPayableBefore;

    // After consolidation
    private double totalInterestAfter;
    private double totalPayableAfter;

    public Long getConsolidatedLoanId() {
        return consolidatedLoanId;
    }

    public void setConsolidatedLoanId(Long consolidatedLoanId) {
        this.consolidatedLoanId = consolidatedLoanId;
    }

    public double getConsolidatedPrincipal() {
        return consolidatedPrincipal;
    }

    public void setConsolidatedPrincipal(double consolidatedPrincipal) {
        this.consolidatedPrincipal = consolidatedPrincipal;
    }

    public int getTenureMonths() {
        return tenureMonths;
    }

    public void setTenureMonths(int tenureMonths) {
        this.tenureMonths = tenureMonths;
    }

    public double getNewInterestRate() {
        return newInterestRate;
    }

    public void setNewInterestRate(double newInterestRate) {
        this.newInterestRate = newInterestRate;
    }

    public double getTotalInterestBefore() {
        return totalInterestBefore;
    }

    public void setTotalInterestBefore(double totalInterestBefore) {
        this.totalInterestBefore = totalInterestBefore;
    }

    public double getTotalPayableBefore() {
        return totalPayableBefore;
    }

    public void setTotalPayableBefore(double totalPayableBefore) {
        this.totalPayableBefore = totalPayableBefore;
    }

    public double getTotalInterestAfter() {
        return totalInterestAfter;
    }

    public void setTotalInterestAfter(double totalInterestAfter) {
        this.totalInterestAfter = totalInterestAfter;
    }

    public double getTotalPayableAfter() {
        return totalPayableAfter;
    }

    public void setTotalPayableAfter(double totalPayableAfter) {
        this.totalPayableAfter = totalPayableAfter;
    }

    public ConsolidationResponse(Long consolidatedLoanId, double consolidatedPrincipal, int tenureMonths, double newInterestRate, double totalInterestBefore, double totalPayableBefore, double totalInterestAfter, double totalPayableAfter) {
        this.consolidatedLoanId = consolidatedLoanId;
        this.consolidatedPrincipal = consolidatedPrincipal;
        this.tenureMonths = tenureMonths;
        this.newInterestRate = newInterestRate;
        this.totalInterestBefore = totalInterestBefore;
        this.totalPayableBefore = totalPayableBefore;
        this.totalInterestAfter = totalInterestAfter;
        this.totalPayableAfter = totalPayableAfter;
    }
}
