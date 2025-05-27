import axios from "axios";
import type { Session, User, Venue, VenueInfo } from "$lib/types/venue-types";
import { currentInfos, currentVenues, loggedInUser } from "$lib/runes.svelte";


export const venueService = {
  baseUrl: "https://concise-foam-newsprint.glitch.me/",
  
  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id
        };
        this.saveSession(session, email);
        await this.refreshVenue();
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },



   async addVenue(Venue: Venue, token: string, img: File | null) {
    
    try {
      console.log(img);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    if (img) {
      const formData = new FormData();
      formData.append("imagefile", img); 
      const uploadRes = await axios.post(`${this.baseUrl}/api/venues/upload`, formData, {
        headers: {
        },
      });
      Venue.imgId = uploadRes.data.imgId ?? "placeholder_zbjk5v";
      Venue.img = uploadRes.data.url ?? "https://res.cloudinary.com/dh7gl6628/image/upload/v1742276107/placeholder_zbjk5v.jpg";
    }
      const response = await axios.post(this.baseUrl + "/api/venues", Venue);
      await this.refreshVenue();
      return response.status == 201;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  
     async deleteVenue(venueId:string | undefined, token: string) {
    
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.delete(`${this.baseUrl}/api/venues/${venueId}`);
      await this.refreshVenue();
      return response.status;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getVenues(token: string): Promise<Venue[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/venues");
      return response.data;
    } catch (error) {
    console.log(error)
      return [];
    }
  },


    async getaVenue(token: string, venueId: string | undefined): Promise<Venue[]> {
    try {
      console.log("before getting", venueId);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(`${this.baseUrl}/api/venues/${venueId}`);
      return response.data;
    } catch (error) {
    console.log(error)
      return [];
    }
  },




   async addInfo(Info: VenueInfo, venueId: string, token: string) {
    
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.post(`${this.baseUrl}/api/venues/${venueId}/infos`, Info);
      await this.refreshInfo(venueId);
      return response.status;
    } catch (error) {
      console.log(error);
      return false;
    }
  },


  


  async getInfos(venueId: string | undefined, token: string): Promise<VenueInfo[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(`${this.baseUrl}/api/venues/${venueId}/infos`);
      return response.data;
    } catch (error) {
    console.log(error)
      return [];
    }
  },


       async deleteInfo(infoId:string | undefined, token: string, venueId: string | undefined) {
    try {
      const store = venueId;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.delete(`${this.baseUrl}/api/infos/${infoId}`);
      await this.refreshInfo(store);
      return response.status == 201;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

    async refreshVenue() {
    if (loggedInUser.token) {
    currentVenues.venues = await this.getVenues(loggedInUser.token);
   }
  },

      async refreshInfo(venueId: string | undefined) {
    if (loggedInUser.token) {
    currentInfos.infos = await this.getInfos(venueId, loggedInUser.token);
    }
  },

    saveSession(session: Session, email: string) {
    loggedInUser.email = email;
    loggedInUser.name = session.name;
    loggedInUser.token = session.token;
    loggedInUser._id = session._id;
    localStorage.donation = JSON.stringify(loggedInUser);
  },

  async restoreSession() {
    const savedLoggedInUser = localStorage.donation;
    if (savedLoggedInUser) {
      const session = JSON.parse(savedLoggedInUser);
      loggedInUser.email = session.email;
      loggedInUser.name = session.name;
      loggedInUser.token = session.token;
      loggedInUser._id = session._id;
    }
    await this.refreshVenue();
  },

  clearSession() {
    currentVenues.venues = [];
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
    localStorage.removeItem("donation");
  },




};
