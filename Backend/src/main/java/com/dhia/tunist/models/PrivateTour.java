package com.dhia.tunist.models;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "privateTours")
public class PrivateTour {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	private LocalDateTime date;
	
	
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "guide_id")
	@JsonBackReference(value="private-guide-tour")
	private Guide privateGuide;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "tourist_id")
	@JsonBackReference(value="private-tourist-tour")
	private Tourist privateTourist;
	
	 @ManyToMany(mappedBy = "privateTours")
	 
	 private List<Attraction> privateAttractions;

	
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
	
	
	public PrivateTour(){}

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

	public List<Attraction> getPrivateAttractions() {
		return privateAttractions;
	}

	public void setPrivateAttractions(List<Attraction> privateAttractions) {
		this.privateAttractions = privateAttractions;
	}

	public Guide getPrivateGuide() {
		return privateGuide;
	}

	public void setPrivateGuide(Guide privateGuide) {
		this.privateGuide = privateGuide;
	}

	public Tourist getPrivateTourist() {
		return privateTourist;
	}

	public void setPrivateTourist(Tourist privateTourist) {
		this.privateTourist = privateTourist;
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
