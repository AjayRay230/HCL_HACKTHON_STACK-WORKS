package com.SmartInventoryManagement.System.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendLowStockEmail(String supplierEmail, String medicineName, int stock) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(supplierEmail);
        message.setSubject("⚠ Low Stock Alert - " + medicineName);

        message.setText(
                "Dear Supplier,\n\n" +
                        "The stock for medicine '" + medicineName + "' is low.\n" +
                        "Current stock: " + stock + "\n\n" +
                        "Please send more stock as soon as possible.\n\n" +
                        "Regards,\nPharmacy System"
        );

        mailSender.send(message);

        System.out.println("EMAIL SENT TO SUPPLIER: " + supplierEmail);
    }
}