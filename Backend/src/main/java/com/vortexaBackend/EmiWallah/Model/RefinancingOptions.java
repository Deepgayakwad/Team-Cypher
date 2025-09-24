package com.vortexaBackend.EmiWallah.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "refinancing_options")
@AllArgsConstructor
@NoArgsConstructor
public class RefinancingOptions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refId;

    @ManyToOne
    @JoinColumn(name = "loan_id")
    private Loans loan;

    private String newLender;

    private double newInterestRate; // annual %

    private int newTenureMonths;

    private double newEmiAmount;

    private double totalInterestOld; // interest remaining on old loan

    private double totalInterestNew; // interest for new loan

    private double savingsEstimate;

    private LocalDateTime createdAt;

    // Constructors, Getters, Setters
}
