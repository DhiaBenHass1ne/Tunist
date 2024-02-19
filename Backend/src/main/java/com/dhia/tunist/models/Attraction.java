package com.dhia.tunist.models;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "attractions")
public class Attraction {
	
	// MEMBER VARIABLES
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;

		@NotEmpty(message = "Username is required!")
		@Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters")
		private String title;
		
		@NotEmpty(message = "Username is required!")
		@Size(min = 3, max = 150, message = "Username must be between 3 and 30 characters")
		private String description;
		
		
		private List<Map<String, String>> images;
		
		@NotEmpty(message="State is required!")
		private String state;
		
		@Column(updatable = false)
		@DateTimeFormat(pattern = "yyyy-MM-dd")
		private Date createdAt;

		

		@DateTimeFormat(pattern = "yyyy-MM-dd")
		private Date updatedAt;

		@PrePersist
		protected void onCreate() {
			this.createdAt = new Date();
		}

		@PreUpdate
		protected void onUpdate() {
			this.updatedAt = new Date();
		}
		
		public Attraction(){
			
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public List<Map<String, String>> getImages() {
			return images;
		}

		public void setImages(List<Map<String, String>> images) {
			this.images = images;
		}

		public String getState() {
			return state;
		}

		public void setState(String state) {
			this.state = state;
		}
		
		
		

}
