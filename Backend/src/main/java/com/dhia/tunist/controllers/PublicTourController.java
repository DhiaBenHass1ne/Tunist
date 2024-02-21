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

import com.dhia.tunist.models.PublicTour;
import com.dhia.tunist.services.PublicTourService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/publicTours")
public class PublicTourController {


    @Autowired
    private PublicTourService publicTourService;
	
	
	
    @PostMapping("/new")
    public ResponseEntity<PublicTour> createPublicTour(@RequestBody @Valid PublicTour publicTour) {
        PublicTour createdPublicTour = publicTourService.createPublicTour(publicTour);
        return new ResponseEntity<>(createdPublicTour, HttpStatus.CREATED);
    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<PublicTour> findPublicTourById(@PathVariable Long id) {
        PublicTour foundPublicTour = publicTourService.findPublicTourById(id);
        
        if (foundPublicTour != null) {
            return new ResponseEntity<>(foundPublicTour, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("")
    public ResponseEntity<List<PublicTour>> findAllPublicTours() {
        List<PublicTour> allPublicTours  = publicTourService.allPublicTours();
        
        
        return new ResponseEntity<>(allPublicTours, HttpStatus.OK);
    }
    
    
    @PutMapping("/edit")
    public ResponseEntity<PublicTour> updatePublicTour(@RequestBody @Valid PublicTour publicTour){
    	
    	PublicTour updatedPublicTour = publicTourService.updatePublicTour(publicTour);
    	
    	return new ResponseEntity<>(updatedPublicTour, HttpStatus.CREATED);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublicTour(@PathVariable Long id) {
        publicTourService.deletePublicTour(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
