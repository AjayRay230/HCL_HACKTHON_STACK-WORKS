package com.SmartInventoryManagement.System.dto;

import lombok.Data;

@Data
public class SellRequest {

    private Long medicineId;
    private int quantity;
}