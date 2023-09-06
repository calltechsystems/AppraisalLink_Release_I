import { useState } from "react";

const ProfileInfo = () => {
    const [profile, setProfile] = useState(null);

    // upload profile
    const uploadProfile = (e) => {
        setProfile(e.target.files[0]);
    };

    return (
        <div className="row">
            <h4 className="mb-3 text-center">Personal Information</h4>
            <div className="col-lg-12 text-center">
                <div className="wrap-custom-file">
                    <input
                        type="file"
                        id="image1"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={uploadProfile}
                        style={{borderRadius:"50%"}}
                    />
                    <label
                        style={
                            profile !== null
                                ? {
                                      backgroundImage: `url(${URL.createObjectURL(
                                          profile
                                      )})`,
                                  }
                                : undefined
                        }
                        htmlFor="image1"
                    >
                        <span>
                            <i className="flaticon-download"></i> Upload Photo{" "}
                        </span>
                    </label>
                </div>
                {/* <p>*minimum 260px x 260px</p> */}
            </div>
            {/* End .col */}

            {/* <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput1">Brokerage Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput1"
                        placeholder="alitfn"
                    />
                </div>
            </div> */}
            {/* End .col */}

            {/* <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleEmail">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="formGroupExampleEmail"
                        placeholder="creativelayers@gmail.com"
                    />
                </div>
            </div> */}
            {/* End .col */}

            <div className="col-lg-6 col-xl-6 mt-2">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput3">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput3"
                        placeholder="Micheal"
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6 mt-2">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput4">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput4"
                        placeholder="Jackson"
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput12">
                        Company Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput12"
                        placeholder="xyz"
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput5">Address Line 1</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput5"
                        placeholder="house no.23, near bus stand"
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput6">Address Line 2</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput6"
                        placeholder="house no.23, near bus stand"
                    />
                </div>
            </div>
            {/* End .col */}

            {/* <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput7">Tax Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput7"
                    />
                </div>
            </div> */}
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput8">City</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput8"
                        placeholder="Bhopal"
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput9">State</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput9"
                        placeholder="Madhya Pradesh"
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput10">Zip-Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput10"
                        placeholder="890754"
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput12">
                        Email Address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="formGroupExampleInput12"
                        placeholder="info@test.com"
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput12">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput12"
                        placeholder="0908756437"
                    />
                </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput11">Mortgage Brokerage Licence Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput11"
                        placeholder="xyvs1234"
                    />
                </div>
            </div>
            {/* End .col */}

            

            <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                    <label htmlFor="formGroupExampleInput13">Mortgage Broker Licence Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput13"
                        placeholder="abc23426"
                    />
                </div>
            </div>
            {/* End .col */}

            {/* <div className="col-xl-12">
                <div className="my_profile_setting_textarea">
                    <label htmlFor="exampleFormControlTextarea1">
                        About me
                    </label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="7"
                    ></textarea>
                </div>
            </div> */}
            {/* End .col */}

            <div className="col-xl-12 text-right">
                <div className="my_profile_setting_input">
                    {/* <button className="btn btn1">View Public Profile</button> */}
                    <button className="btn btn2 btn-dark">Update Profile</button>
                </div>
            </div>
            {/* End .col */}
        </div>
    );
};

export default ProfileInfo;
