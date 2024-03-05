    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import Cookies from "js-cookie";
    import "./UserType.css";

    const UserType = ({ refreshPage }) => {
    const languages = [
        "French",
        "Arabic",
        "English",
        "German",
        "Italian",
        "Russian",
        "Spanish",
        "Dutch",
        "Chinese-Mandarin",
        "Polish",
        "Swedish",
        "Norwegian",
        "Danish",
        "Finnish",
        "Japanese",
        "Korean",
        "Portuguese",
        "Turkish",
        "Czech",
        "Hungarian",
        "Greek",
        "Romanian",
        "Ukrainian",
        "Serbian",
        "Hebrew",
    ];
    const nationalities = [
        "Afghan",
        "Albanian",
        "Algerian",
        "American",
        "Andorran",
        "Angolan",
        "Antiguans",
        "Argentinean",
        "Armenian",
        "Australian",
        "Austrian",
        "Azerbaijani",
        "Bahamian",
        "Bahraini",
        "Bangladeshi",
        "Barbadian",
        "Barbudans",
        "Batswana",
        "Belarusian",
        "Belgian",
        "Belizean",
        "Beninese",
        "Bhutanese",
        "Bolivian",
        "Bosnian",
        "Brazilian",
        "British",
        "Bruneian",
        "Bulgarian",
        "Burkinabe",
        "Burmese",
        "Burundian",
        "Cambodian",
        "Cameroonian",
        "Canadian",
        "Cape Verdean",
        "Central African",
        "Chadian",
        "Chilean",
        "Chinese",
        "Colombian",
        "Comoran",
        "Congolese",
        "Congolese",
        "Costa Rican",
        "Croatian",
        "Cuban",
        "Cypriot",
        "Czech",
        "Danish",
        "Djibouti",
        "Dominican",
        "Dominican",
        "Dutch",
        "Dutchman",
        "Dutchwoman",
        "East Timorese",
        "Ecuadorean",
        "Egyptian",
        "Emirian",
        "Equatorial Guinean",
        "Eritrean",
        "Estonian",
        "Ethiopian",
        "Fijian",
        "Filipino",
        "Finnish",
        "French",
        "Gabonese",
        "Gambian",
        "Georgian",
        "German",
        "Ghanaian",
        "Greek",
        "Grenadian",
        "Guatemalan",
        "Guinea-Bissauan",
        "Guinean",
        "Guyanese",
        "Haitian",
        "Herzegovinian",
        "Honduran",
        "Hungarian",
        "I-Kiribati",
        "Icelander",
        "Indian",
        "Indonesian",
        "Iranian",
        "Iraqi",
        "Irish",
        "Irish",
        "Italian",
        "Ivorian",
        "Jamaican",
        "Japanese",
        "Jordanian",
        "Kazakhstani",
        "Kenyan",
        "Kittian and Nevisian",
        "Kuwaiti",
        "Kyrgyz",
        "Laotian",
        "Latvian",
        "Lebanese",
        "Liberian",
        "Libyan",
        "Liechtensteiner",
        "Lithuanian",
        "Luxembourger",
        "Macedonian",
        "Malagasy",
        "Malawian",
        "Malaysian",
        "Maldivan",
        "Malian",
        "Maltese",
        "Marshallese",
        "Mauritanian",
        "Mauritian",
        "Mexican",
        "Micronesian",
        "Moldovan",
        "Monacan",
        "Mongolian",
        "Moroccan",
        "Mosotho",
        "Motswana",
        "Mozambican",
        "Namibian",
        "Nauruan",
        "Nepalese",
        "Netherlander",
        "New Zealander",
        "Ni-Vanuatu",
        "Nicaraguan",
        "Nigerian",
        "Nigerien",
        "North Korean",
        "Northern Irish",
        "Norwegian",
        "Omani",
        "Pakistani",
        "Palauan",
        "Palestinian",
        "Panamanian",
        "Papua New Guinean",
        "Paraguayan",
        "Peruvian",
        "Polish",
        "Portuguese",
        "Qatari",
        "Romanian",
        "Russian",
        "Rwandan",
        "Saint Lucian",
        "Salvadoran",
        "Samoan",
        "San Marinese",
        "Sao Tomean",
        "Saudi",
        "Scottish",
        "Senegalese",
        "Serbian",
        "Seychellois",
        "Sierra Leonean",
        "Singaporean",
        "Slovakian",
        "Slovenian",
        "Solomon Islander",
        "Somali",
        "South African",
        "South Korean",
        "Spanish",
        "Sri Lankan",
        "Sudanese",
        "Surinamer",
        "Swazi",
        "Swedish",
        "Swiss",
        "Syrian",
        "Taiwanese",
        "Tajik",
        "Tanzanian",
        "Thai",
        "Togolese",
        "Tongan",
        "Trinidadian or Tobagonian",
        "Tunisian",
        "Turkish",
        "Tuvaluan",
        "Ugandan",
        "Ukrainian",
        "Uruguayan",
        "Uzbekistani",
        "Venezuelan",
        "Vietnamese",
        "Welsh",
        "Yemenite",
        "Zambian",
        "Zimbabwean",
    ];

    const [userType, setUserType] = useState("");
    const [logged, setLogged] = useState({ id: Cookies.get("user_id") });
    const [guide, setGuide] = useState({
        bio: "",
        price: "",
        languages: [],
    });
    const checkLanguage = (e) => {
        const selectedLanguage = e.target.id; // Accessing 'id' property of the target
        if (e.target.checked) {
        setGuide({ ...guide, languages: [...guide.languages, selectedLanguage] });
        } else {
        setGuide({
            ...guide,
            languages: guide.languages.filter(
            (language) => language !== selectedLanguage
            ),
        });
        }
    };

    const clearGuideForm = () => {
        setGuide({
        bio: "",
        price: "",
        languages: [],
        });
    };

    const [tourist, setTourist] = useState({
        nationality: "",
    });
    const ClearTouristForm = () => {
        setTourist({
        nationality: "",
        user: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userType == "guide") {
        setGuide({
            ...guide,
            languages: Object.keys(languages).filter(
            (key) => languages[key] == true
            ),
            user: { id: Number(Cookies.get("user_id")) },
        });
        console.log(guide);
        axios
            .post("http://localhost:8080/api/guides", guide, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            })
            .then((res) => {
            console.log(res.data);
            setGuide(res.data);
            })
            .catch((err) => console.log(err));
        }
        if (userType == "tourist") {
        setTourist({ ...tourist, user: logged });
        axios
            .post("http://localhost:8080/api/tourists", tourist, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
        }
    };
    const showLang = () => {
        const checkList = document.getElementById("list1");
        if (checkList.classList.contains("visible"))
        checkList.classList.remove("visible");
        else checkList.classList.add("visible");
    };

    return (
        <div className="container d-flex justify-content-around">
        <div>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>
                What is the user type:
                <select
                    value={userType}
                    onChange={(e) => {
                    setUserType(e.target.value);
                    ClearTouristForm();
                    clearGuideForm();
                    }}
                >
                    <option value="">Select an option</option>
                    <option value="tourist">Tourist</option>
                    <option value="guide">Guide</option>
                    <option value="neither">Neither</option>
                </select>
                </label>
            </div>
            {userType == "guide" ? (
                <>
                {JSON.stringify(guide)}
                <div className="form-group">
                    <label>Bio:</label>
                    <input
                    name="bio"
                    className="form-control"
                    onChange={(e) => {
                        setGuide({ ...guide, bio: e.target.value });
                    }}
                    value={guide.bio}
                    />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input
                    name="guide"
                    type="number"
                    className="form-control"
                    onChange={(e) => {
                        setGuide({ ...guide, price: e.target.value });
                    }}
                    value={guide.price}
                    />
                </div>
                <div className="form-group">
                    <div id="list1" className="dropdown-check-list" tabIndex="100">
                    <span className="anchor" onClick={showLang}>
                        Select the languages you speak
                    </span>
                    <ul className="items">
                        {languages.map((language) => (
                        <li key={language}>
                            <input
                            type="checkbox"
                            id={language}
                            onChange={(e) => {
                                checkLanguage(e);
                            }}
                            />
                            <label>{language}</label>
                        </li>
                        ))}
                    </ul>
                    </div>
                </div>

                <input
                    type="submit"
                    value="Register"
                    className="btn btn-primary"
                />
                </>
            ) : (
                <>
                <div className="select-wrapper form-group">
                    {JSON.stringify(tourist)}
                    <label>Nationality:</label>
                    <select
                    className="select form-control"
                    onChange={(e) => {
                        setTourist({ ...tourist, nationality: e.target.value });
                    }}
                    value={tourist.nationality}
                    >
                    <option value="">Select Nationality</option>
                    {nationalities.map((nationality, index) => (
                        <option key={index} value={nationality}>
                        {nationality}
                        </option>
                    ))}
                    </select>
                </div>
                </>
            )}
            </form>
        </div>
        </div>
    );
    };

    export default UserType;
