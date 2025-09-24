package com.vortexaBackend.EmiWallah.Model.Temp;

import com.vortexaBackend.EmiWallah.Model.Users;
import org.springframework.stereotype.Component;

@Component
public class LoanRequest {

//    private Users user;
    private String lenderName;
    private double principalAmount;
    private double interestRate;
    private int tenureMonths;
    private String loanType;

    // Getters and Setters


//    public Users getUser() {
//        return user;
//    }
//
//    public void setUser(Users user) {
//        this.user = user;
//    }

    public String getLenderName() {
        return lenderName;
    }

    public void setLenderName(String lenderName) {
        this.lenderName = lenderName;
    }

    public double getPrincipalAmount() {
        return principalAmount;
    }

    public void setPrincipalAmount(double principalAmount) {
        this.principalAmount = principalAmount;
    }

    public double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }

    public int getTenureMonths() {
        return tenureMonths;
    }

    public void setTenureMonths(int tenureMonths) {
        this.tenureMonths = tenureMonths;
    }

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    @Override
    public String toString() {
        return "LoanRequest{" +
                "lenderName='" + lenderName + '\'' +
                ", principalAmount=" + principalAmount +
                ", interestRate=" + interestRate +
                ", tenureMonths=" + tenureMonths +
                ", loanType='" + loanType + '\'' +
                '}';
    }
}
