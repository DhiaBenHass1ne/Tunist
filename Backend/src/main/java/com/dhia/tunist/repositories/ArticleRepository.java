package com.dhia.tunist.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dhia.tunist.models.Article;

@Repository
public interface ArticleRepository extends CrudRepository<Article, Long> {

	// for logging user
	Optional<Article>findByEmail(String email);
	
	List<Article>findAll();
	
}