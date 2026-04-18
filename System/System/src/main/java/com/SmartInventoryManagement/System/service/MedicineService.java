package com.SmartInventoryManagement.System.service;

import com.SmartInventoryManagement.System.model.Medicine;
import com.SmartInventoryManagement.System.repo.MedicineRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.concurrent.*;

@Service
@RequiredArgsConstructor
public class MedicineService {

    private final MedicineRepo medicineRepo;
    private final EmailService emailService;

    private final ScheduledExecutorService scheduler =
            Executors.newScheduledThreadPool(1);

    // =========================
    // ADD MEDICINE
    // =========================
    public Medicine addMedicine(Medicine medicine) {
        return medicineRepo.save(medicine);
    }

    // =========================
    // GET ALL
    // =========================
    public List<Medicine> getAllMedicines() {
        return medicineRepo.findAll();
    }

    // =========================
    // SEARCH
    // =========================
    public List<Medicine> search(String query) {
        return medicineRepo
                .findByNameContainingIgnoreCaseOrSaltContainingIgnoreCase(query, query);
    }

    // =========================
    // SELL LOGIC
    // =========================
    public String sellMedicine(Long medicineId, int quantity) {

        Medicine medicine = medicineRepo.findById(medicineId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Medicine not found"
                ));

        int currentStock = medicine.getStock();
        int reorderLevel = medicine.getReorderLevel();

        // ❌ Not enough stock
        if (currentStock < quantity) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Not enough stock available"
            );
        }

        // ✅ Perform sale
        int newStock = currentStock - quantity;
        medicine.setStock(newStock);
        medicineRepo.save(medicine);

        // ⚠️ Trigger reorder if below level
        if (newStock < reorderLevel) {

            emailService.sendLowStockEmail(
                    medicine.getSupplierEmail(),
                    medicine.getName(),
                    newStock
            );

            scheduleRestock(medicineId, reorderLevel);

            return "Sold successfully. Reorder triggered. Restocking in 30 seconds.";
        }

        return "Sold successfully. Remaining stock: " + newStock;
    }

    // =========================
    // DELAYED RESTOCK
    // =========================
    private void scheduleRestock(Long medicineId, int reorderLevel) {

        scheduler.schedule(() -> {

            Medicine med = medicineRepo.findById(medicineId).orElse(null);
            if (med == null) return;

            // Double-check before restock
            if (med.getStock() < reorderLevel) {
                med.setStock(reorderLevel);
                medicineRepo.save(med);

                System.out.println("🚚 Restocked: " + med.getName());
            }

        }, 30, TimeUnit.SECONDS);
    }
}