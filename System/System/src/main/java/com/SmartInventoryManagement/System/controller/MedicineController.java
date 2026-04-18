package com.SmartInventoryManagement.System.controller;
import com.SmartInventoryManagement.System.dto.SellRequest;
import com.SmartInventoryManagement.System.model.Medicine;
import com.SmartInventoryManagement.System.service.MedicineService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MedicineController {
    @Autowired
    private final MedicineService medicineService;

    // Add medicine
    @PostMapping("/addMedicine")
    public Medicine addMedicine(@RequestBody Medicine medicine) {
        return medicineService.addMedicine(medicine);
    }

    // Get all medicines
    @GetMapping("/getAllMedicine")
    public List<Medicine> getAllMedicines() {
        return medicineService.getAllMedicines();
    }

    // Search
    @GetMapping("/searchMedicine")
    public List<Medicine> search(@RequestParam String q) {
        return medicineService.search(q);
    }

    @PostMapping("/sell")
    public String sellMedicine(@RequestBody SellRequest request) {
        return medicineService.sellMedicine(
                request.getMedicineId(),
                request.getQuantity()
        );
    }
}