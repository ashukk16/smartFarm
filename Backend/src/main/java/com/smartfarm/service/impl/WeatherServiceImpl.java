package com.smartfarm.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.smartfarm.dto.WeatherResponse;
import com.smartfarm.entity.Farm;
import com.smartfarm.repository.FarmRepositorty;
import com.smartfarm.service.WeatherService;
import lombok.RequiredArgsConstructor;



import org.json.JSONObject;

@Service
@RequiredArgsConstructor
public class WeatherServiceImpl implements WeatherService {

    private final FarmRepositorty farmRepository;

    @Value("${openweathermap.api.key}")
    private String apiKey;

    @Override
    public WeatherResponse getWeatherForFarm(Long farmId, String username) {
        Farm farm = farmRepository.findById(farmId)
            .orElseThrow(() -> new RuntimeException("Farm not found"));

        if (!farm.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized");
        }

        double lat = farm.getLatitude();
        double lon = farm.getLongitude();
        
        if(farm.getLatitude() ==  null || farm.getLongitude() == null)
        {
        	System.out.println("Lat/lon missing from DB for farms:" + farm.getId());
        	throw new RuntimeException("Latitude and Longitude must be provided to fetch weather data");
        }
        
        String url = String.format(
            "https://api.openweathermap.org/data/2.5/weather?lat=%s&lon=%s&appid=%s&units=metric",
            lat, lon, apiKey
        );

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        JSONObject json = new JSONObject(response);
        String weather = json.getJSONArray("weather").getJSONObject(0).getString("main");
        String description = json.getJSONArray("weather").getJSONObject(0).getString("description");
        double temp = json.getJSONObject("main").getDouble("temp");
        double feelsLike = json.getJSONObject("main").getDouble("feels_like");
        double humidity = json.getJSONObject("main").getDouble("humidity");
        double windSpeed = json.getJSONObject("wind").getDouble("speed");
        String city = json.getString("name");

        return new WeatherResponse(weather,description, temp, feelsLike, humidity, windSpeed , city);
    }
}

