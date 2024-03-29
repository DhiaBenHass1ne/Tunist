package com.dhia.tunist.models;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Entity
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Table(name="guides")
public class Guide {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	
	@NotEmpty(message = "Bio is required!")
	@Size(min = 5, max = 200, message = "Bio must be between 5 and 200 characters")
	private String bio;
	
	@NotNull(message = "Rating is required")
	@DecimalMin(value = "0.0", inclusive=true, message="Rating min is 0")
	@DecimalMax(value = "5.0", inclusive=true, message="Rating min is 5")
	private double rating;
	
	@NotBlank(message="State is necessary in order to become a guide.")
    private String state="none";
	
	
	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	@NotNull(message = "Price is required!")
	@Positive(message="Price can't be negative!")
    @DecimalMin(value = "0.0", inclusive = false, message="Price must be greater than zero!")
    private BigDecimal price;
	
	@OneToMany(mappedBy="privateGuide", fetch = FetchType.EAGER)
	@JsonManagedReference(value="private-guide-tour")
	@JsonIgnore
    private List<PrivateTour> privateTour;
	
	@OneToMany(mappedBy="publicGuide", fetch = FetchType.EAGER )
	@JsonManagedReference(value="public-guide-tour")
    @JsonIgnore
    private List<PublicTour> publicTour;
	
    @Column(columnDefinition = "boolean default true")
	private boolean available;
	
    @NotEmpty(message = "At least one language is required!")
	private List<String> languages;
    
	
    @NotEmpty(message = "At least one language is required!")
    @Lob
    @ElementCollection
	private List<String> cin;

    private String status="pending";

	@OneToOne(mappedBy = "guide")
	@JoinColumn(name="user_id")
    @JsonBackReference(value="user-guide")
    private User user;
    
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
    
    public Guide() {
    }
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}



	



	public BigDecimal getPrice() {
		return price;
	}


	public void setPrice(BigDecimal price) {
		this.price = price;
	}


	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}

	public List<String> getCin() {
		return cin;
	}

	public void setCin(List<String> cin) {
		this.cin = cin;
	}

	public List<String> getLanguages() {
		return languages;
	}

	public void setLanguages(List<String> languages) {
		this.languages = languages;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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
		return privateTour;
	}

	public void setPrivateTour(List<PrivateTour> privateTour) {
		this.privateTour = privateTour;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<PublicTour> getPublicTour() {
		return publicTour;
	}

	public void setPublicTour(List<PublicTour> publicTour) {
		this.publicTour = publicTour;
	}
	
	

    
    
}
