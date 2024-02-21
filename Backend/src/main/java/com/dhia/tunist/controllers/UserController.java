package com.dhia.tunist.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhia.tunist.models.LoginUser;
import com.dhia.tunist.models.User;
import com.dhia.tunist.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    // Add once service is implemented:
     @Autowired
     private UserService userServ;
    
//    @GetMapping("")
//    public String index(Model model) {
//    
//        // Bind empty User and LoginUser objects to the JSP
//        // to capture the form input
//        model.addAttribute("newUser", new User());
//        model.addAttribute("newLogin", new LoginUser());
//        return "Users";
//    }
    
    @PostMapping("/register")
    public String register( @RequestBody @Valid User newUser, 
            BindingResult result, Model model, HttpSession session) {
        
        // TO-DO Later -- call a register method in the service 
        // to do some extra validations and create a new user!
        userServ.register(newUser, result);
        if(result.hasErrors()) {
            // Be sure to send in the empty LoginUser before 
            // re-rendering the page.
            model.addAttribute("newLogin", new LoginUser());
            return "ERROR REGISTERING!";
        }
        
        // No errors! 
        // TO-DO Later: Store their ID from the DB in session, 
        // in other words, log them in.
        session.setAttribute("user_id", newUser.getId());
        return "SUCCESSFULY REGISTERED!";
    }
    
    @PostMapping("/login")
    public String login(@Valid @ModelAttribute("newLogin") LoginUser newLogin, 
            BindingResult result, Model model, HttpSession session) {
        
        // Add once service is implemented:
         User user = userServ.login(newLogin, result);
    
        if(result.hasErrors()) {
            model.addAttribute("newUser", new User());
            return "ERROR LOGGING IN!";
        }
    
        // No errors! 
        // TO-DO Later: Store their ID from the DB in session, 
        // in other words, log them in.
        session.setAttribute("user_id", user.getId());
        return "LOGGED IN!";
    }
    
    @GetMapping("/logout")
    public String logout(HttpSession s) {
    	s.invalidate();
    	return "LOGGED OUT!";
    }
    
    @GetMapping("/allusers")
    	public List<User> users(){
    	List<User> allUsers = userServ.getAll();
    	return allUsers;
    }
    
    

}
