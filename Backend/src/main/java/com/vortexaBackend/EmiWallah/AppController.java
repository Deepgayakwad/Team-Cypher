package com.vortexaBackend.EmiWallah;

import com.vortexaBackend.EmiWallah.Model.Loans;
import com.vortexaBackend.EmiWallah.Model.Temp.ConsolidationRequest;
import com.vortexaBackend.EmiWallah.Model.Temp.ConsolidationResponse;
import com.vortexaBackend.EmiWallah.Model.Temp.LoanRequest;
import com.vortexaBackend.EmiWallah.Service.AppService;
import com.vortexaBackend.EmiWallah.Service.ConService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5174/")
public class AppController {
    @Autowired
    AppService ser;

    @Autowired
    private ConService conService;


    @GetMapping("/loans")
    public List<Loans> getLoans(){
        return ser.getLoans();
    }

    @PostMapping("/loans/{userId}")
        public void addLoan(@RequestBody LoanRequest request, @PathVariable Long userId){
        System.out.println(request);
        ser.addLoan(request,userId);

    }

    @PostMapping("/consolidate")
    public ConsolidationResponse consolidateLoans(@RequestBody ConsolidationRequest request) {
        return conService.consolidateLoans(request);
    }

    @DeleteMapping("/delete")
    public void delete(){
        ser.deleteAllLoans();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Long id){
        ser.deleteLoans(id);
    }

}
