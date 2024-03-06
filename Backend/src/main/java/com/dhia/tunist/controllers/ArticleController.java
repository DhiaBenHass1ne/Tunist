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
import com.dhia.tunist.models.User;
import com.dhia.tunist.services.ArticleService;
import com.dhia.tunist.services.UserService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/articles")
public class ArticleController {

	@Autowired
	private ArticleService articleService;

	@Autowired
	private UserService userService;

	@PostMapping("")
	public ResponseEntity<Article> createArticle(@RequestBody @Valid Article article) {
		User user = userService.findUserById(article.getPublisher().getId());
		article.setPublisher(user);
		Article createdArticle = articleService.createArticle(article);
		return new ResponseEntity<>(createdArticle, HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Map<String, Object>> findArticleById(@PathVariable Long id) {
		Article foundArticle = articleService.findArticleById(id);
		User publisher = userService.findUserById(foundArticle.getPublisher().getId()); // Assuming you have a
																						// PublisherModel class
//        List<Article> emptyList =publisher.getArticles() ;
//        emptyList.clear();
		if (foundArticle != null) {
			Map<String, Object> articleMap = new HashMap<>();
			articleMap.put("id", foundArticle.getId()); // Add article data
			articleMap.put("article", foundArticle); // Add article data
			if (publisher != null && publisher.getId() != null) {
				Map<String, Object> publisherMap = new HashMap<>();
				publisherMap.put("id", publisher.getId());
				publisherMap.put("firstName", publisher.getFirstName());
				publisherMap.put("lastName", publisher.getLastName());
				publisherMap.put("image", publisher.getImage());
				List<Map<String, Object>> articleData = new ArrayList<>();
				List<Article> allArticles = publisher.getArticles();
				for (Article article : allArticles) {
					Map<String, Object> oneArticle = new HashMap<>();

					oneArticle.put("articleMedia", article.getId());
					oneArticle.put("articleMedia", article.getTitle());
					oneArticle.put("articleMedia", article.getContent());
					oneArticle.put("articleMedia", article.getMedia());
				}
				articleMap.put("publisher", publisherMap); // Add publisher ID to article map
				if (publisher.getGuide() != null) {

					Map<String, Object> guideMap = new HashMap<>();
					guideMap.put("guideId", publisher.getGuide().getId());
					guideMap.put("languages", publisher.getGuide().getLanguages());
					guideMap.put("price", publisher.getGuide().getPrice());
					guideMap.put("rating", publisher.getGuide().getRating());
					articleMap.put("guide", guideMap);
				}
			}
			List<Map<String, String>> newMedia = new ArrayList<>();
			List<String> media = foundArticle.getMedia();
			for (String image : media) {
				Map<String, String> map = new HashMap<>();
				map.put("url", image);
				newMedia.add(map);
			}
			articleMap.put("media", newMedia);
			System.out.println(publisher.getClass());
			return new ResponseEntity<>(articleMap, HttpStatus.OK);

		}

		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("")
	public List<Map<String, Object>> showAllArticles() {
		List<Article> allArticles = articleService.allArticles(); // Assuming you have an Article class
		List<Map<String, Object>> articleData = new ArrayList<>();

		for (Article article : allArticles) {
			Map<String, Object> articleMap = new HashMap<>();
			articleMap.put("id", article.getId()); // Add article data
			articleMap.put("article", article); // Add article data
			User publisher = article.getPublisher(); // Assuming you have a PublisherModel class
			if (publisher != null && publisher.getId() != null) {
				Map<String, Object> publisherMap = new HashMap<>();
				publisherMap.put("id", publisher.getId());
				publisherMap.put("firstName", publisher.getFirstName());
				publisherMap.put("lastName", publisher.getLastName());
				publisherMap.put("image", publisher.getImage());
				List<Map<String, Object>> userArticleData = new ArrayList<>();
				List<Article> userAllArticles = publisher.getArticles();
				for (Article userArticle : userAllArticles) {
					Map<String, Object> oneArticle = new HashMap<>();

					oneArticle.put("articleMedia", article.getId());
					oneArticle.put("articleMedia", article.getTitle());
					oneArticle.put("articleMedia", article.getContent());
					oneArticle.put("articleMedia", article.getMedia());
				}
				articleMap.put("publisher", publisherMap); // Add publisher ID to article map
				if (publisher.getGuide() != null) {

					Map<String, Object> guideMap = new HashMap<>();
					guideMap.put("guideId", publisher.getGuide().getId());
					guideMap.put("languages", publisher.getGuide().getLanguages());
					guideMap.put("price", publisher.getGuide().getPrice());
					guideMap.put("rating", publisher.getGuide().getRating());
					articleMap.put("guide", guideMap);
				}
			}
			List<Map<String, String>> newMedia = new ArrayList<>();
			List<String> media = article.getMedia();
			for (String image : media) {
				Map<String, String> map = new HashMap<>();
				map.put("url", image);
				newMedia.add(map);
			}
			articleMap.put("media", newMedia);
			articleData.add(articleMap);
		}

		return articleData;
	}

	@PutMapping("/{id}")
	public ResponseEntity<Article> updateArticle(@RequestBody @Valid Article article) {

		Article updatedArticle = articleService.updateArticle(article);

		return new ResponseEntity<>(updatedArticle, HttpStatus.CREATED);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
		articleService.deleteArticle(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
