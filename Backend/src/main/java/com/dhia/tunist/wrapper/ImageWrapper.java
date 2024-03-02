package com.dhia.tunist.wrapper;

import java.util.Map;

import jakarta.persistence.Embeddable;

@Embeddable
public class ImageWrapper {
    private Map<String, String> map;
    
    private ImageWrapper() {}
    
    public Map<String, String> getMap() {
        return map;
    }

    public void setMap(Map<String, String> map) {
        this.map = map;
    }
}
