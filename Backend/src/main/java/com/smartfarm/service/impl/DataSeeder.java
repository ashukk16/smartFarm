package com.smartfarm.service.impl;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.smartfarm.entity.CropSuggestion;
import com.smartfarm.entity.SoilType;
import com.smartfarm.repository.CropSuggestionRepository;
import com.smartfarm.repository.SoilTypeRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
	
	private final SoilTypeRepository  soilRepository;
    private final CropSuggestionRepository cropRepository;
    
    @Override
	public void run(String... args) throws Exception 
    {
		if(soilRepository.count() == 0)
		{
			
			SoilType loamy = soilRepository.save(SoilType.builder()
					.name("Loamy Soil")
					.minPh(6.0)
					.maxPh(7.5)
					.nutrients("Nitrogen , Phosphorus , Potasssium")
					.texture("Balanced sand , silt , and clay")
					.fertility("High")
					.build());
			
			SoilType sandy = soilRepository.save(SoilType.builder()
					.name("Sandy soil")
					.minPh(5.5)
					.maxPh(6.5)
					.nutrients("Low organic context , fast draining")
					.texture("Loose and gritty")
					.fertility("Low")
					.build());
			
			
			SoilType clay = soilRepository.save(SoilType.builder()
					.name("Clay soil")
					.minPh(5.0)
					.maxPh(6.0)
					.nutrients("rich in minerals ")
					.texture("Heavy and sticky")
					.fertility("meduim")
					.build());
			
			
			SoilType black = soilRepository.save(SoilType.builder()
					.name("Black soil")
					.minPh(6.0)
					.maxPh(8.0)
					.nutrients("Rich in minerals , High in iron , magnesium")
					.texture("Sticky when wet")
					.fertility("High")
					.build());
			
			
			cropRepository.saveAll(List.of(
					
					//Loamy
					
					CropSuggestion.builder().cropName("Wheat").soilType(loamy).build(),
					
					
					CropSuggestion.builder().cropName("Sugarcane").soilType(loamy).build(),
					
					CropSuggestion.builder().cropName("Maize").soilType(loamy).build(),
					
					//Sandy 
					
					CropSuggestion.builder().cropName("Groundnut").soilType(sandy).build(),
					
					CropSuggestion.builder().cropName("Potato").soilType(sandy).build(),
					
					//Clay
					
					CropSuggestion.builder().cropName("Paddy").soilType(clay).build(),
					
					CropSuggestion.builder().cropName("Mustrad").soilType(clay).build(),
					
					
					//black
					
					CropSuggestion.builder().cropName("Cotton").soilType(black).build(),
					
					CropSuggestion.builder().cropName("Soyabeen").soilType(black).build(),
					
					CropSuggestion.builder().cropName("Sorghum").soilType(black).build()
					
					
					));
			
			
			System.out.println("Soil and Crop data seedded!");
			
			
			
			
		}
		
	}

}
