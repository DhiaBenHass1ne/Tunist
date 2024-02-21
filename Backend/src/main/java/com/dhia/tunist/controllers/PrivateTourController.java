package com.dhia.tunist.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhia.tunist.models.PrivateTour;
import com.dhia.tunist.services.PrivateTourService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/privateTours")
public class PrivateTourController {


    @Autowired
    private PrivateTourService privateTourService;
	
	
	
    @PostMapping("/new")
    public ResponseEntity<PrivateTour> createPrivateTour(@RequestBody @Valid PrivateTour privateTour) {
        PrivateTour createdPrivateTour = privateTourService.createPrivateTour(privateTour);
        return new ResponseEntity<>(createdPrivateTour, HttpStatus.CREATED);
    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<PrivateTour> findPrivateTourById(@PathVariable Long id) {
        PrivateTour foundPrivateTour = privateTourService.findPrivateTourById(id);
        
        if (foundPrivateTour != null) {
            return new ResponseEntity<>(foundPrivateTour, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("")
    public ResponseEntity<List<PrivateTour>> findAllPrivateTours() {
        List<PrivateTour> allPrivateTours  = privateTourService.allPrivateTours();
        
        
        return new ResponseEntity<>(allPrivateTours, HttpStatus.OK);
    }
    
    
    @PutMapping("/edit")
    public ResponseEntity<PrivateTour> updatePrivateTour(@RequestBody @Valid PrivateTour privateTour){
    	
    	PrivateTour updatedPrivateTour = privateTourService.updatePrivateTour(privateTour);
    	
    	return new ResponseEntity<>(updatedPrivateTour, HttpStatus.CREATED);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrivateTour(@PathVariable Long id) {
        privateTourService.deletePrivateTour(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
