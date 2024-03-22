package com.dhia.tunist.models;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Table(name = "publicTours")

public class PublicTour {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	private LocalDateTime date;
	
	
	
	@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinColumn(name = "guide_id")
	@JsonBackReference(value="public-guide-tour")
	private Guide publicGuide;
	
//	@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
//	@JoinColumn(name = "tourist_id")
//	@JsonBackReference(value="public-tourist-tour")
//	
//	private  Tourist publicTourist;
	
	

	 @ManyToMany(mappedBy = "publicTours")
//	 @JsonBackReference(value="public-tourist-tour")
	 private List<Tourist> publicTourists;
	
	 @ManyToMany(mappedBy = "publicTours")
//	 @JsonManagedReference(value="public-attraction-tour")
	 private List<Attraction> publicAttractions;

	
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
	
	
	public PublicTour(){}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	
	public Guide getPublicGuide() {
		return publicGuide;
	}

	public void setPublicGuide(Guide publicGuide) {
		this.publicGuide = publicGuide;
	}

	public List<Tourist> getPublicTourists() {
		return publicTourists;
	}

	public void setPublicTourists(List<Tourist> publicTourists) {
		this.publicTourists = publicTourists;
	}

	public List<Attraction> getPublicAttractions() {
		return publicAttractions;
	}

	public void setPublicAttractions(List<Attraction> publicAttractions) {
		this.publicAttractions = publicAttractions;
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
	
}
