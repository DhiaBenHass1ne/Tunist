package com.dhia.tunist.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhia.tunist.models.Guide;
import com.dhia.tunist.services.GuideService;

@RestController
@RequestMapping("/guides")
public class GuideController {

	
	@Autowired
	private GuideService guideService;
	
	@GetMapping("")
	public List<Guide> home(@ModelAttribute("book") Guide guide, Model model) {
		List<Guide> allBooks = guideService.allGuides();
		
		return allBooks;
	}
}
