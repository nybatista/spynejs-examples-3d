import {SpyneTrait} from 'spyne';

export class ProfileTraits extends SpyneTrait {

  constructor(context) {
    let traitPrefix = 'profileTraits$';
    super(context, traitPrefix);

  }

  static profileTraits$ShuffleArray(arr){
    let shuffle = function (array) {

      let currentIndex = array.length;
      let temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;

    };

    return shuffle(arr.slice());
  }

  static profileTraits$mapProfiles(response){
    let usersArr = ProfileTraits.profileTraits$ShuffleArray(response.users);
     return usersArr.slice(0, 100);
  }

  static profileTraits$GetProfileItemData(profileId, data){
    const filterByProfileId = obj => obj.profileId === profileId;
      return data.filter(filterByProfileId)[0];
  }

  static profileTraits$GetChannelPayload(profileId, data){
    // profileId is a string greater than one char
    let isProfileItemEvent = profileId!==undefined && profileId.length>=1;

    // some names have special characters
    profileId = decodeURI(profileId);

    const action  = isProfileItemEvent === false ? "CHANNEL_PROFILES_MENU_EVENT" : "CHANNEL_PROFILES_ITEM_EVENT";
    let payload = isProfileItemEvent === false ? {} : ProfileTraits.profileTraits$GetProfileItemData(profileId, data);
    if (payload === undefined) {
      payload = ProfileTraits.profileTraits$GetUser404();
    }
    return {action, payload};
  }


  static profileTraits$GetUser404(){
    return  {
      "gender": "male",
      "name": {
        "title": "mr",
        "first": "Unknown",
        "last": "FourO'Four"
      },
      "location": {
        "street": "5945 rua dom desconocido ii ",
        "city": "Timbuku",
        "state": "Atlantis",
        "postcode": 999999,
        "coordinates": {
          "latitude": "-72.0420",
          "longitude": "-178.2742"
        },
        "timezone": {
          "offset": "+3:00",
          "description": "Baghdad, Riyadh, Moscow, St. Petersburg"
        }
      },
      "email": "notavailable@example.com",
      "login": {
        "uuid": "7a894d97-0838-4dc9-b27e-ff0b0ea3aa42",
        "username": "bigfoot404",
        "password": "unavailable",
        "salt": "aHoH2UK7",
        "md5": "a56500a567145eba89147b657e54b3b3",
        "sha1": "82d7b3b4a65b1f15dbcf690a76cc69ff87ce7e9a",
        "sha256": "208b200843c4f1fdeab734234dfc396959e1ce89b339f2bf0291ddcec06006b3"
      },
      "dob": {
        "date": "1995-04-07T21:01:22Z",
        "age": 24
      },
      "registered": {
        "date": "2002-11-08T15:34:57Z",
        "age": 16
      },
      "phone": "(08) 6266-2185",
      "cell": "(78) 2531-5293",
      "id": {
        "name": "",
        "value": null
      },
      "picture": {
        "large": "https://assetscontainer.com/starter-app/user-404.jpg",
        "medium": "https://assetscontainer.com/starter-app/user-404.jpg",
        "thumbnail": "https://assetscontainer.com/starter-app/user-404.jpg"
      },
      "nat": "BR",
      "photo": "https://assetscontainer.com/starter-app/user-404.jpg",
      "fullName": "unknown fouro'four",
      "userName": "user404",
      "profileId": "unknown",
      "country": "Unknown",
      "loc": "Vihanti, South Karelia",
      "avatar": "//assetscontainer.com/starter-app/imgs/animals_0002.jpg"
    }


  }




}