package com.dhia.tunist.models;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Table(name = "attractions")
public class Attraction {
	
	// MEMBER VARIABLES
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;

		@ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "author")
	    @JsonBackReference
	    private User author;
		
		private List<Float> position;
		
		@NotEmpty(message = "Username is required!")
		@Size(min = 3, max = 30, message = "title must be between 3 and 30 characters")
		private String title;
		
		@NotEmpty(message = "Username is required!")
		@Size(min = 3, max = 250, message = "description must be between 3 and 30 characters")
		private String description;
	    @Lob
	    @ElementCollection
		private List<String> media;
		
		
		
		@ManyToMany
	    @JoinTable(
	        name = "private_attraction_tour",
	        joinColumns = @JoinColumn(name = "tour_id"),
	        inverseJoinColumns = @JoinColumn(name = "attraction_id"))
		
	    private List<PrivateTour> privateTours;
		
		@ManyToMany
//		@JsonBackReference(value="public-attraction-tour")
	    @JoinTable(
	        name = "public_attraction_tour",
	        joinColumns = @JoinColumn(name = "tour_id"),
	        inverseJoinColumns = @JoinColumn(name = "attraction_id"))

	    private List<PublicTour> publicTours;


		
		
		private List<String> images;
		
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



		public List<String> getImages() {
			return images;
		}

		public void setImages(List<String> images) {
			this.images = images;
		}

		public String getState() {
			return state;
		}

		public void setState(String state) {
			this.state = state;
		}

		public Date getCreatedAt() {
			return createdAt;
		}

		public void setCreatedAt(Date createdAt) {
			this.createdAt = createdAt;
		}

		public Date getUpdatedAt() {
			return updatedAt;
		}

		public void setUpdatedAt(Date updatedAt) {
			this.updatedAt = updatedAt;
		}

		public List<PrivateTour> getPrivateTours() {
			return privateTours;
		}

		public void setPrivateTours(List<PrivateTour> privateTours) {
			this.privateTours = privateTours;
		}

		public List<PublicTour> getPublicTours() {
			return publicTours;
		}

		public List<Float> getPosition() {
			return position;
		}

		public void setPosition(List<Float> position) {
			this.position = position;
		}

		public void setPublicTours(List<PublicTour> publicTours) {
			this.publicTours = publicTours;
		}

		public User getAuthor() {
			return author;
		}

		public void setAuthor(User author) {
			this.author = author;
		}

		public List<String> getMedia() {
			return media;
		}

		public void setMedia(List<String> media) {
			this.media = media;
		}

	
		
		
		

}
