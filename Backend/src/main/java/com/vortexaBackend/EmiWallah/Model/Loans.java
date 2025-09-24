package com.vortexaBackend.EmiWallah.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Entity
@Component
@Table(name = "loans")
@AllArgsConstructor
@NoArgsConstructor
public class Loans {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private Users user;

    private String lenderName;

    private double principalAmount;

    private double interestRate; // annual %

    private int tenureMonths;

    private LocalDate startDate;

    private String loanType;

    private String status; // Active, Closed, Refinance

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL)
    @JsonIgnore

    private List<EMISchedules> emiSchedules;

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL)
    private List<RefinancingOptions> refinancingOptions;

    public Long getLoanId() {
        return loanId;
    }

    public void setLoanId(Long loanId) {
        this.loanId = loanId;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

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

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<EMISchedules> getEmiSchedules() {
        return emiSchedules;
    }

    public void setEmiSchedules(List<EMISchedules> emiSchedules) {
        this.emiSchedules = emiSchedules;
    }

    public List<RefinancingOptions> getRefinancingOptions() {
        return refinancingOptions;
    }

    public void setRefinancingOptions(List<RefinancingOptions> refinancingOptions) {
        this.refinancingOptions = refinancingOptions;
    }

    @Override
    public String toString() {
        return "Loans{" +
                "loanId=" + loanId +
                ", user=" + user +
                ", lenderName='" + lenderName + '\'' +
                ", principalAmount=" + principalAmount +
                ", interestRate=" + interestRate +
                ", tenureMonths=" + tenureMonths +
                ", startDate=" + startDate +
                ", loanType='" + loanType + '\'' +
                ", status='" + status + '\'' +
                ", emiSchedules=" + emiSchedules +
                ", refinancingOptions=" + refinancingOptions +
                '}';
    }
    // Constructors, Getters, Setters
}
