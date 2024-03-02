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

import com.dhia.tunist.models.Article;
import com.dhia.tunist.models.Attraction;
import com.dhia.tunist.models.Guide;
import com.dhia.tunist.models.PublicTour;
import com.dhia.tunist.models.Tourist;
import com.dhia.tunist.models.User;
import com.dhia.tunist.services.AttractionService;
import com.dhia.tunist.services.GuideService;
import com.dhia.tunist.services.PublicTourService;
import com.dhia.tunist.services.TouristService;
import com.dhia.tunist.services.UserService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/publicTours")
public class PublicTourController {


    @Autowired
    private PublicTourService publicTourService;
	

	@Autowired
	private UserService userService;

	@Autowired
	private TouristService touristService;

	@Autowired
	private GuideService guideService;

	@Autowired
	private AttractionService attractionService;

	
    @PostMapping("")
    public ResponseEntity<PublicTour> createPublicTour(@RequestBody @Valid PublicTour publicTour) {
    	Tourist tourist = touristService.findTouristById(publicTour.getPublicTourist().getId());
    	Guide guide = guideService.findGuideById(publicTour.getPublicGuide().getId());
        List<Attraction> preAttractions = publicTour.getPublicAttractions() ;
         List<Attraction> attractions= new ArrayList<>()   ;
        for (Attraction preattraction : preAttractions) {
        	attractions.add(attractionService.findAttractionById(preattraction.getId())) ;
        }
        publicTour.setPublicGuide(guide);
        System.out.println("public tour's creation guide rating ==>"+guide.getBio());
        publicTour.setPublicTourist(tourist);
        publicTour.setPublicAttractions(attractions);
        System.out.println("set attractions 0 ===>"+ attractions.get(0).getTitle()+"attraction 1 ===>"+attractions.get(1).getTitle());
    	PublicTour createdPublicTour = publicTourService.createPublicTour(publicTour);
    	
        return new ResponseEntity<>(createdPublicTour, HttpStatus.CREATED);
    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<Object> findPublicTourById(@PathVariable Long id) {
        PublicTour foundPublicTour = publicTourService.findPublicTourById(id);
        if (foundPublicTour != null) {
			Map<String, Object> publicTourMap = new HashMap<>();
			publicTourMap.put("publicTour", foundPublicTour); // Add article data
			publicTourMap.put("attractions",foundPublicTour.getPublicAttractions());
			Long touristId= foundPublicTour.getPublicTourist().getId();
			Tourist tourist = touristService.findTouristById(touristId);
			System.out.println("private tour's tourist first nationality ==>"+tourist.getNationality());
			Long guideId = foundPublicTour.getPublicGuide().getId();
			Guide guide = guideService.findGuideById(guideId);
//			PUBLIC ATTRACTIONS HHERE vvv
//			List <Attraction> publicAttractions = new ArrayList<>();
//			List<Attraction> prePublicAttractions=foundPublicTour.getPublicAttractions();
//	        for (Attraction attraction : prePublicAttractions) {
//	        	publicAttractions.add(attractionService.findAttractionById(attraction.getId()));
//	        }
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
				publicTourMap.put("tourist", touristMap);
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
					if(guide!=null && guide.getUser() !=null) {	
						System.out.println("guide user id ====>"+guide.getUser().getId());
					Map<String, Object> userMap = new HashMap<>();
					
					userMap.put("firstName", guide.getUser().getFirstName());
					userMap.put("lastName", guide.getUser().getLastName());
					userMap.put("image", guide.getUser().getImage());
					userMap.put("attraction", guide.getUser().getAttractions());
					userMap.put("houses", guide.getUser().getHouses());
					guidetMap.put("user", userMap);
					}
					publicTourMap.put("guide", guidetMap);
				}
				return new ResponseEntity<>(publicTourMap, HttpStatus.OK);
			} 

		else {
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
