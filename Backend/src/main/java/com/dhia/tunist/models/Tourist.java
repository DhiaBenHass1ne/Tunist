package com.dhia.tunist.models;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Table(name = "tourists")
public class Tourist {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	

    @OneToOne(mappedBy = "tourist")
    @JsonBackReference(value="user-tourist")
    private User user;
    
	@NotEmpty(message = "Nationality is required!")
	private String nationality;
	
	@OneToMany(mappedBy="privateTourist", fetch = FetchType.EAGER)
	@JsonManagedReference(value="private-tourist-tour")
	@JsonIgnore
    private List<PrivateTour> privateTours;
    
//	@OneToMany(mappedBy="publicTourist", fetch = FetchType.EAGER)
//	@JsonManagedReference(value="public-tourist-tour")
//    private List<PublicTour> publicTour;
    

	@ManyToMany
    @JoinTable(
        name = "public_tourists_tours",
        joinColumns = @JoinColumn(name = "tour_id"),
        inverseJoinColumns = @JoinColumn(name = "tourist_id"))
//	@JsonManagedReference(value="public-tourist-tour")
    private List<PublicTour> publicTours;

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

	
	public Tourist() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}



	public List<PublicTour> getPublicTour() {
		return publicTours;
	}

	public void setPublicTour(List<PublicTour> publicTour) {
		this.publicTours = publicTour;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
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

	public List<PrivateTour> getPrivateTour() {
		return privateTours;
	}

	public void setPrivateTour(List<PrivateTour> privateTour) {
		this.privateTours = privateTour;
	}
	
	


}
