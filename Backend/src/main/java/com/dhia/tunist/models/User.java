package com.dhia.tunist.models;

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
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {
	// MEMBER VARIABLES
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotEmpty(message = "Username is required!")
	@Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters")
	private String firstName;
	
	@NotEmpty(message = "Username is required!")
	@Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters")
	private String lastName;
	

	@NotEmpty(message = "Email is required!")
	@Email(message = "Please enter a valid email!")
	private String email;

	@NotEmpty(message = "Password is required!")
	@Size(min = 8, max = 128, message = "Password must be between 8 and 128 characters")
	private String password;

	@Transient
	@NotEmpty(message = "Confirm Password is required!")
	@Size(min = 8, max = 128, message = "Confirm Password must be between 8 and 128 characters")
	private String confirm;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="tourist_id")
	private Tourist tourist;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="guide_id")
	private Guide guide;
	
    @OneToMany(mappedBy="author", fetch = FetchType.LAZY)
    private List<Attraction> attractions;
    
    @OneToMany(mappedBy="publisher", fetch = FetchType.LAZY)
    private List<Article> articles;
    
    @OneToMany(mappedBy="loaner", fetch = FetchType.LAZY)
    private List<House> houses;
	
	
	
	
	
	
	
	
	public User() {
	}



	// This will not allow the createdAt column to be updated after creation
	@Column(updatable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date createdAt;

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


	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date updatedAt;

	

	
//	----- methods ---
	// other getters and setters removed for brevity
	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}

	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}

	// TODO - Don't forget to generate getters and setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirm() {
		return confirm;
	}

	public void setConfirm(String confirm) {
		this.confirm = confirm;
	}
	public String getFirstName() {
		return firstName;
	}



	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}



	public String getLastName() {
		return lastName;
	}



	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public Tourist getTourist() {
		return tourist;
	}



	public void setTourist(Tourist tourist) {
		this.tourist = tourist;
	}



	public Guide getGuide() {
		return guide;
	}



	public void setGuide(Guide guide) {
		this.guide = guide;
	}



	public List<Attraction> getAttractions() {
		return attractions;
	}



	public void setAttractions(List<Attraction> attractions) {
		this.attractions = attractions;
	}



	public List<Article> getArticles() {
		return articles;
	}



	public void setArticles(List<Article> articles) {
		this.articles = articles;
	}



	public List<House> getHouses() {
		return houses;
	}



	public void setHouses(List<House> houses) {
		this.houses = houses;
	}

}
