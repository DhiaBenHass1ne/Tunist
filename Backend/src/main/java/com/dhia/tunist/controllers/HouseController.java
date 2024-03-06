package com.dhia.tunist.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhia.tunist.models.Article;
import com.dhia.tunist.models.House;
import com.dhia.tunist.models.User;
import com.dhia.tunist.services.HouseService;
import com.dhia.tunist.services.UserService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/houses")
public class HouseController {

	

    @Autowired
    private HouseService houseService;
	@Autowired
	private UserService userService;
    
    @PostMapping("")
    public ResponseEntity<House> createHouse(@RequestBody @Valid House house) {
    	Long LoanerId = house.getLoaner().getId();
    	if(LoanerId != null) {
    		User loaner = userService.findUserById(LoanerId);
    		house.setLoaner(loaner);
    		House createdHouse = houseService.createHouse(house);
    		List<House>prehouses = loaner.getHouses();
    		if(prehouses== null) {
    			
    		}
    		prehouses.add(createdHouse);
    		loaner.setHouses(prehouses);
    		userService.updateUser(loaner);
    		return new ResponseEntity<>(createdHouse, HttpStatus.CREATED);

    	}
    	else {
    		House createdHouse = houseService.createHouse(house);

    		return new ResponseEntity<>(createdHouse, HttpStatus.CREATED);
    	}
    	
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
    public ResponseEntity<List<Map<String, Object>>> findAllHouses() {
        List<House> allHouses  = houseService.allHouses();
		List<Map<String, Object>> houseData = new ArrayList<>();
		if(allHouses != null) {
			for (House house : allHouses) {
				Map<String, Object> houseMap = new HashMap<>();
				houseMap.put("id", house.getId()); // Add article data
				houseMap.put("house", house); // Add article data
				User loaner = house.getLoaner(); // Assuming you have a PublisherModel class
				if (loaner!=null) {
					Map<String, Object> userMap = new HashMap<>();
					userMap.put("id", loaner.getId()); // Add publisher ID to article map
					userMap.put("firstName", loaner.getFirstName());
					userMap.put("lastName", loaner.getLastName());
					userMap.put("image", loaner.getImage());
					houseMap.put("loaner",userMap);
				}
				
				houseData.add(houseMap);

			}
		}
        return new ResponseEntity<>(houseData, HttpStatus.OK);
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
