package com.example.Email.Assistant;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;



import org.springframework.beans.factory.annotation.Value;



@Service
public class EmailService {
    private final WebClient webClient;
    private final String apiKey;

    public EmailService(WebClient.Builder webclientBuilder,
                                @Value("${gemini.api.url}") String baseUrl,
                        @Value("${gemini.api.key}")String apiKey) {
        this.apiKey = apiKey;
        this.webClient = webclientBuilder.baseUrl(baseUrl).build();
    }

    public  String generateEmail(EmailRequest emailRequest) {
        //Build prompt
        String prompt = generatePrompt(emailRequest);
        //prepare json request body
        String requestBody = String.format("""
                {
                "contents": [
                   {
                     "parts": [
                       {
                       "text": "%s"
                       }
                     ]
                   }
                 ]
               }""",prompt);
        //Send Request
        String response = webClient.post()
                .uri(uriBuilder -> uriBuilder.path("/v1beta/models/gemini-3-flash-preview:generateContent").build())
                .header("x-goog-api-key",apiKey)
                .header("Content-Type","application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        //Extract Response
        return extractResponseContent(response);


    }

    private String extractResponseContent(String response)  {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(response);
            return root.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }


    }

    private String generatePrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
       prompt.append("Write a professional email reply");
       if(emailRequest.getType() != null && !emailRequest.getType().isEmpty()){
           prompt.append("use").append(emailRequest.getType()).append("tone");
       }
       prompt.append("original email is").append(emailRequest.getText());
       return prompt.toString();
    }
}
