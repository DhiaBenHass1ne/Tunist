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

import com.dhia.tunist.models.Article;
import com.dhia.tunist.services.ArticleService;

import jakarta.validation.Valid;

@RestController
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
    public ResponseEntity<List<Article>> findAllArticles() {
        List<Article> allArticles  = articleService.allArticles();
        
//        if (foundArticle != null) {
//            return new ResponseEntity<>(foundArticle, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
        
        return new ResponseEntity<>(allArticles, HttpStatus.OK);
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
