package com.vortexaBackend.EmiWallah.Model.Temp;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
@Component
public class EMIResponse {

    private LocalDate dueDate;
    private double emiAmount;
    private double principalComponent;
    private double interestComponent;
    private double outstandingBalance;
    private String status;

    // Constructors
    public EMIResponse() {}

    public EMIResponse(LocalDate dueDate, double emiAmount, double principalComponent,
                       double interestComponent, double outstandingBalance, String status) {
        this.dueDate = dueDate;
        this.emiAmount = emiAmount;
        this.principalComponent = principalComponent;
        this.interestComponent = interestComponent;
        this.outstandingBalance = outstandingBalance;
        this.status = status;
    }

    // Getters and Setters
    public LocalDate getDueDate() {
        return dueDate;
    }
    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }
    public double getEmiAmount() {
        return emiAmount;
    }
    public void setEmiAmount(double emiAmount) {
        this.emiAmount = emiAmount;
    }
    public double getPrincipalComponent() {
        return principalComponent;
    }
    public void setPrincipalComponent(double principalComponent) {
        this.principalComponent = principalComponent;
    }
    public double getInterestComponent() {
        return interestComponent;
    }
    public void setInterestComponent(double interestComponent) {
        this.interestComponent = interestComponent;
    }
    public double getOutstandingBalance() {
        return outstandingBalance;
    }
    public void setOutstandingBalance(double outstandingBalance) {
        this.outstandingBalance = outstandingBalance;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
}
