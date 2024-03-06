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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhia.tunist.models.Attraction;
import com.dhia.tunist.models.Guide;
import com.dhia.tunist.models.PrivateTour;
import com.dhia.tunist.models.PublicTour;
import com.dhia.tunist.models.Tourist;
import com.dhia.tunist.services.AttractionService;
import com.dhia.tunist.services.GuideService;
import com.dhia.tunist.services.PrivateTourService;
import com.dhia.tunist.services.TouristService;
import com.dhia.tunist.services.UserService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/privateTours")
public class PrivateTourController {


    @Autowired
    private PrivateTourService privateTourService;
    @Autowired
	private UserService userService;

	@Autowired
	private TouristService touristService;

	@Autowired
	private GuideService guideService;

	@Autowired
	private AttractionService attractionService;

	
	
	
    @PostMapping("")
    public ResponseEntity<PrivateTour> createPrivateTour(@RequestBody @Valid PrivateTour privateTour) {
    	Tourist tourist = touristService.findTouristById(privateTour.getPrivateTourist().getId());
    	Guide guide = guideService.findGuideById(privateTour.getPrivateGuide().getId());
    	System.out.println("guide nationality ==> "+tourist.getNationality()+"   guide bio ====>"+guide.getBio());
        List<Attraction> preAttractions = privateTour.getPrivateAttractions() ;
         List<Attraction> attractions= new ArrayList<>()   ;
        for (Attraction preattraction : preAttractions) {
        	attractions.add(attractionService.findAttractionById(preattraction.getId())) ;
        }
        privateTour.setPrivateGuide(guide);
        privateTour.setPrivateTourist(tourist);
        privateTour.setPrivateAttractions(attractions);
//        System.out.println("set attractions 0 ===>"+ attractions.get(0).getTitle()+"attraction 1 ===>"+attractions.get(1).getTitle());
        PrivateTour createdPrivateTour = privateTourService.createPrivateTour(privateTour);
        return new ResponseEntity<>(createdPrivateTour, HttpStatus.CREATED);

    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<Object> findPrivateTourById(@PathVariable Long id) {
    		PrivateTour foundPrivateTour = privateTourService.findPrivateTourById(id);
        if (foundPrivateTour != null) {
			Map<String, Object> privateTourMap = new HashMap<>();
			privateTourMap.put("publicTour", foundPrivateTour); // Add article data
			Long touristId= foundPrivateTour.getPrivateTourist().getId();
			Tourist tourist = touristService.findTouristById(touristId);
			System.out.println("private tour's tourist first nationality ==>"+tourist.getNationality());
			Long guideId = foundPrivateTour.getPrivateGuide().getId();
			Guide guide = guideService.findGuideById(guideId);
				
				if(tourist!=null) {
					Map<String, Object> touristMap = new HashMap<>();
					touristMap.put("id", tourist.getId());
					touristMap.put("nationality", tourist.getNationality());
					touristMap.put("privateTour", tourist.getPrivateTour());
					touristMap.put("publicTour", tourist.getPublicTour());
				if(tourist != null && tourist.getUser() !=null) {
					System.out.println("tourist's user id ====>"+tourist.getUser().getId());
				Map<String, Object> userMap = new HashMap<>();
				userMap.put("firstName", tourist.getUser().getFirstName());
				userMap.put("lastName", tourist.getUser().getLastName());
				userMap.put("image", tourist.getUser().getImage());
				userMap.put("attraction", tourist.getUser().getAttractions());
				userMap.put("houses", tourist.getUser().getHouses());
				touristMap.put("user", userMap);}
				privateTourMap.put("tourist", touristMap);
				}
				
				if(guide!=null ) {
					Map<String, Object> guidetMap = new HashMap<>();
					guidetMap.put("id", guide.getId()); 
					guidetMap.put("privateTours", guide.getPrivateTour());
					guidetMap.put("publicTours", guide.getPublicTour());
					guidetMap.put("bio", guide.getBio());
					guidetMap.put("price", guide.getPrice());
					guidetMap.put("rating", guide.getRating());
					guidetMap.put("languages", guide.getLanguages());
					if(guide.getUser() !=null) {	
						System.out.println("tourist's user id ====>"+guide.getUser().getId());
					Map<String, Object> userMap = new HashMap<>();
					
					userMap.put("firstName", guide.getUser().getFirstName());
					userMap.put("lastName", guide.getUser().getLastName());
					userMap.put("image", guide.getUser().getImage());
					userMap.put("attraction", guide.getUser().getAttractions());
					userMap.put("houses", guide.getUser().getHouses());
					guidetMap.put("user", userMap);}
					privateTourMap.put("guide", guidetMap);
				}
				return new ResponseEntity<>(privateTourMap, HttpStatus.OK);
			} 

		else {
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
