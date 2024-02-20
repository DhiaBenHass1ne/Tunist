package com.dhia.tunist.models;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

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
@Table(name = "publicTours")
public class PublicTour {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	private LocalDateTime date;
	
	
	
	@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinColumn(name = "guide_id")
	private Guide publicGuide;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "tourist_id")
	private Tourist publicTourist;
	
	 @ManyToMany(mappedBy = "publicTours")
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

	public Tourist getPublicTourist() {
		return publicTourist;
	}

	public void setPublicTourist(Tourist publicTourist) {
		this.publicTourist = publicTourist;
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
