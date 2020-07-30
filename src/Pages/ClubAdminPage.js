import React from 'react';
import ClubAdmin from '../Components/ClubAdmin/ClubAdmin';

function ClubAdminPage(props) {
    return(
        <>
            <ClubAdmin userData={props.location.state.userData}/>
        </>
    )
};

export default ClubAdminPage;