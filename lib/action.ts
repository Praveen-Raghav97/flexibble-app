
const isProduction = process.env.NODE_ENV === 'production';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';


//Function for fetching token
export const fetchToken = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/auth/token`);
      return response.json();
    } catch (err) {
      throw err;
    }
  };

//Function for upload images

export const uploadImage = async (imagePath: string) => {
    try {
      const response = await fetch(`${serverUrl}/api/upload`, {
        method: "POST",
        body: JSON.stringify({
          path: imagePath,
        }),
      });
      return response.json();
    } catch (err) {
      throw err;
    }
  };

  //Function for ubdateing projects
  
 export const updateProject  = ()=>{

 }

 export const createNewProject =() =>{

 }
 
 

