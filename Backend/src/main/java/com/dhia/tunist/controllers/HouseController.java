package com.dhia.tunist.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhia.tunist.models.House;
import com.dhia.tunist.services.HouseService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/houses")
public class HouseController {

	

    @Autowired
    private HouseService houseService;
    
    
    @PostMapping("")
    public ResponseEntity<House> createHouse(@RequestBody @Valid House house) {
        House createdHouse = houseService.createHouse(house);
        return new ResponseEntity<>(createdHouse, HttpStatus.CREATED);
    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<House> findHouseById(@PathVariable Long id) {
        House foundHouse = houseService.findHouseById(id);
        
        if (foundHouse != null) {
            return new ResponseEntity<>(foundHouse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("")
    public ResponseEntity<List<House>> findAllHouses() {
        List<House> allHouses  = houseService.allHouses();
        
        return new ResponseEntity<>(allHouses, HttpStatus.OK);
    }
    
    @PatchMapping("")
    public ResponseEntity<House> updatedHouse(@RequestBody @Valid House house){
    	
    	House updatedHouse = houseService.updateHouse(house);
    	
    	return new ResponseEntity<>(updatedHouse, HttpStatus.CREATED);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHouse(@PathVariable Long id) {
    	houseService.deleteHouse(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    
}
