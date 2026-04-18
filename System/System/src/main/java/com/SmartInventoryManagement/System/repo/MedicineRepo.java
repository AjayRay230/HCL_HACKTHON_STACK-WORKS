package com.SmartInventoryManagement.System.repo;

import com.SmartInventoryManagement.System.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineRepo extends JpaRepository<Medicine, Long> {

    List<Medicine> findByNameContainingIgnoreCaseOrSaltContainingIgnoreCase(String name, String salt);
}