package com.vortexaBackend.EmiWallah.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "consolidation_plans")
@AllArgsConstructor
@NoArgsConstructor
public class Consolidation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long consolidationId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    private double consolidatedAmount;

    private double consolidatedRate; // annual %

    private int tenureMonths;

    private double consolidatedEmi;

    private double savingsEstimate;

    private LocalDateTime createdAt;

    // Constructors, Getters, Setters

    public Long getConsolidationId() {
        return consolidationId;
    }

    public void setConsolidationId(Long consolidationId) {
        this.consolidationId = consolidationId;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public double getConsolidatedAmount() {
        return consolidatedAmount;
    }

    public void setConsolidatedAmount(double consolidatedAmount) {
        this.consolidatedAmount = consolidatedAmount;
    }

    public double getConsolidatedRate() {
        return consolidatedRate;
    }

    public void setConsolidatedRate(double consolidatedRate) {
        this.consolidatedRate = consolidatedRate;
    }

    public int getTenureMonths() {
        return tenureMonths;
    }

    public void setTenureMonths(int tenureMonths) {
        this.tenureMonths = tenureMonths;
    }

    public double getConsolidatedEmi() {
        return consolidatedEmi;
    }

    public void setConsolidatedEmi(double consolidatedEmi) {
        this.consolidatedEmi = consolidatedEmi;
    }

    public double getSavingsEstimate() {
        return savingsEstimate;
    }

    public void setSavingsEstimate(double savingsEstimate) {
        this.savingsEstimate = savingsEstimate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
