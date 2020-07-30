import React from 'react';
import ClubInfo from '../Components/ClubInfo/ClubInfo';

function ClubPostPage({match}) {
    console.log(match.params)
    return(
        <>
            <ClubInfo clubname={match.params.clubname}/>
        </>
    )
};

export default ClubPostPage;