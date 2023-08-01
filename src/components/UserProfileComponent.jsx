import React from "react";

import LoadingComponent from "./LoadingComponent";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import Stack from "@mui/material/Stack";

export const UserProfileComponent = () => {
    const {user} = useAuth0();

    return (
        <Stack container spacing={3}>
            <div className="align-items-center profile-header mb-5 text-center text-md-left">
                <div md={2}>
                    <img
                        src={user.picture}
                        alt="Profile"
                        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                    />
                </div>
                <div md>
                    <h2>{user.name}</h2>
                    <p className="lead text-muted">{user.email}</p>
                </div>
            </div>
            <div>
                <div>{JSON.stringify(user, null, 2)}</div>
            </div>
        </Stack>
    );
};

export default withAuthenticationRequired(UserProfileComponent, {
    onRedirecting: () => <LoadingComponent/>,
});
