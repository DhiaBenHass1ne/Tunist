import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const UserType = ({ refreshPage }) => {
    const [userType, setUserType] = useState('')
    const [logged,setLogged] = useState({id:Cookies.get('user_id')})
    const [guide, setGuide] = useState(
        {
            bio: '',
            price: '',
            languagds: [],
        }
    )

    const clearGuideForm = () => {
        setGuide(
            {
                bio: '',
                price: '',
                languages: [],
            })
    }

    const [tourist, setTourist] = useState(
        {
            nationality: "",
        }
    )
    const ClearTouristForm = () => {
        setTourist(
            {
                nationality: "",
                user:""
            })
    }

    const [languages, setLanguages] = useState({
        "French": false,
        "Arabic": false,
        "English": false,
        "German": false,
        "Italian": false,
        "Russian": false,
        "Spanish": false,
        "Dutch": false,
        "ChineseMandarin": false,
        "Polish": false,
        "Swedish": false,
        "Norwegian": false,
        "Danish": false,
        "Finnish": false,
        "Japanese": false,
        "Korean": false,
        "Portuguese": false,
        "Turkish": false,
        "Czech": false,
        "Hungarian": false,
        "Greek": false,
        "Romanian": false,
        "Ukrainian": false,
        "Serbian": false,
        "Hebrew": false
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        // UserService.register(newUser)
        // .then(res=>{console.log(res.data); refreshPage(); clearForm();})
        // .catch(err=>{console.log(err.response.data)})


        // axios.get("http://localhost:8080/api/users/"+Cookies.get('user_id'))
        // .then(res=>{console.log("logged user ===>",res.data); setLogged(res.data)} )
        // .catch(err=>console.log(err))

        
        if(userType=="guide"){

            setGuide ( {...guide,languages: Object.keys(languages).filter(key => languages[key]==true), 
                                                    user:{id:Cookies.get('user_id')}});
            console.log(guide)
            axios.post("http://localhost:8080/api/guides",guide,{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res=>{console.log(res.data); setGuide(res.data)} )
            .catch(err=>console.log(err))
        }
        if(userType=="tourist"){
            setTourist({...tourist,user:logged})
            axios.post("http://localhost:8080/api/tourists",tourist,
                {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }}
                )
                .then(res=> console.log(res.data))
                .catch(err => console.log(err))
        }

        
    }

    return (
        <div className="container d-flex justify-content-around">
            <div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            What is the user type:
                            <select value={userType} onChange={(e) => {
                                setUserType(e.target.value);
                                ClearTouristForm(); clearGuideForm();
                            }}>
                                <option value="">Select an option</option>
                                <option value="tourist">Tourist</option>
                                <option value="guide">Guide</option>
                                <option value="neither">Neither</option>
                            </select>
                        </label>
                    </div>
                    {userType == "guide" ?
                        <>
                                    {/* {JSON.stringify(guide)} */}
                                <h1>Logged user within guide ====  id: {guide.user && guide.user.id} || email: {guide.user && guide.user.email} </h1>
                            <div className="form-group">
                                <label>Bio:</label>
                                <input name="bio" className="form-control" onChange={(e) => { setGuide({ ...guide, bio: e.target.value }) }} value={guide.bio} />
                            </div>
                            <div className="form-group">
                                <label>Price:</label>
                                <input name="guide" type='number' className="form-control" onChange={(e) => { setGuide({ ...guide, price: e.target.value }) }} value={guide.price} />
                            </div>
                            <div className="form-group">
                                <label>Languages:</label>
                                {/* <input name="guide" className="form-control" onChange={(e)=>{setGuide({...guide,languages:e.target.value})}} value={guide.languages}/> */}
                                <label >Select languages spoken by tourists:</label><br />
                                <label>
                                    <input type="checkbox" id="language1" name="language1" onChange={(e) => { setLanguages({ ...languages, "French": !languages.French }) }} value={languages.French} />
                                    French
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language2" name="language2" onChange={(e) => { setLanguages({ ...languages, "Arabic": !languages.Arabic }) }} value={languages.Arabic} />
                                    Arabic
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language3" name="language3" onChange={(e) => { setLanguages({ ...languages, "English": !languages.English }) }} value={languages.English} />
                                    English
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language4" name="language4" onChange={(e) => { setLanguages({ ...languages, "German": !languages.German }) }} value={languages.German} />
                                    German
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language5" name="language5" onChange={(e) => { setLanguages({ ...languages, "Italian": !languages.Italian }) }} value={languages.Italian} />
                                    Italian
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language6" name="language6" onChange={(e) => { setLanguages({ ...languages, "Russian": !languages.Russian }) }} value={languages.Russian} />
                                    Russian
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language7" name="language7" onChange={(e) => { setLanguages({ ...languages, "Spanish": !languages.Spanish }) }} value={languages.Spanish} />
                                    Spanish
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language8" name="language8" onChange={(e) => { setLanguages({ ...languages, "Dutch": !languages.Dutch }) }} value={languages.Dutch} />
                                    Dutch
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language9" name="language9" onChange={(e) => { setLanguages({ ...languages, "ChineseMandarin": !languages.ChineseMandarin }) }} value={languages.ChineseMandarin} />
                                    Chinese (Mandarin)
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language10" name="language10" onChange={(e) => { setLanguages({ ...languages, "Polish": !languages.Polish }) }} value={languages.Polish} />
                                    Polish
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language11" name="language11" onChange={(e) => { setLanguages({ ...languages, "Swedish": !languages.Swedish }) }} value={languages.Swedish} />
                                    Swedish
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language12" name="language12" onChange={(e) => { setLanguages({ ...languages, "Norwegian": !languages.Norwegian }) }} value={languages.Norwegian} />
                                    Norwegian
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language13" name="language13" onChange={(e) => { setLanguages({ ...languages, "Danish": !languages.Danish }) }} value={languages.Danish} />
                                    Danish
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language14" name="language14" onChange={(e) => { setLanguages({ ...languages, "Finnish": !languages.Finnish }) }} value={languages.Finnish} />
                                    Finnish
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language15" name="language15" onChange={(e) => { setLanguages({ ...languages, "Japanese": !languages.Japanese }) }} value={languages.Japanese} />
                                    Japanese
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language16" name="language16" onChange={(e) => { setLanguages({ ...languages, "Korean": !languages.Korean }) }} value={languages.Korean} />
                                    Korean
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language17" name="language17" onChange={(e) => { setLanguages({ ...languages, "Portuguese": !languages.Portuguese }) }} value={languages.Portuguese} />
                                    Portuguese
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language18" name="language18" onChange={(e) => { setLanguages({ ...languages, "Turkish": !languages.Turkish }) }} value={languages.Turkish} />
                                    Turkish
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language19" name="language19" onChange={(e) => { setLanguages({ ...languages, "Czech": !languages.Czech }) }} value={languages.Czech} />
                                    Czech
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language20" name="language20" onChange={(e) => { setLanguages({ ...languages, "Hungarian": !languages.Hungarian }) }} value={languages.Hungarian} />
                                    Hungarian
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language21" name="language21" onChange={(e) => { setLanguages({ ...languages, "Greek": !languages.Greek }) }} value={languages.Greek} />
                                    Greek
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language22" name="language22" onChange={(e) => { setLanguages({ ...languages, "Romanian": !languages.Romanian }) }} value={languages.Romanian} />
                                    Romanian
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language23" name="language23" onChange={(e) => { setLanguages({ ...languages, "Ukrainian": !languages.Ukrainian }) }} value={languages.Ukrainian} />
                                    Ukrainian
                                </label><br />
                                <label>
                                    <input type="checkbox" id="language24" name="language24" onChange={(e) => { setLanguages({ ...languages, "Serbian": !languages.Serbian }) }} value={languages.Serbian} />
                                    Serbian
                                </label><br />
                                

                            </div>
                            <input type="submit" value="Register" className="btn btn-primary" />
                        </> : userType == "tourist" ?
                            <>
                            <div className="form-group">
                                <label>Nationality:</label>
                                <input name="bio" className="form-control" onChange={(e) => { setTourist({ ...tourist, nationality: e.target.value }) }} value={tourist.nationality} />
                            </div>
                            </>
                            : "neithrer form"}
                    {/* <div className="form-group">
					<label>Last Name:</label>
					<input name="lastName" className="form-control" onChange={(e)=>{setNewUser({...newUser,lastName:e.target.value})}} value={newUser.lastName}/>
				</div>
				<div className="form-group">
					<label>Email:</label>
					<input name="email" className="form-control" onChange={(e)=>{setNewUser({...newUser,email:e.target.value})}} value={newUser.email}/>
				</div>
				<div className="form-group">
					<label>Password:</label>
					<input type='password' name="password" className="form-control" onChange={(e)=>{setNewUser({...newUser,password:e.target.value})}}/>
					
				</div>
				<div className="form-group">
					<label>Confirm Password:</label>
					<input type='password' name="confirm" className="form-control" onChange={(e)=>{setNewUser({...newUser,confirm:e.target.value})}}/>
				
				</div>
				 */}
                </form>
            </div>
        </div>
    )

}

export default UserType