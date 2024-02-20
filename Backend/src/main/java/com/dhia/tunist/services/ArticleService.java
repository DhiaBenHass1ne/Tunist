package com.dhia.tunist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhia.tunist.models.Article;
import com.dhia.tunist.repositories.ArticleRepository;

@Service
public class ArticleService {

	@Autowired
	private ArticleRepository articleRepository;

	public Article createArticle(Article article) {
		return articleRepository.save(article);
	}

	// READ ALL
	public List<Article> allArticles() {
		return articleRepository.findAll();
	}

	// READ ONE
	public Article findArticleById(Long id) {
		Optional<Article> maybeArticle = articleRepository.findById(id);
		if (maybeArticle.isPresent()) {
			return maybeArticle.get();
		} else {
			return null;
		}
	}

	// UPDATE
	public Article updateArticle(Article b) {
		return articleRepository.save(b);
	}

	// DELETE
	public void deleteArticle(Long id) {
		articleRepository.deleteById(id);
	}

}
