package com.vortexaBackend.EmiWallah.Model.Temp;

import java.util.List;

public class ConsolidationRequest {
    private List<Long> loanIds;
    private int tenureMonths;
    private double newInterestRate;
    private String lenderName;

    public String getLenderName() {
        return lenderName;
    }

    public void setLenderName(String lenderName) {
        this.lenderName = lenderName;
    }
// getters and setters

    public List<Long> getLoanIds() {
        return loanIds;
    }

    public void setLoanIds(List<Long> loanIds) {
        this.loanIds = loanIds;
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
}
