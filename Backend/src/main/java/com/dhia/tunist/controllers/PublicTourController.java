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
    	if(publicTour.getPublicTourists().isEmpty()==false) {
    		List<Tourist> tourists = new ArrayList<>();
    		for (Tourist preTourist : publicTour.getPublicTourists()) {
    			Tourist tourist = touristService.findTouristById(preTourist.getId());
    			tourists.add(tourist);
    		publicTour.setPublicTourists(tourists);
    		}
    	}
        List<Attraction> preAttractions = publicTour.getPublicAttractions() ;
//        System.out.println("first id is ===>"+publicTour.getPublicAttractions().get(0).getId());
         List<Attraction> attractions= new ArrayList<>()   ;
         if( preAttractions!=null) {
        	 
        for (Attraction preattraction : preAttractions) {
        	Attraction fullAttraction =attractionService.findAttractionById(preattraction.getId());
        	attractions.add(fullAttraction) ;
        	System.out.println("attraction id is "+preattraction.getId()+" and title is "+preattraction.getTitle());
        	publicTour.setPublicAttractions(attractions);
        }
         }
         if(publicTour.getPublicGuide()!=null) {
        	 
         
        Guide guide = guideService.findGuideById(publicTour.getPublicGuide().getId());
        if(guide!=null) {        	
        	publicTour.setPublicGuide(guide);
        }
         }
         
    	PublicTour createdPublicTour = publicTourService.createPublicTour(publicTour);
    	if(attractions.isEmpty()==false) {
    		
        for (Attraction   addedAttraction: attractions) {
        	List<PublicTour> tours = addedAttraction.getPublicTours();
        	tours.add(createdPublicTour);
        	addedAttraction.setPublicTours(tours);
        	attractionService.updateAttraction(addedAttraction);
        }
    	}
    	if (createdPublicTour.getPublicTourists()!=null) {
    		for (Tourist   addedTourist: createdPublicTour.getPublicTourists()) {
    			List<PublicTour> tours =addedTourist.getPublicTour();    
    			tours.add(createdPublicTour);
    			addedTourist.setPublicTour(tours);
    			touristService.updateTourist(addedTourist);
    		
    		}
    	}
    	
        return new ResponseEntity<>(createdPublicTour, HttpStatus.CREATED);
    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<Object> findPublicTourById(@PathVariable Long id) {
        PublicTour foundPublicTour = publicTourService.findPublicTourById(id);
        if (foundPublicTour != null) {
			Map<String, Object> publicTourMap = new HashMap<>();
			publicTourMap.put("id", foundPublicTour.getId()); 
			publicTourMap.put("date", foundPublicTour.getDate()); 
			System.out.println("date ===>"+foundPublicTour.getDate());
			
			publicTourMap.put("attractions",foundPublicTour.getPublicAttractions());
//			System.out.println("public attraction 0  title ==>"+foundPublicTour.getPublicAttractions().get(0).getTitle());
//			Long touristId= foundPublicTour.getPublicTourists().getId();
//			Tourist tourist = touristService.findTouristById(touristId);
			List <Object> publicAttractions = new ArrayList<>();
			List<Attraction> prePublicAttractions=foundPublicTour.getPublicAttractions();
			if(prePublicAttractions!=null) {
				
	        for (Attraction attraction : prePublicAttractions) {
				Map<String, Object> publicAttractionMap = new HashMap<>();
				publicAttractionMap.put("id", attraction.getId());
				publicAttractionMap.put("title", attraction.getTitle());
				publicAttractionMap.put("description", attraction.getDescription());
				publicAttractionMap.put("state", attraction.getState());
				publicAttractionMap.put("media", attraction.getMedia());
				publicAttractions.add(publicAttractionMap);
	        }
			}
	        publicTourMap.put("attractions",publicAttractions);
	        List<Tourist> tourists = foundPublicTour.getPublicTourists();
	        if(tourists!=null) 
	        {
	        	List<Map<String,Object>> touristsData = new ArrayList<>();
	        	for(Tourist tourist : tourists) {
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
				touristsData.add(touristMap);
				}
				publicTourMap.put("tourists", touristsData);
				}
        }
	        
			Long guideId = foundPublicTour.getPublicGuide().getId();
			Guide guide = guideService.findGuideById(guideId);
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
    public List<Map<String, Object>> showAllArticles() {
        List<PublicTour> allTours = publicTourService.allPublicTours(); // Assuming you have an Article class
        
        List<Map<String, Object>> tourData = new ArrayList<>();

        for (PublicTour tour : allTours) {
        	
            Map<String, Object> tourMap = new HashMap<>();
			tourMap.put("id", tour.getId()); // Add article data
            tourMap.put("article", tour); // Add article data
            Guide guide = tour.getPublicGuide(); // Assuming you have a PublisherModel class
            if (guide != null && guide.getId() != null) {
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
				tourMap.put("guide",guidetMap);
				        } 
            	List<Tourist> tourists = tour.getPublicTourists();
            if (tourists != null ) {
            	List<Map<String,Object>> touristsData= new ArrayList<>();
            	for(Tourist tourist: tourists)
            	{
            	Map<String, Object> touristMap = new HashMap<>();
            	touristMap.put("id", tourist.getId()); 
            	touristMap.put("privateTours", tourist.getPrivateTour());
            	touristMap.put("publicTours", tourist.getPublicTour());
            	touristMap.put("nationality", tourist.getNationality());
			
				if(tourist!=null && tourist.getUser() !=null) {	
					System.out.println("guide user id ====>"+guide.getUser().getId());
				Map<String, Object> userMap = new HashMap<>();
				
				userMap.put("firstName", tourist.getUser().getFirstName());
				userMap.put("lastName", tourist.getUser().getLastName());
				userMap.put("image", tourist.getUser().getImage());
				userMap.put("attraction", tourist.getUser().getAttractions());
				userMap.put("houses", tourist.getUser().getHouses());
				touristMap.put("user", userMap);
				}
				
				touristsData.add(touristMap);
				        } 
            	tourMap.put("tourists", touristsData);
            }
            tourData.add(tourMap);
        }

        return tourData;
    }

    
    
    
    
    @PutMapping("/id")
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
