package com.SmartInventoryManagement.System.service;

import com.SmartInventoryManagement.System.model.Medicine;
import com.SmartInventoryManagement.System.repo.MedicineRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryScheduler {

    private final MedicineRepo medicineRepo;

    // Runs every 2 minutes
    @Scheduled(fixedRate = 120000)
    public void monitorExpiry() {

        List<Medicine> medicines = medicineRepo.findAll();
        LocalDate today = LocalDate.now();

        for (Medicine med : medicines) {

            long daysLeft = ChronoUnit.DAYS.between(today, med.getExpiryDate());

            if (daysLeft < 0) {
                System.out.println("❌ EXPIRED: " + med.getName());
            } else if (daysLeft <= 30) {
                System.out.println("🔴 Expiring soon: " + med.getName());
            } else if (daysLeft <= 90) {
                System.out.println("🟡 Expiring later: " + med.getName());
            }
        }
    }
}