package com.dhia.tunist.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhia.tunist.models.Article;
import com.dhia.tunist.models.Attraction;
import com.dhia.tunist.models.Guide;
import com.dhia.tunist.models.LoginUser;
import com.dhia.tunist.models.Tourist;
import com.dhia.tunist.models.User;
import com.dhia.tunist.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
public class UserController {

    // Add once service is implemented:
     @Autowired
     private UserService userServ;
     @Autowired
     private HttpSession httpSession;

//    @GetMapping("")
//    public String index(Model model) {
//    
//        // Bind empty User and LoginUser objects to the JSP
//        // to capture the form input
//        model.addAttribute("newUser", new User());
//        model.addAttribute("newLogin", new LoginUser());
//        return "Users";
//    }
    
//    @PostMapping("/register")
//    public String register(@Valid @ModelAttribute("newUser") User newUser, 
//            BindingResult result, Model model, HttpSession session) {
//        
//        // TO-DO Later -- call a register method in the service 
//        // to do some extra validations and create a new user!
//        userServ.register(newUser, result);
//        if(result.hasErrors()) {
//            // Be sure to send in the empty LoginUser before 
//            // re-rendering the page.
//            model.addAttribute("newLogin", new LoginUser());
//            return "ERROR REGISTERING!";
//        }
//        
//        // No errors! 
//        // TO-DO Later: Store their ID from the DB in session, 
//        // in other words, log them in.
//        session.setAttribute("user_id", newUser.getId());
//        return "SUCCESSFULY REGISTERED!";
//    }
    
     @PostMapping("/register")
     public ResponseEntity<Object> register(@Valid @RequestBody User newUser, 
             BindingResult result, HttpSession session) {
       
         User user= userServ.register(newUser, result);
         
         if (result.hasErrors()) {
             System.out.println(result.getAllErrors());
             return ResponseEntity.status(400).body(result.getAllErrors());
         }
         session.setAttribute("user_id", user.getId());
         System.out.println("registred id is ====>"+(Long) session.getAttribute("user_id"));
         // Return a Respons!eEntity with status 200 OK and the newly registered user
         return ResponseEntity.ok().body(newUser);
     }
     


    
    
    @PostMapping("/login")
    public ResponseEntity<Object> login(@Valid @RequestBody LoginUser newLogin, 
            BindingResult result , HttpSession session, HttpServletRequest request) {
  
        User loggedUser =userServ.login(newLogin, result);
        if(result.hasErrors()) {
           System.out.println(result.getAllErrors());
           return ResponseEntity.status(400).body(result.getAllErrors());
        }
//        httpSession.setAttribute("user_id", loggedUser.getId());
        
        
//        
//        HttpSession s = request.getSession(); // Creates a new session if one doesn't exist
//        s.setAttribute("user_id", loggedUser.getId());
//        
//        
//        
//        System.out.println("logged id is ====>"+(Long) s.getAttribute("user_id") );
        return ResponseEntity.ok().body(loggedUser);
    	}
    
//    @PostMapping("/login")
//    public String login(@Valid @ModelAttribute("newLogin") LoginUser newLogin, 
//            BindingResult result, Model model, HttpSession session) {
//        
//        // Add once service is implemented:
//         User user = userServ.login(newLogin, result);
//    
//        if(result.hasErrors()) {
//            model.addAttribute("newUser", new User());
//            return "ERROR LOGGING IN!";
//        }
    
        // No errors! 
        // TO-DO Later: Store their ID from the DB in session, 
        // in other words, log them in.
//        session.setAttribute("user_id", user.getId());
//        return "LOGGED IN!";
//    }
    
    @GetMapping("/logout")
    public String logout(HttpSession session, HttpServletRequest request) {
//    	Long userid = (Long) session.getAttribute("user_id");
        HttpSession s = request.getSession(); // Retrieves the existing session or returns null if none exists

        Long userid = (Long) s.getAttribute("user_id");


    	System.out.println("logged out id is ====>"+ (Long) s.getAttribute("user_id"));
    	s.invalidate();
    	return "LOGGED OUT!";

    }
    @GetMapping("/{id}")
 	public Map<String, Object> oneUser(@PathVariable("id") Long id) {
     	User user= userServ.findUserById(id);
		Map<String, Object> userMap = new HashMap<>();
		userMap.put("id", user.getId()); // Add article data
		userMap.put("user", user); // Add article data
		List<Article> articles = user.getArticles(); // Assuming you have a PublisherModel class
		if (articles.isEmpty()==false) {
			userMap.put("articles",articles);
		}
		List<Attraction> attracrions = user.getAttractions();
		if(attracrions.isEmpty()==false) {
			userMap.put("attractions", attracrions);
		}
		Tourist tourist = user.getTourist();
		if(tourist!= null) {
			userMap.put("tourist", tourist);
		}
		Guide guide= user.getGuide();
		if(guide!= null) {
			userMap.put("guide", guide);
		}
		return userMap;
 	}
    
	@GetMapping("")
	public List<Map<String, Object>> showAllArticles() {
		List<User> allUsers = userServ.getAll(); // Assuming you have an Article class
		List<Map<String, Object>> userData = new ArrayList<>();

		for (User user : allUsers) {
			Map<String, Object> userMap = new HashMap<>();
			userMap.put("id", user.getId()); // Add article data
			userMap.put("user", user); // Add article data
			List<Article> articles = user.getArticles(); // Assuming you have a PublisherModel class
			if (articles.isEmpty()==false) {
				userMap.put("articles",articles);
			}
			List<Attraction> attracrions = user.getAttractions();
			if(attracrions.isEmpty()==false) {
				userMap.put("attractions", attracrions);
			}
			Tourist tourist = user.getTourist();
			if(tourist!= null) {
				userMap.put("guide", tourist);
			}
	
			Guide guide= user.getGuide();
			if(guide!= null) {
				userMap.put("guide", guide);
			}
			
//			
			userData.add(userMap);
		}

		return userData;
	}


    

}
