import type { Venue, VenueInfo } from "./types/venue-types";

export const subTitle = $state({ text: "" });
export const imgurl = $state({ text: ""});
export const loggedInUser = $state({ 
    email: "",
    name: "",
    token: "",
    _id: ""
 });
export const currentVenues = $state({ venues: [] as Venue[] });
export const currentInfos = $state({ infos: [] as VenueInfo[] });




