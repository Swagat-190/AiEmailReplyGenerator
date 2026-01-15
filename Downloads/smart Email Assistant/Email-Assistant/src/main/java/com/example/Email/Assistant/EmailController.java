package com.example.Email.Assistant;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
public class EmailController {
    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generate(@RequestBody EmailRequest emailRequest ){
        return ResponseEntity.ok(emailService.generateEmail(emailRequest));
    }
}
