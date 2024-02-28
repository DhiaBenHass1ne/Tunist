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
import com.dhia.tunist.models.User;
import com.dhia.tunist.services.ArticleService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/articles")
public class ArticleController {

	

    @Autowired
    private ArticleService articleService;
	
	
	
    @PostMapping("/new")
    public ResponseEntity<Article> createArticle(@RequestBody @Valid Article article) {
        Article createdArticle = articleService.createArticle(article);
        return new ResponseEntity<>(createdArticle, HttpStatus.CREATED);
    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<Article> findArticleById(@PathVariable Long id) {
        Article foundArticle = articleService.findArticleById(id);
        
        if (foundArticle != null) {
            return new ResponseEntity<>(foundArticle, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    

    
    @GetMapping("")
    public List<Map<String, Object>> showAllArticles() {
        List<Article> allArticles = articleService.allArticles(); // Assuming you have an Article class
        List<Map<String, Object>> articleData = new ArrayList<>();

        for (Article article : allArticles) {
            Map<String, Object> articleMap = new HashMap<>();
            articleMap.put("article", article); // Add article data
            User publisher = article.getPublisher(); // Assuming you have a PublisherModel class
            if (publisher != null && publisher.getId() != null) {
                articleMap.put("id", publisher.getId()); // Add publisher ID to article map
            } else {
                // If no publisher is assigned, set publisher_id to null or any appropriate value
                articleMap.put("id", null);
            }

            articleData.add(articleMap);
        }

        return articleData;
    }
    
    @PutMapping("/edit")
    public ResponseEntity<Article> updateArticle(@RequestBody @Valid Article article){
    	
    	Article updatedArticle = articleService.updateArticle(article);
    	
    	return new ResponseEntity<>(updatedArticle, HttpStatus.CREATED);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
