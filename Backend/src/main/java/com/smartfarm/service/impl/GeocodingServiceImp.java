package com.smartfarm.service.impl;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeocodingServiceImp {

    @Value("${opencage.api.key}")
    private String apiKey;

    public double[] getCoordinates(String location) {
        String url = String.format(
            "https://api.opencagedata.com/geocode/v1/json?q=%s&key=%s",
            location.replace(" ", "+"), apiKey
        );

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        JSONObject json = new JSONObject(response);
        JSONObject geometry = json.getJSONArray("results").getJSONObject(0).getJSONObject("geometry");

        double lat = geometry.getDouble("lat");
        double lng = geometry.getDouble("lng");

        System.out.println("Coordinates for " + location + ": " + lat + ", " + lng);
        return new double[]{lat, lng};
    }
}
