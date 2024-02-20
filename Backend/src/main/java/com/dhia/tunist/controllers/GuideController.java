package com.dhia.tunist.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhia.tunist.models.Guide;
import com.dhia.tunist.models.User;
import com.dhia.tunist.services.GuideService;
import com.dhia.tunist.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/guides")
public class GuideController {

	
	@Autowired
	private GuideService guideService;

	@Autowired
	private UserService userService;
	
	@GetMapping("")
	public List<Guide> allGuides() {
		List<Guide> allGuides = guideService.allGuides();
		return allGuides;
	}
	
	@PostMapping("")
	public Guide newGuide(@Valid @ModelAttribute("guide") Guide guide , 
            BindingResult result, Model model, HttpSession session) {
		
		if(result.hasErrors()) {
            return null;
        }
		Long userid= (Long) session.getAttribute("user_id");
		User user= userService.findUserById(userid);
		guide.setUser(user);
		Guide newGuide = guideService.createGuide(guide);
		user.setGuide(newGuide);
		userService.updateUser(user);
		
		return guide;
		
	}
	
	@GetMapping("/{id}")
	public Guide oneGuide(@PathVariable("id") Long id) {
		Guide guide= guideService.findGuideById(id);
		return guide;
	}
	
	@PatchMapping("/{id}")
	public Guide updateGuide(@Valid @ModelAttribute("guide") Guide guide , 
            BindingResult result, @PathVariable("id") Long id, HttpSession session) {
		
		if(result.hasErrors()) {
            return null;
        }
		Long userid= (Long) session.getAttribute("user_id");
		User user= userService.findUserById(userid);
		guide.setUser(user);
		guideService.updateGuide(guide);
		return guide;
		
	}
	
	@DeleteMapping("/{id}")
	public String deleteGuide(@PathVariable("id") Long id) {
		guideService.deleteGuide(id);
		return "deleted guide with id= "+id+" successfully. ";
	}
}
