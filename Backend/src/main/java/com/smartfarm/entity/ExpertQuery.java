package com.smartfarm.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ExpertQuery {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	private String question;
	
	private String answer;
	
	@ManyToOne
	private User farmer;
	
	@ManyToOne
	private Farm farm;
	
	
	private LocalDateTime createdAt;
	private LocalDateTime answeredAt;
	
	

}
